import * as fs from 'fs-extra';
import { environment } from './config';
import { unzipArchive } from './unzip';
import { findUnmatchedPOS } from './find-unmatched-pos';
import { importToFirebase } from './import-to-firebase';
import { findLanguages } from './find-languages';
import { mockDictionary } from './mock-dictionary';
import { deleteDuplicateEntries } from './delete-duplicate-entries';

// wahgi
const language = process.argv[2];
// remo - POS?
// gutob
// gta
// apatani - POS?
// ho - POS?
// sora - POS?
// xyzyl - POS? 
// yokoim - 'proper name = proper noun?
// olukumi - English (en), Yoruba (yo), and is "ib" "Igbo"?
// - sakapulteko - ?
// achi - ?
// kaqchikel - ?
// qanjobal - ?
// tzutujil - ?
// chalchiteko - ?
// santali - adposition?
// tektiteko - ?
// ixil - ?
// kera_mundari (kera-mundari url) - adposition? and missing audio file because of question mark
// kharia - missing two audio files (also not working on old site: http://talkingdictionary.swarthmore.edu/kharia/?fields=all&semantic_ids=&q=bas and http://talkingdictionary.swarthmore.edu/kharia/?fields=all&semantic_ids=&q=pipe)
// - qeqchi -?
// - korku

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

const importOldTalkingDictionary = async () => {
    try {
        console.log(`importing ${dictionaryId}`);
        const dataFileName = await unzipArchive(language, dictionaryId);
        // const dataFileName = 'gta_export.json'; // remove after done with gta troubleshooting
        let data = await fs.readJSON(`dictionary/${dictionaryId}/data/${dataFileName}`);
        data = JSON.parse(JSON.stringify(data).replace(/&#8217;/g, '\'').replace(/\\u0000/g, '')); // handle old TD apostrophes
        // Use .replace(/\\u0000/g, '') to handle odd null values in first 4 entries of ho
        data = deleteDuplicateEntries(data);
        findUnmatchedPOS(data);
        // if (true) { return } // Uncomment to prep import POS/Languages
        if (environment === 'dev') {
            const glossLanguages: string[] = findLanguages(data);
            await mockDictionary(dictionaryId, glossLanguages)
        }
        const importedCount = await importToFirebase(data, dictionaryId, environment);
        console.log(`Finished importing ${importedCount} entries in ${(Date.now() - dateStamp)/1000} seconds`);
    } catch (err) {
        console.error(err);
    }
}

importOldTalkingDictionary();