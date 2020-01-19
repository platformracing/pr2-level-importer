# pr2-level-importer

This is a cloud function that pulls a given level from PR2 and converts it into a format that PRF can use.

To test locally: `export SAVE_TARGET=local && sls invoke local -f import-level -p data.json`

To run unit tests: `npm run test`

To deploy: `sls deploy` (you'll need the right access on AWS)