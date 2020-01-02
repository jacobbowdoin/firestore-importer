import { IGloss } from './gloss.interface';
import { IAudio } from './audio.interface';
import { IPhoto } from './photo.interface';
import { IExampleSentence } from './exampe-sentence.interface';

export interface IEntry {
    id?: string;
    lx: string; // lexeme
    gl: IGloss; // glosses // WAS glosses
    in?: string; // interlinearization
    lo?: string; // Local Orthography
    di?: string; // Dialect for this variant // WAS dialect
    // ab?: string; // user Id added by // deprecated in favor of createdBy
    ph?: string; // phonetic
    ps?: string; // part of speech
    sd?: string[]; // semantic domain strings, deprecated
    sdn?: string[]; // semantic domain number, new system modeled after SemDom (eg. 2.1.2.3)
    de?: string; // definition english // deprecated by Greg, waiting to hear back on example sentences in Glossing languages
    nt?: string; // notes
    xv?: string; // example vernacular - used for old dictionary imports
    xs?: IExampleSentence; // example sentences - new format which allows us to bring in example sentences from multiple languages (vernacular and gloss languages)
    mr?: string; // morphology
    dictId?: string; // dictionary Id entry belongs to
    sf?: IAudio; // sound file
    pf?: IPhoto; // photo file
    createdBy?: string;
    updatedBy?: string;
    createdAt?: any;
    updatedAt?: any;
    importId?: string; // importId which can be used to show all entries from a particular import
}
