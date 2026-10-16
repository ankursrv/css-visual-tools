/**
 * One-off image optimizer for the biggest public/images assets.
 *
 * • Backs up every original to scripts/image-backup/ (repo has no git
 *   history yet, so originals are preserved before in-place overwrite).
 * • Resizes each asset to its real max display width (×2 for DPR where
 *   the design is full-bleed) and recompresses it.
 * • PNGs whose alpha channel is fully opaque are re-encoded as JPEG into
 *   a NEW file (printed as "RENAME:" so the code references can be
 *   updated); PNGs with real transparency stay PNG (palette-quantized).
 *
 * Run:  node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const IMG = 'public/images';
const BACKUP = 'scripts/image-backup';
mkdirSync(BACKUP, { recursive: true });

// src → { width, quality } — width = max rendered CSS width ×2 (DPR)
const TARGETS = [
  // Hero banner (rendered ≤1440px full-bleed)
  { file: `${IMG}/banner-desktop.png`, width: 1440, quality: 80 },
  { file: `${IMG}/mobile-banner.png`, width: 750, quality: 80 },
  // Explore section
  { file: `${IMG}/bg-image1.png`, width: 1600, quality: 76 },
  { file: `${IMG}/explore-section-mobile-bg.png`, width: 750, quality: 76 },
  { file: `${IMG}/madhavan-image1.png`, width: 1100, quality: 80 }, // has alpha
  { file: `${IMG}/madhavan-mobile.png`, width: 600, quality: 80 }, // has alpha
  // Open Online cards (rendered ≤293px)
  { file: `${IMG}/open-online-savings.jpg`, width: 600, quality: 72 },
  { file: `${IMG}/open-online-current.jpg`, width: 600, quality: 72 },
  { file: `${IMG}/open-online-fixed-deposit.jpg`, width: 600, quality: 72 },
  // Campaign videos (rendered ≤292px)
  { file: `${IMG}/campaign-boutique.jpg`, width: 600, quality: 74 },
  { file: `${IMG}/campaign-cafe.jpg`, width: 600, quality: 74 },
  // Mega-menu promo (rendered 320px)
  { file: `${IMG}/icons/fd_promo.jpg`, width: 640, quality: 74 },
  // Blogs (rendered ≤819px)
  { file: `${IMG}/blog-img0.png`, width: 900, quality: 76 },
  { file: `${IMG}/blog-img1.png`, width: 900, quality: 76 },
  { file: `${IMG}/blog-img2.png`, width: 900, quality: 76 },
  { file: `${IMG}/blog-img3.png`, width: 900, quality: 76 },
  { file: `${IMG}/blog-img5.png`, width: 900, quality: 76 },
  // Find a branch map graphic
  { file: `${IMG}/find-branch-map.png`, width: 800, quality: 76 },
];

/** True if any pixel has alpha < 255 (i.e. real transparency in use). */
async function hasRealAlpha(pngBuffer) {
  const { data, info } = await sharp(pngBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = info.channels - 1; i < data.length; i += info.channels) {
    if (data[i] < 255) return true;
  }
  return false;
}

const renames = [];

for (const { file, width, quality } of TARGETS) {
  if (!existsSync(file)) {
    console.warn(`SKIP (missing): ${file}`);
    continue;
  }
  const before = statSync(file).size;

  // Back up once; on re-runs always optimize from the pristine backup so
  // JPEGs are never recompressed lossily on top of previous output.
  const backupPath = join(BACKUP, file.split('/').slice(-2).join('/'));
  if (!existsSync(backupPath)) {
    mkdirSync(join(BACKUP, file.split('/').slice(-2)[0]), { recursive: true });
    copyFileSync(file, backupPath);
  }
  const source = backupPath;
  // Measure from the pristine backup, not the (possibly already resized)
  // current file — otherwise a re-run would skip the resize and write the
  // full-size backup back out.
  const sourceInfo = await sharp(source).metadata();

  const needsResize = sourceInfo.width > width;
  let pipeline = sharp(source).rotate(); // rotate() applies EXIF orientation
  if (needsResize) pipeline = pipeline.resize({ width, withoutEnlargement: true });

  const isPng = file.endsWith('.png');
  if (isPng) {
    const sourceBuffer = await sharp(source).toBuffer();
    const opaque = !(await hasRealAlpha(sourceBuffer));
    if (opaque) {
      // Re-encode as JPEG under a NEW .jpg name (caller must update refs)
      const out = file.replace(/\.png$/, '.jpg');
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(out);
      const after = statSync(out).size;
      renames.push({ from: file, to: out });
      console.log(
        `PNG→JPG  ${file}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (opaque, renamed → ${out})`,
      );
      continue;
    }
    // Transparency in use → keep PNG, palette-quantize
    await pipeline
      .png({ palette: true, quality, effort: 10 })
      .toFile(`${file}.tmp`);
    // palette drops EXIF-rotate, fine for these exports
    const { renameSync, unlinkSync } = await import('node:fs');
    unlinkSync(file);
    renameSync(`${file}.tmp`, file);
  } else {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(`${file}.tmp`);
    const { renameSync, unlinkSync } = await import('node:fs');
    unlinkSync(file);
    renameSync(`${file}.tmp`, file);
  }
  const after = statSync(file).size;
  console.log(`OK       ${file}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
}

if (renames.length) {
  console.log('\n--- Files that changed extension (update src refs) ---');
  renames.forEach(({ from, to }) => console.log(`RENAME: ${from} → ${to}`));
}
