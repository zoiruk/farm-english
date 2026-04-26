const fs = require('fs');

const l15Text = fs.readFileSync('scratch/build_l15.js', 'utf8');
const searchStr = 'const l15 = `';
const startL15 = l15Text.indexOf(searchStr) + searchStr.length;
const endL15 = l15Text.lastIndexOf('`;');
const newL15 = l15Text.substring(startL15, endL15);

const oldL15 = fs.readFileSync('scratch/old_l15_clean.txt', 'utf8');
let html = fs.readFileSync('a1.html', 'utf8');

if (html.includes(oldL15)) {
  html = html.replace(oldL15, newL15);
  fs.writeFileSync('a1.html', html);
  console.log('Replaced L15 perfectly using string replace!');
} else {
  // Try without the indentation if it fails
  const oldL15Trimmed = oldL15.trim();
  const index = html.indexOf(oldL15Trimmed);
  if (index !== -1) {
      console.log('Found trimmed L15, replacing...');
      html = html.substring(0, index) + newL15.trim() + html.substring(index + oldL15Trimmed.length);
      fs.writeFileSync('a1.html', html);
      console.log('Replaced L15 (trimmed) perfectly!');
  } else {
      console.error('ERROR: oldL15 not found in a1.html');
      // Let's see what's there
      const l15Start = html.indexOf('id: 15,');
      if (l15Start !== -1) {
          console.log('Context around id: 15:', html.substring(l15Start - 20, l15Start + 100));
      }
  }
}
