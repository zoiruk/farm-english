const fs = require('fs');
const html = fs.readFileSync('../a1.html', 'utf8');

const startStr = 'const LESSONS = [';
const start = html.indexOf(startStr);
if (start === -1) {
    console.error("Not found");
    process.exit(1);
}

let bracketCount = 0;
let inString = false;
let escape = false;
let end = -1;

for (let i = start + startStr.length - 1; i < html.length; i++) {
  const c = html[i];
  
  if (escape) {
    escape = false;
    continue;
  }
  if (c === '\\') {
    escape = true;
    continue;
  }
  
  if (c === "'" || c === '"' || c === '`') {
    // Check if the quote is escaped
    let isEscaped = false;
    let j = i - 1;
    while (j >= 0 && html[j] === '\\') {
      isEscaped = !isEscaped;
      j--;
    }
    
    if (!isEscaped) {
        if (!inString) {
          inString = c;
        } else if (inString === c) {
          inString = false;
        }
    }
    continue;
  }
  
  if (!inString) {
    if (c === '[') bracketCount++;
    if (c === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        end = i + 1;
        break;
      }
    }
  }
}

if (end === -1) {
    console.error("End not found");
    process.exit(1);
}

const lessonsCode = html.substring(start + startStr.length - 1, end);
fs.writeFileSync('lessons_data.js', 'module.exports = ' + lessonsCode + ';');
console.log("Successfully extracted to lessons_data.js");
