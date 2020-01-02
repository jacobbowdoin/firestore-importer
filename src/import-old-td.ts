// /// <reference types="node" />

import * as fs from 'fs-extra';
import { db, environment } from './config';
import { unzipArchive } from './unzip';
import { findUnmatchedPOS } from './find-unmatched-pos';
import { importToFirebase } from './import-to-firebase';
import { IDictionary } from './interfaces/dictionary.interface';
import { findLanguages } from './find-languages';

// wahgi
const dictionary = 'remo';
// remo
// gutob
// gta
// apatani
// ho
// sora
// xyzyl
// yokoim
// olukumi
// sakapulteko
// achi
// kaqchikel
// qanjobal
// tzutujil
// chalchiteko
// santali
// tektiteko
// ixil
// kera_mundari (kera-mundari url)
// kharia
// qeqchi
// korku

const dictionaryId = `${dictionary}-${Date.now()}`;

const util = require('util');
const logFile = fs.createWriteStream(`logs/import-${dictionaryId}.txt`, { flags: 'w' }); // 'a' to append, 'w' to write over file contents
const logStdout = process.stdout;
console.log = function () {
    logFile.write(util.format.apply(null, arguments) + '\n');
    logStdout.write(util.format.apply(null, arguments) + '\n');
}

const importOldTalkingDictionary = async () => {
    try {
        console.log(`importing ${dictionary}`);
        const dataFileName = await unzipArchive(dictionary);
        const data = await fs.readJSON(`dictionary/${dictionary}/data/${dataFileName}`);
        findUnmatchedPOS(data);
        const glossLanguages: string [] = findLanguages(data);
        if (environment === 'dev') {
            await mockDictionary(dictionaryId, glossLanguages)
        }
        const importedCount = await importToFirebase(data, dictionaryId);
        console.log(`Finished importing ${importedCount} entries`);
        // console.log({newFormatData}); log entries in importToFirebase
    } catch (err) {
        console.error(err);
    }
}

/**
 * Create new empty dictionary in Firestore
 */
export const mockDictionary = async (dictionaryId: string, glossLanguages: string[]) => {
    const dictionaryDoc: IDictionary = {
        id: dictionaryId,
        name: `Local: ${dictionaryId}`,
        public: true,
        entryCount: 0,
        glossLanguages //: ['en', 'es', 'hi', 'or'],
    };
    await db.doc(`dictionaries/${dictionaryId}`).set(dictionaryDoc);
    return dictionaryDoc;
}

importOldTalkingDictionary();