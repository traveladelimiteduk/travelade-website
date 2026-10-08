/*
 * Travelade country-page data.
 *
 * Each entry generates `{slug}.html` from the france.html template by the
 * build-countries.js generator. The fields below marked "REVIEW" are the
 * operational claims that must be confirmed against current consulate /
 * appointment-centre facts for each country before publishing. They default
 * to the honest generic Schengen-standard wording used on countries.html;
 * set them to a firm value and re-run `node build/build-countries.js` to
 * regenerate every page.
 *
 * Fields that are safe / sourced from the site itself (not REVIEW):
 *   name, slug, flag, city, imgId, alt  - taken from index.html
 *   prices (GBP)                        - Travelade's own service fees
 */
'use strict';

const COUNTRIES = [
    {
        name: 'Austria',
        slug: 'austria',
        flag: 'at',
        city: 'Vienna',
        imgId: 'photo-1516550893923-42d28e5677af',
        alt: 'Hallstatt village on its lake, Austria'
        // REVIEW: appointment centre + visa fee for Austria
    },
    {
        name: 'Belgium',
        slug: 'belgium',
        flag: 'be',
        city: 'Brussels',
        imgId: 'photo-1548092304-e0205cb0031b',
        alt: 'Guildhalls and rooftops in Brussels, Belgium'
    },
    {
        name: 'Bulgaria',
        slug: 'bulgaria',
        flag: 'bg',
        city: 'Sofia',
        imgId: 'photo-1594803294810-c860e5d29e07',
        alt: 'Alexander Nevsky Cathedral under a blue sky, Sofia, Bulgaria'
    },
    {
        name: 'Croatia',
        slug: 'croatia',
        flag: 'hr',
        city: 'Dubrovnik',
        imgId: 'photo-1555990793-da11153b2473',
        alt: 'The stone bell tower and city walls of Dubrovnik, Croatia'
    },
    {
        name: 'Czech Republic',
        slug: 'czech-republic',
        flag: 'cz',
        city: 'Prague',
        imgId: 'photo-1592906209472-a36b1f3782ef',
        alt: 'Charles Bridge over the Vltava in Prague, Czech Republic'
    },
    {
        name: 'Denmark',
        slug: 'denmark',
        flag: 'dk',
        city: 'Copenhagen',
        imgId: 'photo-1513622470522-26c3c8a854bc',
        alt: 'Nyhavn harbour houses in Copenhagen, Denmark'
    },
    {
        name: 'Estonia',
        slug: 'estonia',
        flag: 'ee',
        city: 'Tallinn',
        imgId: 'photo-1575561003164-f36f2e28a524',
        alt: 'Red tile roofs of Tallinn, Estonia'
    },
    {
        name: 'Finland',
        slug: 'finland',
        flag: 'fi',
        city: 'Helsinki',
        imgId: 'photo-1538332576228-eb5b4c4de6f5',
        alt: 'The harbour and islands of Helsinki, Finland'
    },
    {
        name: 'Germany',
        slug: 'germany',
        flag: 'de',
        city: 'Berlin',
        imgId: 'photo-1599946347371-68eb71b16afc',
        alt: 'The Brandenburg Gate in Berlin, Germany'
    },
    {
        name: 'Greece',
        slug: 'greece',
        flag: 'gr',
        city: 'Athens',
        imgId: 'photo-1613395877344-13d4a8e0d49e',
        alt: 'Whitewashed village above the Aegean, Greece'
    },
    {
        name: 'Hungary',
        slug: 'hungary',
        flag: 'hu',
        city: 'Budapest',
        imgId: 'photo-1616432902940-b7a1acbc60b3',
        alt: 'The Hungarian Parliament Building on the Danube, Budapest'
    },
    {
        name: 'Iceland',
        slug: 'iceland',
        flag: 'is',
        city: 'Reykjavik',
        imgId: 'photo-1474690870753-1b92efa1f2d8',
        alt: 'Hallgrims church tower in Reykjavik, Iceland'
    },
    {
        name: 'Italy',
        slug: 'italy',
        flag: 'it',
        city: 'Rome',
        imgId: 'photo-1552832230-c0197dd311b5',
        alt: 'The Colosseum and Roman Forum in Rome, Italy'
    },
    {
        name: 'Latvia',
        slug: 'latvia',
        flag: 'lv',
        city: 'Riga',
        imgId: 'photo-1685470934582-3636319a3be9',
        alt: 'The spire of Riga Cathedral against the sky, Latvia'
    },
    {
        name: 'Liechtenstein',
        slug: 'liechtenstein',
        flag: 'li',
        city: 'Vaduz',
        imgId: 'photo-1512424113276-fa9f6a112384',
        alt: 'Vaduz Castle on its wooded rock, Liechtenstein'
    },
    {
        name: 'Lithuania',
        slug: 'lithuania',
        flag: 'lt',
        city: 'Vilnius',
        imgId: 'photo-1747342866626-1fcd64772c08',
        alt: 'Gediminas Tower overlooking Vilnius, Lithuania'
    },
    {
        name: 'Luxembourg',
        slug: 'luxembourg',
        flag: 'lu',
        city: 'Luxembourg City',
        imgId: 'photo-1662239936406-522b4f82546a',
        alt: 'The Alzette valley through Luxembourg City'
    },
    {
        name: 'Malta',
        slug: 'malta',
        flag: 'mt',
        city: 'Valletta',
        imgId: 'photo-1587974928552-4f4aac51b45d',
        alt: 'The harbour at Valletta, Malta'
    },
    {
        name: 'Netherlands',
        slug: 'netherlands',
        flag: 'nl',
        city: 'Amsterdam',
        imgId: 'photo-1534351590666-13e3e96b5017',
        alt: 'Canal houses reflected in the water, Amsterdam, Netherlands'
    },
    {
        name: 'Norway',
        slug: 'norway',
        flag: 'no',
        city: 'Oslo',
        imgId: 'photo-1518124880777-cf8c82231ffb',
        alt: 'A fjord between snow-capped mountains, Norway'
    },
    {
        name: 'Poland',
        slug: 'poland',
        flag: 'pl',
        city: 'Krakow',
        imgId: 'photo-1670166819528-aadfddc48070',
        alt: 'Wawel Castle over the Vistula in Krakow, Poland'
    },
    {
        name: 'Portugal',
        slug: 'portugal',
        flag: 'pt',
        city: 'Lisbon',
        imgId: 'photo-1702560030824-02cf6c4761ef',
        alt: 'The Belem Tower on the riverfront in Lisbon, Portugal'
    },
    {
        name: 'Romania',
        slug: 'romania',
        flag: 'ro',
        city: 'Bucharest',
        imgId: 'photo-1695314620864-b551fd6574ef',
        alt: 'A fountain and palace facade in Bucharest, Romania'
    },
    {
        name: 'Slovakia',
        slug: 'slovakia',
        flag: 'sk',
        city: 'Bratislava',
        imgId: 'photo-1568616388664-1e37d8376363',
        alt: 'Bratislava Castle above the old town, Slovakia'
    },
    {
        name: 'Slovenia',
        slug: 'slovenia',
        flag: 'si',
        city: 'Ljubljana',
        imgId: 'photo-1602619025915-073b0594d662',
        alt: 'Ljubljana old town and its river, Slovenia'
    },
    {
        name: 'Spain',
        slug: 'spain',
        flag: 'es',
        city: 'Barcelona',
        imgId: 'photo-1758471206484-0eaa2568320c',
        alt: 'The Sagrada Familia above Barcelona at sunset, Spain'
    },
    {
        name: 'Sweden',
        slug: 'sweden',
        flag: 'se',
        city: 'Stockholm',
        imgId: 'photo-1509356843151-3e7d96241e11',
        alt: 'The old town and waterways of Stockholm, Sweden'
    },
    {
        name: 'Switzerland',
        slug: 'switzerland',
        flag: 'ch',
        city: 'Zurich',
        imgId: 'photo-1580405624815-5168a9f8bb63',
        alt: 'A mountain lake and the Alps near Zurich, Switzerland'
    }
];

/*
 * Operational defaults. REVIEW = confirm before publishing.
 */
const DEFAULTS = {
    // REVIEW: the appointment-centre phrase used across the page copy.
    // France uses "the TLScontact France centre in London"; until each
    // country's real centre (TLScontact / VFS Global / BLS / embassy) is
    // confirmed, every generated page uses this honest generic phrasing.
    // No city is named because several countries also process via consulates
    // in Manchester and Edinburgh.
    centre: null, // null => "the official {name} visa application centre in the UK"

    // REVIEW: decision window claim. Defaults to the Schengen-standard
    // 15 / extendable-to-45 window already used on countries.html.
    decisionDays: '15&ndash;45 days',
    decisionFaq: 'Most applications are decided within 15 calendar days of the consulate receiving your file, and many are decided faster. Complex files can take up to 45 days.'
};

// Packages are Travelade's own service fees, unchanged site-wide.
const PRICES = { slot: 99, full: 165, premium: 250 };

module.exports = { COUNTRIES, DEFAULTS, PRICES };