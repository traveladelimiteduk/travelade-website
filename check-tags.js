/*
 * Tag-balance sanity check for HTML files.
 * Usage: node build/check-tags.js [file.html ...]
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const files = process.argv.slice(2).length
    ? process.argv.slice(2)
    : fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

let bad = 0;
const voids = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'area', 'base', 'col', 'embed', 'track', 'wbr']);

for (const f of files) {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const problems = [];
    const open = {};
    const stack = [];
    const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)((?:\s[^<>]*?)?)\/?>/g;
    let m;
    while ((m = re.exec(html)) !== null) {
        const tag = m[1].toLowerCase();
        const raw = m[0];
        const closing = raw.startsWith('</');
        const selfClosed = /\/\s*>$/.test(raw) && !closing;
        if (closing) {
            const top = stack.pop();
            if (top !== tag) problems.push('mismatched <' + top + '> closed by </' + tag + '>');
        } else if (!selfClosed && !voids.has(tag)) {
            stack.push(tag);
        }
    }
    if (stack.length) problems.push('unclosed tags: ' + stack.slice(-5).join(', '));
    const s = (html.match(/<section/g) || []).length;
    const se = (html.match(/<\/section>/g) || []).length;
    if (s !== se) problems.push('section ' + s + '/' + se);
    const status = problems.length ? 'FAIL' : 'ok';
    if (problems.length) bad++;
    console.log('[' + status + '] ' + f + (problems.length ? '  ->  ' + problems.join('; ') : ''));
}
if (bad) process.exit(1);
console.log('\nTag balance passed for ' + files.length + ' file(s).');