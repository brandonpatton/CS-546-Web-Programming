//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));


async function getFileAsString(path){
    if (!path) throw 'A path must be provided.';
    if (typeof(path) !== 'string') throw 'Path must be a string';
    const readFile = await fs.readFileAsync(path, 'utf8');
    return readFile; 
}

async function getFileAsJSON(path){
    if (!path) throw 'A path must be provided.';
    if (typeof(path) !== 'string') throw 'Path must be a string';
    try {
        const contents = await getFileAsString(path);
        return JSON.parse(contents);
    } catch (e) {
        console.log(e);
    }
}

async function saveStringToFile(path, text){
    if(!path) throw 'A path must be provided.';
    if (typeof(path) !== 'string') throw 'Path must be a string';
    if(!text) throw 'Must supply some text to be written.';
    if (typeof(text) !== 'string') throw 'Text must be of type string';
    await fs.writeFile(path, text);
    return true;
}

async function saveJSONToFile(path, obj){
    if (!path) throw 'A path must be provided.';
    if (typeof(path) !== 'string') throw 'Path must be a string';
    if (!obj) throw 'Must supply some object to be written.';
    if (typeof(obj) !== 'object') throw 'Data must be of type object';
    const stringified = JSON.stringify(obj);  //ensures object can be processed
    await fs.writeFileAsync(path, stringified, 'utf8');
    return true;     
}

module.exports = {getFileAsString, getFileAsJSON, saveStringToFile, saveJSONToFile};