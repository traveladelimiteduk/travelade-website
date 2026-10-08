/*
 * Point every footer's Company column at the real legal pages instead of
 * opening the modal dialogs. The four legal pages are proper, designed
 * pages now - the footer should link them directly (also better for SEO
 * and for visitors without JS).
 *
 * The cookie entry is the exception: it opens the cookie settings popup
 * (data-open-cookie-settings) rather than navigating, so pressing anything
 * cookie-related never leaves the page.
 *
 * Usage (from the repo root):
 *   node build/sync-footer-links.js
 *
 * Idempotent: it only matches the old `<li><a href="#" data-open-...>` and
 * old `<li><a href="cookie-policy.html">Cookie policy</a></li>` forms, so a
 * second run changes nothing. Inline prose links that still open the
 * modals (e.g. inside the apply drawer) are deliberately left alone.
 * The modal markup itself stays in the pages; theme.js keeps serving it.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

/* [old line, new line] — the Privacy replacement also appends the cookie
   policy, which those 34 footers were missing entirely; the next swap then
   turns that fresh link into the popup opener in the same pass. */
const SWAPS = [
    [
        '<li><a href="#" data-open-refund>Refund policy</a></li>',
        '<li><a href="refund-policy.html">Refund policy</a></li>'
    ],
    [
        '<li><a href="#" data-open-terms>Terms</a></li>',
        '<li><a href="terms-and-conditions.html">Terms &amp; conditions</a></li>'
    ],
    [
        '<li><a href="#" data-open-privacy>Privacy</a></li>',
        '<li><a href="privacy-policy.html">Privacy policy</a></li>\n                    <li><a href="cookie-policy.html">Cookie policy</a></li>'
    ],
    [
        '<li><a href="cookie-policy.html">Cookie policy</a></li>',
        '<li><a href="cookie-policy.html" data-open-cookie-settings>Cookie settings</a></li>'
    ],
    [
        '<li><a href="cookie-policy.html" aria-current="page">Cookie policy</a></li>',
        '<li><a href="cookie-policy.html" data-open-cookie-settings>Cookie settings</a></li>'
    ]
];

let changed = 0;
let hits = 0;

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

files.forEach((file) => {
    const p = path.join(ROOT, file);
    let html = fs.readFileSync(p, 'utf8');
    const before = html;

    SWAPS.forEach(([from, to]) => {
        if (html.includes(from)) {
            html = html.split(from).join(to);
            hits++;
        }
    });

    if (html !== before) {
        fs.writeFileSync(p, html);
        changed++;
    }
});

console.log('Scanned ' + files.length + ' pages: ' + hits +
    ' footer link(s) retargeted across ' + changed + ' file(s).');
