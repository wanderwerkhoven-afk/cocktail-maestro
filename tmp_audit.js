const fs = require('fs');
const content = fs.readFileSync('js/database.js', 'utf8');
const matches = [...content.matchAll(/name:\s*"([^"]+)"/g)];
const names = matches.map(m => m[1]);
const unique = [...new Set(names)].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(unique.join('\n'));
