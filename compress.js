const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getImgs(dir, files = []) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && !['node_modules', '.git'].includes(f)) {
      getImgs(full, files);
    } else if (/\.(jpg|jpeg|png)$/i.test(f)) {
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
    const out = img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    try {
      await sharp(img).webp({ quality: 75 }).toFile(out);
      const b = fs.statSync(img).size;
      const a = fs.statSync(out).size;
      if (a < b) {
        saved += (b - a);
        console.log('✅ ' + path.basename(img) + ' ' + Math.round(b/1024) + 'KB → ' + Math.round(a/1024) + 'KB (saved ' + Math.round((b-a)/1024) + 'KB)');
      } else {
        fs.unlinkSync(out); // delete webp if bigger
        console.log('⏭ skipped ' + path.basename(img) + ' (already optimal)');
      }
    } catch(e) {
      console.log('✗ ' + path.basename(img) + ' ' + e.message);
    }
  }
  console.log('All done! Total saved: ' + Math.round(saved/1024) + 'KB');
})();