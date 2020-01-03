import { abbreviateTDPartOfSpeech } from "./abbreviate-td-pos";

/**
 * Logs unique parts and throw an error if any unmatched parts found so we know what to fix. Fix as many as we want to, then uncomment Error throwing to allow unmatched POS to be put into the notes field.
 */
export const findUnmatchedPOS = (data: any[]) => {
    console.log('Matching Parts of Speech for ', data.length, ' entries');
    const uniquePOS: string[] = [];
    const repeatedPOS: string[] = [];
    let unmatchedPOS = false;

    for (const entry of data) {
        if (entry.pos) {
            const pos = entry.pos;
            if (uniquePOS.indexOf(pos) === -1) uniquePOS.push(pos);
            repeatedPOS.push(pos);
        }
    }

    console.log('\nUnmatched POS: ')
    uniquePOS.forEach((pos: string) => {
        const { matchedPOS } = abbreviateTDPartOfSpeech(pos);
        if (matchedPOS) {
            // console.log(`Matched Unique POS|${pos}|`);
        } else {
            // console.log(`>> Unmatched Unique POS\n|${pos}|`);
            console.log(`${pos}`);
            unmatchedPOS = true;
        }
    })

    console.log('\nRepeat unmatched POS to get a feel for the quantity of unmatched POS');
    repeatedPOS.forEach((pos: string) => {
        const { matchedPOS } = abbreviateTDPartOfSpeech(pos);
        if (!matchedPOS) {
            // console.log(`>> Unmatched Unique POS\n|${pos}|`);
            console.log(`|${pos}|`);
        }
    })

    if (unmatchedPOS) {
        console.log('Not all POS found matches so they will be saved as is.')
        // Comment after fixing as many as reasonable to allow unmatched POS to be put into the POS field as is.
        // throw new Error(`No abbreviation found for some POS. See log.`);
    }
}