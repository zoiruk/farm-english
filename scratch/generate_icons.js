/**
 * generate_icons.js — creates assets/icons/icon-192.png and icon-512.png
 * Pure Node.js (zlib only, no npm). Solid #1a73e8 background with white "F".
 * Run from project root: node scratch/generate_icons.js
 */
const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// ── CRC32 ────────────────────────────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// ── PNG chunk ─────────────────────────────────────────────────────────────────
function pngChunk(type, data) {
  const typeB = Buffer.from(type, 'ascii');
  const lenB  = Buffer.allocUnsafe(4); lenB.writeUInt32BE(data.length, 0);
  const crcB  = Buffer.allocUnsafe(4); crcB.writeUInt32BE(crc32(Buffer.concat([typeB, data])), 0);
  return Buffer.concat([lenB, typeB, data, crcB]);
}

// ── Build RGBA pixel grid ─────────────────────────────────────────────────────
function buildPixels(size) {
  // Background: #1a73e8  White pixels for a bold "F" glyph centred in the icon.
  const BG = [0x1a, 0x73, 0xe8, 0xFF];
  const FG = [0xFF, 0xFF, 0xFF, 0xFF];

  const grid = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) row.push([...BG]);
    grid.push(row);
  }

  // Draw "F" as filled rectangles scaled to icon size
  const u = Math.round(size / 16); // unit ≈ 1 cell in a 16-unit grid
  const ox = Math.round(size * 0.28); // left margin
  const oy = Math.round(size * 0.22); // top margin
  const w  = Math.round(size * 0.44); // glyph width
  const h  = Math.round(size * 0.56); // glyph height
  const t  = Math.max(2, Math.round(size * 0.09)); // stroke thickness

  function fill(x0, y0, x1, y1) {
    for (let y = y0; y < y1; y++)
      for (let x = x0; x < x1; x++)
        if (y >= 0 && y < size && x >= 0 && x < size) grid[y][x] = [...FG];
  }

  // Vertical stem
  fill(ox, oy, ox + t, oy + h);
  // Top bar
  fill(ox, oy, ox + w, oy + t);
  // Middle bar (at ~45% height)
  const mid = Math.round(oy + h * 0.42);
  fill(ox, mid, ox + Math.round(w * 0.75), mid + t);

  return grid;
}

// ── Encode RGBA grid → PNG buffer ─────────────────────────────────────────────
function encodePNG(size) {
  const grid = buildPixels(size);
  // Filter byte (0=None) + RGBA per pixel
  const rows = [];
  for (const row of grid) {
    const rb = Buffer.allocUnsafe(1 + size * 4);
    rb[0] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = row[x];
      rb[1 + x * 4]     = r;
      rb[1 + x * 4 + 1] = g;
      rb[1 + x * 4 + 2] = b;
      rb[1 + x * 4 + 3] = a;
    }
    rows.push(rb);
  }
  const raw = Buffer.concat(rows);
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // colour type: RGBA
  ihdr[10] = ihdr[11] = ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Write files ───────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, '../assets/icons');
fs.mkdirSync(outDir, { recursive: true });

for (const size of [192, 512]) {
  const file = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(file, encodePNG(size));
  console.log(`✅ ${file}  (${fs.statSync(file).size} bytes)`);
}
