const fs = require('fs');
let html = fs.readFileSync('a1.html', 'utf8');
html = html.replace(/q: 'To 'call in sick' means\.\.\.',/g, "q: 'To call in sick means...',");
fs.writeFileSync('a1.html', html);
console.log('Fixed quotes in L14 quiz');
