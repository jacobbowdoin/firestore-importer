import { IDictionary } from "./interfaces/dictionary.interface";
import { db } from "./config";

/**
 * Create new empty dictionary in Firestore
 */
export const mockDictionary = async (dictionaryId: string, glossLanguages: string[]) => {
    const dictionaryDoc: IDictionary = {
        id: `${dictionaryId}`,
        name: `Local: ${dictionaryId}`,
        public: true,
        entryCount: 0,
        glossLanguages //: ['en', 'es', 'hi', 'or'],
    };
    await db.doc(`dictionaries/${dictionaryId}`).set(dictionaryDoc);
    return dictionaryDoc;
}