const express = require('express');
const router = express.Router();



const palindrome = function palindrome(str) {
    var remove = /[\W_]/g;
    const input = str.toLowerCase().replace(remove,"");
    if (input === ""){
        return false;
    }
    const reverse = input.split('').reverse().join('');
    return input === reverse;
}


router.post('/', async (req, res) => {
    let input = req.body.palindrome;
    
    let errors = [];

    if (!input) {
        errors.push('No palindrome provided');
      }
    
    if (typeof(input) !== 'string'){
        errors.push('Palindrome must be of type string');
    }

    if (errors.length > 0) {
        res.status(400).render('errors', {title: 'Error Detected:',
            errors: errors
        });
        return;
    }  
    if(palindrome(input) == true){
        //send result to /result
        res.render('result',{title: 'The Palindrome Results!', success: true, data: input});
    } else {
        res.render('result', {title: 'The Palindrome Results!', failure: true, data: input});
    }
});

module.exports = router;