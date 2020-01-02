export interface IGlossLanguage {
    bcp47: string; // LanguageCode in Keyman
    internalName: string; // InternalName in Keyman
    useKeyboard?: string; // allow keyboard sharing
    englishName: string;
    vernacularName: string;
    vernacularAlternate: string;
    showKeyboard: boolean;
}
