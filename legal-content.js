/*
 * Content for the four legal pages (privacy, refund, terms, cookie).
 * Rendered by build-legal-pages.js into the requirements-page design:
 * navy hero + breadcrumbs, sticky numbered TOC, summary box, numbered
 * sections, and the closing CTA.
 *
 * All facts here were carried over from the original hand-written pages
 * (company details, retention periods, refund timescales, ICO contact).
 * Edit this file, then re-run:  node build/build-legal-pages.js
 */
'use strict';

module.exports = [
    /* ===================================================== PRIVACY POLICY */
    {
        file: 'privacy-policy.html',
        title: 'Privacy Policy | How We Handle Your Data | Travelade',
        description: "Travelade Limited's privacy policy — what personal data we collect, why we're allowed to, who sees it, how long we keep it, and the rights you have under the UK GDPR.",
        h1: 'Privacy Policy',
        subtitle: 'What we collect, why we collect it, who sees it, and the rights you have over it — in plain English.',
        updated: 'Last updated: 8 October 2026',
        summary: {
            icon: 'fa-user-shield',
            html: '<p>We collect only what your visa application needs — identity, contact details, travel plans and the documents you send. <strong>We never sell your data</strong>, this site sets no tracking cookies, and you can ask for a copy of everything we hold at any time. We reply within one month.</p>'
        },
        sections: [
            {
                id: 'who-we-are',
                title: 'Who we are',
                html: `
<p>Travelade Limited ("Travelade", "we") is a UK-based visa consultancy and the <strong>data controller</strong> for the personal information you give us — through this website, by email, on the phone or over WhatsApp. We handle your data under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
<ul class="purpose-list">
    <li><i class="fas fa-building" aria-hidden="true"></i><span><strong>Travelade Limited</strong> — registered in England &amp; Wales, company number 17205750</span></li>
    <li><i class="fas fa-location-dot" aria-hidden="true"></i><span>14 Pheasant Rise, Chesham, Buckinghamshire, HP5 1NT</span></li>
    <li><i class="fas fa-envelope" aria-hidden="true"></i><span><a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a> &middot; <a href="tel:+447575378991">+44 7575 378991</a> &middot; Monday to Saturday, 9:00&ndash;18:00</span></li>
</ul>`
            },
            {
                id: 'what-we-collect',
                title: 'What we collect',
                html: `
<p>Only what your application actually needs. Nothing is collected simply because you visited this website — there is no advertising or tracking here.</p>
<div class="doc-cards">
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-id-card"></i></div>
        <h3>Identity &amp; contact</h3>
        <p class="doc-card__detail">Full name, date of birth, nationality, passport details, email address, phone number and postal address.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-plane-departure"></i></div>
        <h3>Travel &amp; application</h3>
        <p class="doc-card__detail">Destination country, travel dates, purpose of travel, visa history, and the supporting documents you send us — financial statements, employment letters, accommodation bookings and similar.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-comments"></i></div>
        <h3>Communications</h3>
        <p class="doc-card__detail">Records of correspondence between us — email, telephone, WhatsApp and web-form messages — so your file stays consistent whoever you speak to.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-receipt"></i></div>
        <h3>Payments &amp; records</h3>
        <p class="doc-card__detail">Payment references and the financial records we must keep for accounting. <strong>We never see or store your card details</strong> — payments are made by bank transfer, outside this website.</p>
    </article>
</div>
<div class="doc-card__warn"><i class="fas fa-server" aria-hidden="true"></i><span>Technical data: our hosting provider's server logs record your IP address, browser type and the pages requested — used only for security and uptime, never for profiling.</span></div>`
            },
            {
                id: 'legal-bases',
                title: "Why we're allowed to",
                html: `
<p>UK GDPR requires a lawful basis for every use of your data. Here is exactly what we rely on:</p>
<ul class="purpose-list">
    <li><i class="fas fa-file-contract" aria-hidden="true"></i><span><strong>Contract — Article 6(1)(b).</strong> Providing the service you asked for: preparing your documents, completing forms and booking appointments on your behalf.</span></li>
    <li><i class="fas fa-balance-scale" aria-hidden="true"></i><span><strong>Legitimate interests — Article 6(1)(f).</strong> Replying to enquiries, keeping records and improving the service — always balanced against your rights and interests.</span></li>
    <li><i class="fas fa-landmark" aria-hidden="true"></i><span><strong>Legal obligation — Article 6(1)(c).</strong> Financial and tax records we are required by law to keep.</span></li>
    <li><i class="fas fa-check-circle" aria-hidden="true"></i><span><strong>Consent — Article 6(1)(a).</strong> Marketing messages only. Opt in freely, and withdraw it whenever you like by emailing us.</span></li>
</ul>`
            },
            {
                id: 'how-we-use-it',
                title: 'How we use it',
                html: `
<p>What we actually do with it:</p>
<ul class="purpose-list">
    <li><i class="fas fa-check" aria-hidden="true"></i><span>Assess your visa requirements and advise the right application route</span></li>
    <li><i class="fas fa-check" aria-hidden="true"></i><span>Prepare, complete and submit your application and supporting documents</span></li>
    <li><i class="fas fa-check" aria-hidden="true"></i><span>Book your appointment at a visa application centre — commonly VFS Global or TLScontact</span></li>
    <li><i class="fas fa-check" aria-hidden="true"></i><span>Keep you updated on progress and answer your questions</span></li>
    <li><i class="fas fa-check" aria-hidden="true"></i><span>Process payments and maintain accurate financial records</span></li>
    <li><i class="fas fa-check" aria-hidden="true"></i><span>Meet our legal obligations and send service notifications about your application</span></li>
</ul>
<p>We will <strong>not</strong> use your data for automated decision-making or profiling that produces legal or similarly significant effects about you.</p>`
            },
            {
                id: 'who-we-share',
                title: 'Who we share it with',
                html: `
<p><strong>We never sell, rent or trade your personal data.</strong> We share only what is necessary to deliver the service you asked for, or where the law requires it.</p>
<div class="doc-cards">
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-stamp"></i></div>
        <h3>Visa application centres</h3>
        <p class="doc-card__detail">Your application goes to the official centre for your destination — commonly VFS Global or TLScontact, acting as processing agents for the consulate.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-building-columns"></i></div>
        <h3>Consulates &amp; embassies</h3>
        <p class="doc-card__detail">The destination country's consulate receives your application and makes the final decision. That decision is entirely theirs.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-paper-plane"></i></div>
        <h3>Formsubmit.co</h3>
        <p class="doc-card__detail">Our contact forms route your enquiry to our inbox through Formsubmit.co, which processes the message you send. Their own privacy policy applies to that step.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-user-tie"></i></div>
        <h3>Professional advisers</h3>
        <p class="doc-card__detail">Solicitors, accountants or insurers — only where strictly necessary to run our business lawfully.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-gavel"></i></div>
        <h3>Authorities</h3>
        <p class="doc-card__detail">Law enforcement or regulators — only if the law or a valid legal request requires us to disclose it.</p>
    </article>
</div>
<p>Every third party we engage must handle your personal data in line with applicable data protection law.</p>`
            },
            {
                id: 'retention',
                title: 'How long we keep it',
                html: `
<p>For as long as the purpose needs it — and no longer. In practice:</p>
<div style="overflow-x: auto; margin-bottom: 20px;">
<table class="country-rule-table">
    <thead>
        <tr><th scope="col">What we hold</th><th scope="col">How long</th></tr>
    </thead>
    <tbody>
        <tr>
            <td>Application and correspondence records</td>
            <td><strong>Up to 6 years</strong> after your matter concludes — the Limitation Act 1980 and HMRC record-keeping rules.</td>
        </tr>
        <tr>
            <td>Enquiries that don't become instructions</td>
            <td><strong>12 months</strong>, then securely deleted.</td>
        </tr>
        <tr>
            <td>Marketing consent (where given)</td>
            <td><strong>Reviewed annually</strong> and deleted if you haven't re-engaged with us.</td>
        </tr>
    </tbody>
</table>
</div>
<p>When your data is no longer required, we delete or anonymise it securely.</p>`
            },
            {
                id: 'your-rights',
                title: 'Your rights',
                html: `
<p>Under the UK GDPR you have seven rights over the data we hold about you:</p>
<ul class="purpose-list">
    <li><i class="fas fa-eye" aria-hidden="true"></i><span><strong>Access</strong> — a copy of the personal data we hold (a Subject Access Request).</span></li>
    <li><i class="fas fa-pen" aria-hidden="true"></i><span><strong>Rectification</strong> — correction of anything inaccurate or incomplete.</span></li>
    <li><i class="fas fa-trash-can" aria-hidden="true"></i><span><strong>Erasure</strong> — deletion where we have no continuing legal reason to keep it ("the right to be forgotten").</span></li>
    <li><i class="fas fa-pause" aria-hidden="true"></i><span><strong>Restriction</strong> — pause processing while a dispute about accuracy is resolved.</span></li>
    <li><i class="fas fa-file-export" aria-hidden="true"></i><span><strong>Portability</strong> — your data in a structured, machine-readable format where processing is contract- or consent-based.</span></li>
    <li><i class="fas fa-hand" aria-hidden="true"></i><span><strong>Object</strong> — stop processing based on legitimate interests, unless we can demonstrate compelling grounds that override your interests.</span></li>
    <li><i class="fas fa-robot" aria-hidden="true"></i><span><strong>No automated decisions</strong> — you are never subject to a decision based solely on automated processing with legal or similarly significant effects.</span></li>
</ul>
<p>To exercise any of these rights, email <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a>. We respond within <strong>one calendar month</strong>, free of charge, unless a request is manifestly unfounded or excessive.</p>`
            },
            {
                id: 'cookies',
                title: 'Cookies and analytics',
                html: `
<p>This website runs <strong>no analytics, advertising or tracking cookies</strong>. The only storage we use is functional: your light/dark theme preference and your cookie choice, kept on your own device in localStorage.</p>
<p>On a first visit a small card asks you to accept the functional cookies or keep things essential-only. Both buttons simply record your preference so we don't ask again — there is nothing to track either way. Full detail is in our <a href="cookie-policy.html">Cookie Policy</a>, and you can clear the stored choice at any time through your browser.</p>`
            },
            {
                id: 'security',
                title: 'Security and transfers',
                html: `
<p>We take appropriate technical and organisational measures to protect your data against loss, alteration, unauthorised disclosure or access: secure email channels, access controls on the systems that hold your file, regular review of how we handle data, and security guarantees from any processor we engage.</p>
<p>Submitting a visa application inevitably means your data travels <strong>outside the UK</strong> — to a consulate, embassy or application centre in the Schengen area. That transfer is inherent to the service and necessary to perform your contract; where possible we rely on appropriate safeguards or the derogations available under UK GDPR.</p>`
            },
            {
                id: 'contact',
                title: 'Changes and contact',
                html: `
<p>Material changes to this policy are reflected in the "last updated" date at the top of the page. Please review it periodically — continued use of our services after a change means you accept the updated policy.</p>
<ul class="purpose-list">
    <li><i class="fas fa-envelope" aria-hidden="true"></i><span><strong>Email</strong> — <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a>. Always our first stop for any question or rights request.</span></li>
    <li><i class="fas fa-phone" aria-hidden="true"></i><span><strong>Telephone</strong> — <a href="tel:+447575378991">+44 7575 378991</a>, Monday to Saturday, 9:00&ndash;18:00</span></li>
    <li><i class="fas fa-building" aria-hidden="true"></i><span><strong>Post</strong> — Travelade Limited, 14 Pheasant Rise, Chesham, Buckinghamshire, HP5 1NT</span></li>
    <li><i class="fas fa-landmark" aria-hidden="true"></i><span><strong>Complaints</strong> — you can escalate to the Information Commissioner's Office at any time: <a href="https://ico.org.uk" target="_blank" rel="noopener">ico.org.uk</a>, 0303 123 1113, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF.</span></li>
</ul>`
            }
        ],
        cta: {
            h2: 'Questions about your data?',
            p: "Ask us anything about what we hold — we'll explain it in plain English and act on any request within a month.",
            primary: { href: 'mailto:info@travelade.co.uk', icon: 'fas fa-envelope', label: 'Email us' },
            secondary: { href: 'https://wa.me/447575378991', icon: 'fab fa-whatsapp', label: 'WhatsApp us' }
        }
    },

    /* ====================================================== REFUND POLICY */
    {
        file: 'refund-policy.html',
        title: 'Refund Policy | When You Get Your Money Back | Travelade',
        description: "Travelade Limited's refund policy — when our consultancy fee is refundable, when it isn't, your 14-day cooling-off rights, refund timescales and exactly how to claim.",
        h1: 'Refund Policy',
        subtitle: 'When you get your money back, when you don\'t, and exactly how to ask — clear timescales, no small print.',
        updated: 'Last updated: 8 October 2026',
        summary: {
            icon: 'fa-hand-holding-dollar',
            html: '<p>If we haven\'t started your work, you get a full refund — and you always have 14 days to change your mind. Once the agreed service is delivered the fee is earned; if a refusal was caused by an error of ours, we put it right free. Government and application-centre fees go straight to third parties and are never ours to keep.</p>'
        },
        sections: [
            {
                id: 'service-fee',
                title: 'Our service fee',
                html: `
<p>Our consultancy fee covers the professional time and work we invest in preparing, organising and submitting your visa application. How it is refunded depends on how far we got:</p>
<div class="doc-cards">
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-circle-check"></i></div>
        <h3>Fully delivered</h3>
        <p class="doc-card__detail">Your application has been submitted — the fee is fully earned and is <strong>non-refundable</strong>, whatever the outcome. Visa decisions rest entirely with the consulate, and a refusal does not indicate a failure on our part to deliver the service you engaged us for.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-hourglass-half"></i></div>
        <h3>Partially delivered</h3>
        <p class="doc-card__detail">For example, document preparation has begun but the application is not yet submitted. We refund a <strong>fair proportion</strong> of the fee corresponding to the undelivered portion, assessed case by case.</p>
    </article>
    <article class="doc-card">
        <div class="doc-card__icon" aria-hidden="true"><i class="fas fa-rotate-left"></i></div>
        <h3>Not yet started</h3>
        <p class="doc-card__detail">No work begun on your application — you are entitled to a <strong>full refund</strong> of the consultancy fee, subject to the cooling-off rights below.</p>
    </article>
</div>`
            },
            {
                id: 'cooling-off',
                title: '14-day cooling-off',
                html: `
<p>Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, you have the right to cancel your contract with us within <strong>14 days</strong> of booking, without giving any reason, and receive a full refund of our consultancy fee.</p>
<ul class="purpose-list">
    <li><i class="fas fa-bolt" aria-hidden="true"></i><span><strong>Early start at your request.</strong> If you ask us to begin work before day 14 — because you need your application submitted urgently — and then cancel, we charge for the proportion of the service already delivered. By asking us to start immediately you acknowledge this condition.</span></li>
    <li><i class="fas fa-flag-checkered" aria-hidden="true"></i><span><strong>Completed within the 14 days</strong> at your request — the right to cancel is lost and no refund of the consultancy fee applies.</span></li>
</ul>`
            },
            {
                id: 'refusals',
                title: 'Visa refusals',
                html: `
<p>A visa refusal is a decision made solely by the consulate, embassy or government authority of the destination country. We have no control over it, so our consultancy fee is <strong>non-refundable on a refusal</strong> where we correctly performed our service based on the information and documents you provided.</p>
<div class="doc-card__warn"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><span><strong>Where the refusal was caused by our error</strong> — for example an incorrect form or a document you supplied correctly that we omitted — we act at no additional consultancy charge: we acknowledge the error in writing, review the refusal, and where possible prepare and resubmit a corrected application. If resubmission isn't possible or appropriate, we discuss alternative remedies with you. Government and application-centre fees still remain non-refundable (see below).</span></div>`
            },
            {
                id: 'third-party',
                title: 'Government &amp; third-party fees',
                html: `
<p>The following are paid on your behalf directly to third parties and are <strong>strictly non-refundable by us</strong> once paid to the relevant party:</p>
<ul class="purpose-list">
    <li><i class="fas fa-xmark" aria-hidden="true"></i><span><strong>Government visa fees</strong> — charged by the consulate or embassy of the destination country</span></li>
    <li><i class="fas fa-xmark" aria-hidden="true"></i><span><strong>Visa application centre charges</strong> — VFS Global, TLScontact or any other official centre</span></li>
    <li><i class="fas fa-xmark" aria-hidden="true"></i><span><strong>Biometric appointment fees</strong>, where applicable</span></li>
    <li><i class="fas fa-xmark" aria-hidden="true"></i><span><strong>Courier and document return fees</strong>, where applicable</span></li>
</ul>
<p>These fees sit with third parties over whom we have no control. Any refund would need to be sought from the relevant authority or service provider — we will provide reasonable assistance where possible, though we cannot guarantee any outcome.</p>`
            },
            {
                id: 'how-to-claim',
                title: 'How to claim',
                html: `
<p>Contact us in writing as soon as possible — email creates a clear record and lets us process your request quickly.</p>
<div class="appt-steps">
    <div class="appt-step">
        <span class="appt-step__num" aria-hidden="true">1</span>
        <div>
            <h3>Send the email</h3>
            <p>To <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a> with the subject line <strong>"Refund Request — [Your Full Name] — [Application Reference, if known]"</strong>.</p>
        </div>
    </div>
    <div class="appt-step">
        <span class="appt-step__num" aria-hidden="true">2</span>
        <div>
            <h3>Include the details</h3>
            <p>Your full name and contact telephone number, application reference or booking date, the destination country, and a brief explanation of the reason for your request.</p>
        </div>
    </div>
    <div class="appt-step">
        <span class="appt-step__num" aria-hidden="true">3</span>
        <div>
            <h3>Prefer to talk first?</h3>
            <p>Call <a href="tel:+447575378991">+44 7575 378991</a> (Monday to Saturday, 9:00&ndash;18:00) to discuss your situation — we will then ask you to confirm the request in writing to formalise it.</p>
        </div>
    </div>
</div>`
            },
            {
                id: 'timescales',
                title: 'Timescales we commit to',
                html: `
<p>We aim to deal with every refund request promptly and fairly. Our commitment to you:</p>
<div style="overflow-x: auto; margin-bottom: 20px;">
<table class="country-rule-table">
    <thead>
        <tr><th scope="col">Milestone</th><th scope="col">Timeframe</th></tr>
    </thead>
    <tbody>
        <tr>
            <td>Acknowledgement of your request</td>
            <td><strong>3 working days</strong></td>
        </tr>
        <tr>
            <td>Our decision — including reasons if a refund is declined in whole or part</td>
            <td><strong>7 working days</strong> from receiving all the information we need</td>
        </tr>
        <tr>
            <td>Payment, where a refund is approved</td>
            <td><strong>14 calendar days</strong> from the date of our decision, by the same method as the original payment where possible</td>
        </tr>
    </tbody>
</table>
</div>`
            },
            {
                id: 'disputes',
                title: 'If you disagree with our decision',
                html: `
<p>We take all complaints and refund requests seriously and will always try to resolve them fairly and amicably. If you're not satisfied with our response:</p>
<div class="appt-steps">
    <div class="appt-step">
        <span class="appt-step__num" aria-hidden="true">1</span>
        <div>
            <h3>Escalate to us first</h3>
            <p>Email <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a> marked <strong>"Complaint Escalation"</strong> and ask for it to go to a senior member of the team.</p>
        </div>
    </div>
    <div class="appt-step">
        <span class="appt-step__num" aria-hidden="true">2</span>
        <div>
            <h3>Alternative Dispute Resolution</h3>
            <p>If we can't resolve your complaint within <strong>8 weeks</strong>, or you remain dissatisfied after our final response, you can refer it to an approved ADR scheme — we will provide the relevant scheme's details at that stage.</p>
        </div>
    </div>
    <div class="appt-step">
        <span class="appt-step__num" aria-hidden="true">3</span>
        <div>
            <h3>Legal action</h3>
            <p>Nothing here prevents you from exercising your legal rights in the courts of England and Wales, and nothing in this policy limits your statutory rights as a consumer under UK law.</p>
        </div>
    </div>
</div>`
            },
            {
                id: 'contact',
                title: 'Contact us',
                html: `
<p>If you have questions about this policy, or want to discuss your situation before making a formal request, please get in touch — we're here to help.</p>
<ul class="purpose-list">
    <li><i class="fas fa-envelope" aria-hidden="true"></i><span><strong>Email</strong> — <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a></span></li>
    <li><i class="fas fa-phone" aria-hidden="true"></i><span><strong>Telephone</strong> — <a href="tel:+447575378991">+44 7575 378991</a>, Monday to Saturday, 9:00&ndash;18:00</span></li>
    <li><i class="fas fa-building" aria-hidden="true"></i><span><strong>Post</strong> — Travelade Limited, 14 Pheasant Rise, Chesham, Buckinghamshire, HP5 1NT</span></li>
</ul>
<p>This policy forms part of our <a href="terms-and-conditions.html">Terms &amp; Conditions</a> and should be read alongside them. Nothing here limits the statutory rights you hold as a consumer under UK law.</p>`
            }
        ],
        cta: {
            h2: 'Rather ask first?',
            p: "Talk to us before you decide — a refund question is never awkward, and we'll tell you exactly where you stand.",
            primary: { href: 'https://wa.me/447575378991', icon: 'fab fa-whatsapp', label: 'WhatsApp us' },
            secondary: { href: 'mailto:info@travelade.co.uk', icon: 'fas fa-envelope', label: 'Email us' }
        }
    },

    /* ========================================== TERMS & CONDITIONS */
    {
        file: 'terms-and-conditions.html',
        title: 'Terms &amp; Conditions | Travelade',
        description: "The terms on which Travelade Limited provides visa consultancy services — scope of work, pricing and payment, no-guarantee notice, liability, refunds and governing law.",
        h1: 'Terms &amp; Conditions',
        subtitle: 'The agreement between you and Travelade when you instruct us — scope, fees, responsibilities and the limits of what we can promise.',
        updated: 'Effective date: October 2026',
        summary: {
            icon: 'fa-scale-balanced',
            html: '<p><strong>Travelade Limited is a private visa consultancy — not a government body, embassy or immigration authority.</strong> We prepare, organise and submit the strongest application we can; the decision to grant or refuse a visa rests entirely with the consulate of the destination country. Nothing on this website guarantees an outcome.</p>'
        },
        sections: [
            {
                id: 'about',
                title: 'About us and these terms',
                html: `
<p>These Terms and Conditions ("Terms") govern the relationship between Travelade Limited ("Travelade", "we", "us") and you, the client, when you use or purchase our visa consultancy services. By instructing us to act on your behalf, you confirm that you have read, understood and agree to be bound by these Terms.</p>
<ul class="purpose-list">
    <li><i class="fas fa-building" aria-hidden="true"></i><span><strong>Travelade Limited</strong> — private limited company registered in England &amp; Wales, company number 17205750</span></li>
    <li><i class="fas fa-location-dot" aria-hidden="true"></i><span>14 Pheasant Rise, Chesham, Buckinghamshire, HP5 1NT</span></li>
    <li><i class="fas fa-envelope" aria-hidden="true"></i><span><a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a> &middot; <a href="tel:+447575378991">+44 7575 378991</a></span></li>
</ul>`
            },
            {
                id: 'nature',
                title: 'Nature of our service',
                html: `
<div class="doc-card__warn"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><span><strong>Travelade Limited is a private visa consultancy. We are not a government body, embassy, consulate or official immigration authority.</strong> We are not affiliated with any government or embassy, and we have no influence over the outcome of any visa application. The final decision to grant or refuse a visa rests entirely and exclusively with the relevant consulate, embassy or government authority of the destination country.</span></div>
<p>Our role is to assist you in preparing, organising and submitting the strongest possible application based on the information and documents you provide to us. We cannot and do not guarantee any visa outcome — engaging our services does not guarantee that a visa will be granted.</p>`
            },
            {
                id: 'services',
                title: 'Services provided',
                html: `
<p>Subject to these Terms and payment of the applicable fee, we provide the services described in your booking confirmation. Our standard visa consultancy services may include any combination of the following, as agreed at the time of booking:</p>
<ul class="purpose-list">
    <li><i class="fas fa-folder-open" aria-hidden="true"></i><span><strong>Document preparation</strong> — reviewing, organising and advising on the supporting documents required, based on the requirements of the relevant consulate at the time of preparation.</span></li>
    <li><i class="fas fa-pen-to-square" aria-hidden="true"></i><span><strong>Form completion</strong> — completing the official visa application form on your behalf using the information you provide.</span></li>
    <li><i class="fas fa-calendar-check" aria-hidden="true"></i><span><strong>Appointment booking</strong> — securing a visa application centre appointment with VFS Global, TLScontact or the relevant embassy on your behalf.</span></li>
    <li><i class="fas fa-paper-plane" aria-hidden="true"></i><span><strong>Application filing</strong> — submitting your completed application and supporting documents to the visa application centre or consulate.</span></li>
    <li><i class="fas fa-satellite-dish" aria-hidden="true"></i><span><strong>Tracking and communication</strong> — monitoring the status of your application and keeping you informed of updates or requests for additional information.</span></li>
</ul>
<p>The specific scope of services is confirmed in writing at the time of booking. Additional services requested afterwards may be subject to an additional fee.</p>`
            },
            {
                id: 'pricing',
                title: 'Pricing and payment',
                html: `
<h3>Our service fees</h3>
<p>Our consultancy fees start from <strong>&pound;80</strong> per application and vary with the destination country, application complexity and the services included. The exact fee is confirmed to you before you commit to engaging our services. All prices are quoted in pounds sterling (GBP) and are inclusive of VAT where applicable.</p>
<h3>Government and third-party fees</h3>
<p>In addition to our consultancy fee, you are responsible for all government visa fees, visa application centre service charges (such as those levied by VFS Global or TLScontact), courier fees and other official costs associated with your application. These are collected by the relevant authority directly or through us as your agent — <strong>we add no mark-up</strong> to government or centre fees: the amount we charge you is the exact amount passed on to the third party.</p>
<h3>Payment terms</h3>
<p>Payment of our consultancy fee is required before we begin work on your application. Where government or application centre fees are paid through us, they must be paid in full before your appointment date. We accept payment by bank transfer or other methods confirmed at the time of booking. Receipts or payment confirmations are provided on request.</p>`
            },
            {
                id: 'responsibilities',
                title: 'Your responsibilities',
                html: `
<p>To enable us to provide our services effectively, you agree to the following:</p>
<ul class="purpose-list">
    <li><i class="fas fa-circle-check" aria-hidden="true"></i><span><strong>Accuracy of information</strong> — you are solely responsible for ensuring everything you provide is truthful, accurate, complete and up to date. False, misleading or inaccurate information is illegal and may result in refusal, bans from future applications and potential criminal liability. We rely on what you give us and cannot be held responsible for consequences arising from inaccurate or incomplete information supplied by you.</span></li>
    <li><i class="fas fa-calendar-day" aria-hidden="true"></i><span><strong>Attendance at appointments</strong> — if we book an appointment for you, you must attend at the confirmed date, time and location with all required original documents and biometrics as instructed. Failure to attend without reasonable notice may mean loss of the slot and associated fees.</span></li>
    <li><i class="fas fa-clock" aria-hidden="true"></i><span><strong>Timeliness</strong> — provide all required information and documents within the timeframes we reasonably request, leaving enough time to prepare and submit before your intended travel date.</span></li>
    <li><i class="fas fa-bullhorn" aria-hidden="true"></i><span><strong>Communication</strong> — keep us informed of changes to your circumstances, travel plans or contact details that may affect your application.</span></li>
    <li><i class="fas fa-gavel" aria-hidden="true"></i><span><strong>Compliance with law</strong> — confirm you are legally entitled to apply for the visa you are requesting and that your application involves no fraudulent activity.</span></li>
</ul>`
            },
            {
                id: 'no-guarantee',
                title: 'No guarantee of outcome',
                html: `
<p>We provide professional assistance to help you submit the best possible visa application, but we make no representation, warranty or guarantee — express or implied — that your application will be approved. Granting a visa is a discretionary decision made solely by the relevant consulate, embassy or government authority. Factors outside our control — including changes in government policy, your immigration history, financial circumstances or the documents available — may affect the outcome.</p>
<p><strong>Do not book non-refundable travel arrangements — such as flights or accommodation — until your visa has been granted.</strong> We accept no liability for any costs, losses or expenses you incur as a result of a visa refusal or delay.</p>`
            },
            {
                id: 'liability',
                title: 'Our liability',
                html: `
<h3>What we are not liable for</h3>
<p>To the fullest extent permitted by law, Travelade Limited shall not be liable to you for:</p>
<ul class="purpose-list">
    <li><i class="fas fa-minus" aria-hidden="true"></i><span>Visa refusal by any consulate, embassy or government authority</span></li>
    <li><i class="fas fa-minus" aria-hidden="true"></i><span>Delays in processing by a consulate, embassy, visa application centre, or postal/courier service</span></li>
    <li><i class="fas fa-minus" aria-hidden="true"></i><span>Loss or damage caused by inaccurate, incomplete or fraudulent information provided by you</span></li>
    <li><i class="fas fa-minus" aria-hidden="true"></i><span>Travel or accommodation costs, loss of earnings or other consequential losses arising from a refusal or delay</span></li>
    <li><i class="fas fa-minus" aria-hidden="true"></i><span>Changes in visa requirements, government policy or fees after we have commenced work</span></li>
    <li><i class="fas fa-minus" aria-hidden="true"></i><span>Actions or omissions of third parties, including VFS Global, TLScontact, consulates, embassies or courier services</span></li>
</ul>
<h3>Our liability cap</h3>
<p>Where we are found liable in circumstances not excluded above, our total liability shall in no event exceed the consultancy fee you have paid for the specific service in connection with which the liability arose. We do not exclude or limit liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded or limited under applicable UK law.</p>
<h3>Errors on our part</h3>
<p>If an application is adversely affected by a clear error made by us — for example incorrectly completing a form using information you provided correctly — we will use reasonable endeavours to rectify the error and resubmit at no additional consultancy charge, subject to the conditions and timelines imposed by the relevant authority.</p>`
            },
            {
                id: 'refunds',
                title: 'Refund policy',
                html: `
<p>Our full refund policy is set out on the <a href="refund-policy.html">Refund Policy page</a>. In summary: if we have not yet begun work on your application, a full refund of our consultancy fee is available — including your statutory <strong>14-day cooling-off period</strong> from booking. Once the agreed service has been delivered, the fee is earned. Government fees and third-party application centre fees are non-refundable once paid to the relevant authority.</p>`
            },
            {
                id: 'ip',
                title: 'Intellectual property',
                html: `
<p>All content on the Travelade website — text, images, graphics, logos, icons and the overall design — is the intellectual property of Travelade Limited or its licensors, protected by UK and international copyright law. You may not reproduce, copy, distribute or create derivative works from any content on this website without our prior written consent. Nothing in these Terms grants you any right to use our trademarks, service marks or trade names.</p>`
            },
            {
                id: 'website-use',
                title: 'Website use',
                html: `
<p>Our website is provided for general information purposes only. While we take reasonable care to ensure accuracy, visa requirements and procedures change frequently and the information here may not always reflect the most current position — always verify requirements with the relevant official source before relying on them. We shall not be liable for any errors or omissions in the information on this website, or for any loss arising from reliance on it.</p>`
            },
            {
                id: 'governing-law',
                title: 'Governing law and jurisdiction',
                html: `
<p>These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) shall be governed by and construed in accordance with the law of <strong>England and Wales</strong>. Both parties submit to the exclusive jurisdiction of the courts of England and Wales, except where applicable consumer protection legislation in another jurisdiction may give you the right to bring proceedings in a different court.</p>`
            },
            {
                id: 'disputes',
                title: 'Dispute resolution',
                html: `
<p>If you have a complaint or dispute about our services, please contact us in the first instance — we take all complaints seriously and will endeavour to resolve issues quickly and fairly:</p>
<ul class="purpose-list">
    <li><i class="fas fa-envelope" aria-hidden="true"></i><span><strong>Step 1</strong> — email <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a> or call <a href="tel:+447575378991">+44 7575 378991</a>, setting out the nature of your complaint.</span></li>
    <li><i class="fas fa-hourglass-half" aria-hidden="true"></i><span><strong>Step 2</strong> — we will acknowledge within <strong>3 working days</strong> and aim to provide a full response within <strong>14 days</strong>.</span></li>
    <li><i class="fas fa-scale-balanced" aria-hidden="true"></i><span><strong>Step 3</strong> — if we cannot resolve it to your satisfaction, we will refer you to an appropriate Alternative Dispute Resolution (ADR) scheme and provide the relevant body's details.</span></li>
</ul>
<p>Nothing in this clause affects your statutory rights as a consumer.</p>`
            },
            {
                id: 'entire-agreement',
                title: 'Entire agreement',
                html: `
<p>These Terms, together with your booking confirmation and our <a href="privacy-policy.html">Privacy Policy</a> and <a href="refund-policy.html">Refund Policy</a>, constitute the entire agreement between you and Travelade Limited in relation to the services provided. They supersede all prior discussions, representations or agreements. If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>`
            },
            {
                id: 'changes',
                title: 'Changes to these terms',
                html: `
<p>We reserve the right to amend these Terms from time to time. Changes are posted on this page with an updated effective date. If you have already engaged our services under a previous version, the version in force at the time of your booking applies to that engagement, unless we agree otherwise in writing.</p>`
            },
            {
                id: 'contact',
                title: 'Contact us',
                html: `
<p>If you have any questions about these Terms, please contact us:</p>
<ul class="purpose-list">
    <li><i class="fas fa-envelope" aria-hidden="true"></i><span><strong>Email</strong> — <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a></span></li>
    <li><i class="fas fa-phone" aria-hidden="true"></i><span><strong>Telephone</strong> — <a href="tel:+447575378991">+44 7575 378991</a></span></li>
    <li><i class="fas fa-building" aria-hidden="true"></i><span><strong>Post</strong> — Travelade Limited, 14 Pheasant Rise, Chesham, Buckinghamshire, HP5 1NT</span></li>
</ul>`
            }
        ],
        cta: {
            h2: 'Ready when you are',
            p: 'Every engagement starts with a written confirmation of scope and price — no surprises. Send us your itinerary and we will tell you exactly what is included.',
            primary: { href: '#', icon: 'fas fa-paper-plane', label: 'Start an application', openApply: true },
            secondary: { href: 'https://wa.me/447575378991', icon: 'fab fa-whatsapp', label: 'WhatsApp us' }
        }
    },

    /* ================================================== COOKIE POLICY */
    {
        file: 'cookie-policy.html',
        title: 'Cookie Policy | What This Site Stores | Travelade',
        description: 'What cookies and local storage the Travelade website uses, which third parties may see your IP, and how to control or withdraw your choices.',
        h1: 'Cookie Policy',
        subtitle: 'Every cookie this site sets — which is almost none — plus the third parties that load with the page and how to control it all.',
        updated: 'Last updated: 8 October 2026',
        summary: {
            icon: 'fa-cookie-bite',
            html: '<p>There is almost nothing to see here: the site stores <strong>two functional preferences on your own device</strong> and sets no advertising, analytics or tracking cookies at all. You can clear both at any time — the only thing that breaks is your saved theme.</p>'
        },
        sections: [
            {
                id: 'what-are-cookies',
                title: 'What cookies are',
                html: `
<p>Cookies are small text files that a website places on your device when you visit. They let the site remember information about your visit — such as your preferred display settings — making your next visit easier and the site more useful.</p>
<p>Cookies in the UK are governed by the Privacy and Electronic Communications Regulations 2003 (PECR) and the UK General Data Protection Regulation (UK GDPR). Where cookies involve the processing of personal data, our <a href="privacy-policy.html">Privacy Policy</a> also applies.</p>`
            },
            {
                id: 'how-we-use-them',
                title: 'How we use them',
                html: `
<p>The Travelade website uses a minimal set of cookies — only those strictly necessary to make the site function properly. We do <strong>not</strong> use advertising cookies, marketing cookies or any third-party tracking technologies.</p>
<p>On your first visit a small consent card asks whether to accept the functional cookies or keep things <strong>essential only</strong>. Whichever you choose, we simply record the answer so the card doesn't appear again — because there is nothing else to accept. The card's <strong>Cookie settings</strong> link opens those same two choices in a small popup on the page you are on, so you can review what is stored without navigating away.</p>`
            },
            {
                id: 'what-we-set',
                title: 'The cookies we set',
                html: `
<p>Strictly necessary and functional cookies are essential for the site to work. They cannot be switched off in our systems and store no personally identifiable information. Under PECR they do not require consent — though we still disclose them here transparently:</p>
<div style="overflow-x: auto; margin-bottom: 20px;">
<table class="country-rule-table">
    <thead>
        <tr>
            <th scope="col">Cookie name</th>
            <th scope="col">Purpose</th>
            <th scope="col">Duration</th>
            <th scope="col">Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>travelade-theme</code></td>
            <td>Remembers your preferred display theme (dark or light mode) so it persists across visits.</td>
            <td>Persistent (localStorage)</td>
            <td>Functional</td>
        </tr>
        <tr>
            <td><code>travelade-cookies</code></td>
            <td>Records whether you chose "Accept cookies" or "Essential only" on the consent card, so we don't ask again on each visit.</td>
            <td>Persistent (localStorage)</td>
            <td>Functional</td>
        </tr>
    </tbody>
</table>
</div>
<p class="doc-card__detail" style="margin-top:14px;">Both are stored in your browser's <strong>localStorage</strong>, not as traditional HTTP cookies, but they serve an equivalent purpose and are disclosed here for transparency.</p>`
            },
            {
                id: 'third-parties',
                title: 'Third-party services',
                html: `
<ul class="purpose-list">
    <li><i class="fas fa-paper-plane" aria-hidden="true"></i><span><strong>Formsubmit.co</strong> — processes enquiry forms submitted on this site. Your data passes through Formsubmit's servers, which may set its own cookies or tokens for spam prevention. See Formsubmit's own privacy policy.</span></li>
    <li><i class="fas fa-font" aria-hidden="true"></i><span><strong>Google Fonts</strong> — our typefaces are loaded from Google's CDN.</span></li>
    <li><i class="fas fa-icons" aria-hidden="true"></i><span><strong>Font Awesome via Cloudflare CDN</strong> — icons are loaded as a stylesheet.</span></li>
</ul>
<p>Fonts and icons are loaded as stylesheets and do not set cookies, but your IP address may be logged by these third-party CDN servers as part of normal HTTP request handling.</p>
<p>We do <strong>not</strong> use Google Analytics, Facebook Pixel, or any other advertising or behavioural tracking technology.</p>`
            },
            {
                id: 'analytics',
                title: 'Analytics',
                html: `
<p>We do not run any analytics service on this website. If that changes, we will update this policy and — where required by law — obtain your consent before any analytics is enabled.</p>`
            },
            {
                id: 'controls',
                title: 'How to control cookies',
                html: `
<p>You can control and delete cookies through your browser settings. Most browsers let you:</p>
<ul>
    <li>See what cookies have been set and delete them individually</li>
    <li>Block cookies from particular websites, or block all third-party cookies</li>
    <li>Block all cookies, or delete all cookies when you close the browser</li>
</ul>
<p>Bear in mind that if you delete or block our functional cookies, some features — such as your saved theme preference — will not work as expected. Browser-specific guidance:</p>
<ul>
    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
    <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
    <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
</ul>
<p>You can also opt out of interest-based advertising from many advertisers at <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a> — though we do not currently use interest-based advertising.</p>`
            },
            {
                id: 'withdrawing',
                title: 'Withdrawing your choice',
                html: `
<p>If you accepted the consent card and want to change your mind, clear the stored preference: open your browser's developer tools, go to the <strong>Application</strong> tab, then <strong>Local Storage</strong>, and delete the <code>travelade-cookies</code> entry. The consent card will reappear on your next visit.</p>
<p>Alternatively, email <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a> and we will walk you through it.</p>`
            },
            {
                id: 'changes',
                title: 'Changes and contact',
                html: `
<p>We may update this Cookie Policy to reflect changes to the cookies we use or for other operational, legal or regulatory reasons. The "last updated" date at the top of this page always reflects the most recent revision — please review it periodically.</p>
<ul class="purpose-list">
    <li><i class="fas fa-envelope" aria-hidden="true"></i><span><strong>Email</strong> — <a href="mailto:info@travelade.co.uk">info@travelade.co.uk</a></span></li>
    <li><i class="fas fa-phone" aria-hidden="true"></i><span><strong>Telephone</strong> — <a href="tel:+447575378991">+44 7575 378991</a></span></li>
    <li><i class="fas fa-building" aria-hidden="true"></i><span><strong>Travelade Limited</strong> — 14 Pheasant Rise, Chesham, Buckinghamshire, HP5 1NT &middot; Company No. 17205750 (registered in England &amp; Wales)</span></li>
</ul>`
            }
        ],
        cta: {
            h2: 'Still have a question?',
            p: 'Anything about what this site stores, we will answer directly — no ticket systems, no runaround.',
            primary: { href: 'mailto:info@travelade.co.uk', icon: 'fas fa-envelope', label: 'Email us' },
            secondary: { href: 'privacy-policy.html', icon: 'fas fa-user-shield', label: 'Privacy policy' }
        }
    }
];
