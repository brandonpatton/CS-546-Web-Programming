//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const deepEquality = function deepEquality(obj1, obj2){
    if (obj1 == null || obj2 == null){
        throw 'Error: Object not provided';
    }
    if (typeof(obj1) != 'object' || typeof(obj2) != 'object'){
        throw 'Error: Each argument must be an object';
    }
    return compareArrays(Object.entries(obj1), Object.entries(obj2));
}

function compareArrays(arr1, arr2) {
    if (arr1.length == arr2.length){
        for (let i = 0; i < arr1.length; i++){
            if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])){
                const sameArrays = compareArrays(arr1[i], arr2[i]);
                if (sameArrays == false){
                    return false;
                }
            } else if (arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }
    return false;
}

const uniqueElements = function uniqueElements(arr){
    if (arr == null){
        throw 'Error: must provide an array';
    }
    if (!Array.isArray(arr)){
        throw 'Error: arg must be an array';
    }
    let count = 0;
    let unique = [];
    for (let i = 0; i < arr.length; i++){
        if(!unique.includes(arr[i])){
            unique.push(arr[i]);
            count += 1;
        }             
    }
    return count;
}

const countOfEachCharacterInString = function countOfEachCharacterInString(str){
    if (str == null){
        throw 'Error: must provide a string';
    }
    if (typeof(str) !== 'string'){
        throw 'Error: arg must be a string';
    }
    var dict =  new Object();

    for (let i = 0; i < str.length; i++){
        if (!Object.keys(dict).includes(str[i])){
            dict[str.charAt(i)] = 1;
        } else {
            dict[str.charAt(i)] += 1;
        }
    }
    return dict;
}

module.exports = {deepEquality, uniqueElements, countOfEachCharacterInString};