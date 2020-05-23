const express = require("express");
const router = express.Router();
const data = require("../data");
const bandData = data.bands;
const albumData = data.albums;


//helper function to facilitate linking of album ids in the band object to album info, use $map?
async function mapper(band){        //band = 1 band object
  for(let j = 0; j < band.albums.length; j++){
    const albumInfo = await albumData.getAlbum(band.albums[j]);
    //add album info to band.albums
    band.albums[j] = albumInfo;
  }
  return band;
}

router.get("/", async (req, res) => {
  try {
    const bandList = await bandData.getAllBands();  
    const updatedBandList = [];   
    for(let i = 0; i < bandList.length; i++){
        const updated = await mapper(bandList[i]);
        updatedBandList.push(updated);
    }
    res.json(updatedBandList);
  } catch (e) {
    res.status(400);
  }                                                        //Remember, when accessing bands via the API, their albums are included if there are any albums for that band
});

router.get("/:id", async (req, res) => {
  try {
    const band = await bandData.getBand(req.params.id);
    const updatedAlbums = await mapper(band);
    res.status(200).json(updatedAlbums);
  } catch (e) {
    res.status(404).json({ error: "Band not found" });
  }
});

router.post("/", async (req, res) => {
  const bandInfo = req.body;
  if (!bandInfo) {
    res.status(400).json({ error: "You must provide data to create a band" });
    return;
  }

  if (!bandInfo.bandName || typeof(bandInfo.bandName) !== 'string') {
    res.status(400).json({ error: "You must provide a band name that is of type string" });
    return;
  }

  if (!bandInfo.bandMembers || !Array.isArray(bandInfo.bandMembers)) {
    res.status(400).json({ error: "You must provide an array of band members" });
    return;
  }

  if (!bandInfo.yearFormed || typeof(bandInfo.yearFormed) != 'number') {
    res.status(400).json({ error: "You must provide the year the band was formed (type: int)" });
    return;
  }
  
  if (!bandInfo.genres || !Array.isArray(bandInfo.genres)) {
    res.status(400).json({ error: "You must provide an array of genres" });
    return;
  }

  if (!bandInfo.recordLabel || typeof(bandInfo.recordLabel) !== 'string') {
    res.status(400).json({ error: "You must provide a record label that is of type string" });
    return;
  }
 
  console.log(bandInfo.yearFormed);
  try {
    const newband = await bandData.addBand(
      bandInfo.bandName,
      bandInfo.bandMembers,
      bandInfo.yearFormed,
      bandInfo.genres,
      bandInfo.recordLabel);
    res.status(200).json(newband);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

router.put("/:id", async (req, res) => {
  const bandInfo = req.body;

  if (!bandInfo) {
    res.status(400).json({ error: "You must provide data to update a band" });
    return;
  }

  if (!bandInfo.bandName || typeof(bandInfo.bandName) !== 'string') {
    res.status(400).json({ error: "You must provide a band name that is of type string" });
    return;
  }

  if (!bandInfo.bandMembers || !Array.isArray(bandInfo.bandMembers)) {
    res.status(400).json({ error: "You must provide an array of band members" });
    return;
  }

  if (!bandInfo.yearFormed || typeof(bandInfo.yearFormed) !== 'number') {
    res.status(400).json({ error: "You must provide the year the band was formed (type: int)" });
    return;
  }

  if (!bandInfo.genres || !Array.isArray(bandInfo.genres)) {
    res.status(400).json({ error: "You must provide an array of genres" });
    return;
  }

  if (!bandInfo.recordLabel || typeof(bandInfo.recordLabel) !== 'string') {
    res.status(400).json({ error: "You must provide a record label that is of type string" });
    return;
  }

  try {
    await bandData.getBand(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Band not found" });
    return;
  }

  
  try {
    const updatedBand = await bandData.updateBand(
      req.params.id, 
      bandInfo.bandName,
      bandInfo.bandMembers,
      bandInfo.yearFormed,
      bandInfo.genres,
      bandInfo.recordLabel);
    res.json(updatedBand);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

router.delete("/:id", async (req, res) => {
  const bandInfo = req.body;
  try {
    await bandData.getBand(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Band not found" });
    return;
  }
  console.log('band got');
  try {
    const band = await bandData.getBand(req.params.id);
    await bandData.removeBand(req.params.id);
    console.log('band removed')
    for(let i = 0; i < band.albums.length; i++){
      await albumData.removeAlbum(band.albums[i].id);   //does this successfully delete the albums?
    }
    console.log('albums delet')
    
    res.status(200).json({
      deleted: true,
      data: band
    });
    console.log('done')
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});



module.exports = router;