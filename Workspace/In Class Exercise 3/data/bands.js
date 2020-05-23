//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const mongoCollections = require('./mongoCollections'); //edit this
const bands = mongoCollections.bands;

const {ObjectId} = require('mongodb');
async function addBand(bandName, bandMembers, yearFormed, genres, recordLabel){
    if (!Array.isArray(bandMembers) || !Array.isArray(genres)) throw 'Arg must be of type array';
    if (bandMembers.length <= 0 || genres.length <= 0) throw 'Arg value must be at least 1';
    if (!bandName || !bandMembers || !yearFormed || !genres || !recordLabel) throw 'Missing arg';
    var bandCollection = await bands();
    let newBand = {
        bandName: bandName,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
        genres: genres,
        recordLabel: recordLabel
    }
    const insertInfo = await bandCollection.insertOne(newBand);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;

    const band = await this.getBand(newId);
    return band;

}

async function getAllBands(){
    const bandCollection = await bands();

    const bands = await bandCollection.find({}).toArray();

    return bands;

}

async function getBand(id){
    if (!id) throw 'You must provide an id to search for';
    const bandCollection = await bands();
    const band = await bandCollection.findOne({_id: id});
    if (band === null) throw 'No band with that id';

    return band;
}

async function updateBand(bandId, bandName, bandMembers, yearFormed, genres, recordLabel){
    if (!bandId) throw 'You must provide an id to search for';

    if (!bandName) throw 'You must provide a name for your band';

    if (!genres || !Array.isArray(genres)) throw 'You must provide an array of genres';

    if (genres.length === 0) throw 'You must provide at least one genre.';
    const objId = ObjectId.createFromHexString(id);
    const bandCollection = await bands();
    const updatedBand = {
      bandName: name,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
      genres: genres,
      recordLabel: recordLabel
    };

    const updatedInfo = await bandCollection.updateOne({_id: objId}, {$set: updatedBand});
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update band successfully';
    }

    return await this.getBand(id);
}

async function removeBand(id){
    if (!id) throw 'You must provide an id to search for';
    const objId = ObjectId.createFromHexString(id);
    const bandCollection = await bands();
    const deletionInfo = await bandCollection.removeOne({_id: objId});

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }
}

module.exports = {addBand, getAllBands, getBand, updateBand, removeBand};

