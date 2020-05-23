//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;


//ADD EVERY FORM OF ERROR CHECKING

const {ObjectId} = require('mongodb');
async function addBand(bandName, bandMembers, yearFormed, genres, recordLabel){
  if (!bandName ) throw 'bandName missing';  
  console.log('bandname')
  if (!bandMembers) throw 'bandMembers missing';
  console.log('bandmembers')
  if (!yearFormed) throw 'yearFormed missing';
  console.log('YF')
  if (!genres) throw 'genres missing';
  console.log('G')
  if (!recordLabel) throw 'recordLabel missing';
  console.log('RL')
  if (!Array.isArray(bandMembers)) throw 'bandMembers must be an array';
  if (!Array.isArray(genres)) throw 'genres must be of type array';
  console.log('arrayz')
  if (typeof(bandName) !== 'string') throw 'bandName must be a string';
  if (typeof(yearFormed) != 'number') throw 'yearFormed must be a number';
  if (typeof(recordLabel) !== 'string') throw 'recordLabel must be a number';
  console.log('ahd;lhadfh')

  if (yearFormed <= 0) throw 'yearFormed must be a positive number';
  if (bandMembers.length == 0 || genres.length == 0) throw 'Arg value must be at least 1';
  console.log('llllll')

  const bandCollection = await bands();
  console.log('collection worked')


  let newBand = {
      bandName: bandName,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
      genres: genres,
      recordLabel: recordLabel,
      albums: []                          //the array of albums should just contain the corresponding ids ???????? YES, JUST THE IDS
  }

 

  const insertInfo = await bandCollection.insertOne(newBand);
  
  if (insertInfo.insertedCount == 0) throw 'Could not add band';
  console.log('new band added')

  

  const newId = insertInfo.insertedId;

  const band = await this.getBand(newId);
  console.log('new band got')



  return band;
}

async function getAllBands(){
    const bandCollection = await bands();

    const allBands = await bandCollection.find({}).toArray();

    return allBands;

}

async function getBand(id){
    console.log('function called successfully')
    if (!id) throw 'You must provide an id to search for';
    console.log('id provided')
    const bandCollection = await bands();
    console.log('collection done')
    if (typeof(id) == 'string'){
      id = ObjectId.createFromHexString(id); 
    }
       ///not commented post doesnt work and get id does, when commented vice versa
    console.log('id converted')
    const band = await bandCollection.findOne({ _id: id });
    if (band == null) throw 'No band with that id';
    console.log("band got")
    return band;
}

async function updateBand(bandId, bandName, bandMembers, yearFormed, genres, recordLabel){
    if (!bandId) throw 'You must provide an id to search for';

    if (!bandName) throw 'You must provide a name for your band';

    if (!genres || !Array.isArray(genres)) throw 'You must provide an array of genres';

    if (!yearFormed || yearFormed <= 0 || typeof(yearFormed) !== 'number') throw 'yearFormed must be a positive integer';

    if (genres.length == 0) throw 'You must provide at least one genre.';

    if (!recordLabel || typeof(recordLabel) !== 'string') throw 'You must provide a recordLabel that is of type string';

    const bandCurr = await getBand(bandId);
    bandId = ObjectId.createFromHexString(bandId);
    
    const bandCollection = await bands();
    
    

    const updatedBand = {
      bandName: bandName,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
      genres: genres,
      recordLabel: recordLabel,
      albums: bandCurr.albums
    };

    
    const updatedInfo = await bandCollection.updateOne({ _id: bandId }, { $set: updatedBand });
    
    
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update band successfully';
    }
    
    return await this.getBand(bandId);
}

async function removeBand(id){
    if (!id) throw 'You must provide an id to search for';
    const objId = ObjectId.createFromHexString(id);
    const bandCollection = await bands();
    const deletionInfo = await bandCollection.removeOne({_id: objId});

    if (deletionInfo.deletedCount === 0) {
      throw 'Could not delete band with id of ${id}';
    }
}

module.exports = {addBand, getAllBands, getBand, updateBand, removeBand};

