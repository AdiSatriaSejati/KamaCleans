const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const imageDir = path.join(__dirname, '../public/images');
  const outputDir = path.join(__dirname, '../public/images/optimized');

  try {
    await fs.mkdir(outputDir, { recursive: true });
    const files = await fs.readdir(imageDir);

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        await sharp(path.join(imageDir, file))
          .resize(400, 400, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .webp({ quality: 80 })
          .toFile(path.join(outputDir, `${path.parse(file).name}.webp`));
      }
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 