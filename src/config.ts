import * as admin from 'firebase-admin';
export const firebase = admin.initializeApp();

export const db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export const timestamp = admin.firestore.FieldValue.serverTimestamp();
export const storage = admin.storage();
