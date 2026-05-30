const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');
const lines = text.split('\n');
lines.forEach((l, i) => {
  if (l.includes("en: 'supervisor'")) console.log('supervisor:', i+1);
  if (l.includes("en: 'boots'")) console.log('boots:', i+1);
  if (l.includes("en: 'gloves'")) console.log('gloves:', i+1);
  if (l.includes("Where are our boots and gloves?")) console.log('dialogue1:', i+1);
  if (l.includes("Our gloves are not new.")) console.log('grammar1:', i+1);
  if (l.includes("gloves are in the locker.")) console.log('quiz1:', i+1);
  if (l.includes("en: 'notebook'")) console.log('notebook:', i+1);
  if (l.includes("en: 'pen'")) console.log('pen:', i+1);
  if (l.includes("en: 'paper'")) console.log('paper:', i+1);
  if (l.includes("en: 'ruler'")) console.log('ruler:', i+1);
  if (l.includes("en: 'apple'")) console.log('apple:', i+1);
  if (l.includes("en: 'dress'")) console.log('dress:', i+1);
  if (l.includes("en: 'jeans'")) console.log('jeans:', i+1);
});
