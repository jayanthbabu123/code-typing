const hljs = require('highlight.js/lib/highlight');

const MAX_LINE_LENGTH = 80;

hljs.getNewLines = function (str) {
    const lines = str.split('\n');
    const newLines = [];
    let currentLine = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (currentLine.length + line.length + 1 <= MAX_LINE_LENGTH) {
            // Add the line to the current line if it won't exceed the max length
            currentLine += (currentLine.length === 0 ? '' : ' ') + line;
        } else {
            // Add the current line to the new lines array and start a new line
            newLines.push(currentLine);
            currentLine = line;
        }

        // If this is the last line, add it to the new lines array
        if (i === lines.length - 1) {
            newLines.push(currentLine);
        }
    }

    return newLines;
};

export default hljs;
