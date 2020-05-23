let form = document.getElementById('static-form');    
let errorContainer = document.getElementById('error');

function palindromeCheck(str){
    if(typeof(str) !== "string")
        throw "Input must be of type string";
    var remove = /[\W_]/g;
    const input = str.toLowerCase().replace(remove,"");
    if (input === ""){
        return false;
    }
    const reverse = input.split('').reverse().join('');
    return input === reverse;
}


if (form){
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let palindrome = document.getElementById('palindrome');
        let attempts = document.getElementById('attempts');
        if (palindrome.value){
            errorContainer.hidden = true;
            let ol = document.createElement('li');
            var textNode = document.createTextNode(palindrome.value);
            if (palindromeCheck(palindrome.value)){
                ol.setAttribute("class", "is-palindrome");
                ol.appendChild(textNode);
                attempts.appendChild(ol);
                form.reset();
                palindrome.focus();
            } else {
                ol.setAttribute("class", "not-palindrome");
                ol.appendChild(textNode);
                attempts.appendChild(ol);
                form.reset();
                palindrome.focus();
            }
            
        } else {
            errorContainer.hidden = false;
            var textNode = document.createTextNode("Input Not Detected")
            errorContainer.appendChild(textNode);
            palindrome.focus();
        }
    
    });
}
