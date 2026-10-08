/* ==========================================================================
   TRAVELADE - shared behaviour
   --------------------------------------------------------------------------
   Loaded with defer on every page. Four jobs:

     1. The Apply panel, which slides in from the left, plus the smaller
        centred dialogs (privacy, terms, refunds, package booking).
     2. The hero photograph rotation.
     3. The dark / light toggle.
     4. The scroll reveal and the FAQ accordion.

   Everything else stays in the page that needs it. Jobs 1 to 3 are each the
   single copy of logic that used to be duplicated across pages. Job 4 is here
   because leaving it in the individual pages meant three of the four content
   pages carried a .reveal rule with nothing on the page to undo it.
   ========================================================================== */

(function () {
    'use strict';

    /* Anything a keyboard can land on. Used for the focus trap, so it has to
       exclude hidden inputs - the formsubmit honeypot field is one. */
    var FOCUSABLE = [
        'a[href]',
        'button:not([disabled])',
        'input:not([type="hidden"]):not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    var lastFocus = null;

    /* ------------------------------------------------------------- scroll lock

       Hiding the scrollbar narrows the viewport by its width, which shifts
       every centred element on the page sideways by a few pixels while the
       dialog is open. Padding the body by the same amount cancels that out. */
    function lockScroll(on) {
        var gap = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = gap > 0 ? gap + 'px' : '';
        if (!on) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }

    function anyOpen() {
        return !!document.querySelector('.modal.is-open');
    }

    /* ---------------------------------------------------------------- open */
    function openModal(id) {
        var m = document.getElementById(id);
        if (!m) return;

        lastFocus = document.activeElement;
        /* The drawer stays in the DOM when closed so it can be transitioned,
           which means inert - not display:none - is what actually hides it
           from the keyboard and the screen reader. */
        m.removeAttribute('inert');
        m.classList.add('is-open');
        lockScroll(true);

        /* Prefer the first real field over the close button, so a keyboard
           user lands in the form rather than on the thing that dismisses it. */
        var panel = m.querySelector('.modal__box') || m;
        var f = panel.querySelector('input:not([type="hidden"]), select, textarea') ||
            panel.querySelector(FOCUSABLE);
        if (f) {
            try {
                f.focus({ preventScroll: true });
            } catch (e) {
                f.focus();
            }
        }
    }

    /* --------------------------------------------------------------- close */
    function closeModal(id) {
        var m = document.getElementById(id);
        if (!m) return;

        m.classList.remove('is-open');
        if (m.classList.contains('modal--drawer')) m.setAttribute('inert', '');

        if (!anyOpen()) lockScroll(false);
        if (lastFocus && typeof lastFocus.focus === 'function') {
            try {
                lastFocus.focus({ preventScroll: true });
            } catch (e) { /* element may be gone */ }
        }
    }

    /* Page scripts still call these by name. */
    window.openModal = openModal;
    window.closeModal = closeModal;

    /* ------------------------------------------------- destination preselect

       The country cards on the destinations page carry data-destination, so
       picking France should not then make the applicant pick France again. */
    function preselectDestination(name) {
        var sel = document.getElementById('a-dest');
        if (!sel || !name) return;
        for (var i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === name || sel.options[i].text === name) {
                sel.value = sel.options[i].value;
                return;
            }
        }
        /* Not in the list. Rather than silently ignoring the click, add it so
           the applicant can see what was chosen and change it. */
        var opt = document.createElement('option');
        opt.text = name;
        sel.appendChild(opt);
        sel.value = name;
    }

    /* ---------------------------------------------------------- delegation

       One listener for the whole document, so markup added later still works
       and so four pages do not each need their own copy. */
    var OPENERS = {
        'data-open-apply': 'applyModal',
        'data-open-privacy': 'privacyModal',
        'data-open-terms': 'termsModal',
        'data-open-refund': 'refundModal',
        'data-open-cookie-settings': 'cookieSettingsModal'
    };

    document.addEventListener('click', function (e) {
        var t = e.target;
        if (!t || !t.closest) return;

        var closer = t.closest('[data-close]');
        if (closer) {
            var host = closer.closest('.modal');
            if (host) {
                e.preventDefault();
                closeModal(host.id);
            }
            return;
        }

        /* A click on the scrim itself. The panel is a child element, so a
           click inside it never reaches this branch. */
        if (t.classList && t.classList.contains('modal')) {
            closeModal(t.id);
            return;
        }

        for (var attr in OPENERS) {
            var trigger = t.closest('[' + attr + ']');
            if (!trigger) continue;
            e.preventDefault();
            if (attr === 'data-open-apply') {
                preselectDestination(trigger.getAttribute('data-destination'));
            }
            openModal(OPENERS[attr]);
            return;
        }
    });

    /* ------------------------------------------------------ keyboard control */
    document.addEventListener('keydown', function (e) {
        var open = document.querySelector('.modal.is-open');
        if (!open) return;

        if (e.key === 'Escape') {
            closeModal(open.id);
            return;
        }

        if (e.key !== 'Tab') return;

        /* Keep Tab inside the open dialog. Without this, tabbing off the last
           field drops the user behind the scrim, onto a page they cannot see. */
        var panel = open.querySelector('.modal__box') || open;
        var items = [];
        Array.prototype.forEach.call(panel.querySelectorAll(FOCUSABLE), function (el) {
            if (el.offsetWidth || el.offsetHeight || el.getClientRects().length) items.push(el);
        });
        if (!items.length) return;

        var first = items[0];
        var last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    /* ==========================================================================
       HERO PHOTOGRAPH ROTATION
       --------------------------------------------------------------------------
       Three photographs cross-faded on opacity, each one creeping up and
       scaling for as long as it is on screen. The drift is the point: a hero
       that holds still reads as a banner, and a hero that moves slowly reads
       as expensive. The dwell matches the drift, so each photograph finishes
       its move exactly as it fades out.

       There is nothing on screen to stop it - no dots, no pause button - by
       design. What is left instead:

         - prefers-reduced-motion. The drift is gated on no-preference in the
           CSS and the rotation is skipped here, so the hero is one
           photograph, held. That is a setting the visitor controls in their
           operating system, not something this site decides for them.
         - the pointer. The photograph stops changing while it is anywhere
           over the hero, so it cannot swap out from under somebody who is
           reaching for a button.
         - the tab. It stops in a tab nobody is looking at.

       Recorded so the missing control is not later read as a bug: WCAG 2.2
       SC 2.2.2 asks for a mechanism to pause content that starts by itself,
       runs past five seconds and moves alongside other content. This hero is
       all three and has no such mechanism on screen. Deliberate, with the
       reduced-motion path as the mitigation.
       ========================================================================== */
    (function heroCarousel() {
        'use strict';

        var stage = document.querySelector('.hero__bg');
        if (!stage) return;

        var photos = Array.prototype.slice.call(stage.querySelectorAll('img'));
        if (photos.length < 2) return;

        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var DWELL = 7000;
        var index = 0;
        var timer = null;

        function show(n) {
            index = (n + photos.length) % photos.length;
            photos.forEach(function (img, i) {
                img.classList.toggle('is-active', i === index);
            });
        }

        function stop() {
            if (timer) { window.clearInterval(timer); timer = null; }
        }

        function play() {
            stop();
            if (reduce) return;
            timer = window.setInterval(function () { show(index + 1); }, DWELL);
        }

        stage.addEventListener('mouseenter', stop);
        stage.addEventListener('mouseleave', play);

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stop(); else play();
        });

        show(0);
        play();
    })();


    /* ==========================================================================
       DARK / LIGHT TOGGLE
       --------------------------------------------------------------------------
       The theme itself is resolved by an inline script in <head>, before the
       first paint, so nothing here has to prevent a flash - this only has to
       keep the button, the browser chrome colour and the stored preference in
       step with what is already on <html>.

       There is no reset button and no three-way switch. Someone arriving on a
       dark site at night wants light to be one press away; someone arriving
       during the day has already been given light by the media query. Neither
       of them wants a settings panel. localStorage is the only state that
       survives, because a choice is a choice: the OS preference is not
       consulted again once someone has expressed one.
       ========================================================================== */
    (function themeToggle() {
        var btn = document.getElementById('themeBtn');
        if (!btn) return;

        var root = document.documentElement;
        var meta = document.querySelector('meta[name="theme-color"]');
        var KEY = 'travelade-theme';

        /* Matched to --surface in theme.css. Kept here as literals rather than
           read back from the cascade so the value is available before layout. */
        var CHROME = { dark: '#05070C', light: '#FFFFFF' };
        var GLYPH = { dark: 'fa-moon', light: 'fa-sun' };

        function current() {
            return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        }

        function paint() {
            var t = current();
            btn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
            btn.setAttribute('title', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
            var i = btn.querySelector('i');
            if (i) i.className = 'fas ' + GLYPH[t];
            if (meta) meta.setAttribute('content', CHROME[t]);
        }

        btn.addEventListener('click', function () {
            var next = current() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem(KEY, next); } catch (e) {}
            paint();
        });

        /* If the OS flips while the tab is in the background - which is how
           most phones do it at sunset - follow it, but only while the visitor
           has not expressed a preference of their own. */
        var mq = window.matchMedia('(prefers-color-scheme: light)');
        var onScheme = function (e) {
            var stored = null;
            try { stored = localStorage.getItem(KEY); } catch (err) {}
            if (stored) return;
            root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
            paint();
        };
        if (mq.addEventListener) mq.addEventListener('change', onScheme);
        else if (mq.addListener) mq.addListener(onScheme);

        paint();
    })();

    /* ==========================================================================
       SCROLL REVEAL AND FAQ ACCORDION
       --------------------------------------------------------------------------
       Both of these used to sit in the inline script of whichever page seemed
       to need them. Three of the four content pages therefore carried a
       .reveal rule, which sets opacity: 0, with no observer anywhere on the
       page to undo it - every section on those pages was invisible and stayed
       that way. faq.html had twenty-five questions and no handler at all, so
       none of its answers could be opened.

       They are here now, once, for every page. A page with no .reveal element
       or no .faq-q simply matches nothing and does nothing.
       ========================================================================== */
    (function revealAndAccordion() {
        'use strict';

        var els = [].slice.call(document.querySelectorAll('.reveal'));

        if (!('IntersectionObserver' in window)) {
            /* Without an observer there is no way to know what is on screen,
               so nothing is held back. no-observer is the class the stylesheet
               already looks for to force the content visible. */
            els.forEach(function (el) { el.classList.add('no-observer'); });
        } else {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                    if (!en.isIntersecting) return;
                    en.target.classList.add('active');
                    io.unobserve(en.target);
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
            els.forEach(function (el) { io.observe(el); });
        }

        /* One toggle handler for every .faq-q on the site: pressing a question opens
           its answer, pressing it again closes it.

           This has to stay bound to all of them rather than to the homepage's
           only. faq.html shares these classes, and scoping the listener itself
           to .faq-home left its 25 questions with no handler at all - the
           buttons still looked like accordions and did nothing when pressed.

           What is homepage-only is closing the other answers. There it is one
           column of five questions, and a single open answer is what stops the
           section growing by a screenful every time the reader is curious. The
           outgoing answer is closed in the same frame as the incoming one opens,
           and before it, so the two animate together - the new answer slides
           down while the one above it slides up and the section never jumps. Its
           button's aria-expanded is updated as well, otherwise a screen reader
           would still be reading that answer as expanded.

           faq.html is left as it was: its questions are grouped by topic, and
           being able to have two answers open side by side in the same group is
           worth more there than keeping that page short. The lookup is by
           ancestor list rather than by counting questions, so a second list
           added to the homepage later would stay independent of the first
           instead of one list's answer closing the other's. */
        document.querySelectorAll('.faq-q').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var panel = btn.nextElementSibling;
                if (!panel) return;
                var open = btn.getAttribute('aria-expanded') === 'true';

                if (!open) {
                    var list = btn.closest('.faq-home .faq-list');
                    if (list) {
                        [].slice.call(list.querySelectorAll('.faq-q')).forEach(function (other) {
                            if (other === btn) return;
                            if (other.getAttribute('aria-expanded') !== 'true') return;
                            var otherPanel = other.nextElementSibling;
                            if (!otherPanel) return;
                            other.setAttribute('aria-expanded', 'false');
                            otherPanel.classList.remove('is-open');
                        });
                    }
                }

                btn.setAttribute('aria-expanded', open ? 'false' : 'true');
                panel.classList.toggle('is-open', !open);
            });
        });
    })();

    /* ==========================================================================
       DESTINATION FILTER
       --------------------------------------------------------------------------
       Region chips plus a search box over the country grid on the homepage.
       Both narrow the same set of cards: a card has to satisfy the selected
       region and the typed text to stay on screen.

       One thing worth knowing if this is changed later. The cards are .reveal
       elements, which start at opacity 0 and are made visible by an
       IntersectionObserver. A card that is display:none when the observer first
       runs never intersects, so it never collects .active, and would stay
       invisible for good once a filter brought it back. That is why show()
       below sets .active on every card it unhides rather than trusting the
       observer to catch up.
       ========================================================================== */
    (function destinationFilter() {
        'use strict';

        var bar = document.querySelector('.filterbar');
        var grid = document.querySelector('.dest-grid');
        if (!bar || !grid) return;

        var chips = [].slice.call(bar.querySelectorAll('.chip'));
        var input = bar.querySelector('.home-search input');
        var empty = document.querySelector('.dest-empty');
        var cards = [].slice.call(grid.querySelectorAll('.dest'));
        /* The chips are optional: the homepage pairs them with the search box,
           while countries.html runs the box on its own. Everything from the
           filter logic down treats an empty chip list as "All". */
        if (!input || !cards.length) return;

        /* Travelade covers the Schengen area, so the two chips are the whole
           story: All, and Europe, which is everything. The wider region set is
           deliberately absent rather than present-but-empty - a chip that can
           only ever return nothing is a worse message than no chip at all, and
           the search box already reaches every country we do handle. */

        function normalise(s) {
            return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        }

        /* Read once. The country name and the capital are what a visitor would
           type, and the href carries the country slug too, so "cze" reaches
           Czechia even though the visible text reads "Czech Republic". */
        cards.forEach(function (card) {
            var bits = [];
            var name = card.querySelector('.dest__country');
            var city = card.querySelector('.dest__city');
            if (name) bits.push(name.textContent);
            if (city) bits.push(city.textContent);
            var href = card.getAttribute('href') || '';
            var frag = href.split('#')[1] || '';
            var pathSlug = (href.split('/').pop().split('.')[0] || '');
            var slug = (frag || pathSlug).replace(/-/g, ' ');
            bits.push(slug);
            card.setAttribute('data-search', normalise(bits.join(' ')));
            card.setAttribute('data-region', card.getAttribute('data-region') || 'europe');
        });

        var region = 'all';

        function show() {
            var q = normalise(input.value || '');
            var visible = 0;

            cards.forEach(function (card) {
                var okRegion = region === 'all' || card.getAttribute('data-region') === region;
                var okText = !q || card.getAttribute('data-search').indexOf(q) !== -1;

                /* The nine on-demand countries are the ones countries.html
                   documents but the grid does not show. They answer to a search
                   that names them and to nothing else, so the test is for a
                   query being present at all - not for a match. Testing the
                   match instead would let them all back in the moment the box
                   was empty, and the grid would spill onto a fifth row and stop
                   being 5x4. */
                var onDemand = card.classList.contains('dest--ondemand');
                var on = okRegion && okText && (!onDemand || !!q);
                var wasHidden = card.hidden;
                card.hidden = !on;
                if (on) {
                    visible++;
                    /* See the note at the top: a card that was hidden when the
                       reveal observer first ran never intersects, so it never
                       collects .active and would stay at opacity 0 for good.
                       Only cards this code has actually hidden are forced
                       visible though - doing it to every card would make the
                       whole grid animate in on load and take the scroll reveal
                       away from a section that sits below the fold. */
                    if (wasHidden) card.classList.add('active');
                }
            });

            if (empty) {
                var msg = empty.querySelector('.dest-empty__msg');
                if (!visible) {
                    msg.textContent = q
                        ? 'Nothing matches “' + input.value.trim() + '”.'
                        : 'Nothing matches that.';
                    empty.hidden = false;
                } else {
                    empty.hidden = true;
                }
            }
        }

        var clearBtn = empty && empty.querySelector('.dest-empty__clear');
        if (clearBtn) clearBtn.addEventListener('click', reset);

        function reset() {
            region = 'all';
            input.value = '';
            chips.forEach(function (c) {
                var on = c.getAttribute('data-region') === 'all';
                c.classList.toggle('on', on);
                c.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            show();
        }

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                region = chip.getAttribute('data-region');
                chips.forEach(function (c) {
                    var on = c === chip;
                    c.classList.toggle('on', on);
                    c.setAttribute('aria-pressed', on ? 'true' : 'false');
                });
                show();
            });
        });

        input.addEventListener('input', show);

        /* Escape in the search box puts it back to showing everything, which is
           the one shortcut people reach for when they mistype. */
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && input.value) {
                e.preventDefault();
                reset();
            }
        });

        /* Firefox restores its own form state on a back/forward navigation,
           which would leave the search box holding text the grid had forgotten. */
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) reset();
        });

        show();
    })();

})();

