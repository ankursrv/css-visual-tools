/**
 * Converts the @font-face weights actually declared in globals.css from
 * TTF → WOFF2 (Brotli, ~60-70% smaller) into public/fonts.
 *
 * Run:  node scripts/convert-fonts.mjs
 */
import { readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { compress } from 'wawoff2';

const FONTS = 'public/fonts';

// Only the weights declared via @font-face in globals.css
const USED = [
  'Ubuntu-Regular.ttf',
  'Ubuntu-Medium.ttf',
  'Ubuntu-Bold.ttf',
  'Roboto-Regular.ttf',
  'Roboto-Medium.ttf',
  'Roboto-SemiBold.ttf',
  'Roboto-Bold.ttf',
];

for (const name of USED) {
  const src = join(FONTS, name);
  const out = src.replace(/\.ttf$/, '.woff2');
  if (!existsSync(src)) {
    console.warn(`SKIP (missing): ${src}`);
    continue;
  }
  const ttf = readFileSync(src);
  const woff2 = await compress(ttf);
  writeFileSync(out, Buffer.from(woff2));
  console.log(
    `OK ${name}  ${(statSync(src).size / 1024).toFixed(0)}KB → ${(statSync(out).size / 1024).toFixed(0)}KB`,
  );
}
