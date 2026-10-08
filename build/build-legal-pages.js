/*
 * Build the four legal pages (privacy, refund, terms, cookie) in the same
 * design as requirements.html: navy hero with breadcrumbs, sticky numbered
 * TOC sidebar, summary box, numbered sections, closing CTA.
 *
 * Usage (from the repo root):
 *   node build/build-legal-pages.js
 *
 * Reuses, from requirements.html at build time (so the chrome can only drift
 * in one place):
 *   - the local <style> block  (+ LEGAL_CSS below for the extra typography)
 *   - the nav header + mobile panel markup
 * and from build/chrome.js:
 *   - footer, apply drawer, first-visit cookie card, nav script.
 *
 * Content lives in build/legal-content.js.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const PAGES = require('./legal-content.js');
const { COOKIE_CARD, COOKIE_SETTINGS, footer, applyDrawer, NAV_SCRIPT } = require('./chrome.js');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://www.travelade.co.uk';

/* -------------------------------------------------- reuse requirements chrome */
const reqHtml = fs.readFileSync(path.join(ROOT, 'requirements.html'), 'utf8');

const styleMatch = reqHtml.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('requirements.html: local <style> block not found');
const REQ_CSS = styleMatch[1];

const headerIdx = reqHtml.indexOf('<header class="nav" id="nav">');
const panelEnd = reqHtml.indexOf('</aside>', headerIdx);
if (headerIdx === -1 || panelEnd === -1) throw new Error('requirements.html: nav markup not found');
const NAV_CSS = reqHtml
    .slice(headerIdx, panelEnd + '</aside>'.length)
    .replace('class="nav__link is-current"', 'class="nav__link"');

const WA_FLOAT = '<a class="wa-float" href="https://wa.me/447575378991" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>';

/* --------------------------------------------------------- extra local styles */
const LEGAL_CSS = `
        /* ---- Legal pages additions (generated) ---- */
        .req-content { font-size: 0.95rem; }
        .req-content p {
            margin: 0 0 18px;
            line-height: 1.7;
            color: var(--text-muted, rgba(255,255,255,0.7));
        }
        .req-content ul { margin: 0 0 18px; padding-left: 20px; }
        .req-content li { line-height: 1.65; color: var(--text-muted, rgba(255,255,255,0.7)); }
        .req-content ul.purpose-list { padding-left: 0; list-style: none; }
        .req-content strong { color: var(--text, #fff); font-weight: 700; }
        .req-content a {
            color: var(--accent, #4e9eff);
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        .req-content h3 {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text, #fff);
            margin: 26px 0 10px;
        }
        .req-content code {
            background: var(--border, rgba(255,255,255,0.08));
            padding: 1px 6px;
            border-radius: 4px;
            font-size: 0.85em;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .req-content table,
        .req-content .doc-cards,
        .req-content .purpose-list,
        .req-content .appt-steps,
        .req-content .doc-card__warn { margin: 0 0 18px; }
        .req-content .doc-card__warn { font-size: 0.86rem; }
        .req-content address { font-style: normal; }

        .legal-updated {
            display: inline-block;
            margin: 16px 0 0;
            padding: 6px 14px;
            font-size: 0.74rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.75);
            border: 1px solid rgba(255,255,255,0.28);
            border-radius: 999px;
        }

        [data-theme="light"] .req-content p,
        [data-theme="light"] .req-content li { color: #4a5568; }
        [data-theme="light"] .req-content strong,
        [data-theme="light"] .req-content h3 { color: #0a1628; }
        [data-theme="light"] .req-content code { background: #eef1f6; color: #0a1628; }

        /* The pill sits in the hero, which follows the page surface in the
           white theme - its dark-theme white text and border would vanish
           on the light band. */
        [data-theme="light"] .legal-updated { color: var(--fg-2); border-color: var(--hairline); }
    </style>`;

/* -------------------------------------------------------------------- helpers */
function decode(s) {
    return s.replace(/&amp;/g, '&');
}

function ctaButton(btn, variant) {
    const cls = 'btn ' + variant;
    if (btn.openApply) {
        return `<button class="${cls}" type="button" data-open-apply>${icon(btn.icon)} ${btn.label}</button>`;
    }
    const ext = /^https?:/.test(btn.href);
    const attrs = ext ? ' target="_blank" rel="noopener"' : '';
    return `<a class="${cls}" href="${btn.href}"${attrs}>${icon(btn.icon)} ${btn.label}</a>`;
}

function icon(name) {
    return `<i class="${name}" aria-hidden="true"></i>`;
}

