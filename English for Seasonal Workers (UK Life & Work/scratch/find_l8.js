const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');
const lines = text.split('\n');
const start = lines.findIndex(l => l.includes('Мой СИЗ — моя защита'));
let end = lines.findIndex((l, i) => i > start && l.includes('Мой вагончик (caravan)'));
console.log('Start:', start, 'End:', end);
