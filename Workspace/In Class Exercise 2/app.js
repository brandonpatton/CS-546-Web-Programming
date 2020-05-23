//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const bands = require('./bands');

async function main(){
    const audioslave = await bands.addBand("Audioslave", ["Chris Cornell", "Tom Morello"], 2000, ["Grunge", "Heavy Metal", "Rock"], "Interscope Records");
    console.log(audioslave);
    const soundgarden = await bands.addBand("Soundgarden", ["Chris Cornell", "Kim Thayil"], 1990, ["Grunge", "Heavy Metal"], "Interscope Records");
    console.log(soundgarden);
    console.log(bands.getAllBands());
    bands.removeBand(audioslave._id);
    console.log(bands.getAllBands());
    bands.updateBand(soundgarden._id, "Soundgarden", ["Chris Cornell"], 1990, ["Grunge"], "Interscope Records");
    console.log(soundgarden);
}

main().catch(err => {
    console.log(err);
});


