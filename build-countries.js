/*
 * Build Travelade country pages from the france.html template.
 *
 * Usage (from the repo root):
 *   node build/build-countries.js
 *
 * Reads:   france.html (the hand-tuned template)
 * Data:    build/countries-data.js
 * Writes:  {slug}.html for every entry in COUNTRIES, plus a refreshed
 *          france.html whose Schengen map links now point to the country
 *          pages instead of countries.html#anchors.
 *
 * The generator is deterministic and safe to re-run: every page is a pure
 * function of france.html + the data table.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const { COUNTRIES, DEFAULTS, PRICES } = require('./countries-data.js');

const TEMPLATE = fs.readFileSync(path.join(ROOT, 'france.html'), 'utf8');

const PAGE = {};
COUNTRIES.forEach((c) => {
    PAGE[c.name] = c.slug + '.html';
});
PAGE.France = 'france.html';

/* ---------------------------------------------------------------- helpers */

function repl(s, from, to) {
    return s.split(from).join(to);
}

const ZONE_OPEN = '<g class="emap__zone">';
/* The only nested <g> inside the zone is the current-country group (France
   on the template), so the real zone closer is the LAST </g> before </svg>. */
const zoneStart = TEMPLATE.indexOf(ZONE_OPEN);
const svgEnd = TEMPLATE.indexOf('</svg>');
const zoneEnd = TEMPLATE.lastIndexOf('</g>', svgEnd);
const zoneInner0 = TEMPLATE.slice(zoneStart + ZONE_OPEN.length, zoneEnd);
const PRE = TEMPLATE.slice(0, zoneStart + ZONE_OPEN.length);
const POST = TEMPLATE.slice(zoneEnd);

/* ------------------------------------------------------------ map rebuild */

const ENTRY_RE = /(<a class="emap__c[^"]*"[^>]*>)([\s\S]*?)(<\/a>)|(<g class="emap__c is-current"[^>]*>)([\s\S]*?)(<\/g>)/g;

function nationOf(opening, inner) {
    const dm = opening.match(/data-country="([^"]+)"/);
    if (dm) return dm[1].trim();
    const tm = inner.match(/<text[^>]*>([\s\S]*?)<\/text>/);
    if (tm) return tm[1].replace(/<[^>]+>/g, '').trim();
    throw new Error('Could not identify map entry: ' + opening);
}

function labelXY(inner) {
    const tm = inner.match(/<text\b([^>]*)>/);
    if (!tm) return null;
    const attrs = tm[1];
    const x = attrs.match(/x="([0-9.]+)"/);
    const y = attrs.match(/y="([0-9.]+)"/);
    return x && y ? { x: parseFloat(x[1]), y: parseFloat(y[1]) } : null;
}

function pinXY(inner) {
    const pm = inner.match(/<circle class="emap__pin"\b([^>]*)\/>/);
    if (!pm) return null;
    const x = pm[1].match(/cx="([0-9.]+)"/);
    const y = pm[1].match(/cy="([0-9.]+)"/);
    return x && y ? { x: parseFloat(x[1]), y: parseFloat(y[1]) } : null;
}

function pulseEl(inner) {
    const pin = pinXY(inner);
    if (pin) {
        const cx = Math.round((pin.x + 1) * 10) / 10;
        const cy = Math.round((pin.y - 12) * 10) / 10;
        return `<circle class="emap__pulse" cx="${cx}" cy="${cy}" r="4" />`;
    }
    const label = labelXY(inner);
    if (!label) return '';
    const cx = Math.round((label.x + 2) * 10) / 10;
    const cy = Math.round((label.y - 17) * 10) / 10;
    return `<circle class="emap__pulse" cx="${cx}" cy="${cy}" r="4" />`;
}

function setLabelText(inner, nation) {
    return inner.replace(/(<text\b[^>]*>)[\s\S]*?(<\/text>)/, '$1' + nation + '$2');
}

function currentGroup(nation, opening, inner) {
    /* If the source entry is already the current-country group (France on the
       template), keep it verbatim. */
    if (/^<g class="emap__c is-current"/.test(opening)) {
        return opening + inner + '</g>';
    }
    let body = setLabelText(inner, nation);
    const pulse = pulseEl(inner);
    const labelOpen = body.match(/<text\b/);
    const pinOpen = body.match(/<circle class="emap__pin"/);
    if (pulse && labelOpen) {
        if (pinOpen) {
            body = body.replace(/<circle class="emap__pin"/, pulse + '\n                                <circle class="emap__pin"');
        } else {
            body = body.replace(/<text\b/, pulse + '\n                                <text');
        }
    }
    return (
        '<g class="emap__c is-current" aria-label="' + nation + ' visa help - you are here">\n' +
        body +
        '\n                            </g>'
    );
}

