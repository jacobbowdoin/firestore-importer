// import { db, storage, timestamp } from './config';
import { db, timestamp } from './config';
// import { getImageServingUrl } from './getImageServingUrl';
import { abbreviateTDPartOfSpeech } from './abbreviate-td-pos';
import { IEntry } from './interfaces/entry.interface';
const uid = 'OTD'; // 'Old Talking Dictionaries

export const importToFirebase = async (data: any[], dictionaryId: string) => {
    try {
        let audioRefCount = 0;
        let imageRefCount = 0;

        let entryCount = 0;
        let batchCount = 0;
        let batch = db.batch();
        const colRef = db.collection(`dictionaries/${dictionaryId}/words`);

        data = JSON.parse(JSON.stringify(data).replace(/&#8217;/g, '\'')); // handle old TD apostrophes

        for (const row of data) { // learned from https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
            // if (entryCount == 5) { break } // to incrementally test larger and larger imports
            ++entryCount;

            console.log(row);
            const entry: IEntry = { lx: '', gl: {} };

            // Always set lexeme even if blank string
            entry.lx = row.lang;

            if (row.gloss) {
                entry.gl['en'] = row.gloss;
            }
            Object.keys(row).forEach(key => {
                // Except for English, gloss fields are labeled using bcp47 language codes followed by '_gloss' (e.g. es_gloss, tpi_gloss)
                if (key.includes('_gloss') && row[key]) {
                    const language = key.split('_gloss')[0];
                    { entry.gl[language] = row[key]; }
                }
            });

            if (row.usage_example) {
                entry.xs = {};
                entry.xs['vernacular'] = row.usage_example;
            }

            Boolean(row.semantic_ids) && (entry.sd = row.semantic_ids);
            Boolean(row.ipa) && (entry.ph = row.ipa);
            Boolean(row.dialect) && (entry.di = row.dialect);

            if (row.pos) {
                const { value, matched } = abbreviateTDPartOfSpeech(row.pos);
                if (matched) {
                    entry.ps = value;
                } else {
                    entry.nt = value; // save misc parts of speech into the notes column if they don't match up with our standard POS list
                }
            }

            if (row.metadata) {
                if (entry.nt) {
                    entry.nt = entry.nt + ', ' + row.metadata;
                } else {
                    entry.nt = row.metadata;
                }
            }
            
            if (row.audio) {
                ++audioRefCount;
            }
            
            if (row.image) {
                ++imageRefCount;
            }
            
            // row.authority; // add to media later

            // add timestamps and creator metadata
            entry.createdAt = timestamp;
            entry.createdBy = uid;
            entry.updatedAt = timestamp;
            entry.updatedBy = uid;

            console.log(entry);
            if (batchCount === 200) {
                console.log('committing batch ending with entry: ', entryCount);
                await batch.commit();
                batch = db.batch();
                batchCount = 0;
            }
            batch.create(colRef.doc(), entry);
            batchCount++;
        };
        await batch.commit();

        console.log(`Converted ${entryCount} entries, and found ${audioRefCount} audio references, and ${imageRefCount} image references`);

        return entryCount;
    } catch (error) {
        console.log('Import to Firebase failed');
        throw new Error(error);
    }
}

// const uploadAudioFile = (audioFileName, lexeme, entryId) => {
//     return new Promise((resolve, reject) => {
//         if (!audioFileName) { reject(`No audio found for ${lexeme}`) };

//         const audioDir = join(__dirname, `../${args.audio}`);
//         const audioFilePath = join(audioDir, audioFileName);

//         const uploadedAudioName = lexeme.replace(/ /g, '_').replace(/\./g, '');
//         const audioType = audioFileName.match(/\.[0-9a-z]+$/i);

//         const uploadedAudioPath = `audio/${args.dictionaryName}_${args.dictionaryId}/${uploadedAudioName}_${entryId}${audioType}`;

//         storage.bucket(fileBucket).upload(audioFilePath, {
//             destination: uploadedAudioPath,
//         }).then(() => {
//             resolve({ uploadedAudioPath });
//         })
//             .catch((err) => { reject(err) });
//     })
// }

// const uploadImageFile = async (entry, entryId) => {
//     try {
//         const pictureFileName = entry.image;
//         const lexeme = entry.lx;
//         if (!pictureFileName) { throw `No image found for ${lexeme}` };

//         const imageDir = join(__dirname, `../${args.photos}`);
//         const imageFilePath = join(imageDir, pictureFileName);

//         const uploadedImageName = lexeme.replace(/ /g, '_').replace(/\./g, '');
//         const imageType = pictureFileName.match(/\.[0-9a-z]+$/i);

//         const uploadedImagePath = `images/${args.dictionaryName}_${args.dictionaryId}/${uploadedImageName}_${entryId}${imageType}`;

//         await storage.bucket(fileBucket).upload(imageFilePath, {
//             destination: uploadedImagePath
//         })

//         const gcsPath = await getImageServingUrl(uploadedImagePath, args.environment);
//         const dateArray = pictureFileName.match(/([0-9]*)_([0-9]*)_([0-9]*)/);
//         const pf = {
//             cr: entry.authority || '', // speaker
//             ts: dateArray ? new Date(`${dateArray[1]}, ${dateArray[2]}, ${dateArray[3]}`) : null,
//             path: uploadedImagePath,
//             gcs: gcsPath, // Google Cloud Storage Link
//         };

//         return pf;
//     } catch (err) {
//         throw err;
//     }
// }

/**
 * Santize file name down to basic characters that can be accepted by Google's Serving Url generator
 * Use like this: `${dictionaryId}/audio/import_${importId}/${sanitizeFileName(filePath)}`
 */
export const sanitizeFileName = (fileName: string): string => {
    return fileName.replace(/[^a-z0-9\.+]+/gi, '-');
}