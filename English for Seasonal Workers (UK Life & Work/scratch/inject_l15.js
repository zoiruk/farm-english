const fs = require('fs');

const l15Text = fs.readFileSync('scratch/build_l15.js', 'utf8');
const searchStr = 'const l15 = `';
const startL15 = l15Text.indexOf(searchStr) + searchStr.length;
const endL15 = l15Text.lastIndexOf('`;');
const l15 = l15Text.substring(startL15, endL15);
const l15Lines = l15.split('\n');

let html = fs.readFileSync('a1.html', 'utf8');
let lines = html.split('\n');

let start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('    {') && lines[i+1] && lines[i+1].includes('id: 15,')) {
    start = i;
    break;
  }
}

let end = -1;
if (start !== -1) {
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].includes('  ];')) {
      end = i;
      break;
    }
  }
}

if (start !== -1 && end !== -1) {
  lines.splice(start, end - start, ...l15Lines);
  fs.writeFileSync('a1.html', lines.join('\n'));
  console.log('Successfully injected Lesson 15 using exact line splicing.');
} else {
  console.error('Could not find L15 bounds.');
}
