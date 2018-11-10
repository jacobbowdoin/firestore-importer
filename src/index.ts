#!/usr/bin/env node

import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import * as args from 'commander';

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
    // databaseURL: `https://talking-dictionaries-${environment == 'dev' ? 'dev' : 'alpha'}.firebaseio.com`
});

const db = admin.firestore();

// fs.readJSON('v1-data/chamacoco_export.json');

async function importToFirestore() {
    try {
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
            console.log('index:', i, 'element:', data[i]);
            if (i == 3) { break };
        }

        // for (const item of data) {
        //     const id = args.id ? item[args.id].toString() : colRef.doc().id;

        //     const docRef = colRef.doc(id);

        //     batch.set(docRef, item);
        // }

        // await batch.commit();
        console.log("Firestore updated. Migration was a success!");
    } catch (error) {
        console.log("Migration failed!", error);
    }
}

importToFirestore();