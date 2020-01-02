import { abbreviateTDPartOfSpeech } from "./abbreviate-td-pos";

/**
 * Logs unique parts and throw an error if any unmatched parts found so we know what to fix. Fix as many as we want to, then uncomment Error throwing to allow unmatched POS to be put into the notes field.
 */
export const findUnmatchedPOS = (data: any[]) => {
    const uniquePOS: string[] = [];
    const unmatchedPOS: string[] = [];

    for (const entry of data) {
        if (entry.pos) {
            const pos = entry.pos;
            if (uniquePOS.indexOf(pos) === -1) uniquePOS.push(pos);
        }
    }
    uniquePOS.forEach((pos: string) => {
        const { matched } = abbreviateTDPartOfSpeech(pos);
        if (matched) {
            console.log('Matched Unique POS: ', pos);
        } else {
            console.log('>> Unmatched Unique POS: ', pos);
            unmatchedPOS.push(pos);
        }
    })

    if (unmatchedPOS.length) {
        // Uncomment after fixing as many as reasonable to allow unmatched POS to be put into the notes field.
        throw new Error(`No abbreviation found for some POS. See log.`);
    }
}