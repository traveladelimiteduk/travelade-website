/*
 * Shared page chrome for the static site: the first-visit cookie card, the
 * footer (with the four legal pages linked), the apply drawer, and the
 * nav script. Used by build-legal-pages.js and sync-cookie-card.js so the
 * markup can only ever drift in one place.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

/* ---------------------------------------------------------------- cookie card */

const COOKIE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="M12 2a10 10 0 1 0 10 10 3.2 3.2 0 0 1-4.6-3.4A3.2 3.2 0 0 1 12 2z"></path><circle cx="9.2" cy="10" r="1" fill="currentColor" stroke="none"></circle><circle cx="14.4" cy="14.6" r="1" fill="currentColor" stroke="none"></circle><circle cx="8.6" cy="15.4" r="1" fill="currentColor" stroke="none"></circle></svg>`;

const COOKIE_CARD = `<!-- Cookie consent -->
<div class="ck-overlay" aria-hidden="true"></div>
<div class="ck-card" id="ckCard" role="dialog" aria-modal="true" aria-labelledby="ck-title">
    <div class="ck-head">
        <span class="ck-badge" aria-hidden="true">
            ${COOKIE_SVG}
        </span>
        <h2 id="ck-title">Cookies on this site</h2>
    </div>
    <p class="ck-body" id="ckBody">
        We use a couple of essential cookies to keep the site working and to remember your display settings. No analytics, advertising or tracking &mdash; ever.
        <span class="ck-current" id="ckCurrent"></span>
    </p>
    <div class="ck-actions">
        <button type="button" class="ck-btn ck-btn-accept" id="ckAccept">Accept cookies</button>
        <button type="button" class="ck-btn ck-btn-reject" id="ckReject">Essential only</button>
    </div>
    <p class="ck-foot">Your choice is saved on this device. <a href="cookie-policy.html" data-open-cookie-settings>Cookie&nbsp;settings</a> &middot; <a href="privacy-policy.html">Privacy&nbsp;policy</a></p>
</div>`;

/* The card's and the footer's "Cookie settings" links open this dialog in
   place of navigating to the policy page - the same two answers, in a popup,
   without leaving the page. The href stays on the policy link so a browser
   with JavaScript off still lands somewhere useful. The dialog sits one layer
   above the card (theme.css #cookieSettingsModal, z-index 410 vs the card's
   390). */
const COOKIE_SETTINGS = `<!-- Cookie settings popup -->
<div class="modal" id="cookieSettingsModal" role="dialog" aria-modal="true" aria-labelledby="ckSettingsTitle">
    <div class="modal__box" style="max-width:560px;">
        <div class="ck-head">
            <span class="ck-badge" aria-hidden="true">${COOKIE_SVG}</span>
            <h2 id="ckSettingsTitle">Cookie settings</h2>
        </div>
        <div class="prose">
            <p>This site stores two things in your browser, on this device only:</p>
            <ul>
                <li><strong>Your cookie choice</strong> &mdash; so this question is only asked once.</li>
                <li><strong>Your display theme</strong> &mdash; light or dark, remembered between visits.</li>
            </ul>
            <p>Both are essential to how the site behaves. There are no analytics, advertising or tracking cookies, and nothing about your visit is shared with anyone else.</p>
        </div>
        <div class="ck-actions">
            <button type="button" class="ck-btn ck-btn-accept" id="ckSetAccept" data-close>Accept cookies</button>
            <button type="button" class="ck-btn ck-btn-reject" id="ckSetReject" data-close>Essential only</button>
        </div>
        <p class="ck-foot">Either button records your answer on this device.</p>
        <button class="modal__x" type="button" data-close aria-label="Close cookie settings"><i class="fas fa-times" aria-hidden="true"></i></button>
    </div>
