const fs = require('fs');

const sourceFile = 'a1.html';
const targetFile = 'scratch/lessons_data.js';
const ids = [5, 7, 11];

const source = fs.readFileSync(sourceFile, 'utf8');
let target = fs.readFileSync(targetFile, 'utf8');

function locateBlock(text, id, nextId) {
  const candidates = [`"id": ${id},`, `id: ${id},`];
  let idPos = -1;
  for (const candidate of candidates) {
    idPos = text.indexOf(candidate);
    if (idPos !== -1) break;
  }
  if (idPos === -1) return null;

  const blockStart = text.lastIndexOf('    {', idPos);
  if (blockStart === -1) return null;

  const nextCandidates = [`"id": ${nextId},`, `id: ${nextId},`];
  let nextIdPos = -1;
  for (const candidate of nextCandidates) {
    nextIdPos = text.indexOf(candidate, idPos);
    if (nextIdPos !== -1) break;
  }
  if (nextIdPos === -1) return null;

  const blockEnd = text.lastIndexOf('    {', nextIdPos);
  if (blockEnd === -1) return null;

  return { start: blockStart, end: blockEnd };
}

for (const id of ids) {
  const nextId = id + 1;
  const sourceBlock = locateBlock(source, id, nextId);
  const targetBlock = locateBlock(target, id, nextId);

  if (!sourceBlock) {
    throw new Error(`Could not find lesson ${id} in ${sourceFile}`);
  }
  if (!targetBlock) {
    throw new Error(`Could not find lesson ${id} in ${targetFile}`);
  }
  const blockText = source.slice(sourceBlock.start, sourceBlock.end);
  target = target.slice(0, targetBlock.start) + blockText + target.slice(targetBlock.end);
}

fs.writeFileSync(targetFile, target, 'utf8');
console.log(`Synced lessons ${ids.join(', ')} from ${sourceFile} to ${targetFile}`);
