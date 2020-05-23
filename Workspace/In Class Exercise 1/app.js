//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const dictionary = require('./dictionary');


console.log("\n~~~~~~~~~~~~~~~Finding Definitions~~~~~~~~~~~~~~~\n");
try {
    console.log(dictionary.lookupDefinition("programming"))
}catch (error){
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition("charisma"))
}catch (error){
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition(47))
}catch (error){
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition("foray"))
}catch (error){
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition("dictionary"))
}catch (error){
    console.log(error)
}

console.log("\n~~~~~~~~~~~~~~~Finding Words~~~~~~~~~~~~~~~\n");
try{
    console.log(dictionary.getWord(300.7))
}catch (error){
    console.log(error)
}

try{
    console.log(dictionary.getWord("To act as a detective : search for information"))
}catch (error){
    console.log(error)
}

try{
    console.log(dictionary.getWord("an experience involving the apparent perception of something not present."))
}catch (error){
    console.log(error)
}

try{
    console.log(dictionary.getWord("to make an official decision about who is right in (a dispute) : to settle judicially"))
}catch (error){
    console.log(error)
}

try{
    console.log(dictionary.getWord("the fact of awareness by the mind of itself and the world."))
}catch (error){
    console.log(error)
}