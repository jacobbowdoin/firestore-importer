// /// <reference types="node" />

import * as fs from 'fs-extra';
// import * as program from 'commander';

// program.version('0.0.1')
//     .option('-i, --dictionaryId <dictionaryId>', 'Dictionary Id in Firestore')
// program.parse(process.argv);

const unzipper = require('unzipper');

const dataFileFormats = ['csv', 'json', 'xlsx'];
const imageFileFormats = ['jpg', 'jpeg'];
const audioFileFormats = ['mp3', 'wav'];

const dictionaryId = 'wahgi';

const util = require('util');
const logFile = fs.createWriteStream(`logs/import-${dictionaryId}.txt`, { flags: 'w' }); // 'a' to append, 'w' to write over file contents
const logStdout = process.stdout;
console.log = function () {
    logFile.write(util.format.apply(null, arguments) + '\n');
    logStdout.write(util.format.apply(null, arguments) + '\n');
}

export const unzipArchive = async () => {
    let dataFileType = '';
    let audioFileCount = 0;
    let imageFileCount = 0;
    fs.mkdirSync(`dictionary/${dictionaryId}/data/`, { recursive: true });
    fs.mkdirSync(`dictionary/${dictionaryId}/audio/`, { recursive: true });
    fs.mkdirSync(`dictionary/${dictionaryId}/images/`, { recursive: true });

    await new Promise((resolve, reject): any => {
        fs.createReadStream(`../../../Users/jacob/OneDrive/Work/TalkingDictionaries/2019 August - data for alpha td replacement/${dictionaryId}/${dictionaryId}_content_full.zip`)
            .pipe(unzipper.Parse())
            .on('entry', (entry: any) => {
                if (entry.path && entry.type === 'File') {
                    const fileName = entry.path.split('/').pop();
                    const fileExt = entry.path.split('.').pop();

                    if (dataFileFormats.includes(fileExt.toLowerCase())) {
                        dataFileType = fileExt;
                        entry.pipe(fs.createWriteStream(`dictionary/${dictionaryId}/data/${fileName}`));
                    } else if (audioFileFormats.includes(fileExt.toLowerCase())) {
                        ++audioFileCount;
                        entry.pipe(fs.createWriteStream(`dictionary/${dictionaryId}/audio/${fileName}`));
                    } else if (imageFileFormats.includes(fileExt.toLowerCase())) {
                        ++imageFileCount;
                        entry.pipe(fs.createWriteStream(`dictionary/${dictionaryId}/images/${fileName}`));
                    } else {
                        console.log('No proper file type found for: ', fileName, ' - autodraining')
                        entry.autodrain();
                    }

                } else { entry.autodrain(); }
            })
            .promise()
            .then(() => resolve(dataFileType), (e: Error) => reject(e));
    });
    console.log({ dataFileType }, { audioFileCount }, { imageFileCount });
}

unzipArchive();