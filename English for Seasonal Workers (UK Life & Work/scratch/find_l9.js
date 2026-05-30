const fs = require('fs');
const lines = fs.readFileSync('a1.html', 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('Мой вагончик (caravan)'));
let end = lines.findIndex((l, i) => i > start && l.includes('В магазине Tesco'));
console.log('L9 Start:', start, 'End:', end);
