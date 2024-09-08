/*
Programming Languages Summative

Developed by: 
- Laurence Lesmoras
- Laurence Kharl Devera
- Joshua Famor
*/

// A function for a responsive textarea when typing multiple lines.
var textarea = document.getElementById("userInput");
textarea.oninput = function() {
    textarea.style.height = ""; /* Reset the height*/
    textarea.style.height = textarea.scrollHeight + "px";
};

// When the "Tokenize my text, please uwu!" button is clicked, this will be executed.
document.getElementById("submit").onclick = function() {
    let text = document.getElementById("userInput").value;
    let tokens = tokenize(text);
    displayResults(tokens);
}



function displayResults(tokens) {
    let charactersCount = 0, wordCount = 0, sentenceCount = 0, symbolCount = 0, spaceCount = 0, numbersCount = 0, alphanumbericCount = 0, endOfLineCount = 0, phase2Result = "";
    let resultText = "Phase 1 Output:\n";

    tokens.forEach(tokenObj => {
        resultText += `Token: "${tokenObj.token}" - Type: ${tokenObj.type}\n`;
 
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
            case 'Number':
                numbersCount++;
                break;
            case 'Space':
                spaceCount++;
                break;
            case 'Alphanumeric':
                alphanumbericCount++;
                break;
            case 'End of line':
                endOfLineCount++;
                break;
            default:
                break;
        }

        for (let i = 0; i < tokenObj.token.length; i++) {
            charactersCount++;
        }

        // Only characters that has 2 or more characters will be breakdown in phase 2
        if(tokenObj.chars.length > 1){
            const formattedChars = tokenObj.chars.map(char => `'${char}'`).join(', ');
            phase2Result += `Token: "${tokenObj.token}" -> ${formattedChars}\n`;
        };

    });
    resultText += "\n======================================\n\nPhase 2 Output (Granular Breakdown):\n";
    resultText += phase2Result;

    document.getElementById("resultTextbox").value = resultText;
    document.getElementById("totalCharacters").innerText = charactersCount;
    document.getElementById("totalWords").innerText = wordCount;
    document.getElementById("totalAlphanumberic").innerText = alphanumbericCount;
    document.getElementById("totalNumbers").innerText = numbersCount;
    document.getElementById("totalSpace").innerText = spaceCount;
    document.getElementById("totalSentences").innerText = sentenceCount;
    document.getElementById("totalSymbols").innerText = symbolCount;
    document.getElementById("totalEndOfLine").innerText = endOfLineCount;

    adjustHeight(document.getElementById("resultTextbox"));
}

function adjustHeight(textarea) {
    textarea.style.height = "auto"; 
    textarea.style.height = (textarea.scrollHeight) + "px"; 
}

function classifyToken(token) {
    if(/^[a-zA-Z]{1}$/.test(token)){
        return 'Letter';
    } else if (/^[a-zA-Z]+$/.test(token)) {
        return 'Word';
    } else if (/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(token)) {
        return 'Number';
    } else if (/^[a-zA-Z0-9]+$/.test(token)) {
        return 'Alphanumeric';
    } else if (/^[.,!?;:]+$/.test(token)) {
        return 'Punctuation';
    } else if(/(\s*)(\r?\n|\r)/.test(token)) {
        return 'End of line';
    } else if (/\s+/.test(token)) {
        return 'Space';
    } else if (/^[^a-zA-Z0-9.,!?;:]+$/.test(token)) {
        return 'Special Character';
    } else {
        return 'Unknown';
    }
}

function tokenize(input) {
    // Delimiter : '<'
    let tokens = input.match(/([+-]?\d*\.\d+([eE][+-]?\d+)?|[+-]?\d+([eE][+-]?\d+)?|\w+|[\s]|[.,!?;:(){}[\]<>@#$%^&*]+|\s+|\r?\n|\r)/g) || [];
    let classifiedTokens;
    
    if (tokens.length > 0) {
        classifiedTokens = tokens.map(token => {
            let type = classifyToken(token);
            let chars = token.split('');
            return { token, type, chars };
        });
    } else {
        document.getElementById("resultTextbox").value = "No results";
        adjustHeight(document.getElementById("resultTextbox"));
    }
    
    return classifiedTokens;
}