</div>`;

/* ------------------------------------------------------------------- footer */

/* current: file name of the page being rendered, or null. The matching
   Company link gets aria-current="page". */
function footer(current) {
    const link = (file, label) =>
        `<li><a href="${file}"${current === file ? ' aria-current="page"' : ''}>${label}</a></li>`;
    return `<footer class="footer">
    <div class="wrap">
        <div class="footer__grid">
            <div class="footer__brand">
                <img class="footer__logo-img footer__logo-img--blue" src="logo-nav-blue.png" alt="Travelade" width="164" height="50" loading="lazy" decoding="async">
                <img class="footer__logo-img footer__logo-img--dark" src="logo-nav-dark.png" alt="" width="164" height="50" loading="lazy" decoding="async">
                <p>UK-based Schengen visa specialists. Appointment booking, document preparation and application filing for all 29 Schengen countries.</p>
                <div class="footer__social">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
                    <a href="https://g.page/r/CVdyj7CAiUSWEAI/review" target="_blank" rel="noopener" aria-label="Google reviews"><i class="fab fa-google" aria-hidden="true"></i></a>
                </div>
            </div>

            <div>
                <h2>Apply</h2>
                <ul class="footer__links">
                    <li><a href="#" data-open-apply>Start an application</a></li>
                </ul>
            </div>

            <div>
                <h2>Company</h2>
                <ul class="footer__links">
                    ${link('countries.html', 'All 29 countries')}
                    ${link('requirements.html', 'Document checklist')}
                    ${link('faq.html', 'FAQ')}
                    ${link('refund-policy.html', 'Refund policy')}
                    ${link('terms-and-conditions.html', 'Terms &amp; conditions')}
                    ${link('privacy-policy.html', 'Privacy policy')}
                    <li><a href="cookie-policy.html" data-open-cookie-settings>Cookie settings</a></li>
                </ul>
            </div>

            <div>
                <h2>Contact</h2>
                <ul class="footer__contact">
                    <li>
                        <i class="fas fa-location-dot" aria-hidden="true"></i>
                        <span>14 Pheasant Rise, Chesham,<br>Buckinghamshire, HP5 1NT</span>
                    </li>
                    <li>
                        <i class="fas fa-phone" aria-hidden="true"></i>
                        <a href="tel:+447575378991">+44 7575 378991</a>
                    </li>
                    <li>
                        <i class="fab fa-whatsapp" aria-hidden="true"></i>
                        <a href="https://wa.me/447575378991" target="_blank" rel="noopener">WhatsApp us</a>
                    </li>
                    <li>
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                        <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a>
                    </li>
                    <li>
                        <i class="fas fa-clock" aria-hidden="true"></i>
                        <span>Mon&ndash;Sat, 9:00&ndash;18:00</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="footer__bottom">
            <span>&copy; 2026 Travelade Limited. All rights reserved. Registered in England &amp; Wales, Company Reg No. 17205750. Not affiliated with any government body.</span>
        </div>
    </div>
</footer>`;
}

/* ------------------------------------------------------------- apply drawer */

function applyDrawer() {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const start = html.indexOf('<div class="modal modal--drawer" id="applyModal"');
    if (start === -1) throw new Error('apply drawer markup not found in index.html');

    /* Walk the div tree from the opening tag so nested rows inside the form
       cannot truncate the slice — a plain lazy regex stops at the first
       triple close, which lands mid-form. */
    const tagRe = /<div\b|<\/div>/g;
    tagRe.lastIndex = start;
    let depth = 0;
    let m;
    while ((m = tagRe.exec(html)) !== null) {
        depth += m[0] === '</div>' ? -1 : 1;
        if (depth === 0) return html.slice(start, tagRe.lastIndex);
    }
    throw new Error('unbalanced apply drawer markup in index.html');
}

/* ---------------------------------------------------------------- nav script */

const NAV_SCRIPT = `<script>
(function () {
    var nav = document.getElementById('nav');
    var burger = document.getElementById('navBurger');
    var panel = document.getElementById('navPanel');
    var scrim = document.getElementById('navScrim');
    var closeBtn = document.getElementById('navClose');

    function onScroll() {
        if (window.scrollY > 24) nav.classList.add('nav--solid');
        else nav.classList.remove('nav--solid');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function openMenu() {
        panel.classList.add('is-open'); scrim.classList.add('is-open');
        scrim.hidden = false; burger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('inert'); panel.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; closeBtn.focus();
    }
    function closeMenu() {
        panel.classList.remove('is-open'); scrim.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false'); panel.setAttribute('inert', '');
        panel.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
        setTimeout(function () { scrim.hidden = true; }, 260);
    }
    burger.addEventListener('click', function () {
        if (panel.classList.contains('is-open')) closeMenu(); else openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    scrim.addEventListener('click', closeMenu);
    panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && panel.classList.contains('is-open')) closeMenu();
    });

    document.querySelectorAll('.nav__logo').forEach(function (logo) {
        logo.addEventListener('click', function (e) {
            if (window.innerWidth <= 940) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        });
    });
})();
</script>`;

module.exports = { COOKIE_CARD, COOKIE_SETTINGS, footer, applyDrawer, NAV_SCRIPT };
