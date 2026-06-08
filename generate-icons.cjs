// Generates public/icon-192.png and public/icon-512.png
// Run with: node generate-icons.js
const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

function makePNG(size, outPath) {
  // CRC32 table
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    crcTable[n] = c;
  }
  function crc32(buf) {
    let c = 0xFFFFFFFF;
    for (const b of buf) c = crcTable[(c ^ b) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function chunk(type, data) {
    const t = Buffer.from(type, 'ascii');
    const d = Buffer.isBuffer(data) ? data : Buffer.from(data);
    const len = Buffer.alloc(4); len.writeUInt32BE(d.length);
    const crcInput = Buffer.concat([t, d]);
    const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(crcInput));
    return Buffer.concat([len, t, d, crcBuf]);
  }

  const w = size, h = size;

  // IHDR: RGBA (color type 6)
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA

  // Pixel function: gradient + cross
  function getPixel(x, y) {
    const t = (x / w + y / h) / 2; // diagonal 0→1
    // Purple #7c3aed → Pink #ec4899
    let r = Math.round(124 + (236 - 124) * t);
    let g = Math.round(58  + (72  - 58)  * t);
    let b = Math.round(237 + (153 - 237) * t);
    let a = 255;

    // Cross (white, 10% arm width, center 60% tall / 50% wide)
    const cx = w / 2, cy = h / 2;
    const armW  = w * 0.07;  // arm thickness
    const armH  = h * 0.55;  // vertical arm height
    const armHH = w * 0.38;  // horizontal arm half-width

    const inVert  = Math.abs(x - cx) < armW / 2 && Math.abs(y - cy) < armH / 2;
    const inHoriz = Math.abs(x - cx) < armHH     && Math.abs(y - (cy - h * 0.06)) < armW / 2;

    if (inVert || inHoriz) {
      // White with slight opacity blend
      r = Math.round(r + (255 - r) * 0.88);
      g = Math.round(g + (255 - g) * 0.88);
      b = Math.round(b + (255 - b) * 0.88);
    }

    return [
      Math.min(255, Math.max(0, r)),
      Math.min(255, Math.max(0, g)),
      Math.min(255, Math.max(0, b)),
      a,
    ];
  }

  // Raw pixel data (filter byte + RGBA per row)
  const raw = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * 4)] = 0; // filter: None
    for (let x = 0; x < w; x++) {
      const [r, g, b, al] = getPixel(x, y);
      const off = y * (1 + w * 4) + 1 + x * 4;
      raw[off] = r; raw[off+1] = g; raw[off+2] = b; raw[off+3] = al;
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 6 });

  const out = Buffer.concat([
    Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out);
  console.log(`✓ ${outPath} (${size}×${size})`);
}

makePNG(192, 'public/icon-192.png');
makePNG(512, 'public/icon-512.png');
makePNG(180, 'public/apple-touch-icon.png');
console.log('Icons generated.');
