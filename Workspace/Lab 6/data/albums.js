const mongoCollections = require('../config/mongoCollections');
const albums = mongoCollections.albums;
const bands = mongoCollections.bands;
//const uuid = require("node-uuid");        THIS WAS IN LECTURE CODE, not sure if needed


//ADD EVERY FORM OF ERROR CHECKING

const {ObjectId} = require('mongodb');
async function addAlbum(albumTitle, albumAuthor, albumSongs){
    if (!albumTitle) throw 'Missing albumTitle';
    if (!albumAuthor) throw "Missing albumAuthor";
    if (!albumSongs) throw 'Missing albumSongs';    
    console.log('everythings there') 
    if (!Array.isArray(albumSongs)) throw 'albumSongs must be an array of strings';
    console.log('albumSongs is an array')
    if (typeof(albumTitle) !== 'string') throw 'albumTitle must be a string';
    console.log('albumTitle is a string')
    if (albumSongs.length <= 0) throw 'Must provide at least one song per album';
    console.log('albumSongs ahahahah')
    if (typeof(albumAuthor) !== 'string') throw 'albumAuthor must be of type string';
    console.log('albumAuthor is correct type')
                                                                                       
    const albumCollection = await albums();
    console.log('collection done')
    
    let newAlbum = {
        title: albumTitle,
        author: albumAuthor,
        songs: albumSongs
    }
    const insertInfo = await albumCollection.insertOne(newAlbum);
    if (insertInfo.insertedCount === 0) throw 'Could not add album';
    console.log('new album added')

    const newId = insertInfo.insertedId; //this is the id i need to put in the bands.album array
    
    const bandCollections = await bands();
    console.log('bands collection done')
    const convertedId = ObjectId.createFromHexString(newAlbum.author)
    const albumsBand = await bandCollections.updateOne({ _id: convertedId }, { $addToSet: { albums: newId } });    //modifies band object with album id
    if (albumsBand.matchedCount === 0) throw 'Could not add album id to band object';

    console.log('new album added to band object')

    /*const insertAlbumId = await albumsBand.insertOne({albums: albums.push(newId)})
    if(insertAlbumId.insertedCount === 0) throw 'Could not add album id to band';*/


    const album = await this.getAlbum(newId);  //replace with Read???? yes
    console.log('album got')

    return album;

}


async function getAllAlbums(){
  const albumCollection = await albums();

  const allAlbums = await albumCollection.find({}).toArray();

  return allAlbums;

}

async function getAlbum(id){
  console.log('function called successfully')
    if (!id) throw 'You must provide an id to search for';
    console.log('id ok')
    const albumCollection = await albums();    
    console.log('collection done')                             // this one's read^^^^
    if (typeof(id) == 'string'){
      id = ObjectId.createFromHexString(id)
    }
    const album = await albumCollection.findOne({ _id: id });
    if (album === null) throw 'No album with that id';
    console.log('album got')

    return album;
}

async function updateAlbum(albumId, albumTitle, albumAuthor, albumSongs){
    if (!albumId) throw 'You must provide an album id to search for';

    if (!albumTitle || typeof(albumTitle) !== 'string') throw 'You must provide an album title that is of type string';

    if (!albumAuthor) throw 'You must provide the id of the band who made this album (albumAuthor)';

    if (!albumSongs) throw 'You must provide an array of songs to add';

    if (typeof(albumSongs) !== 'string') throw 'albumSongs must be a string'

    console.log('input fine')
    
    albumId = ObjectId.createFromHexString(albumId);
    console.log('album id converted')
    const albumCollection = await albums();
    console.log('collection done')
    const albumCurr = await this.getAlbum(albumId);
    console.log('albumCurr got')
    //const songList = albumCurr.songs;
    console.log(albumSongs)
    console.log(albumCurr)
    albumCurr.songs.push(albumSongs);
    console.log('new song pushed')
    const updatedAlbum = {
      title: albumTitle,
      author: albumAuthor,
      songs: albumCurr.songs                             //after updating album, need to also update band? NOPE
    };

    const updatedInfo = await albumCollection.updateOne( { _id: albumId }, { $set: updatedAlbum });
    if (updatedInfo.modifiedCount == 0) {
      throw 'could not update album successfully';
    }
    console.log('album updated')

    return await this.getAlbum(albumId);
}

async function removeAlbum(id){
    if (!id) throw 'You must provide an id to search for';
    const objId = ObjectId.createFromHexString(id);
    const albumCollection = await albums();
    const deletionInfo = await albumCollection.removeOne({_id: objId});

    if (deletionInfo.deletedCount === 0) {
      throw 'Could not delete album with id of ${id}';
    }
}

module.exports = {addAlbum, getAllAlbums, getAlbum, updateAlbum, removeAlbum};

