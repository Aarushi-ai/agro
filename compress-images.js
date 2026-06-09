const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getAllImages(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory() && file !== 'node_modules') {
      getAllImages(full, files);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      files.push(full);
    }
  });
  return files;
}

const images = getAllImages('.');
console.log(Found  images);

(async () => {
  for (const img of images) {
    const out = img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    try {
      await sharp(img).webp({ quality: 80 }).toFile(out);
      const before = fs.statSync(img).size;
      const after = fs.statSync(out).size;
      console.log(✓  → KB → KB);
    } catch(e) {
      console.log(✗ Failed:  - );
    }
  }
  console.log('All done!');
})();
