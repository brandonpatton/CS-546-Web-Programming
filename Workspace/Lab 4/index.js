//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton
const animals = require("./data/animals");
const mongoConnection = require('./data/mongoConnection');

async function main(){
    const sasha = await animals.create("Sasha", "Dog");
    console.log(sasha);
    const lucy = await animals.create("Lucy", "Dog");
    const allAnimals = await animals.getAll();
    console.log(allAnimals);
    const Duke = await animals.create("Duke", "Walrus");
    console.log(Duke);
    const sashita = await animals.rename(sasha['_id'], "Sashita");
    console.log(sashita);
    const lucyGone = await animals.remove(lucy['_id']);
    const everyAnimal = await animals.getAll();
    console.log(everyAnimal);
    const db = await mongoConnection();
    await db.serverConfig.close();
}



main().catch(err => {
    console.log(err);
});