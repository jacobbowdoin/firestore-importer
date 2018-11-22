export function abbreviatePOS(partOfSpeech) {
    const conversionArray = [
        ['', ''],
        ['noun', 'n'],
        ['verb', 'v'],
        ['adjective', 'adj'],
        ['pronoun', 'pro'],
        ['preposition', 'prep'],
        ['interjection', 'int'],
        ['adverbial', 'adv'],
        ['plural noun', 'n pl'],
        ['phrase', 'phr'],
        ['sentence', 'sent'],
        ['proper noun', 'pr'],
        ['noun phrase', 'np'],
        ['̃phrase', 'phr'],
        ['pl. pronoun', 'pl pro'],
        ['question', 'q'],
        ['gerund', 'ger'],
        ['article', 'art'],
        ['possessive', 'poss']
    ];

    const abbreviatedPOS = conversionArray.filter(set => set[0] === partOfSpeech);
    if (abbreviatedPOS.length) {
        return abbreviatedPOS[0][1];
    } else {
        return '';
    }
}