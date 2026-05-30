const fs = require('fs');
let html = fs.readFileSync('a1.html', 'utf8');
html = html.replace(/q: 'What does 'marital status' mean\? \(семейное положение\)',/g, "q: 'What does \\'marital status\\' mean? (семейное положение)',");
html = html.replace(/q: 'What is a 'surname'\? \(фамилия\)',/g, "q: 'What is a \\'surname\\'? (фамилия)',");
html = html.replace(/q: 'What is 'single'\? \(холост\)',/g, "q: 'What is \\'single\\'? (холост)',");
fs.writeFileSync('a1.html', html);
console.log('Fixed quotes');
