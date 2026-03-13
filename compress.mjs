import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const directory = './public/images';
const MAX_WIDTH = 1920;

async function processImages(dir) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await processImages(fullPath); // Process subfolders recursively
    } else if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      console.log(`Processing: ${fullPath}`);
      
      const tempPath = `${fullPath}.tmp`;
      
      try {
        await sharp(fullPath)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true }) // Resize to max 1920px width
          .webp({ quality: 80 }) // Convert to WebP with 80% quality
          .toFile(tempPath);
          
        await fs.rename(tempPath, fullPath); // Overwrite original
        console.log(`✅ Compressed: ${file}`);
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err);
      }
    }
  }
}

console.log("Starting image compression...");
processImages(directory).then(() => console.log("Done!"));
