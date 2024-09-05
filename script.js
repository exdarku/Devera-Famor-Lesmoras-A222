/*
Programming Languages Summative

Developed by: 
- Laurence Lesmoras
- Laurence Kharl Devera
- Joshua Famor
- Jasper Navarez

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
