/*
 * Verify every internal .html link across the site resolves to an existing file.
 * Usage: node build/check-links.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

const missing = [];
const checked = new Set();

for (const f of files) {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const re = /(?:href|src)="([^"#?]+\.html)"/g;
    let m;
    while ((m = re.exec(html)) !== null) {
        const target = m[1].split('/').pop();
        if (!target || target.startsWith('http')) continue;
        if (files.includes(target)) continue;
        const key = f + ' -> ' + target;
        if (checked.has(key)) continue;
        checked.add(key);
        missing.push(key);
    }
}

if (missing.length) {
    console.log('BROKEN LINKS (' + missing.length + '):');
    missing.forEach((x) => console.log('  ' + x));
    process.exit(1);
}
console.log('Link check passed for ' + files.length + ' pages — every internal .html link resolves.');