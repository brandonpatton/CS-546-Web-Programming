//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton

const createMetrics = function createMetrics(text){
    if (text === undefined) throw 'Must provide text to process';
    if (typeof(text) !== 'string') throw 'Parameter must be of type string';
    let metrics = {'totalLetters': 0, 'totalNonLetters': 0, 'totalWords': 0, 
                    'totalVowels': 0, 'totalConsonants': 0, 'uniqueWords': 0, 
                    'longWords': 0, 'averageWordLength': 0, 'wordOcurrences': {}};
    let wordOcurrences = new Object();
    let processedLetter = false; 
    let currentWord = "";
    let textLower = text.toLowerCase();

    for (let i = 0; i < textLower.length; i++){
        asciiCurrent = textLower.charCodeAt(i);
        if(asciiCurrent >= 97 && asciiCurrent <= 122){ 
            //character confirmed to be a letter, only thing left to decide is vowel or consonant
            metrics['totalLetters'] += 1;  
            processedLetter = true;
            if(isVowel(textLower[i])){
                metrics['totalVowels'] += 1;
            } else {
                metrics['totalConsonants'] += 1;
            }
            currentWord += textLower.charAt(i);  //current word is made at each iteration
            if (textLower.endsWith(textLower.charAt(i))){
                if (!Object.keys(wordOcurrences).includes(currentWord)){
                    //check for uniqueness
                    wordOcurrences[currentWord] = 1;
                    metrics['uniqueWords'] += 1;
                } else {
                    wordOcurrences[currentWord] += 1;
                }
            }
        } else {
            //confirmed nonletter character
            //currentWord is now complete and can be evaluated for length and reset.
            if(processedLetter){
                processedLetter = false;
                if (currentWord.length >= 6){
                    metrics['longWords'] += 1;
                }
                metrics['averageWordLength'] += currentWord.length;  //averageWordLength kept as a running total of each word's length
                metrics['totalWords'] += 1;
                if (!Object.keys(wordOcurrences).includes(currentWord)){
                    //check for uniqueness
                    wordOcurrences[currentWord] = 1;
                    metrics['uniqueWords'] += 1;
                } else {
                    wordOcurrences[currentWord] += 1;
                }
                currentWord = "";
            }
                metrics['totalNonLetters'] += 1;  
                         
        }
    }
    metrics['averageWordLength'] = metrics['averageWordLength']/metrics['totalWords']; 
    metrics['wordOcurrences'] = wordOcurrences;
    return metrics;
}

const isVowel = function isVowel(letter){
    let vowels = new Array('a', 'e', 'i', 'o', 'u');
    for (let i = 0; i < vowels.length; i++){
        if (vowels[i] === letter){
            return true;
        }
    }
    return false;
}

module.exports = {createMetrics};
