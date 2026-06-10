const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getImgs(dir, files = []) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && !['node_modules','.git'].includes(f)) {
      getImgs(full, files);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(f)) {
      files.push(full);
    }
  });
  return files;
}

const imgs = getImgs('.');
console.log('Found ' + imgs.length + ' images');

(async () => {
  let saved = 0;
  for (const img of imgs) {
    try {
      const before = fs.statSync(img).size;
      const tmp = img + '.tmp.webp';
      await sharp(img)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(tmp);
      const after = fs.statSync(tmp).size;
      if (after < before) {
        fs.unlinkSync(img);
        fs.renameSync(tmp, img);
        saved += (before - after);
        console.log('✅ ' + path.basename(img) + ' ' + Math.round(before/1024) + 'KB → ' + Math.round(after/1024) + 'KB');
      } else {
        fs.unlinkSync(tmp);
        console.log('⏭ skipped ' + path.basename(img));
      }
    } catch(e) {
      console.log('✗ ' + path.basename(img) + ' ' + e.message);
    }
  }
  console.log('Total saved: ' + Math.round(saved/1024/1024) + 'MB');
})();