function render(page) {
    const url = ORIGIN + '/' + page.file;
    const name = decode(page.h1);
    const t = decode(page.title);

    /* One accent word in the hero <h1>, the treatment the homepage
       (.hero__title em) and the countries hero already use: Playfair italic
       in copper, via .req-hero h1 em in requirements.html. Only this one
       render site gets the markup - page.h1 itself stays plain because
       <title>, breadcrumbs, JSON-LD and the CSS comment take it as-is. */
    const h1Parts = page.h1.split(' ');
    const h1Last = h1Parts.pop();
    const h1Html = h1Parts.length ? h1Parts.join(' ') + ' <em>' + h1Last + '</em>' : page.h1;

    const toc = page.sections
        .map((s) => `<li><a href="#${s.id}">${s.title.replace(/&amp;/g, '&amp;')}</a></li>`)
        .join('\n                    ');

    const sections = page.sections
        .map(
            (s, i) => `
            <!-- ${i + 1}. ${decode(s.title)} -->
            <section class="req-section reveal" id="${s.id}">
                <div class="req-section__head">
                    <span class="req-section__num" aria-hidden="true">${i + 1}</span>
                    <h2>${s.title}</h2>
                </div>${s.html}
            </section>`
        )
        .join('\n');

    return `<!DOCTYPE html>
<html lang="en-GB" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <link rel="canonical" href="${url}">

    <link rel="icon" type="image/png" href="/favicon.png?v=5">
    <link rel="apple-touch-icon" href="/favicon.png?v=5">

    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:image" content="${ORIGIN}/logo-secondary.png">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${ORIGIN}/logo-secondary.png">

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "${ORIGIN}/#organization",
        "name": "Travelade Limited",
        "url": "${ORIGIN}",
        "logo": { "@type": "ImageObject", "url": "${ORIGIN}/logo-secondary.png" },
        "image": "${ORIGIN}/logo-secondary.png",
        "description": "UK-based Schengen visa consultancy helping applicants book appointments, prepare documents and file visa applications for all 29 Schengen countries.",
        "foundingDate": "2025",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "14 Pheasant Rise",
            "addressLocality": "Chesham",
            "addressRegion": "Buckinghamshire",
            "postalCode": "HP5 1NT",
            "addressCountry": "GB"
        },
        "areaServed": [
            { "@type": "Country", "name": "United Kingdom" },
            { "@type": "Place", "name": "Europe" }
        ],
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
        }],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+447575378991",
            "email": "info@travelade.co.uk",
            "contactType": "customer service",
            "areaServed": "GB",
            "availableLanguage": ["en"]
        }
    }
    </script>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "${url}#webpage",
        "url": "${url}",
        "name": "${t}",
        "description": "${page.description.replace(/"/g, '\\"')}",
        "inLanguage": "en-GB",
        "isPartOf": { "@id": "${ORIGIN}/#website" },
        "about": { "@id": "${ORIGIN}/#organization" }
    }
    </script>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "${ORIGIN}/" },
            { "@type": "ListItem", "position": 2, "name": "${name}", "item": "${url}" }
        ]
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="theme.css">
    <!-- The theme is resolved before the first paint, so a dark-theme visitor never
         sees a white flash while the stylesheet loads. localStorage wins, then the
         operating system preference. Nothing here depends on theme.js, which is
         deferred. -->
    <script>
    (function () {
        document.documentElement.classList.remove("no-js");
        try {
            var t = localStorage.getItem("travelade-theme");
            if (!t) t = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", t);
        } catch (e) {}
    })();
    </script>
    <meta name="theme-color" content="#05070C">
    <script src="theme.js" defer></script>

    <style>
        /* ---- ${page.h1.replace(/&amp;/g, '&')} local styles (from requirements.html) ---- */
${REQ_CSS}${LEGAL_CSS}
</head>
<body>

${NAV_CSS}

<main id="main-content">

<!-- =====================================================================
     HERO
     ===================================================================== -->
<section class="req-hero">
    <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
            <span aria-current="page">${page.h1}</span>
        </nav>
        <h1>${h1Html}</h1>
        <p class="subtitle">${page.subtitle}</p>
        <p class="legal-updated">${page.updated}</p>
    </div>
</section>

<!-- =====================================================================
     MAIN LAYOUT
     ===================================================================== -->
<div class="wrap">
    <div class="req-layout">

        <!-- SIDEBAR -->
        <aside class="req-sidebar" aria-label="Page contents">
            <nav class="req-toc" aria-label="Table of contents">
                <p class="req-toc__title">On this page</p>
                <ol>
                    <li><a href="#quick-summary">At a glance</a></li>
                    ${toc}
                    <li><a href="#start">Get in touch</a></li>
                </ol>
            </nav>
        </aside>

        <!-- MAIN CONTENT -->
        <div class="req-content">

            <!-- QUICK SUMMARY -->
            <div class="req-summary reveal" id="quick-summary">
                <div class="req-summary__icon" aria-hidden="true">
                    ${icon('fas ' + page.summary.icon)}
                </div>
                ${page.summary.html}
            </div>${sections}

            <!-- CTA -->
            <div class="req-cta reveal" id="start">
                <h2>${page.cta.h2}</h2>
                <p>${page.cta.p}</p>
                <div class="btn-row" style="justify-content:center;">
                    ${ctaButton(page.cta.primary, 'btn--primary')}
                    ${ctaButton(page.cta.secondary, 'btn--ghost-light')}
                </div>
            </div>

        </div><!-- /.req-content -->
    </div><!-- /.req-layout -->
</div><!-- /.wrap -->

</main>

${footer(page.file)}

${WA_FLOAT}

${applyDrawer()}

${COOKIE_CARD}

${COOKIE_SETTINGS}

${NAV_SCRIPT}

</body>
</html>
`;
}

/* ------------------------------------------------------------------- build */
let ok = 0;
PAGES.forEach((page) => {
    const out = path.join(ROOT, page.file);
    fs.writeFileSync(out, render(page));
    console.log('built ' + page.file + ' (' + page.sections.length + ' sections)');
    ok++;
});
console.log(ok + ' legal page(s) written.');
