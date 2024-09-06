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

// Function to adjust the height of the textarea
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

// Function to tokenize the input
function tokenize(input) {
    // Step 1: Split the input into sentences using regex
    let sentenceRegex = /[^.!?]+[.!?]+/g;
    let sentences = input.match(sentenceRegex) || [];

    let tokens = [];

    // Step 2: Tokenize each sentence
    sentences.forEach(sentence => {
        let words = sentence.trim().split(/\s+/);
        words.forEach(word => {
            tokens.push({
                token: word,
                type: classifyToken(word)
            });
        });
        // Add the sentence-ending punctuation as a separate token
        let punctuation = sentence.match(/[.!?]$/);
        if (punctuation) {
            tokens.push({
                token: punctuation[0],
                type: 'Punctuation'
            });
        }
    });

    // Step 3: Further break down each token into individual characters
    let granularTokens = tokens.map(entry => {
        let chars = entry.token.split('');
        return { ...entry, chars };
    });

    return granularTokens;
}
