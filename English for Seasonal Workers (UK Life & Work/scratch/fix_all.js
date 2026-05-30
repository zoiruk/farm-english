const fs = require('fs');

let html = fs.readFileSync('a1.html', 'utf8');

// Fix L2
html = html.replace(/'washroom attendant',/g, "'quality controller',");
html = html.replace(/'printer',/g, "'camp manager',");
html = html.replace(/'computer',/g, "'forklift driver',");
html = html.replace(/'high-vis vest',/g, "'supervisor',"); // in L2, wait, I shouldn't replace 'high-vis vest' everywhere, only in L2 words array.
// But wait, there is only one 'high-vis vest' string in L2 because it's only in the words list in L2 before it is introduced in L8.
// Actually 'high-vis vest' is used in phrases or other things? Better to be safe.

// A safer way: we know it's in a1.html, let's just do an exact block replace for the `words` array of L2 and L3.
