//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const mongoCollections = require('./mongoCollections');
const animals = mongoCollections.animals;

async function create(name, animalType){
    if (!name) throw 'You must provide a name for your animal';

    if (!animalType) throw 'You must provide a type of animal';

    if(typeof(name) !== 'string') throw 'Name must be a string'
    if(typeof(animalType) !== 'string') throw 'Animal type must be a string'
    
    const animalCollection = await animals();

    let newAnimal = {
      name: name,
      animalType: animalType
    };

    const insertInfo = await animalCollection.insertOne(newAnimal);
    if (insertInfo.insertedCount === 0) throw 'Could not add animal';

    const newId = insertInfo.insertedId;

    const animal = await this.get(newId);
    return animal;
}

async function getAll(){
    const animalCollection = await animals();

    const allAnimals = await animalCollection.find({}).toArray();

    return allAnimals;
}

async function get(id){
    if (!id) throw 'You must provide an id to search for';

    const animalCollection = await animals();
    const animal = await animalCollection.findOne({_id: id});
    if (animal === null) throw 'No animal with that id';

    return animal;
}

async function remove(id){
    if (!id) throw 'You must provide an id to search for';

    const animalCollection = await animals();
    const deletionInfo = await animalCollection.removeOne({_id: id});

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete animal with id of ${id}`;
    }
    return deletionInfo;
}

async function rename(id, newName){
    if (!id) throw 'You must provide an id to search for';

    if (!newName) throw 'You must provide a name for your animal';

    if(typeof(newName) !== 'string') throw 'New name must be a string'
    

    const animalCollection = await animals();
    const updatedAnimal = {
      name: newName,
    };

    const updatedInfo = await animalCollection.updateOne({_id: id}, {$set: updatedAnimal});
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update animal successfully';
    }

    return await this.get(id);
}

module.exports = {create, getAll, get, remove, rename};