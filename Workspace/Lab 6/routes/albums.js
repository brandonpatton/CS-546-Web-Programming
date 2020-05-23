const express = require("express");
const router = express.Router();
const data = require("../data");
const bandData = data.bands;
const albumData = data.albums;


async function mapper(album){        //album = 1 album object
  const band = await bandData.getBand(album.author)
  const authorInfo = {
    _id: album.author,
    bandName: band.bandName
  }
  album.author = authorInfo;
  return album;
}

router.get("/", async (req, res) => {
  try {
    const albumList = await albumData.getAllAlbums();  
    const updatedAlbumList = [];   
    for(let i = 0; i < albumList.length; i ++){
        const updated = await mapper(albumList[i]);
        updatedAlbumList.push(updated);
    }
    res.json(updatedAlbumList);
  } catch (e) {
    res.status(400);
  }                                                        //Remember, when accessing bands via the API, their albums are included if there are any albums for that band
});

router.get("/:id", async (req, res) => {
  try {
    const album = await albumData.getAlbum(req.params.id);
    const updatedAlbum = await mapper(album);
    res.status(200).json(updatedAlbum);
  } catch (e) {
    res.status(404).json({ error: "Album not found" });
  }
});


router.post("/", async (req, res) => {
  const albumInfo = req.body;

  if (!albumInfo) {
    res.status(400).json({ error: "You must provide data to create an album" });
    return;
  }
  console.log(albumInfo)
  if (!albumInfo.title || typeof(albumInfo.title) !== 'string') {
    res.status(400).json({ error: "You must provide an album title that is of type string" });
    return;
  }
  console.log(albumInfo.title)
  if (!albumInfo.author || typeof(albumInfo.author) !== 'string') {                                //make sure all the ids are STRINGs not OBJECT IDs
    res.status(400).json({ error: "You must provide an author id that is of type string" });
    return;
  }
  console.log(albumInfo.author)
  if (!albumInfo.songs || !Array.isArray(albumInfo.songs)) {
    res.status(400).json({ error: "You must provide an array of songs" });
    return;
  }
  console.log(albumInfo.songs)

  try {
    const updatedAlbum = await mapper(albumInfo);
    console.log(updatedAlbum)
    const newAlbum = await albumData.addAlbum(updatedAlbum.title, updatedAlbum.author._id, updatedAlbum.songs);
    console.log('new album added')
    res.status(200).json(newAlbum);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.patch("/:id", async (req, res) => {
  const updatedData = req.body;
  if (!updatedData) {
    res.status(400).json({ error: "You must provide data to update an album" });
    return;
  }

  if (!updatedData.newTitle && !updatedData.newSongs) {
    res.status(400).json({ error: "You must provide a new album title that is of type string, a new song to update an album with, or both." });
    return;
  } else if (updatedData.newTitle && !updatedData.newSongs){
    if (typeof(updatedData.newTitle) !== 'string'){
      res.status(400).json({ error: "Your new album title must be of type string" });
      return;
    }
    //do newTitle
    try {
      await albumData.getAlbum(req.params.id);
    } catch (e) {
      res.status(404).json({ error: "Album not found" });
    }

    try {
      const albumCurr = await albumData.getAlbum(req.params.id);
      const updatedAlbum = await albumData.updateAlbum(params.req.id, updatedData.newTitle, albumCurr.author, albumCurr.newSongs);
      res.json(updatedAlbum);
    } catch (e) {
      res.sendStatus(500);
    }

  } else if (!updatedData.newTitle && updatedData.newSongs) {
    if (typeof(updatedData.newSongs) !== 'string'){
      res.status(400).json({ error: "Your new song must be of type string" });
      return;
    }
    //do newSongs
    try {
      await albumData.getAlbum(req.params.id);
    } catch (e) {
      res.status(404).json({ error: "Album not found" });
    }

    try {
      const albumCurr = await albumData.getAlbum(req.params.id);
      const updatedAlbum = await albumData.updateAlbum(params.req.id, albumCurr.title, albumCurr.author, updatedData.newSongs);
      res.json(updatedAlbum);
    } catch (e) {
      res.sendStatus(500);
    }
  } else {
  //do both
    try {
      await albumData.getAlbum(req.params.id);
    } catch (e) {
      res.status(404).json({ error: "Album not found" });
    }
    console.log('album got')
    try {
      const albumCurr = await albumData.getAlbum(req.params.id);
      console.log('current album got')
      const updatedAlbum = await albumData.updateAlbum(req.params.id, updatedData.newTitle, albumCurr.author, updatedData.newSongs);
      console.log('album updated')
      res.json(updatedAlbum);
    } catch (e) {
      res.sendStatus(500);
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await albumData.getAlbum(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Album not found" });
  }
  console.log('album gotten')
  try {
    const album = await albumData.getAlbum(req.params.id);
    await albumData.removeAlbum(req.params.id);
    console.log('album removed')
    //remove album from band object
    const bandCollections = await bandData.bands();
    const albumsBand = await bandCollections.updateOne({ _id: album.author._id }, { $pull: { albums: newId } });
    console.log('album deleted from band object')
    res.status(200).json({
      deleted: true,
      data: albumData.getAlbum(req.params.id)
    });
    console.log('done')
    
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;