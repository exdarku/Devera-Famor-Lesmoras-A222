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
    document.getElementById("totalCharacters").innerHTML = text.length; // should not include the delimeter (<)
    
    let tokens = tokenize(text);
    displayResults(tokens);
}



function displayResults(tokens) {
    let wordCount = 0, sentenceCount = 0, symbolCount = 0;
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
            default:
                break;
        }
    });
    resultText += "\n======================================\n\nPhase 2 Output (Granular Breakdown):\n";
    tokens.forEach(tokenObj => {
        // Only characters that has 2 or more characters will be breakdown in phase 2
        if(tokenObj.chars.length > 1){
            const formattedChars = tokenObj.chars.map(char => `'${char}'`).join(', ');
            resultText += `Token: "${tokenObj.token}" -> ${formattedChars}\n`;
        };
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

function classifyToken(token) {
    if (/^[a-zA-Z]+$/.test(token)) {
        return 'Word';
    } else if (/^\d+$/.test(token)) {
        return 'Number';
    } else if (/^[a-zA-Z0-9]+$/.test(token)) {
        return 'Alphanumeric';
    } else if (/^[.,!?;:]+$/.test(token)) {
        return 'Punctuation';
    } else if(/^\r?\n|\r$/.test(token)) {
        return 'End of line';
    } else if (/\s/.test(token)) {
        return 'Space';
    } else if (/^[^a-zA-Z0-9.,!?;:]+$/.test(token)) {
        return 'Special Character';
    }  else {
        return 'Unknown';
    }
}

function tokenize(input) {
    /* 
    Accepts words, numbers (Decimal and float), panctuations.
    Match any sequence of characters that are not letters, digits, common punctuation.
    Delimiter : '<'.
    */
    let tokens = input.match(/(\w+|[.,!?;:]+|[^a-zA-Z0-9.,!?;:<]+)/g) || [];

    let classifiedTokens = tokens.map(token => {
        let type = classifyToken(token);
        let chars = token.split('');
        return { token, type, chars };
    });
    
    return classifiedTokens;
}