function linkGroup(nation, opening, inner, page) {
    /* A source entry can be either an <a> (most countries) or the template's
       <g class="emap__c is-current"> (France). Both become plain <a> links. */
    let tag;
    if (/^<g /.test(opening)) {
        tag = '<a class="emap__c" href="' + page + '" aria-label="' + nation + ' visa help" data-country="' + nation + '">';
    } else {
        tag = opening.replace(/href="countries\.html#[^"]+"/, 'href="' + page + '"');
    }
    const body = setLabelText(inner, nation).replace(/<circle class="emap__pulse"[^>]*\/\s*>/g, '');
    return tag + body + '</a>';
}

function buildZone(zoneInner, target, pageOf) {
    let out = '';
    let last = 0;
    let m;
    ENTRY_RE.lastIndex = 0;
    while ((m = ENTRY_RE.exec(zoneInner)) !== null) {
        out += zoneInner.slice(last, m.index);
        const opening = m[1] || m[4];
        const inner = m[2] || m[5];
        const nation = nationOf(opening, inner);
        if (nation === target) {
            out += currentGroup(nation, opening, inner);
        } else {
            out += linkGroup(nation, opening, inner, pageOf(nation));
        }
        last = ENTRY_RE.lastIndex;
    }
    out += zoneInner.slice(last);
    return out;
}

/* ------------------------------------------------------------ copy swaps */

function applyCopy(html, c) {
    const name = c.name;
    const slug = c.slug + '.html';
    /* Appointments are lodged at the country's official UK visa-application
       centre. No city is named: several countries also process via consulates
       in Manchester and Edinburgh, and centre brands (TLScontact / VFS Global /
       BLS / embassy-direct) vary per country and change frequently. */
    const centre =
        DEFAULTS.centre === null
            ? 'the official ' + name + ' visa application centre in the UK'
            : DEFAULTS.centre.split('{name}').join(name);
    const imgHero = c.imgId + '?auto=format&fit=crop&w=2000&q=72';

    /* Lowercase URLs first, so the map placeholders / other lowercase tokens
       are rewritten before the sentence-case country swaps below. */
    html = repl(html, 'france.html', slug);

    html = repl(html, 'photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=72', imgHero);

    /* Centre / operational copy. */
    html = repl(html, 'Appointment at the TLScontact France centre, booked for you', 'Appointment at ' + centre + ', booked for you');
    html = repl(html, 'filed at the TLScontact centre in London &mdash;', 'filed at ' + centre + ' &mdash;');
    html = repl(html, 'Biometrics at the TLScontact France centre, booked before anything else', 'Biometrics at ' + centre + ', booked before anything else');
    html = repl(html, 'lodged at the TLScontact France centre in London, where biometrics', 'lodged at ' + centre + ', where biometrics');
    html = repl(html, 'photograph at the TLScontact France centre in London.', 'photograph at ' + centre + '.');
    html = repl(html, 'attend the TLScontact centre in person?', 'attend the visa centre in person?');
    html = repl(html, 'the TLScontact portal every day', 'the appointment portal every day');
    html = repl(html, 'TLScontact appointments, document preparation', 'Appointment booking, document preparation');
    html = repl(html, 'Government visa fee and TLScontact charges', 'Government visa fee and appointment-centre charges');
    html = repl(html, 'The government visa fee and TLScontact charges', 'The government visa fee and appointment-centre charges');
    html = repl(html, 'TLScontact appointment fees and insurance premiums', 'appointment-centre fees and insurance premiums');
    html = repl(html, 'for example VFS Global, TLScontact and the relevant consulate', 'for example the visa application centres and the relevant consulate');
    html = repl(html, 'Appointment at the TLScontact France centre book, early-slot alerts, appointment briefing and a named WhatsApp consultant.', 'Appointment at ' + centre + ' booked for you, with early-slot alerts, an appointment briefing and a named WhatsApp consultant.');
    html = repl(html, 'covers your TLScontact appointment, early-slot alerts', 'covers your appointment booking, early-slot alerts');

    /* Sentence-case country phrasing. */
    html = repl(html, 'French applications from the UK', name + ' applications from the UK');
    html = repl(html, 'French consulates read cover letters closely', name + ' consulates read cover letters closely');
    html = repl(html, 'Most applications are decided within 7 to 15 working days of the consulate receiving your file, though seasonal peaks affect this.', DEFAULTS.decisionFaq);
    html = repl(html, 'France aims for a decision in 7&ndash;15 working days.', 'The consulate aims for a decision in ' + DEFAULTS.decisionDays + '.');
    html = repl(html, '<span class="route__chip">7&ndash;15 working days</span>', '<span class="route__chip">' + DEFAULTS.decisionDays + '</span>');
    html = repl(html,
        'One France visa unlocks the whole area &mdash; land in Paris, drive to Barcelona, cross into Italy, never asked for a second one. You file in London at the TLScontact centre;',
        'One ' + name + ' visa unlocks the whole area &mdash; land in ' + c.city + ', travel on to the rest of your itinerary, never asked for a second one. You file at ' + centre + ';');

    /* Section comments. */
    html = repl(html, 'FRANCE', name.toUpperCase());

    /* Everything that remains sentence-case "France". */
    html = html.replace(/\bFrance\b/g, name);

    /* Article agreement: "a France" is right, "a Italy" is not. */
    if (/^[aeiou]/i.test(name)) {
        html = html.replace(new RegExp('\\ba ' + name + '\\b', 'g'), 'an ' + name);
    }

    return html;
}

