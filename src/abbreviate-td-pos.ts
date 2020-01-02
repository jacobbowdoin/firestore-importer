import { partsOfSpeech } from "./parts-of-speech";

/**
 * Convert old Talking Dictionary parts of speech (both English and Spanish) to English abbreviations
 */
export const abbreviateTDPartOfSpeech = (input: string) => {
    const sanitizedInput = input
        .trim()
        .toLowerCase()
        .replace(/[.]$/, '') // removes word-final periods
        .replace(/:/g, ''); // removes random colons in old TD data
    const matchingPOS = partsOfSpeech.find(part => { //TODO, possibly more efficient just to return enAbbrev and not whole part object
        return (part.enName === sanitizedInput) || (part.esName === sanitizedInput) || (part.enAbbrev === sanitizedInput) || (part.tdAlternates && part.tdAlternates.includes(sanitizedInput));
    })
    // console.log({sanitizedInput}, {matchingPOS});
    return matchingPOS && { value: matchingPOS.enAbbrev, matched: true } || { value: sanitizedInput, matched: false }
}

