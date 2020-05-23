//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton
const geometry = require('./geometry');
const utilities = require('./utilities');
console.log("\n~~~~~~~~~~~~~~~volumeOfRectangularPrism~~~~~~~~~~~~~~~\n");
try {
    console.log(geometry.volumeOfRectangularPrism(3,4,5))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfRectangularPrism(4,12,8))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfRectangularPrism("a", 4, 5))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfRectangularPrism(null,4,5))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfRectangularPrism(-10,-11,12))
}catch (error){
    console.log(error)
}
console.log("\n~~~~~~~~~~~~~~~surfaceAreaOfRectangularPrism~~~~~~~~~~~~~~~\n");
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(3,4,5))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfRectangularPrism(4,12,8))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfRectangularPrism("d", 4,5))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfRectangularPrism(null,4,5))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfRectangularPrism(-10,-11,-12))
}catch (error){
    console.log(error)
}
console.log("\n~~~~~~~~~~~~~~~volumeOfSphere~~~~~~~~~~~~~~~\n");
try {
    console.log(geometry.volumeOfSphere(3))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfSphere(10))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfSphere("e"))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfSphere(null))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.volumeOfSphere(-8))
}catch (error){
    console.log(error)
}
console.log("\n~~~~~~~~~~~~~~~surfaceAreaOfSphere~~~~~~~~~~~~~~~\n");
try {
    console.log(geometry.surfaceAreaOfSphere(3))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfSphere(10))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfSphere("l"))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfSphere(null))
}catch (error){
    console.log(error)
}

try {
    console.log(geometry.surfaceAreaOfSphere(-8))
}catch (error){
    console.log(error)
}
console.log("\n~~~~~~~~~~~~~~~deepEquality~~~~~~~~~~~~~~~\n");
try {
    console.log(utilities.deepEquality({a: 4, b: 5}, {a: 4, b: 5}))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.deepEquality({a: 3, b: 5}, {a: 4, b: 5}))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.deepEquality(['nice', "ice"], ['nice',"ice"]))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.deepEquality(null, {a: 3, b: 5}))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.deepEquality({a: 100, b: 90}, {a: 100, b: 90}))
}catch (error){
    console.log(error)
}
console.log("\n~~~~~~~~~~~~~~~uniqueElements~~~~~~~~~~~~~~~\n");
try {
    console.log(utilities.uniqueElements(["a", "a", "b", "a", "b", "c"]))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.uniqueElements(["X", "a", "b", "d", "e", "c"]))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.uniqueElements(null))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.uniqueElements(3))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.uniqueElements(["a", "a", "a", "a", "a", "c"]))
}catch (error){
    console.log(error)
}
console.log("\n~~~~~~~~~~~~~~~countOfEachCharacterInString~~~~~~~~~~~~~~~\n");

try {
    console.log(utilities.countOfEachCharacterInString("Bonelli Sunday"))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.countOfEachCharacterInString("This week, you will be creating your first package and first module!"))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.countOfEachCharacterInString(null))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.countOfEachCharacterInString(6))
}catch (error){
    console.log(error)
}

try {
    console.log(utilities.countOfEachCharacterInString("I look forward to a great semester with all of you!"))
}catch (error){
    console.log(error)
}