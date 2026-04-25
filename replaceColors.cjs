const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace RGB strings with spaces (Indigo/Violet -> Orange/Green)
  content = content.replace(/99,\s*102,\s*241/g, '249, 115, 22'); // Indigo -> Orange
  content = content.replace(/139,\s*92,\s*246/g, '234, 88, 12'); // Violet -> Darker Orange
  content = content.replace(/168,\s*85,\s*247/g, '34, 197, 94'); // Light violet -> Green
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
