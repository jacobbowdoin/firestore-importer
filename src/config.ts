import * as admin from 'firebase-admin';

// Dev
export const environment = 'dev';
const serviceAccount = require("../service-accounts/talking-dictionaries-dev-firebase-adminsdk-ab6j5-bd33a6e68f.json");

// Alpha
// export const environment = 'alpha';
// const serviceAccount = require("../service-accounts/talking-dictionaries-alpha-firebase-adminsdk-o2c77-aa03619219.json");

export const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://talking-dictionaries-${environment}.firebaseio.com`,
    storageBucket: `talking-dictionaries-${environment}.appspot.com`,
});

export const db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export const timestamp = admin.firestore.FieldValue.serverTimestamp();
export const storage = admin.storage();
