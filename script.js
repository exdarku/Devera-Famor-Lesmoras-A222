/*
Programming Languages Summative

Developed by: 
- Laurence Lesmoras
- Laurence Kharl Devera
- Joshua Famor
*/

// When the "Tokenize my text, please uwu!" button is clicked, this will be executed.
document.getElementById("submit").onclick = function() {
    let text = document.getElementById("userInput").value;
    document.getElementById("totalCharacters").innerHTML = text.length;
    
    let tokens = tokenize(text);
    displayResults(tokens);
}
// This is for the displays result
function displayResults(tokens) { 
    let wordCount = 0, sentenceCount = 0, symbolCount = 0;
    let resultText = "";
    
    tokens.forEach(tokenObj => {
        resultText += `Token: ${tokenObj.token}, Type: ${tokenObj.type}\n`;
        resultText += `Characters: ${tokenObj.chars.join(', ')}\n\n`;
 
        // added incrementation for token count
        switch (tokenObj.type) {
            case 'Word':
                wordCount++;
                break;
            case 'Punctuation':
                if (tokenObj.token === "." || tokenObj.token === "!" || tokenObj.token === "?") {
                    sentenceCount++;
                }
                break;
            case 'Special Character':
                symbolCount++;
                break;
            default:
                break;
        }
    });

    document.getElementById("resultTextbox").value = resultText;
    document.getElementById("totalWords").innerText = wordCount;
    document.getElementById("totalSentences").innerText = sentenceCount;
    document.getElementById("totalSymbols").innerText = symbolCount;

    adjustHeight(document.getElementById("resultTextbox"));
}

function adjustHeight(textarea) {
    textarea.style.height = "auto"; 
    textarea.style.height = (textarea.scrollHeight) + "px"; 
}
// This function is to classify the token and tokenize the input 
function classifyToken(token) {
    if (/^[a-zA-Z]+$/.test(token)) { // These below are the category of the tokens
        return 'Word';
    } else if (/^\d+$/.test(token)) {
        return 'Number';
    } else if (/^[a-zA-Z0-9]+$/.test(token)) {
        return 'Alphanumeric';
    } else if (/^[.,!?;:]+$/.test(token)) {
        return 'Punctuation';
    } else if (/^[^a-zA-Z0-9.,!?;:]+$/.test(token)) {
        return 'Special Character';
    } else {
        return 'Unknown';
    }
}
function tokenize(input) {
    // First split by the '<' symbol
    let segments = input.split('<');

    let tokens = [];
    segments.forEach(segment => {
        // Further tokenize each segment
        let segmentTokens = segment.match(/(\w+|[.,!?;:]+|[^a-zA-Z0-9.,!?;:\s]+)/g) || [];
        segmentTokens.forEach(token => tokens.push(token));
        
        // Re add the < as a token if it was present in the input
        tokens.push('<');
    });
    
    // Remove the last '<' added because it would be extra from the loop
    tokens.pop();

    // Classify tokens
    let classifiedTokens = tokens.map(token => {
        let type = classifyToken(token);
        let chars = token.split('');
        return { token, type, chars };
    });

    return classifiedTokens;
}
