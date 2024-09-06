/*
Programming Languages Summative

Developed by: 
- Laurence Lesmoras
- Laurence Kharl Devera
- Joshua Famor
*/
let currentMessage = "";

// When the "Tokenize my text, please uwu!" button is clicked, this will be executed.
document.getElementById("submit").onclick = function() {
    let text = document.getElementById("userInput").value;
    document.getElementById("totalCharacters").innerHTML = text.length;
    addElementToTextBox(text);
}

// Function to append elements into the textbox
function addElementToTextBox(message) {
    const resultTextbox = document.getElementById("resultTextbox");
    resultTextbox.value += message + "\n";
    adjustHeight(resultTextbox);
}


function adjustHeight(textarea) {
    textarea.style.height = "auto"; 
    textarea.style.height = (textarea.scrollHeight) + "px"; 
}


document.addEventListener("DOMContentLoaded", function() {
    adjustHeight(document.getElementById("resultTextbox"));
});


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
