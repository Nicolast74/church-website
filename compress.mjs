import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const directory = './public/images';
const MAX_WIDTH = 1600;

async function processImages(dir) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await processImages(fullPath); // Process subfolders recursively
    } else if (file.match(/\.(jpg|jpeg|png)$/i) && !file.match(/-1600\.(jpg|jpeg|png)$/i)) {
      console.log(`Processing: ${fullPath}`);

      const parsed = path.parse(fullPath);
      const baseOut = path.join(parsed.dir, `${parsed.name}-${MAX_WIDTH}`);

      const jpgOut = `${baseOut}.jpg`;
      const webpOut = `${baseOut}.webp`;
      const avifOut = `${baseOut}.avif`;

      try {
        const pipeline = sharp(fullPath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

        await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(jpgOut);
        await pipeline.clone().webp({ quality: 80 }).toFile(webpOut);
        await pipeline.clone().avif({ quality: 50 }).toFile(avifOut);

        console.log(`✅ Generated: ${path.basename(jpgOut)}, ${path.basename(webpOut)}, ${path.basename(avifOut)}`);
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err);
      }
    }
  }
}

console.log("Starting image compression...");
processImages(directory).then(() => console.log("Done!"));