/* ------------------------------------------------------------ generation */

function render(target, doCopy) {
    let doc = PRE + '[[ZONE]]' + POST;
    if (doCopy) {
        const c = COUNTRIES.find((x) => x.name === target) || { name: target, city: target, slug: target.toLowerCase(), imgId: '' };
        doc = applyCopy(doc, c);
    }
    doc = doc.replace('[[ZONE]]', buildZone(zoneInner0, target, (n) => PAGE[n] || 'countries.html' + '#' + n));
    return doc;
}

/* ------------------------------------------------------------ verification */

function verify(file, name, isFrance) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const problems = [];
    /* The address-destination dropdown legitimately lists all 29 countries,
       and every map needs its "France" link to france.html. Strip both before
       the country-name sweep. */
    let swept = html.replace(/<option>France<\/option>/g, '');
    swept = swept.replace(/<a class="emap__c" href="france\.html"[^>]*>[\s\S]*?<\/a>/g, '');
    if (!isFrance && /\bFrance\b/.test(swept)) problems.push('contains "France"');
    if (!isFrance && /france\.html/.test(swept)) problems.push('contains france.html');
    if (!isFrance && /TLScontact/i.test(swept)) problems.push('contains TLScontact');
    if (!isFrance && /French/.test(swept)) problems.push('contains French');
    if (/class="country-page"/.test(html) === false) problems.push('missing country-page');
    const dests = html.match(/data-destination="([^"]*)"/g) || [];
    for (const d of dests) {
        if (d !== 'data-destination="' + name + '"') problems.push('wrong data-destination: ' + d);
    }
    if (dests.length !== 8) problems.push('data-destination count ' + dests.length + ' (expected 8)');
    const sections = (html.match(/<section/g) || []).length;
    const closes = (html.match(/<\/section>/g) || []).length;
    if (sections !== 7 || closes !== 7) problems.push('sections ' + sections + '/' + closes + ' (expected 7/7)');
    if (/<em>/.test(html) === false) problems.push('missing hero <em>');
    const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
    if (!ld.length) problems.push('no JSON-LD blocks');
    for (const s of ld) {
        const raw = s.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
        try {
            JSON.parse(raw);
        } catch (e) {
            problems.push('invalid JSON-LD: ' + e.message);
        }
    }
    return problems;
}

/* ------------------------------------------------------------ run */

const results = [];
let franceDoc = render('France', false);
fs.writeFileSync(path.join(ROOT, 'france.html'), franceDoc);
results.push({ file: 'france.html', problems: verify('france.html', 'France', true) });

COUNTRIES.forEach((c) => {
    const doc = render(c.name, true);
    fs.writeFileSync(path.join(ROOT, c.slug + '.html'), doc);
    results.push({ file: c.slug + '.html', problems: verify(c.slug + '.html', c.name, false) });
});

let failed = 0;
results.forEach((r) => {
    const status = r.problems.length ? 'FAIL' : 'ok  ';
    if (r.problems.length) failed++;
    console.log('[' + status + '] ' + r.file + (r.problems.length ? '  ->  ' + r.problems.join('; ') : ''));
});
console.log('\nWrote ' + results.length + ' pages (' + (results.length - failed) + ' clean, ' + failed + ' with issues).');
console.log('PRICES referenced in copy: £' + PRICES.slot + ' / £' + PRICES.full + ' / £' + PRICES.premium + ' (per applicants, service fee).');