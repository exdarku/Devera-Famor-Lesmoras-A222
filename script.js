/*
Programming Languages Summative

Developed by: 
- Laurence Lesmoras
- Laurence Kharl Devera
- Joshua Famor

*/


// When the "Tokenize my text, please uwu!" is clicked, this will be executed.
document.getElementById("submit").onclick = function() {
    let text = document.getElementById("userInput").value;
    alert(text);
}

// This is how a function works in JavaScript.
function helloWorld() {
    alert("Hello World!");
}

// This is a function that takes in a parameter.
function helloWorldPeroMayParameters(name) {
    alert("Hello " + name + "!");
}

// This is a function that returns a value.
function add(a, b) {
    return a + b;
}

// Famor part
// Yo this is para ma clasify ang mga token
function classifyToken(token) {
    if (/^[a-zA-Z]+$/.test(token)) {
        return 'Word';
    } else if (/^\d+$/.test(token)) {
        return 'Number';
    } else if (/^[a-zA-Z0-9]+$/.test(token)) {
        return 'Alphanumeric';
    } else if (/^[.,!?;:]+$/.test(token)) {
        return 'Punctuation';
    } else {
        return 'Unknown';
    }
}

// kani kay input
function tokenize(input) {
    // Step 1: Split the input string by the delimiter '<'
    let tokens = input.split('<');
    
    // Step 2: Classify each token and store it in an array
    let classifiedTokens = tokens.map(token => {
        let type = classifyToken(token);
        return { token, type };
    });
    
    // Step 3: Further break down each token into individual characters
    let granularTokens = classifiedTokens.map(entry => {
        let chars = entry.token.split('');
        return { ...entry, chars };
    });
    
    return granularTokens;
}


    // will update it a while please wait


