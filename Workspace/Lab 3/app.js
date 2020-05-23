//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const fileData = require('./fileData');
const textMetrics = require('./textMetrics');
const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));


async function fileOperations(){
    await operations(1);
    await operations(2);
    await operations(3);
}

async function operations(file){
    if (fs.existsSync('./chapter' + file + '.result.json')){
        /* The specified chapter's JSON file exists,
         * gets information from that JSON and prints it.
         */
        console.log(await fileData.getFileAsJSON('./chapter' + file + '.result.json'));
    } else {
        /* The specified chapter's JSON file does not exist,
         * gets the file data as a string and runs createMetrics,
         * the chapter's JSON file is created and the metrics are written to it,
         * the metrics are also printed.
         */
        const test = (await fileData.getFileAsString('./chapter' + file + '.txt'));
        const results = await textMetrics.createMetrics((test));
        await fileData.saveJSONToFile('./chapter' + file + '.result.json', results);
        console.log(results);
    }
}

fileOperations().catch(err => {
    console.log(err);
});
