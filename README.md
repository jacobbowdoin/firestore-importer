# JSON to Firestore Importer

### Tutorial
Built with help from https://angularfirebase.com/lessons/import-csv-json-or-excel-to-firestore/

### To Compile Typescript into Javascript after updates
Run `tsc`
(must have installed Typescript beforehand)

### Example of how to run script
Run `firestore-import --src file.json --collection dictionaries/id/words --environment prod`
It defaults to dev environment if prod not mentioned (environment is an optional argument). See https://github.com/tj/commander.js/ for help with required and optional arguments.