export interface IDictionary {
    id?: string;
    addedBy?: string; // deprecated
    createdBy?: string;
    updatedBy?: string;
    createdAt?: any;
    updatedAt?: any;
    // allContribute?: boolean; // deprecated
    alternateNames?: string[];
    glossLanguages: string[];
    name: string;
    location?: string;
    public: boolean;
    entryCount: any; // number | firebase.firestore.FieldValue;
    copyright?: string; // Allow custom copyright in case "Copyright _______ community" isn't appropriate for dictionary (eg. Tehuelche)
}
