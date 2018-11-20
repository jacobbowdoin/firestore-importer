#!/usr/bin/env node

import * as args from 'commander';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import { join } from 'path';
const UUID = require('uuidv4');

args
    .version("0.0.1")
    .option("-s, --src <path>", "Source file path")
    // .option("-c, --collection <path>", "Collection path in firestore")
    .option("-d, --dictionaryId <dictionaryId>", "Dictionary Id in firestore")
    .option("-n, --dictionaryName <dictionaryName>", "Dictionary name, used in saving media files")
    .option("-e, --environment [dev/prod]", "Firebase Project")
    .parse(process.argv);

const devServiceAccount = require("../service-accounts/talking-dictionaries-dev-firebase-adminsdk-ab6j5-bd33a6e68f.json");
const prodServiceAccount = require("../service-accounts/talking-dictionaries-alpha-firebase-adminsdk-o2c77-aa03619219.json");

admin.initializeApp({
    credential: admin.credential.cert(args.environment == 'prod' ? prodServiceAccount : devServiceAccount),
    databaseURL: `https://talking-dictionaries-${args.environment == 'prod' ? 'alpha' : 'dev'}.firebaseio.com`
});
const db = admin.firestore();

async function importToFirestore() {
    try {
        const colPath = `dictionaries/${args.dictionaryId}/words`;
        const file = args.src;

        const colRef = db.collection(colPath);
        const batch = db.batch();

        let data;
        if (file.includes(".json")) {
            data = await fs.readJSON(file);
        }

        const commitRound = 0; // start at 0
        const batchStart = 0 + (500 * commitRound);
        const batchEnd = 499 + (500 * commitRound);

        for (let i = 0; i < data.length; i++) {
            // Firestore 'cannot write more than 500 entities in a single call' so we have to upload in chunks
            // See https://github.com/firebase/firebase-admin-java/issues/106 for a possible automated chunking solution
            if ((i < batchStart) || (i > batchEnd)) { continue; };

            data[i].lx = data[i].lang || '';
            delete data[i].lang

            data[i].ph = data[i].ipa || '';
            delete data[i].ipa;

            data[i].ps = abbreviatePOS(data[i].pos || '');
            delete data[i].pos;

            data[i].di = data[i].dialect || '';
            delete data[i].dialect;

            data[i].xv = data[i].usage_example || '';
            delete data[i].usage_example;

            data[i].lc = data[i].metadata || ''; // location
            delete data[i].metadata;

            // learn about try/catch so I can convert this to const uploadedAudioPath = await upload...()
            // maybe the outer parent catch will even catch this? Test it out.

            const entryId = colRef.doc().id;

            await uploadAudioFile(data[i].audio, data[i].lx, entryId)
                .then((response: any) => {
                    const dateArray = data[i].audio.match(/([0-9]*)_([0-9]*)_([0-9]*)/);
                    data[i].sf = {
                        cr: data[i].authority || '', // speaker
                        ts: dateArray ? new Date(`${dateArray[1]}, ${dateArray[2]}, ${dateArray[3]}`) : null,
                        path: response.uploadedAudioPath,
                        mt: response.uuid,
                    };
                    delete data[i].authority;
                    delete data[i].audio;
                })
                .catch((err) => console.log(err));

            delete data[i].image;

            data[i].sd = data[i].semantic_ids || '';
            delete data[i].semantic_ids;

            data[i].gl = {
                English: data[i].gloss || '',
                Español: data[i].es_gloss || '',
            }
            delete data[i].gloss;
            delete data[i].es_gloss;

            const docRef = colRef.doc(entryId);
            batch.set(docRef, data[i]);
            console.log(`Added ${i} to batch: ${data[i].lx}`);
        }

        await batch.commit();
        console.log("Firestore import completed successfully.");
    } catch (error) {
        console.log("Migration failed!", error);
    }
}

import * as Storage from '@google-cloud/storage';
const gcs = new Storage();

const uploadAudioFile = (audioFileName, lexeme, entryId) => {
    return new Promise((resolve, reject) => {
        if (!audioFileName) { reject(`No audio found for ${lexeme}`) };

        const fileBucket = `talking-dictionaries-${args.environment == 'prod' ? 'alpha' : 'dev'}.appspot.com`

        // TODO: add audio location argument or manually write
        const audioDir = join(__dirname, '../v1-audio');
        const audioFilePath = join(audioDir, audioFileName);

        const uploadedAudioName = lexeme.replace(/ /g, '_').replace(/\./g, '');
        const audioType = audioFileName.match(/\.[0-9a-z]+$/i);

        const uploadedAudioPath = `audio/${args.dictionaryName}_${args.dictionaryId}/${uploadedAudioName}_${entryId}${audioType}`;

        let uuid = UUID();

        gcs.bucket(fileBucket).upload(audioFilePath, {
            destination: uploadedAudioPath,
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }).then(() => {
            resolve({ uploadedAudioPath, uuid });
        })
            .catch((err) => { reject(err) });
    })
}

function abbreviatePOS(partOfSpeech) {
    const chamococoConversionArray = [
        ['', ''],
        ['noun', 'n'],
        ['verb', 'v'],
        ['adjective', 'adj'],
        ['pronoun', 'pro'],
        ['preposition', 'prep'],
        ['interjection', 'int'],
        ['adverbial', 'adv'],
        ['plural noun', 'n pl'],
        ['phrase', 'phr'],
        ['sentence', 'sent'],
        ['proper noun', 'pr'],
        ['noun phrase', 'np'],
        ['̃phrase', 'phr'],
        ['pl. pronoun', 'pl pro'],
        ['question', 'q'],
        ['gerund', 'ger'],
        ['article', 'art'],
        ['possessive', 'poss']
    ];

    const abbreviatedPOS = chamococoConversionArray.filter(set => set[0] === partOfSpeech);
    if (abbreviatedPOS.length) {
        return abbreviatedPOS[0][1];
    } else {
        return '';
    }
}

importToFirestore();

async function gatherPartsOfSpeech() {
    const file = args.src;
    let data;
    if (file.includes(".json")) {
        data = await fs.readJSON(file);
    }

    let partsOfSpeech = [];
    for (let i = 0; i < data.length; i++) {
        const pos = data[i].pos;

        if (partsOfSpeech.indexOf(pos) === -1) partsOfSpeech.push(pos);
    }
    console.log(partsOfSpeech);
}

// gatherPartsOfSpeech();

// Audio currently stored as
// audio/Bahasa_Lani_jaRhn6MAZim4Blvr1iEv/eke_z8830ipzn7vgjbbx_1541390364420.mp3
// audioUri: gs://talking-dictionaries-alpha.appspot.com/audio/Bahasa_Lani_jaRhn6MAZim4Blvr1iEv/eke_z8830ipzn7vgjbbx_1541390364420.mp3


// For learning how to use join()
// fs.readdir(join(__dirname, '../v1-audio'), function (err, files) {
//     if (err) return console.error('Unable to read directory contents');
//     console.log(files.map(f => '\t' + f).join('\n'));
//     console.log(`Contents of ${join(__dirname, '../v1-audio')}`);
// });


// Media Token Retrieval
// Learned from https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase 
// on how to generate media token for sound file.
// Could have also used Laurent's answer: https://stackoverflow.com/a/49411199/7053575
// gcs.bucket(fileBucket).upload(audioFilePath, {
//     destination: uploadedAudioPath,
//     predefinedAcl: 'publicRead'
// }).then((result) => {
//     const file = result[0];
//     return file.getMetadata();
// }).then(results => {
//     const metadata = results[0];
//     resolve(metadata.mediaLink);
// })
