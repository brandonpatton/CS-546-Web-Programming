const express = require("express");
const router = express.Router();
const data = require("../data");
const bandData = data.bands;

router.get("/:id", async (req, res) => {
  try {
    const band = await bandData.getBand(req.params.id);
    res.json(band);
  } catch (e) {
    res.status(404).json({ message: "Band not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bandList = await bandData.getAllBands();
    res.json(bandList);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;