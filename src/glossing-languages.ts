import { IGlossLanguage } from "./interfaces/gloss-language.interface";

export const glossingLanguages: IGlossLanguage[] = [
    { bcp47: 'af', internalName: 'Keyboard_european', englishName: 'Afrikaans', vernacularName: '', vernacularAlternate: '', showKeyboard: false },
    { bcp47: 'am', internalName: 'Keyboard_gff_amharic', englishName: 'Amharic', vernacularName: 'አማርኛ', vernacularAlternate: 'Amarəñña', showKeyboard: true },
    { bcp47: 'ar', internalName: 'Keyboard_sil_arabic_phonetic', englishName: 'Arabic', vernacularName: 'العَرَبِيَّة‎', vernacularAlternate: '', showKeyboard: true }, // Keyboard__arabic_izza didn't work
    { bcp47: 'as', internalName: 'Keyboard_isis_bangla', englishName: 'Assamese', vernacularName: 'অসমীয়া', vernacularAlternate: 'Asamiya', showKeyboard: true },
    { bcp47: 'ig', internalName: 'Keyboard_naijanfd10', englishName: 'Igbo', vernacularName: 'Asụsụ Igbo', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'ay', internalName: 'Keyboard_european2', englishName: 'Aymara', vernacularName: 'Aymar aru', vernacularAlternate: '', showKeyboard: false },
    { bcp47: 'id', internalName: 'Keyboard_basic_kbdus', englishName: 'Indonesian', vernacularName: 'Bahasa Indonesia', vernacularAlternate: '', showKeyboard: false }, // US Basic keyboard
    { bcp47: 'bn', internalName: 'Keyboard_bengali', englishName: 'Bengali', vernacularName: 'বাংলা', vernacularAlternate: 'Bangla', showKeyboard: true },
    { bcp47: 'my', internalName: 'Keyboard_burmese02', englishName: 'Burmese', vernacularName: 'မြန်မာစာ', vernacularAlternate: 'mranmabhasa', showKeyboard: true },
    { bcp47: 'cmn', internalName: 'Keyboard_chinese', englishName: 'Mandarin', vernacularName: '官话', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'yue', useKeyboard: 'cmn', internalName: 'Keyboard_chinese', englishName: 'Cantonese', vernacularName: '广东话', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'de', internalName: 'Keyboard_european', englishName: 'German', vernacularName: 'Deutsch', vernacularAlternate: '', showKeyboard: false },
    { bcp47: 'en', internalName: 'Keyboard_us', englishName: 'English', vernacularName: '', vernacularAlternate: '', showKeyboard: false },
    { bcp47: 'es', internalName: 'Keyboard_spanish', englishName: 'Spanish', vernacularName: 'español', vernacularAlternate: 'castellano', showKeyboard: true },
    { bcp47: 'fa', internalName: 'Keyboard_dari_clra', englishName: 'Persian', vernacularName: 'فارسی', vernacularAlternate: 'Farsi', showKeyboard: true },
    { bcp47: 'fr', internalName: 'Keyboard_french', englishName: 'French', vernacularName: 'français', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'ka', internalName: 'Keyboard_georgian', englishName: 'Georgian', vernacularName: 'ქართული', vernacularAlternate: 'Kartuli', showKeyboard: true }, // Longer version: ქართული ენა, kartuli ena // Keyboard_basic_kbdgeome doesn't work
    { bcp47: 'gn', internalName: 'Keyboard_european', englishName: 'Guarani', vernacularName: 'Guaraní', vernacularAlternate: 'avañe’ẽ', showKeyboard: false },
    { bcp47: 'ha', internalName: 'Keyboard_naijanfd10', englishName: 'Hausa', vernacularName: 'Harshen', vernacularAlternate: 'هَرْشَن هَوْسَ', showKeyboard: true },
    { bcp47: 'hi', internalName: 'Keyboard_dev_inscript', englishName: 'Hindi', vernacularName: 'हिन्दी', vernacularAlternate: 'Hindī', showKeyboard: true },
    { bcp47: 'km', internalName: 'Keyboard_khmer10', englishName: 'Khmer', vernacularName: 'ភាសាខ្មែរ', vernacularAlternate: 'Cambodian', showKeyboard: true },
    { bcp47: 'lo', internalName: 'Keyboard_lao_2008_basic', englishName: 'Lao', vernacularName: 'ພາສາລາວ', vernacularAlternate: 'phasa lao', showKeyboard: true },
    { bcp47: 'mr', internalName: 'Keyboard_marathi', englishName: 'Marathi', vernacularName: 'मराठी', vernacularAlternate: 'Marāṭhī', showKeyboard: true },
    { bcp47: 'nl', internalName: 'Keyboard_dutch', englishName: 'Dutch', vernacularName: 'Nederlands', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'ne', useKeyboard: 'hi', internalName: 'Keyboard_dev_inscript', englishName: 'Nepali', vernacularName: 'नेपाली/खस कुरा', vernacularAlternate: 'Gorkhali, Khas-Kura', showKeyboard: true },
    { bcp47: 'ja', internalName: 'Keyboard_japanese', englishName: 'Japanese', vernacularName: '日本語', vernacularAlternate: 'Nihongo', showKeyboard: true },
    { bcp47: 'or', internalName: 'Keyboard_isis_oriya', englishName: 'Oriya', vernacularName: 'ଓଡ଼ିଆ', vernacularAlternate: 'Oṛiā, Odia', showKeyboard: true },
    { bcp47: 'pa', internalName: 'Keyboard_isis_gurmukhi', englishName: 'Punjabi', vernacularName: 'ਪੰਜਾਬੀ', vernacularAlternate: 'پن٘جابی', showKeyboard: true },
    { bcp47: 'pt', internalName: 'Keyboard_portuguese', englishName: 'Portuguese', vernacularName: 'português', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'qu', internalName: 'Keyboard_european', englishName: 'Quechua', vernacularName: 'Runa Simi', vernacularAlternate: '', showKeyboard: false },
    { bcp47: 'ru', internalName: 'Keyboard_russian', englishName: 'Russian', vernacularName: 'русский', vernacularAlternate: 'язык', showKeyboard: true },
    { bcp47: 'sw', internalName: 'Keyboard_basic_kbdus', englishName: 'Swahili', vernacularName: 'Kiswahili', vernacularAlternate: '', showKeyboard: false },  // swh = kiswahili, sw is macrolanguage
    { bcp47: 'tl', internalName: 'Keyboard_basic_kbdus', englishName: 'Tagalog', vernacularName: 'Wikang Tagalog', vernacularAlternate: '', showKeyboard: false },
    { bcp47: 'ta', internalName: 'Keyboard_tamil', englishName: 'Tamil', vernacularName: 'தமிழ்', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'te', internalName: 'Keyboard_telugu', englishName: 'Telugu', vernacularName: 'తెలుగు', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'th', internalName: 'Keyboard_thai_kedmanee', englishName: 'Thai', vernacularName: 'ภาษาไทย', vernacularAlternate: 'Phasa Thai', showKeyboard: true },
    // tslint:disable-next-line: quotemark
    { bcp47: 'bo', useKeyboard: 'bo-Tibt-CN', internalName: 'Keyboard_basic_kbdtiprd', englishName: 'Tibetan', vernacularName: 'ལྷ་སའི་སྐད་', vernacularAlternate: "Lha-sa'i skad, Lhaséké", showKeyboard: true },
    { bcp47: 'tpi', internalName: 'Keyboard_european', englishName: 'Tok Pisin', vernacularName: '', vernacularAlternate: '', showKeyboard: false },
    { bcp47: 'ur', internalName: 'Keyboard_kbdurdu', englishName: 'Urdu', vernacularName: 'اُردُو', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'vi', internalName: 'Keyboard_vietnamese', englishName: 'Vietnamese', vernacularName: 'tiếng Việt', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'wuu', useKeyboard: 'cmn', internalName: 'Keyboard_chinese', englishName: 'Wu', vernacularName: '吴语', vernacularAlternate: '', showKeyboard: true },
    { bcp47: 'yo', internalName: 'Keyboard_yorubadot', englishName: 'Yoruba', vernacularName: 'Èdè Yorùbá', vernacularAlternate: '', showKeyboard: true },
];

