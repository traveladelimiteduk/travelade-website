/*
 * Sync the first-visit cookie consent card into every page.
 *
 * Usage (from the repo root):
 *   node build/sync-cookie-card.js
 *
 * For each *.html file:
 *   - removes the legacy `.cookie-banner` bottom bar (if present),
 *   - inserts the .ck-overlay + .ck-card markup just before </body>
 *     unless the file already has it,
 *   - inserts the cookie settings popup (opened from the card's
 *     "Cookie settings" link) unless it is already there,
 *   - migrates the card's old footer link to the popup-opening one, and
 *   - migrates the settings popup's old foot line (which linked out to
 *     the policy page) to the standalone one - the box stands alone now.
 *
 * Idempotent: a second run changes nothing. The card and popup are styled in
 * theme.css (section 32) and driven by theme.js (cookie consent block);
 * this script only guarantees the markup exists on every page.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { COOKIE_CARD, COOKIE_SETTINGS } = require('./chrome.js');

const ROOT = path.resolve(__dirname, '..');

/* Legacy bottom bar: an optional comment, the .cookie-banner wrapper, and its
   nested .cookie-banner__actions div (exactly one level deep). */
const LEGACY_RE = /(?:<!--[^>]*[Cc]ookie[^>]*-->\s*)?<div class="cookie-banner"[\s\S]*?<div class="cookie-banner__actions">[\s\S]*?<\/div>\s*<\/div>\s*/g;

/* Pages that were synced before the card's footer link learned to open the
   settings popup in place of navigating. One-line migration, so the markup
   stays identical everywhere without a hand-edit of 30+ files. */
const OLD_FOOT = '<a href="cookie-policy.html">Cookie&nbsp;policy</a>';
const NEW_FOOT = '<a href="cookie-policy.html" data-open-cookie-settings>Cookie&nbsp;settings</a>';

/* The settings dialog used to send people on to the full policy page from
   its foot line. Cookie paths never leave the page now, so the line drops
   the link; pages that already carry the dialog get the one-line swap. */
const OLD_SET_FOOT = '<p class="ck-foot">Either button records your answer on this device. Full detail is in the <a href="cookie-policy.html">cookie&nbsp;policy</a>.</p>';
const NEW_SET_FOOT = '<p class="ck-foot">Either button records your answer on this device.</p>';

let changed = 0;
let inserted = 0;
let stripped = 0;
let migrated = 0;
let settings = 0;
let settingsMigrated = 0;

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

files.forEach((file) => {
    const p = path.join(ROOT, file);
    let html = fs.readFileSync(p, 'utf8');
    const before = html;

    const afterLegacy = html.replace(LEGACY_RE, '');
    if (afterLegacy !== html) stripped++;
    html = afterLegacy;

    if (html.includes(OLD_FOOT)) {
        html = html.split(OLD_FOOT).join(NEW_FOOT);
        migrated++;
    }

    if (html.includes(OLD_SET_FOOT)) {
        html = html.split(OLD_SET_FOOT).join(NEW_SET_FOOT);
        settingsMigrated++;
    }

    if (!html.includes('id="ckCard"')) {
        const idx = html.lastIndexOf('</body>');
        if (idx === -1) {
            console.warn('[skip] ' + file + ' - no </body>');
            return;
        }
        html = html.slice(0, idx) + COOKIE_CARD + '\n\n' + html.slice(idx);
        inserted++;
    }

    if (!html.includes('id="cookieSettingsModal"')) {
        const idx = html.lastIndexOf('</body>');
        if (idx === -1) {
            console.warn('[skip] ' + file + ' - no </body>');
            return;
        }
        html = html.slice(0, idx) + COOKIE_SETTINGS + '\n\n' + html.slice(idx);
        settings++;
    }

    if (html !== before) {
        fs.writeFileSync(p, html);
        changed++;
    }
});

console.log('Scanned ' + files.length + ' pages: card inserted on ' + inserted +
    ', settings popup on ' + settings + ', card footers migrated on ' + migrated +
    ', settings foots migrated on ' + settingsMigrated +
    ', legacy banner stripped on ' + stripped + ', ' + changed + ' file(s) rewritten.');
