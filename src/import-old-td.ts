import * as fs from 'fs-extra';
import { environment } from './config';
import { unzipArchive } from './unzip';
import { findUnmatchedPOS } from './find-unmatched-pos';
import { importToFirebase } from './import-to-firebase';
import { findLanguages } from './find-languages';
import { mockDictionary } from './mock-dictionary';
import { deleteDuplicateEntries } from './delete-duplicate-entries';
import { cleanUpData } from './clean-up-data';

// const language = process.argv[2];
const dryRun = Boolean(process.argv[2] === 'dryRun');

const iterateThroughDictionaries = async () => {
    // wahgi
    const languages = [
        'remo', // - POS?
        'gutob',
        'gta',
        'apatani', // - POS?
        'ho', // - POS? // check lang: '\nriping', and lang: '\ngur', http://ho.swarthmore.edu/?fields=all&semantic_ids=&q=gur
        'sora', // - POS?
        'xyzyl', // - POS? 
        'yokoim',
        'olukumi', // convert "ib" to "ig" for "Igbo"
        'sakapulteko', // - ?
        'achi', // - ?
        'kaqchikel', // - ?
        'qanjobal', // - ?
        'tzutujil', // - ?
        'chalchiteko', // - ?
        'santali', // - adposition?
        'tektiteko', // - ?
        'ixil', // - ?
        'kera-mundari', // (changed zip from kera_mundari to match kera-mundari url) - adposition? and missing audio file because of question mark
        'kharia', // - missing two audio files (also not working on old site: http://talkingdictionary.swarthmore.edu/kharia/?fields=all&semantic_ids=&q=bas and 'http://talkingdictionary.swarthmore.edu/kharia/?fields=all&semantic_ids=&q=pipe)
        'qeqchi', // -?
        'korku',
    ]

    for (const language of languages) {
        let dictionaryId = language;
        const dateStamp = Date.now();
        if (environment === 'dev') {
            dictionaryId = dictionaryId + '-' + dateStamp;
        }

        const util = require('util');
        const logFile = fs.createWriteStream(`logs/import-${dictionaryId}-${environment}.txt`, { flags: 'w' }); // 'a' to append, 'w' to write over file contents
        const logStdout = process.stdout;
        console.log = function () {
            logFile.write(util.format.apply(null, arguments) + '\n');
            logStdout.write(util.format.apply(null, arguments) + '\n');
        }
        await importOldTalkingDictionary(dictionaryId, language, dateStamp, dryRun);
    };
}



const importOldTalkingDictionary = async (dictionaryId: string, language: string, dateStamp: number, dryRun: boolean) => {
    try {
        console.log(`Importing ${dictionaryId}`);
        const dataFileName = await unzipArchive(language, dictionaryId);
        let data = await fs.readJSON(`dictionary/${dictionaryId}/data/${dataFileName}`);
        data = cleanUpData(data);
        data = deleteDuplicateEntries(data);
        findUnmatchedPOS(data);
        if (environment === 'dev') {
            const glossLanguages: string[] = findLanguages(data);
            if (!dryRun) {
                await mockDictionary(dictionaryId, glossLanguages)
            }
        }
        const importedCount = await importToFirebase(data, dictionaryId, environment, dryRun);
        console.log(`Finished importing ${importedCount} entries to ${environment}/${language} in ${(Date.now() - dateStamp) / 1000} seconds`);
        return true;
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

iterateThroughDictionaries();