/* --------------------------------------------------------------- logo home
   Clicking the navbar logo always returns visitors to the homepage,
   regardless of what page they're on. */
    (function () {
        var logos = document.querySelectorAll('.nav__logo');
        if (!logos.length) return;
        logos.forEach(function (logo) {
            logo.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        });
    })();

/* ---------------------------------------------------------------- cookie consent
   A first-visit card, styled like the ones every reputable site runs: one
   question, two honest answers. There are no advertising or tracking cookies
   on this site, so "Essential only" is a real answer, not a placebo - it
   records the preference and stops the card coming back.

   The card is display:none in the stylesheet until .is-shown is added, so
   nothing flashes for a returning visitor. localStorage remembers the choice
   per device; the cookie policy explains how to withdraw it.

   The card's "Cookie settings" link does not navigate to the policy page -
   the shared delegation above opens cookieSettingsModal instead (it is one
   of OPENERS), so the visitor can read what is stored and answer without
   leaving the page. Both the dialog's buttons and the card's record into the
   same key, then dismiss everything. */
(function () {
    var COOKIE_KEY = 'travelade-cookies';
    var card = document.getElementById('ckCard');
    if (!card) return;

    var overlay = document.querySelector('.ck-overlay');
    var accept = document.getElementById('ckAccept');
    var reject = document.getElementById('ckReject');
    var current = document.getElementById('ckCurrent');
    var settings = document.getElementById('cookieSettingsModal');
    var stored = null;
    try { stored = localStorage.getItem(COOKIE_KEY); } catch (e) {}

    function hideCard() {
        if (overlay) overlay.classList.remove('is-shown');
        card.classList.remove('is-shown');
    }

    /* One document-level click listener, registered after the delegation
       above so it runs after it on the same click. Two jobs: park focus on
       the primary button once the settings dialog has opened, and record the
       answer picked inside it. */
    document.addEventListener('click', function (e) {
        var t = e.target;
        if (!t || !t.closest) return;

        if (t.closest('[data-open-cookie-settings]')) {
            var primary = document.getElementById('ckSetAccept');
            if (primary) primary.focus();
            return;
        }

        var btn = t.closest('#ckSetAccept, #ckSetReject');
        if (!btn) return;
        stored = btn.id === 'ckSetAccept' ? 'accepted' : 'essential-only';
        try { localStorage.setItem(COOKIE_KEY, stored); } catch (err) {}
        hideCard();
        /* The dialog's data-close has already restored focus to its trigger,
           which lives in the card just hidden - drop it on the page instead
           of on an invisible link. */
        try {
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        } catch (err) { /* nothing to blur to */ }
    });

    if (stored) return;

    var lastFocus = null;

    function open() {
        lastFocus = document.activeElement;
        if (overlay) overlay.classList.add('is-shown');
        card.classList.add('is-shown');
        if (accept) accept.focus();
    }

    function close(choice) {
        hideCard();
        try { localStorage.setItem(COOKIE_KEY, choice); } catch (e) {}
        if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
    }

    /* No analytics exist to report on, so the status line stays empty on a
       first visit; it is populated if the card is ever re-opened while a
       choice already stands (the cookie policy links back to it). */
    if (current) current.style.display = 'none';

    /* The settings dialog can be answered before this timer fires (its
       markup is in the DOM from load, hidden), so re-read the key at fire
       time rather than trusting the value captured above. */
    setTimeout(function () {
        try { stored = localStorage.getItem(COOKIE_KEY); } catch (e) {}
        if (stored) return;
        open();
    }, 700);

    if (accept) accept.addEventListener('click', function () { close('accepted'); });
    if (reject) reject.addEventListener('click', function () { close('essential-only'); });

    /* Capture phase, deliberately. The settings dialog's Escape and Tab are
       the shared modal handler's job in the bubble phase below, so this runs
       first and can see the dialog still open: while it is up, the card
       keeps its hands off the keyboard entirely. Once it is closed the guard
       fails and the card's own Escape / Tab handling takes over again. */
    document.addEventListener('keydown', function (e) {
        if (settings && settings.classList.contains('is-open')) return;
        if (!card.classList.contains('is-shown')) return;
        /* Escape counts as "Essential only" - the safe answer, never accept. */
        if (e.key === 'Escape') { e.preventDefault(); close('essential-only'); return; }
        /* Keep Tab inside the card while it is up. */
        if (e.key !== 'Tab') return;
        var f = card.querySelectorAll('button, a[href]');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }, true);
})();