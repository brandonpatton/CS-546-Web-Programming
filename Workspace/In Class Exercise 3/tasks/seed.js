//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const dbConnection = require('../config/mongoConnection');
const bands = require('../data/bands');

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();
	const audioslave = await bands.addBand("Audioslave", ["Chris Cornell", "Tom Morello"], 2000, ["Grunge", "Heavy Metal", "Rock"], "Interscope Records");
    const soundgarden = await bands.addBand("Soundgarden", ["Chris Cornell", "Kim Thayil"], 1990, ["Grunge", "Heavy Metal"], "Interscope Records");
    const phish = await bands.addBand("Phish", ["Trey Anastasio, Jon Fishman, Mike Gordon, Page McConnell, Jeff Holdsworth"], 1983, ["Rock", "Psychedelic Rock", "Jam Band"], "Elektra");
    const pearljam = await bands.addBand("Pearl Jam", ["Eddie Vedder", "Mike McCready", "Stone Gossard", "Jeff Ament", "Matt Cameron"], 1990, ["Alternative Rock", "Grunge", "Hard Rock"], "Monkeywrench");
    const sublime = await bands.addBand("Sublime", ["Bradley Nowell, Eric Wilson, Bud Gaugh"], 1988, ["Ska Punk", "Reggae Rock"], "MCA");
    await db.serverConfig.close();
};

main().catch(console.log);
