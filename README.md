# JSON to Firestore Importer
Built with help from https://angularfirebase.com/lessons/import-csv-json-or-excel-to-firestore/

## Initial setup
1. `npm install`
2. Compile Typescript into Javscript (see below)
2. Link needed script commands by running `npm link`

### To Compile Typescript files into Javascript after making changes
Run `tsc` (must have installed Typescript beforehand)
or press `Ctrl+Shift+B` and select `tsc: watch - tsconfig.json` to start the Typescript watcher

### Example of how to use the Import to Firestore script
Run `firestore-import --data <data.json> --audio <folder> --photos <folder> --dictionaryId <dictionaryId> --dictionaryName <dictionaryName> --environment prod`

For an example using abbreviated argument names, to import Chamococo to the dev site, run `firestore-import -d d-data/chamacoco_export.json -a d-audio -p d-photos -i yRl8SvrwmeyckpCHU1X5 -n Chamococo`

Or `firestore-import -d d-data/photo_test.json -a d-audio -p d-photos -i kRlFo5AymRG2hYWg4mpY -n Spanish`

It defaults to dev environment if prod not mentioned (environment is an optional argument). See https://github.com/tj/commander.js/ for help with required and optional arguments.

NOTE: Gloss fields must be specifically written into importToFirestore.ts unless a cross-dictionary pattern can be distinguished.

### How to run the script to gather parts of speech
Run `gather-pos -s <source>`, for example: `gather-pos -s data/chamacoco_export.json`

### Media storage
Example audio path: `audio/Bahasa_Lani_jaRhn6MAZim4Blvr1iEv/eke_z8830ipzn7vgjbbx_1541390364420.mp3`
Example audioUri: `gs://talking-dictionaries-alpha.appspot.com/audio/Bahasa_Lani_jaRhn6MAZim4Blvr1iEv/eke_z8830ipzn7vgjbbx_1541390364420.mp3`
