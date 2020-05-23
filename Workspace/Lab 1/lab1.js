//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton
const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let total = 0;
    arr.forEach(element => {
        element = element*element;
        total = total + element;
    });
    return total;
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    let fib1 = 1, fib2 = 1;
    for (let i = 3; i <= num; i++){
        let fib3 = fib1 + fib2;
        fib1 = fib2;
        fib2 = fib3;
    }
    return fib2;
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let total = 0;
    for (let i in text){
        if (text.charAt(i) === 'a' || text.charAt(i) === 'e' || text.charAt(i) === 'i' || text.charAt(i) === 'o' || text.charAt(i) === 'u'){
            total += 1;
        }
    }
    return total;
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if (num < 0){
        return NaN;
    }
    if (num == 0){
        return 1;
    }
    if (num == 1){
        return num;
    } else {
        return num * questionFour(num - 1);
    }
}

module.exports = {
    firstName: "Brandon", 
    lastName: "Patton", 
    studentId: "10422652",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};