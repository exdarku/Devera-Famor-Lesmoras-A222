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

// Function to display tokenization results
function displayResults(tokens) {
    let wordCount = 0, sentenceCount = 0, symbolCount = 0;
    let resultText = "";
    
    tokens.forEach(tokenObj => {
        resultText += `Token: ${tokenObj.token}, Type: ${tokenObj.type}\n`;
        resultText += `Characters: ${tokenObj.chars.join(', ')}\n\n`;

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

// Function to classify tokens
function classifyToken(token) {
    if (/^[a-zA-Z]+$/.test(token)) {
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
