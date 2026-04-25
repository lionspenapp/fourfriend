// Auto-generated from lionspen-parent-short.html. Do not edit by hand.
export const LANDING_HTML = String.raw`<style>
  :root {
    --lp-navy: #1a2744;
    --lp-navy-deep: #0f1a2e;
    --lp-navy-light: #243156;
    --lp-cream: #f5f0e8;
    --lp-cream-dark: #ede7d9;
    --lp-gold: #b8892a;
    --lp-gold-light: #d4a84b;
    --lp-rust: #8b3a1e;
    --lp-text-mid: #3d3d5c;
    --lp-text-muted: #7a7a99;
    --lp-white: #fff;
  }

  /* ── SEPARATOR ── */
  .lp-sep {
    background: var(--lp-navy-deep);
    padding: 2.5rem 2rem;
    text-align: center;
    border-top: 1px solid rgba(184,137,42,0.2);
  }
  .lp-sep-row {
    display: flex; align-items: center; justify-content: center; gap: 1.2rem;
    margin-bottom: 1.8rem;
  }
  .lp-sep-line { flex: 1; max-width: 100px; height: 1px; background: rgba(184,137,42,0.2); }
  .lp-sep-label {
    font-family: 'EB Garamond', serif;
    font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(245,240,232,0.3);
  }
  .lp-stats-row {
    display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap;
  }
  .lp-stat { text-align: center; }
  .lp-stat-n {
    font-family: 'Playfair Display', serif;
    font-size: 2rem; font-weight: 700; font-style: italic;
    color: var(--lp-gold-light); line-height: 1;
  }
  .lp-stat-l {
    font-family: 'EB Garamond', serif;
    font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(245,240,232,0.28); margin-top: 0.25rem;
  }
  .lp-stat-div { width: 1px; background: rgba(184,137,42,0.15); align-self: stretch; }

  /* ── SHARED ── */
  .lp-section { padding: 6rem 2rem; font-family: 'EB Garamond', serif; font-size: 17px; line-height: 1.7; }
  .lp-cream  { background: var(--lp-cream); }
  .lp-cream-dark { background: var(--lp-cream-dark); }
  .lp-dark   { background: var(--lp-navy-deep); }
  .lp-navy   { background: var(--lp-navy); }

  .lp-eyebrow {
    text-align: center; font-family: 'EB Garamond', serif;
    font-size: 0.75rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--lp-gold); margin-bottom: 0.7rem;
  }
  .lp-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    text-align: center; font-weight: 700; margin-bottom: 0.4rem;
    color: var(--lp-navy);
  }
  .lp-h2-light { color: #f5f0e8; }
  .lp-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.15rem;
    color: var(--lp-rust); text-align: center; margin-bottom: 1.2rem;
  }
  .lp-sub-light { color: var(--lp-gold-light); }
  .lp-rule { width: 40px; height: 1px; background: var(--lp-gold); margin: 0 auto 3rem; }

  /* ── LION INTRO ── */
  .lp-lion-banner {
    max-width: 860px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 2fr;
    background: var(--lp-navy);
  }
  .lp-lion-left {
    background: var(--lp-gold);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem 2rem; text-align: center;
  }
  .lp-lion-num {
    font-family: 'Playfair Display', serif;
    font-size: 4.5rem; font-weight: 700; font-style: italic;
    color: var(--lp-navy-deep); line-height: 1;
  }
  .lp-lion-word {
    font-family: 'EB Garamond', serif;
    font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--lp-navy); margin-top: 0.3rem; font-weight: 600;
  }
  .lp-lion-ref {
    font-family: 'EB Garamond', serif;
    font-size: 0.7rem; color: rgba(15,26,46,0.5);
    margin-top: 0.4rem; font-style: italic;
  }
  .lp-lion-right { padding: 2.5rem 2.8rem; }
  .lp-lion-right h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem; font-weight: 700; color: #f5f0e8; margin-bottom: 0.8rem;
  }
  .lp-lion-right p {
    color: rgba(245,240,232,0.6); font-size: 0.92rem; line-height: 1.85; margin-bottom: 0.8rem;
  }
  .lp-lion-right em { color: var(--lp-gold-light); font-style: italic; }
  .lp-lion-right p:last-child { margin-bottom: 0; }

  .lp-lion-quote {
    max-width: 860px; margin: 0 auto;
    background: var(--lp-navy-light);
    border-left: 3px solid var(--lp-gold);
    padding: 2rem 2.5rem; text-align: center;
  }
  .lp-lion-quote blockquote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-style: italic;
    color: rgba(245,240,232,0.65); line-height: 1.8;
  }
  .lp-lion-quote blockquote em { color: var(--lp-gold-light); }
  .lp-lion-quote cite {
    display: block; margin-top: 1rem;
    font-family: 'EB Garamond', serif;
    font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(245,240,232,0.25); font-style: normal;
  }

  /* ── DIVIDE ── */
  .lp-divide-intro {
    max-width: 600px; margin: 0 auto 3rem;
    text-align: center; font-size: 1rem; color: var(--lp-text-mid); line-height: 1.9;
  }
  .lp-divide-intro strong { color: var(--lp-navy); }
  .lp-dc-grid {
    max-width: 860px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
    background: rgba(26,39,68,0.1);
  }
  .lp-dc { padding: 2.5rem 2.2rem; }
  .lp-dc-a { background: var(--lp-navy); }
  .lp-dc-b { background: var(--lp-white); }
  .lp-dc-pct {
    font-family: 'Playfair Display', serif;
    font-size: 3.8rem; font-weight: 700; font-style: italic; line-height: 1; margin-bottom: 0.2rem;
  }
  .lp-dc-a .lp-dc-pct { color: var(--lp-gold-light); }
  .lp-dc-b .lp-dc-pct { color: rgba(26,39,68,0.15); }
  .lp-dc-name {
    font-family: 'EB Garamond', serif;
    font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
    font-weight: 600; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid;
  }
  .lp-dc-a .lp-dc-name { color: var(--lp-gold); border-color: rgba(184,137,42,0.2); }
  .lp-dc-b .lp-dc-name { color: var(--lp-text-muted); border-color: rgba(26,39,68,0.1); }
  .lp-dc-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; font-weight: 700; margin-bottom: 0.7rem;
  }
  .lp-dc-a .lp-dc-title { color: #f5f0e8; }
  .lp-dc-b .lp-dc-title { color: var(--lp-navy); }
  .lp-dc-body { font-size: 0.88rem; line-height: 1.8; }
  .lp-dc-a .lp-dc-body { color: rgba(245,240,232,0.55); }
  .lp-dc-b .lp-dc-body { color: var(--lp-text-mid); }
  .lp-dc-bar {
    max-width: 860px; margin: 2px auto 0;
    background: var(--lp-navy); padding: 1.6rem 2.5rem; text-align: center;
  }
  .lp-dc-bar p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-style: italic; color: rgba(245,240,232,0.6);
  }
  .lp-dc-bar strong { color: var(--lp-gold-light); font-style: normal; }

  /* ── FOUR QUALITIES ── */
  .lp-q-grid {
    max-width: 860px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px;
    background: rgba(26,39,68,0.08);
  }
  .lp-q { background: var(--lp-white); padding: 2.5rem 2rem; }
  .lp-q-roman {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-style: italic; color: var(--lp-gold-light);
    display: block; margin-bottom: 0.5rem;
  }
  .lp-q-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem; font-weight: 700; color: var(--lp-navy); margin-bottom: 0.25rem;
  }
  .lp-q-sub {
    font-family: 'EB Garamond', serif;
    font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--lp-gold); display: block; margin-bottom: 0.9rem;
  }
  .lp-q-body { font-size: 0.88rem; color: var(--lp-text-mid); line-height: 1.78; margin-bottom: 0.8rem; }
  .lp-q-verse {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.9rem; font-style: italic; color: var(--lp-text-muted);
    border-top: 1px solid rgba(26,39,68,0.07); padding-top: 0.8rem;
  }

  /* ── ECOSYSTEM ── */
  .lp-eco-grid {
    max-width: 960px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
    background: rgba(26,39,68,0.1);
  }
  .lp-eco { background: var(--lp-white); padding: 2.2rem 1.6rem; text-align: center; }
  .lp-eco-r {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-style: italic; color: var(--lp-gold-light);
    display: block; margin-bottom: 0.6rem;
  }
  .lp-eco-t {
    font-family: 'Playfair Display', serif;
    font-size: 0.98rem; font-weight: 700; color: var(--lp-navy); margin-bottom: 0.25rem;
  }
  .lp-eco-s {
    font-family: 'EB Garamond', serif;
    font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--lp-gold); display: block; margin-bottom: 0.9rem;
  }
  .lp-eco-b { font-size: 0.85rem; color: var(--lp-text-mid); line-height: 1.72; }
  .lp-eco-heart {
    margin-top: 0.8rem; font-family: 'EB Garamond', serif;
    font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--lp-gold); font-weight: 600;
  }

  /* ── JOURNEY ── */
  .lp-j-grid {
    max-width: 960px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2px; background: rgba(184,137,42,0.1);
  }
  .lp-j { background: var(--lp-navy-light); padding: 2.2rem 1.6rem; position: relative; }
  .lp-j::before {
    content: attr(data-n);
    position: absolute; top: 1rem; right: 1.2rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem; font-style: italic;
    color: rgba(184,137,42,0.07); line-height: 1; pointer-events: none;
  }
  .lp-j-step {
    font-family: 'EB Garamond', serif;
    font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--lp-gold); display: block; margin-bottom: 0.6rem;
  }
  .lp-j-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; font-weight: 700; color: #f5f0e8; margin-bottom: 0.2rem;
  }
  .lp-j-tag {
    font-family: 'EB Garamond', serif;
    font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(245,240,232,0.28); display: block; margin-bottom: 1rem;
  }
  .lp-j-body { font-size: 0.85rem; color: rgba(245,240,232,0.55); line-height: 1.72; }
  .lp-j-body em { color: var(--lp-gold-light); font-style: italic; }
  .lp-j-foot {
    margin-top: 1rem; padding-top: 1rem;
    border-top: 1px solid rgba(184,137,42,0.12);
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.75rem; color: var(--lp-gold); font-style: italic;
  }

  /* ── CTA ── */
  .lp-cta-wrap {
    background: var(--lp-navy-deep); padding: 7rem 2rem; text-align: center;
    position: relative; overflow: hidden;
  }
  .lp-cta-wrap::before {
    content: '10×';
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    font-family: 'Playfair Display', serif;
    font-size: 28vw; font-weight: 700; font-style: italic;
    color: rgba(184,137,42,0.03); pointer-events: none; line-height: 1; white-space: nowrap;
  }
  .lp-cta-h {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.7rem, 3.5vw, 3rem);
    color: #f5f0e8; font-weight: 400;
    max-width: 640px; margin: 0 auto 1rem;
    line-height: 1.2; position: relative; z-index: 1;
  }
  .lp-cta-h em { font-style: italic; color: var(--lp-gold-light); }
  .lp-cta-rule { width: 40px; height: 1px; background: var(--lp-gold); margin: 1.8rem auto; position: relative; z-index: 1; }
  .lp-cta-body {
    max-width: 460px; margin: 0 auto 2.5rem;
    font-family: 'EB Garamond', serif;
    color: rgba(245,240,232,0.38); font-size: 0.92rem; line-height: 1.82;
    position: relative; z-index: 1;
  }
  .lp-cta-btns {
    display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
    margin-bottom: 1.2rem; position: relative; z-index: 1;
  }
  .lp-btn-g {
    background: var(--lp-gold); color: var(--lp-navy-deep);
    padding: 0.9rem 2.4rem; font-size: 0.85rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: none; cursor: pointer;
    font-family: 'EB Garamond', serif; font-weight: 600;
  }
  .lp-btn-o {
    background: transparent; color: rgba(245,240,232,0.5);
    padding: 0.9rem 2.4rem; font-size: 0.85rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid rgba(245,240,232,0.15); cursor: pointer;
    font-family: 'EB Garamond', serif;
  }
  .lp-cta-note {
    font-family: 'EB Garamond', serif;
    font-size: 0.75rem; color: rgba(245,240,232,0.2);
    letter-spacing: 0.08em; position: relative; z-index: 1;
  }

  /* ── FOOTER ── */
  .lp-footer {
    background: #0a0f1a; padding: 2rem 2rem; text-align: center;
  }
  .lp-footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem; color: rgba(245,240,232,0.3); margin-bottom: 0.4rem;
  }
  .lp-footer-logo span { color: var(--lp-gold); }
  .lp-footer p {
    font-family: 'EB Garamond', serif;
    font-size: 0.72rem; color: rgba(245,240,232,0.15); letter-spacing: 0.08em;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .lp-stats-row { gap: 1.5rem; }
    .lp-stat-div { display: none; }
    .lp-lion-banner { grid-template-columns: 1fr; }
    .lp-dc-grid, .lp-q-grid { grid-template-columns: 1fr; }
    .lp-eco-grid { grid-template-columns: repeat(2, 1fr); }
    .lp-j-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .lp-eco-grid, .lp-j-grid { grid-template-columns: 1fr; }
  }
</style>


<!-- ══ SEPARATOR ══ -->
<div class="lp-sep">
  <div class="lp-sep-row">
    <div class="lp-sep-line"></div>
    <span class="lp-sep-label">About the Programme</span>
    <div class="lp-sep-line"></div>
  </div>
  <div class="lp-stats-row">
    <div class="lp-stat">
      <div class="lp-stat-n">15%</div>
      <div class="lp-stat-l">Will lead the AI era</div>
    </div>
    <div class="lp-stat-div"></div>
    <div class="lp-stat">
      <div class="lp-stat-n">10×</div>
      <div class="lp-stat-l">Daniel's academic edge</div>
    </div>
    <div class="lp-stat-div"></div>
    <div class="lp-stat">
      <div class="lp-stat-n">4</div>
      <div class="lp-stat-l">Qualities of the Lion</div>
    </div>
    <div class="lp-stat-div"></div>
    <div class="lp-stat">
      <div class="lp-stat-n">15 min</div>
      <div class="lp-stat-l">Daily · Grades 3–8</div>
    </div>
  </div>
</div>


<!-- ══ THE LION — DANIEL ══ -->
<section class="lp-section lp-cream">
  <p class="lp-eyebrow">The Name Behind the Practice</p>
  <h2 class="lp-h2">Daniel and His Friends Were the Lions</h2>
  <p class="lp-sub">Not the animal. Not the den. Not the king. The students.</p>
  <div class="lp-rule"></div>

  <div class="lp-lion-banner">
    <div class="lp-lion-left">
      <div class="lp-lion-num">10×</div>
      <div class="lp-lion-word">Better</div>
      <div class="lp-lion-ref">Daniel 1:20</div>
    </div>
    <div class="lp-lion-right">
      <h3>The Lions Did Not Touch Daniel — and the King Found Them Ten Times Better</h3>
      <p>When Daniel was thrown into the den, the lions did not touch him. Not because of walls or weapons — because they <em>recognised</em> something they had never encountered: a character so formed, a faith so settled, an excellence so complete that even the fiercest adversary stepped back.</p>
      <p>And in Daniel chapter 1, Nebuchadnezzar examined Daniel and his three friends — Hananiah, Mishael, and Azariah — and found them <em>ten times better</em> than every expert in his kingdom. Same curriculum. Same pressures. One difference: a daily practice of reflection, truth, and character — maintained inside the empire itself.</p>
      <p><em>Daniel and his friends were the lions. Lion's Pen builds those same four qualities in your child — one daily reflection at a time.</em></p>
    </div>
  </div>

  <div class="lp-lion-quote">
    <blockquote>
      The lions did not touch Daniel because he had already become
      something they could not overcome — not in the den, but long before it.
      In the daily practice of faith, excellence, emotion, and character
      that no empire, no algorithm, and no adversary can take away.
      <br><br>
      <em>Lion's Pen is where your child builds that same quality.</em>
    </blockquote>
    <cite>Daniel 1:20 · Daniel 6:22 · The Foundation of Lion's Pen</cite>
  </div>
</section>


<!-- ══ 15% DIVIDE ══ -->
<section class="lp-section lp-cream-dark">
  <p class="lp-eyebrow">The Stakes for Every Parent</p>
  <h2 class="lp-h2">The 15% Divide</h2>
  <p class="lp-sub">The workforce is splitting — which side is your child training for?</p>
  <div class="lp-rule"></div>

  <p class="lp-divide-intro">
    Research from the <strong>World Economic Forum</strong> and <strong>Stanford's AI Index</strong> shows a growing divide in the AI economy. It is not a divide of intelligence. It is a divide of <strong>daily habit</strong> — built or lost between ages 8 and 14.
  </p>

  <div class="lp-dc-grid">
    <div class="lp-dc lp-dc-a">
      <div class="lp-dc-pct">15%</div>
      <div class="lp-dc-name">The Architects · They Lead</div>
      <div class="lp-dc-title">High Agency. They direct AI.</div>
      <p class="lp-dc-body">Like Daniel, they are ten times better because they trained their minds when others outsourced theirs. They use AI as a Power Booster — not a Brain Replacement. They will oversee AI systems, not be overseen by them. Human-centric excellence — judgment, ethics, emotional intelligence — that no machine can replicate.</p>
    </div>
    <div class="lp-dc lp-dc-b">
      <div class="lp-dc-pct">85%</div>
      <div class="lp-dc-name">The Digital Exiles · They Follow</div>
      <div class="lp-dc-title">Low Agency. Managed by the machine.</div>
      <p class="lp-dc-body">Not because they lacked intelligence — because the habit of independent thought was never built. Cognitive outsourcing to AI. Identity erosion through social media. Emotional dependency on the feed. These are not teenage problems. They are habits being formed right now, in grades 3 through 8.</p>
    </div>
  </div>
  <div class="lp-dc-bar">
    <p>Lion's Pen is the daily counter-training — <strong>academic excellence, emotional stability, and character</strong> — fifteen minutes at a time.</p>
  </div>
</section>


<!-- ══ FOUR QUALITIES ══ -->
<section class="lp-section lp-cream">
  <p class="lp-eyebrow">The Four Qualities of the Lion</p>
  <h2 class="lp-h2">Faith. Excellence. Emotion. Character.</h2>
  <p class="lp-sub">What made the lions step back — built daily in the Scriptorium</p>
  <div class="lp-rule"></div>

  <div class="lp-q-grid">
    <div class="lp-q">
      <span class="lp-q-roman">I</span>
      <p class="lp-q-name">The Anchor</p>
      <span class="lp-q-sub">Unshakable Faith · Identity</span>
      <p class="lp-q-body">Daniel knew who he was — and no empire could rename him. Lion's Pen builds a settled, interior identity in your child that the digital world cannot hollow out, curate, or replace. A self that knows itself — every single morning, before the scroll begins.</p>
      <p class="lp-q-verse">"Daniel purposed in his heart." — Daniel 1:8</p>
    </div>
    <div class="lp-q">
      <span class="lp-q-roman">II</span>
      <p class="lp-q-name">Lore</p>
      <span class="lp-q-sub">Academic Excellence · The Mind</span>
      <p class="lp-q-body">Ten times better — in every subject, before every examiner. Daily metacognitive reflection compounds year after year: students who examine their own thinking learn faster, retain more, and solve harder problems. Not because they are smarter. Because they trained their minds when others outsourced theirs to AI.</p>
      <p class="lp-q-verse">"Ten times better in all matters of wisdom." — Daniel 1:20</p>
    </div>
    <div class="lp-q">
      <span class="lp-q-roman">III</span>
      <p class="lp-q-name">Tides</p>
      <span class="lp-q-sub">Emotional Mastery · The Heart</span>
      <p class="lp-q-body">The lions sensed Daniel's calm. In a world engineered to trigger and exploit emotion, the child who can name, understand, and regulate their feelings has an extraordinary advantage. Social media feeds on instability. The Scribe trains stability — daily, deliberately.</p>
      <p class="lp-q-verse">"Understanding in all visions and dreams." — Daniel 1:17</p>
    </div>
    <div class="lp-q">
      <span class="lp-q-roman">IV</span>
      <p class="lp-q-name">Forge</p>
      <span class="lp-q-sub">Strength of Character · The Will</span>
      <p class="lp-q-body">Grit, self-control, and integrity are not traits a child is born with. They are forged — daily — through the decision to do what is right when every pressure says conform. "No error or fault was found in him." That verdict came from ten thousand small daily decisions. That is the Forge. That is what made the lions step back.</p>
      <p class="lp-q-verse">"No error or fault was found in him." — Daniel 6:4</p>
    </div>
  </div>
</section>


<!-- ══ COMPLETE SYSTEM ══ -->
<section class="lp-section lp-cream-dark">
  <p class="lp-eyebrow">The Complete System</p>
  <h2 class="lp-h2">The Story. The Guide. The App. The Family.</h2>
  <p class="lp-sub">Four elements, one mission: raising the 15%</p>
  <div class="lp-rule"></div>
  <div class="lp-eco-grid">
    <div class="lp-eco">
      <span class="lp-eco-r">I</span>
      <p class="lp-eco-t">Lion's Pen</p>
      <span class="lp-eco-s">Historical Novel</span>
      <p class="lp-eco-b">Students enter Daniel's Babylon — the story that gives every ritual and every step of the Scribe's Journey its full meaning. When a child reads it, they do not join an app. They join a lineage.</p>
    </div>
    <div class="lp-eco">
      <span class="lp-eco-r">II</span>
      <p class="lp-eco-t">The Young Scribe</p>
      <span class="lp-eco-s">Student Guide</span>
      <p class="lp-eco-b">The student's companion — explaining the Scriptorium, the meaning of each step, and the Four Qualities of the Lion. The guide that makes the practice intelligible and the mission personal.</p>
    </div>
    <div class="lp-eco" style="border-top: 3px solid var(--lp-gold);">
      <span class="lp-eco-r" style="color: var(--lp-gold);">III</span>
      <p class="lp-eco-t">Lion's Pen App</p>
      <span class="lp-eco-s" style="color: var(--lp-rust);">Daily Reflection · 15 Min</span>
      <p class="lp-eco-b">The daily engine. Each evening: The Anchor (stillness), The Oath (truth), The Triad (Lore · Tides · Forge), The Illumination (ancient wisdom). In their own words. Never outsourced.</p>
      <p class="lp-eco-heart">The Heart of Lion's Pen</p>
    </div>
    <div class="lp-eco">
      <span class="lp-eco-r">IV</span>
      <p class="lp-eco-t">Our Children in Exile</p>
      <span class="lp-eco-s">Parent Guide</span>
      <p class="lp-eco-b">Parents are the first educators in this mission. This guide equips families with the philosophy, the Four Qualities, and the tools to walk alongside their child through the Scribe's Journey.</p>
    </div>
  </div>
</section>


<!-- ══ SCRIBE'S JOURNEY ══ -->
<section class="lp-section lp-dark">
  <p class="lp-eyebrow" style="color: var(--lp-gold);">How It Works</p>
  <h2 class="lp-h2 lp-h2-light">The Scribe's Journey</h2>
  <p class="lp-sub lp-sub-light">Four steps · Fifteen minutes · Every morning</p>
  <div class="lp-rule"></div>
  <div class="lp-j-grid">
    <div class="lp-j" data-n="I">
      <span class="lp-j-step">Step One</span>
      <p class="lp-j-name">The Anchor</p>
      <span class="lp-j-tag">The Rite of Stillness</span>
      <p class="lp-j-body">60 seconds of rhythmic breathing. The Scriptorium cannot be entered in distraction. <em>Stillness is the first discipline</em> — and the one the digital world most actively destroys.</p>
      <p class="lp-j-foot">60 seconds · Before the scroll</p>
    </div>
    <div class="lp-j" data-n="II">
      <span class="lp-j-step">Step Two</span>
      <p class="lp-j-name">The Oath</p>
      <span class="lp-j-tag">The Scribe's Covenant</span>
      <p class="lp-j-body">The Aspirant swears to write only what is true. <em>The daily commitment to self-honesty</em> that separates real growth from performance — and from the borrowed thought of AI.</p>
      <p class="lp-j-foot">Truth · Every session · No exceptions</p>
    </div>
    <div class="lp-j" data-n="III">
      <span class="lp-j-step">Step Three</span>
      <p class="lp-j-name">The Triad</p>
      <span class="lp-j-tag">Lore · Tides · Forge</span>
      <p class="lp-j-body">Three full paragraphs across Mind, Heart, and Character — <em>written in their own words</em>, generated by their own mind. Metacognition in daily practice. The proven engine of academic excellence.</p>
      <p class="lp-j-foot">10 minutes · 3 pillars · Their words</p>
    </div>
    <div class="lp-j" data-n="IV">
      <span class="lp-j-step">Step Four</span>
      <p class="lp-j-name">The Illumination</p>
      <span class="lp-j-tag">The Celestial Scriptorium</span>
      <p class="lp-j-body">Ancient wisdom from history's greatest thinkers — a Resonance returned to guide the Aspirant. <em>The voices of those who excelled before them</em>, drawing from the Celestial Scriptorium.</p>
      <p class="lp-j-foot">Inspired by John Bunyan's Pilgrim's Progress</p>
    </div>
  </div>
</section>


<!-- ══ CTA ══ -->
<section class="lp-cta-wrap">
  <h2 class="lp-cta-h">Raise a child the lions<br>cannot touch —<br><em>ten times better.</em></h2>
  <div class="lp-cta-rule"></div>
  <p class="lp-cta-body">
    The novel. The Young Scribe guide. The app. The parent guide.
    Everything a family needs to raise a student who commands the AI age —
    not one commanded by it.
  </p>
  <div class="lp-cta-btns">
    <button class="lp-btn-g">Begin My Child's Journey</button>
    <button class="lp-btn-o">Learn More</button>
  </div>
  <p class="lp-cta-note">Grades 3–8 · 15 Minutes a Day · Cancel Anytime · Parent Guide Included</p>
</section>


<!-- ══ FOOTER ══ -->
<footer class="lp-footer">
  <p class="lp-footer-logo">Lion's<span>Pen</span></p>
  <p>© 2026 Lion's Pen · Daniel &amp; his friends were the lions · For students who will be ten times better</p>
</footer>`;