// BCP 47 language codes are used to identify correct Keyman keyboards for language inputs
// Codes pulled from: http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

// internalName pulled from: https://keyman.com > search for keyboard, select one with desktop and mobile web if possible, then copy Keyboard ID and add 'Keyboard_' to the beginning

// Latin script options: Keyboard_european, Keyboard_sil_euro_latin, Keyboard_basic_kbdus, Keyboard_us


// Simplified Language Codes List:
// af: Afrikaans
// am: Amharic
// ar: Arabic
// as: Assamese
// ay: Aymara
// bn: Bengali
// my: Burmese
// yue: Cantonese
// nl: Dutch
// en: English
// fr: French
// ka: Georgian
// de: German
// gn: Guarani
// ha: Hausa
// hi: Hindi
// id: Indonesian
// ig: Igbo
// ja: Japanese
// km: Khmer
// lo: Lao
// cmn: Mandarin
// mr: Marathi
// ne: Nepali
// or: Oriya
// fa: Persian
// pt: Portuguese
// pa: Punjabi
// qu: Quechua
// ru: Russian
// es: Spanish
// sw: Swahili
// tl: Tagalog
// ta: Tamil
// te: Telugu
// th: Thai
// bo: Tibetan
// tpi: Tok Pisin
// ur: Urdu
// vi: Vietnamese
// wuu: Wu
// yo: Yoruba
