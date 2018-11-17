# JSON to Firestore Importer

### Tutorial
Built with help from https://angularfirebase.com/lessons/import-csv-json-or-excel-to-firestore/

### To Compile Typescript into Javascript after updates
Run `tsc` (must have installed Typescript beforehand)
or press `Ctrl+Shift+B` and select `tsc: watch - tsconfig.json` to start the Typescript watcher

### Examples of how to run script
Run `firestore-import -s <source.json> -d <dictionaryId> -n <dictionaryName> --environment prod`
For example, to import Chamococo to the dev site, run `firestore-import -s v1-data/chamacoco_export.json -d yRl8SvrwmeyckpCHU1X5 -n Chamococo`

It defaults to dev environment if prod not mentioned (environment is an optional argument). See https://github.com/tj/commander.js/ for help with required and optional arguments.

// TODO: add audio location argument as presently it must be manually written into .ts file