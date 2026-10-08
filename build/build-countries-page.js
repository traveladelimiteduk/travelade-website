/*
 * Build the cards-only countries.html page.
 *
 * Usage (from the repo root):
 *   node build/build-countries-page.js
 *
 * Reads:   countries.html (page chrome: head, nav, footer, modals, scripts)
 * Data:    build/countries-data.js
 * Writes:  countries.html whose <main> is replaced with the destinations
 *          hero + search bar + a grid of every Schengen country card.
 *
 * Everything outside <main> is preserved byte-for-byte, so the generator is
 * safe to re-run and the only thing that changes between runs is the card
 * grid, which is a pure function of the data table.
 *
 * The cards are plain links to {slug}.html (the per-country pages) and carry
 * the same classes as the homepage destination grid, so the shared
 * destinationFilter() in theme.js drives the live search with no per-page JS.
 * There is deliberately no filterbar-chips row: Travelade covers one region
 * (Schengen), so a region chip that can only ever match everything is noise.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const { COUNTRIES } = require('./countries-data.js');

/* COUNTRIES in countries-data.js is the 28-page set; france.html is the
   generator template, so France is not in the table. It belongs on the
   countries page though, so it is inserted here in its alphabetical slot. */
const FRANCE = {
    name: 'France',
    slug: 'france',
    flag: 'fr',
    city: 'Paris',
    imgId: 'photo-1499856871958-5b9627545d1a',
    alt: 'The Eiffel Tower above the Seine in Paris, France'
};

const ALL = COUNTRIES.concat(FRANCE).slice().sort(function (a, b) {
    return a.name.localeCompare(b.name);
});

/* The cards' "from" price is the entry-level service fee shown on the
   homepage destination cards (£80), not the package prices in the data
   table (£99/£165/£250), so it stays a constant here. */
const FROM_PRICE = 80;

const FILE = path.join(ROOT, 'countries.html');
const html = fs.readFileSync(FILE, 'utf8');

const MAIN_OPEN = '<main>';
const MAIN_CLOSE = '</main>';
const start = html.indexOf(MAIN_OPEN);
const end = html.indexOf(MAIN_CLOSE);
if (start === -1 || end === -1) {
    throw new Error('Could not find <main>…</main> markers in countries.html');
}
const head = html.slice(0, start);
/* Slice from AFTER the close tag so a re-run cannot stack a second </main>
   onto the tail - the pasted-back main already ends with its own. */
const tail = html.slice(end + MAIN_CLOSE.length);

/* --------------------------------------------------------------- card HTML */

function card(c) {
    const flag = 'https://flagcdn.com/w40/' + c.flag + '.png';
    const img = 'https://images.unsplash.com/' + c.imgId + '?auto=format&fit=crop&w=560&q=70';
    return [
        '            <a class="dest reveal" data-region="europe" href="' + c.slug + '.html">',
        '                <img class="dest__img" src="' + img + '"',
        '                     alt="' + c.alt + '" width="560" height="469" loading="lazy" decoding="async">',
        '                <div class="dest__body">',
        '                    <div class="dest__country"><img src="' + flag + '" alt="" width="20" height="14" loading="lazy">' + c.name + '</div>',
        '                    <div class="dest__city">' + c.city + '</div>',
        '                    <div class="dest__foot">',
        '                        <span class="dest__from">from <b>&pound;' + FROM_PRICE + '</b></span>',
        '                        <span class="dest__go">Apply <i class="fas fa-arrow-right" aria-hidden="true"></i></span>',
        '                    </div>',
        '                </div>',
        '            </a>'
    ].join('\n');
}

const cards = ALL.map(card).join('\n');

/* ---------------------------------------------------------------- new main */

const main = 
'<main>\n' +
'\n' +
'<!-- =====================================================================\n' +
'     COUNTRIES - CARD GRID ONLY\n' +
'     ===================================================================== -->\n' +
'<section class="page-hero">\n' +
'    <div class="wrap">\n' +
'        <nav class="crumbs" aria-label="Breadcrumb">\n' +
'            <a href="index.html">Home</a> <i class="fas fa-chevron-right" aria-hidden="true"></i> <span>Schengen Countries</span>\n' +
'        </nav>\n' +
'        <h1>Every Schengen country, one <em class="orange-cursive">process</em>.</h1>\n' +
'        <p>All 29 member states in one grid. Pick your destination and we confirm the consulate you apply through, the appointment centre you attend and the exact document list for that country.</p>\n' +
'    </div>\n' +
'</section>\n' +
'\n' +
'<!-- =====================================================================\n' +
'     ALL 29 COUNTRIES\n' +
'     ===================================================================== -->\n' +
'<section class="section" id="countries">\n' +
'    <div class="wrap destinations-wrap">\n' +
'        <div class="filterbar">\n' +
'            <div class="home-search">\n' +
'                <label class="visually-hidden" for="countrySearch">Search Schengen countries by country or capital</label>\n' +
'                <input class="input" id="countrySearch" type="search" placeholder="Search a country or capital\u2026" aria-label="Search Schengen countries" autocomplete="off" spellcheck="false" value="">\n' +
'            </div>\n' +
'        </div>\n' +
'\n' +
'        <p class="dest-empty" role="status" hidden>\n' +
'            <span class="dest-empty__msg"></span>\n' +
'            <button class="linkbtn dest-empty__clear" type="button">Clear search</button>\n' +
'        </p>\n' +
'\n' +
'        <div class="dest-grid">\n' +
cards + '\n' +
'        </div>\n' +
'\n' +
'        <p class="t-center mt-5" style="font-size:var(--fs-sm);color:var(--fg-3);max-width:660px;margin-inline:auto;">\n' +
'            Switzerland, Norway and Liechtenstein are outside the EU but inside the Schengen area, so a visa issued by any one of the 29 lets you travel across all of them.\n' +
'        </p>\n' +
'    </div>\n' +
'</section>\n' +
'\n' +
'</main>\n';

/* ------------------------------------------------------------------- write */

const out = head + main + tail;
fs.writeFileSync(FILE, out);

const cardCount = (out.match(/class="dest reveal" data-region="europe" href="[a-z-]+\.html"/g) || []).length;
console.log('Wrote countries.html with ' + cardCount + ' destination cards.');
if (cardCount !== ALL.length) {
    console.error('WARNING: expected ' + ALL.length + ' cards.');
    process.exitCode = 1;
}