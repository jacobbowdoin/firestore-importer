#!/usr/bin/env node

import * as args from 'commander';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import { join } from 'path';

args
    .version("0.0.1")
    .option("-s, --src <path>", "Source file path")
    .option("-c, --collection <path>", "Collection path in firestore")
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
        // TODO: figure out collection path and test a few data uploads to firestore (5)
        // const colPath = args.collection;
        const file = args.src;

        // Create a batch to run an atomic write
        // const colRef = db.collection(colPath);
        // const batch = db.batch();

        let data;
        if (file.includes(".json")) {
            data = await fs.readJSON(file);
        }

        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]);
            data[i].lx = data[i].lang;
            delete data[i].lang

            data[i].ph = data[i].ipa;
            delete data[i].ipa;

            data[i].ps = data[i].pos;
            delete data[i].pos;

            data[i].di = data[i].dialect;
            delete data[i].dialect;

            data[i].xv = data[i].usage_example;
            delete data[i].usage_example;

            data[i].lc = data[i].metadata; // location
            delete data[i].metadata;

            // learn about try/catch so I can convert this to const uploadedAudioPath = await upload...()
            // maybe the outer parent catch will even catch this? Test it out.
            await uploadAudioFile(data[i].audio, data[i].lx)
                .then((uploadedAudioPath) => {
                    console.log('audio saved as ', uploadedAudioPath);

                    const dateArray = data[i].audio.match(/(\d*)_(\d*)_(\d*)/);
                    data[i].sf = {
                        cr: data[i].authority, // speaker
                        ts: dateArray ? new Date(`${dateArray[1]}, ${dateArray[2]}, ${dateArray[3]}`) : null,
                        fp: uploadedAudioPath,
                        // mt: 'TODO: get media token returned',
                    };
                    delete data[i].authority;
                    delete data[i].audio;
                })
                .catch((err) => console.log(err));

            delete data[i].image;

            data[i].sd = data[i].semantic_ids;
            delete data[i].semantic_ids;

            data[i].gloss = {
                English: data[i].gloss,
                Español: data[i].es_gloss,
            }
            delete data[i].es_gloss;

            // console.log(data[i]);
            // break;
        }

        //TODO work batch uploading into previous for loop
        // for (const item of data) {
        //     const id = args.id ? item[args.id].toString() : colRef.doc().id;

        //     const docRef = colRef.doc(id);

        //     batch.set(docRef, item);
        // }

        // await batch.commit();
        console.log("Firestore import completed successfully.");
    } catch (error) {
        console.log("Migration failed!", error);
    }
}

import * as Storage from '@google-cloud/storage';
const gcs = new Storage();

const uploadAudioFile = (audioFileName, lexeme) => {
    return new Promise((resolve, reject) => {
        if (!audioFileName) { reject(`No audio found for ${lexeme}`) };

        const audioDir = join(__dirname, '../v1-audio');
        const audioFilePath = join(audioDir, audioFileName);

        const dictionaryName = 'Chamococo';
        const dictionaryId = '123';
        const uploadedAudioName = lexeme.replace(/ /g, '_').replace(/\./g, '');
        const uploadedAudioPath = `audio/${dictionaryName}_${dictionaryId}_${uploadedAudioName}_123`;

        const fileBucket = `talking-dictionaries-${args.environment == 'prod' ? 'alpha' : 'dev'}.appspot.com/`

        // TODO: Try uploading image to storage
        gcs.bucket(fileBucket).upload(audioFilePath, {
            destination: join(bucketDir, uploadedAudioPath)
        }).then(() => { resolve(uploadedAudioPath) })
            .catch((err) => { reject(err) });
    })
}

importToFirestore();

// Audio currently stored as
// audio/Bahasa_Lani_jaRhn6MAZim4Blvr1iEv/eke_z8830ipzn7vgjbbx_1541390364420.mp3
// audioUri: gs://talking-dictionaries-alpha.appspot.com/audio/Bahasa_Lani_jaRhn6MAZim4Blvr1iEv/eke_z8830ipzn7vgjbbx_1541390364420.mp3


// For learning how to use join()
// fs.readdir(join(__dirname, '../v1-audio'), function (err, files) {
//     if (err) return console.error('Unable to read directory contents');
//     console.log(files.map(f => '\t' + f).join('\n'));
//     console.log(`Contents of ${join(__dirname, '../v1-audio')}`);
// });