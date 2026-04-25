export const PARENT_LANDING_HTML = `<style>
  /* ── TOKENS ── */
  :root {
    --lp-navy: #1a2744;
    --lp-navy-light: #243156;
    --lp-navy-deep: #0f1a2e;
    --lp-cream: #f5f0e8;
    --lp-cream-dark: #ede7d9;
    --lp-gold: #b8892a;
    --lp-gold-light: #d4a84b;
    --lp-rust: #8b3a1e;
    --lp-text-dark: #1a1a2e;
    --lp-text-mid: #3d3d5c;
    --lp-text-muted: #7a7a99;
    --lp-white: #fff;
  }

  /* ── SCROLL SEPARATOR ── */
  .lp-separator {
    background: var(--lp-navy-deep);
    padding: 2.5rem 2rem;
    text-align: center;
    border-top: 1px solid rgba(184,137,42,0.2);
  }
  .lp-separator-inner {
    display: flex; align-items: center; justify-content: center; gap: 1.5rem;
  }
  .lp-sep-line { flex: 1; max-width: 120px; height: 1px; background: rgba(184,137,42,0.25); }
  .lp-sep-text {
    font-family: 'EB Garamond', serif;
    font-size: 0.75rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(245,240,232,0.35);
  }
  .lp-stats {
    display: flex; gap: 3.5rem; justify-content: center; margin-top: 1.8rem; flex-wrap: wrap;
  }
  .lp-stat { text-align: center; }
  .lp-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem; font-weight: 700; font-style: italic;
    color: var(--lp-gold-light); line-height: 1;
  }
  .lp-stat-label {
    font-family: 'EB Garamond', serif;
    font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(245,240,232,0.3); margin-top: 0.3rem;
  }
  .lp-stat-divider { width: 1px; background: rgba(184,137,42,0.18); align-self: stretch; }

  /* ── SHARED HELPERS ── */
  .lp-eyebrow {
    text-align: center; font-family: 'EB Garamond', serif;
    font-size: 0.78rem; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--lp-gold); margin-bottom: 1rem;
  }
  .lp-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 3.8vw, 3rem);
    color: var(--lp-navy); text-align: center;
    font-weight: 700; margin-bottom: 0.4rem;
  }
  .lp-italic {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.25rem;
    color: var(--lp-rust); text-align: center; margin-bottom: 1.5rem;
  }
  .lp-rule { width: 50px; height: 1px; background: var(--lp-gold); margin: 0 auto 3.5rem; }
  .lp-body-text {
    font-family: 'EB Garamond', serif;
    font-size: 18px; line-height: 1.7; color: var(--lp-text-dark);
  }

  /* ── DANIEL — 10× MODEL ── */
  .lp-daniel {
    padding: 8rem 2rem; background: var(--lp-cream);
    font-family: 'EB Garamond', serif; font-size: 18px; line-height: 1.7;
  }
  .lp-daniel-intro {
    max-width: 720px; margin: 0 auto 5rem;
    text-align: center; font-size: 1.1rem; color: var(--lp-text-mid); line-height: 1.9;
  }
  .lp-daniel-intro strong { color: var(--lp-navy); }
  .lp-tenx {
    max-width: 900px; margin: 0 auto 5rem;
    background: var(--lp-navy);
    display: grid; grid-template-columns: 1fr 2fr;
  }
  .lp-tenx-left {
    background: var(--lp-gold);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem 2rem; text-align: center;
  }
  .lp-tenx-num {
    font-family: 'Playfair Display', serif;
    font-size: 5rem; font-weight: 700; font-style: italic;
    color: var(--lp-navy-deep); line-height: 1;
  }
  .lp-tenx-word {
    font-size: 0.78rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--lp-navy); margin-top: 0.3rem; font-weight: 600;
    font-family: 'EB Garamond', serif;
  }
  .lp-tenx-ref {
    font-size: 0.72rem; color: rgba(15,26,46,0.55);
    margin-top: 0.5rem; font-style: italic;
    font-family: 'EB Garamond', serif;
  }
  .lp-tenx-right { padding: 3rem; }
  .lp-tenx-right h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 700; color: #f5f0e8; margin-bottom: 1rem;
  }
  .lp-tenx-right p {
    color: rgba(245,240,232,0.65); font-size: 0.95rem; line-height: 1.85; margin-bottom: 1rem;
  }
  .lp-tenx-right p:last-child { margin-bottom: 0; }
  .lp-tenx-right em { color: var(--lp-gold-light); font-style: italic; }

  .lp-btable {
    max-width: 900px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
    background: rgba(26,39,68,0.1);
  }
  .lp-bt-head {
    padding: 1.2rem 2rem;
    font-family: 'EB Garamond', serif;
    font-size: 0.78rem; letter-spacing: 0.15em; text-transform: uppercase;
    font-weight: 600; text-align: center;
  }
  .lp-bt-head.lp-ancient { background: var(--lp-navy); color: var(--lp-gold-light); }
  .lp-bt-head.lp-digital { background: var(--lp-cream-dark); color: var(--lp-navy); }
  .lp-bt-row {
    padding: 1.5rem 2rem;
    font-family: 'EB Garamond', serif;
    font-size: 0.93rem; line-height: 1.7; border-bottom: 1px solid;
  }
  .lp-bt-row.lp-ancient { background: var(--lp-navy-light); color: rgba(245,240,232,0.75); border-color: rgba(184,137,42,0.12); }
  .lp-bt-row.lp-digital { background: var(--lp-cream-dark); color: var(--lp-text-mid); border-color: rgba(26,39,68,0.08); }
  .lp-bt-row strong { display: block; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.3rem; }
  .lp-bt-row.lp-ancient strong { color: var(--lp-gold-light); }
  .lp-bt-row.lp-digital strong { color: var(--lp-navy); }

  .lp-daniel-outcome {
    max-width: 760px; margin: 4rem auto 0;
    border-left: 3px solid var(--lp-gold);
    background: var(--lp-navy); padding: 3rem 3.5rem; text-align: center;
  }
  .lp-daniel-outcome .lp-label {
    font-family: 'EB Garamond', serif;
    font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--lp-gold); margin-bottom: 1.5rem; display: block;
  }
  .lp-daniel-outcome blockquote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.15rem, 2.2vw, 1.5rem);
    font-style: italic; color: #f5f0e8; line-height: 1.8;
  }
  .lp-daniel-outcome blockquote em { color: var(--lp-gold-light); }
  .lp-daniel-outcome .lp-verse {
    margin-top: 1.5rem;
    font-family: 'EB Garamond', serif;
    font-size: 0.78rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(245,240,232,0.3);
  }

  /* ── 15% DIVIDE ── */
  .lp-divide { padding: 8rem 2rem; background: var(--lp-cream-dark); font-family: 'EB Garamond', serif; }
  .lp-divide-intro {
    max-width: 660px; margin: 0 auto 4rem;
    text-align: center; font-size: 1.05rem; color: var(--lp-text-mid); line-height: 1.9;
  }
  .lp-divide-intro strong { color: var(--lp-navy); }
  .lp-dc-grid {
    max-width: 920px; margin: 0 auto 4rem;
    display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
    background: rgba(26,39,68,0.12);
  }
  .lp-dc { padding: 3rem 2.5rem; }
  .lp-dc.lp-architects { background: var(--lp-navy); }
  .lp-dc.lp-exiles { background: var(--lp-white); }
  .lp-dc-pct {
    font-family: 'Playfair Display', serif;
    font-size: 4.5rem; font-weight: 700; font-style: italic;
    line-height: 1; margin-bottom: 0.2rem;
  }
  .lp-architects .lp-dc-pct { color: var(--lp-gold-light); }
  .lp-exiles .lp-dc-pct { color: rgba(26,39,68,0.18); }
  .lp-dc-name {
    font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase;
    margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid; font-weight: 600;
  }
  .lp-architects .lp-dc-name { color: var(--lp-gold); border-color: rgba(184,137,42,0.2); }
  .lp-exiles .lp-dc-name { color: var(--lp-text-muted); border-color: rgba(26,39,68,0.1); }
  .lp-dc-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;
  }
  .lp-architects .lp-dc-title { color: #f5f0e8; }
  .lp-exiles .lp-dc-title { color: var(--lp-navy); }
  .lp-dc-body { font-size: 0.92rem; line-height: 1.8; }
  .lp-architects .lp-dc-body { color: rgba(245,240,232,0.65); }
  .lp-exiles .lp-dc-body { color: var(--lp-text-mid); }
  .lp-dc-trait { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 1.5rem; margin-bottom: 0.4rem; font-weight: 600; }
  .lp-architects .lp-dc-trait { color: var(--lp-gold); }
  .lp-exiles .lp-dc-trait { color: var(--lp-rust); }

  .lp-dw {
    max-width: 920px; margin: 0 auto;
    background: var(--lp-white); padding: 3rem;
    border-top: 3px solid var(--lp-rust);
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem;
  }
  .lp-dw-header {
    grid-column: 1 / -1;
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700; color: var(--lp-navy);
    text-align: center; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;
  }
  .lp-dw-sub {
    grid-column: 1 / -1;
    text-align: center; font-size: 0.88rem; color: var(--lp-text-muted);
    margin-bottom: 1.5rem; padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(26,39,68,0.08);
  }
  .lp-dw-item { text-align: center; }
  .lp-dw-icon {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(139,58,30,0.08);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 0.8rem; font-size: 1.1rem; color: var(--lp-rust);
  }
  .lp-dw-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem; font-weight: 700; color: var(--lp-navy); margin-bottom: 0.4rem;
  }
  .lp-dw-body { font-size: 0.82rem; color: var(--lp-text-mid); line-height: 1.7; }
  .lp-dc-bar {
    max-width: 920px; margin: 2px auto 0;
    background: var(--lp-navy); padding: 2rem 3rem; text-align: center;
  }
  .lp-dc-bar p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-style: italic; color: rgba(245,240,232,0.7);
  }
  .lp-dc-bar strong { color: var(--lp-gold-light); font-style: normal; }

  /* ── THREE PILLARS ── */
  .lp-pillars { padding: 8rem 2rem; background: var(--lp-cream); font-family: 'EB Garamond', serif; }
  .lp-pillars-intro {
    max-width: 660px; margin: 0 auto 5rem;
    text-align: center; font-size: 1.05rem; color: var(--lp-text-mid); line-height: 1.9;
  }
  .lp-pillars-intro strong { color: var(--lp-navy); }
  .lp-pillar-trio {
    max-width: 900px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
    background: rgba(26,39,68,0.1);
  }
  .lp-pt { background: var(--lp-white); padding: 3rem 2.5rem; }
  .lp-pt-roman {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-style: italic; color: var(--lp-gold-light);
    display: block; margin-bottom: 0.5rem;
  }
  .lp-pt-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 700; color: var(--lp-navy); margin-bottom: 0.3rem;
  }
  .lp-pt-sub {
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--lp-gold); margin-bottom: 1.2rem; display: block;
  }
  .lp-pt-body { font-size: 0.9rem; color: var(--lp-text-mid); line-height: 1.8; margin-bottom: 1.2rem; }
  .lp-pt-verse {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem; font-style: italic;
    color: var(--lp-text-muted); border-top: 1px solid rgba(26,39,68,0.08);
    padding-top: 1rem; line-height: 1.7;
  }

  /* ── ECOSYSTEM (4 cards) ── */
  .lp-ecosystem { padding: 8rem 2rem; background: var(--lp-cream-dark); font-family: 'EB Garamond', serif; }
  .lp-eco-grid {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
    background: rgba(26,39,68,0.1);
  }
  .lp-eco { background: var(--lp-white); padding: 3rem 2rem; text-align: center; }
  .lp-eco-roman {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-style: italic; color: var(--lp-gold-light);
    display: block; margin-bottom: 0.8rem;
  }
  .lp-eco-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; font-weight: 700; color: var(--lp-navy); margin-bottom: 0.3rem;
  }
  .lp-eco-tag {
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--lp-gold); display: block; margin-bottom: 1.2rem;
  }
  .lp-eco-body { font-size: 0.88rem; color: var(--lp-text-mid); line-height: 1.75; }
  .lp-eco-heart {
    margin-top: 1rem; font-size: 0.75rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--lp-gold); font-weight: 600;
    font-family: 'EB Garamond', serif;
  }

  /* ── SCRIBE'S JOURNEY ── */
  .lp-journey { padding: 8rem 2rem; background: var(--lp-navy-deep); font-family: 'EB Garamond', serif; }
  .lp-journey-intro {
    max-width: 620px; margin: 0 auto 5rem;
    text-align: center; font-size: 1.05rem; color: rgba(245,240,232,0.55);
  }
  .lp-journey-intro strong { color: var(--lp-gold-light); }
  .lp-steps {
    max-width: 1000px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2px; background: rgba(184,137,42,0.12);
  }
  .lp-step { background: var(--lp-navy-light); padding: 2.5rem 1.8rem; position: relative; }
  .lp-step::before {
    content: attr(data-n);
    position: absolute; top: 1.2rem; right: 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem; font-style: italic;
    color: rgba(184,137,42,0.08); line-height: 1; pointer-events: none;
  }
  .lp-step-roman {
    font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--lp-gold); display: block; margin-bottom: 0.8rem;
  }
  .lp-step-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-weight: 700; color: #f5f0e8; margin-bottom: 0.2rem;
  }
  .lp-step-tag {
    font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(245,240,232,0.3); display: block; margin-bottom: 1.2rem;
  }
  .lp-step-body { font-size: 0.88rem; color: rgba(245,240,232,0.6); line-height: 1.75; }
  .lp-step-body em { color: var(--lp-gold-light); font-style: italic; }
  .lp-step-foot {
    margin-top: 1.2rem; padding-top: 1.2rem;
    border-top: 1px solid rgba(184,137,42,0.15);
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.75rem; color: var(--lp-gold); font-style: italic;
  }

  /* ── 8 PILLARS ── */
  .lp-eight { padding: 8rem 2rem; background: var(--lp-navy); font-family: 'EB Garamond', serif; }
  .lp-eight-grid {
    max-width: 960px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
  }
  .lp-pillar {
    border: 1px solid rgba(184,137,42,0.18); padding: 2rem 1.5rem;
    transition: border-color 0.2s;
  }
  .lp-pillar:hover { border-color: rgba(184,137,42,0.45); }
  .lp-pillar-name {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem; font-weight: 700; color: #f5f0e8;
    margin-bottom: 0.6rem; font-variant: small-caps; letter-spacing: 0.04em;
  }
  .lp-pillar-body { font-size: 0.83rem; color: rgba(245,240,232,0.5); line-height: 1.7; }
  .lp-eight-cta { text-align: center; margin-top: 3rem; }

  /* ── SCIENCE ── */
  .lp-science { padding: 8rem 2rem; background: var(--lp-cream-dark); font-family: 'EB Garamond', serif; }
  .lp-sci-grid {
    max-width: 880px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
  }
  .lp-sci-item { display: flex; gap: 1.5rem; }
  .lp-sci-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-style: italic; color: var(--lp-gold-light);
    line-height: 1; min-width: 2.6rem; text-align: right; padding-top: 0.15rem;
  }
  .lp-sci-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.98rem; font-weight: 700; color: var(--lp-navy); margin-bottom: 0.5rem;
  }
  .lp-sci-body { font-size: 0.88rem; color: var(--lp-text-mid); line-height: 1.75; }
  .lp-sci-quote {
    max-width: 820px; margin: 4rem auto 0;
    border-left: 3px solid var(--lp-gold);
    padding: 2rem 2.5rem; background: rgba(26,39,68,0.04);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem; font-style: italic;
    color: var(--lp-text-mid); line-height: 1.85;
  }
  .lp-sci-quote cite {
    display: block; margin-top: 1rem;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--lp-text-muted); font-style: normal;
  }

  /* ── TESTIMONIALS ── */
  .lp-testi { padding: 8rem 2rem; background: var(--lp-cream); font-family: 'EB Garamond', serif; }
  .lp-stars { text-align: center; color: var(--lp-gold); letter-spacing: 0.2em; font-size: 1rem; margin-bottom: 3rem; }
  .lp-testi-grid {
    max-width: 860px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
  }
  .lp-testi-card {
    padding: 2.5rem; background: var(--lp-white);
    border: 1px solid rgba(26,39,68,0.08); position: relative;
  }
  .lp-testi-mark {
    position: absolute; top: 1rem; right: 1.5rem;
    font-family: 'Playfair Display', serif;
    font-size: 5rem; color: rgba(184,137,42,0.08); line-height: 1;
  }
  .lp-testi-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-style: italic;
    color: var(--lp-text-mid); line-height: 1.8; margin-bottom: 1.5rem;
  }
  .lp-testi-name {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem; font-weight: 700; color: var(--lp-navy);
  }
  .lp-testi-role {
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lp-gold);
  }

  /* ── FINAL CTA ── */
  .lp-cta {
    background: var(--lp-navy-deep); padding: 9rem 2rem; text-align: center;
    position: relative; overflow: hidden;
    font-family: 'EB Garamond', serif;
  }
  .lp-cta::before {
    content: '10×';
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: 'Playfair Display', serif;
    font-size: 30vw; font-weight: 700; font-style: italic;
    color: rgba(184,137,42,0.03); pointer-events: none; line-height: 1; white-space: nowrap;
  }
  .lp-cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 3.2rem);
    color: #f5f0e8; font-weight: 400;
    max-width: 700px; margin: 0 auto 1rem;
    line-height: 1.2; position: relative; z-index: 1;
  }
  .lp-cta h2 em { font-style: italic; color: var(--lp-gold-light); }
  .lp-cta-rule { width: 50px; height: 1px; background: var(--lp-gold); margin: 2rem auto; position: relative; z-index: 1; }
  .lp-cta-body {
    max-width: 500px; margin: 0 auto 3rem;
    color: rgba(245,240,232,0.4); font-size: 0.93rem; line-height: 1.85;
    position: relative; z-index: 1;
  }
  .lp-cta-btns {
    display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
    margin-bottom: 1.5rem; position: relative; z-index: 1;
  }
  .lp-btn-gold {
    background: var(--lp-gold); color: var(--lp-navy-deep);
    padding: 0.95rem 2.6rem; font-size: 0.9rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: none; cursor: pointer;
    font-family: 'EB Garamond', serif; font-weight: 600;
  }
  .lp-btn-outline {
    background: transparent; color: rgba(245,240,232,0.55);
    padding: 0.9rem 2.4rem; font-size: 0.88rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid rgba(245,240,232,0.18); cursor: pointer;
    font-family: 'EB Garamond', serif;
  }
  .lp-cta-note {
    font-size: 0.78rem; color: rgba(245,240,232,0.22);
    letter-spacing: 0.08em; position: relative; z-index: 1;
  }

  /* ── FOOTER ── */
  .lp-footer { background: #0a0f1a; padding: 2.5rem 2rem; text-align: center; }
  .lp-footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem; color: rgba(245,240,232,0.35); margin-bottom: 0.5rem;
  }
  .lp-footer-logo span { color: var(--lp-gold); }
  .lp-footer p { font-size: 0.75rem; color: rgba(245,240,232,0.18); letter-spacing: 0.08em; font-family: 'EB Garamond', serif; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .lp-stats { gap: 1.8rem; }
    .lp-stat-divider { display: none; }
    .lp-tenx, .lp-btable, .lp-dc-grid, .lp-dw,
    .lp-pillar-trio, .lp-eco-grid, .lp-steps,
    .lp-eight-grid, .lp-sci-grid, .lp-testi-grid { grid-template-columns: 1fr; }
    .lp-dw-header, .lp-dw-sub { grid-column: 1; }
  }
</style>


<!-- ══════════════════════════════════════════
     SCROLL SEPARATOR — sits right below login
════════════════════════════════════════════ -->
<div class="lp-separator">
  <div class="lp-separator-inner">
    <div class="lp-sep-line"></div>
    <span class="lp-sep-text">Who Are the Lions?</span>
    <div class="lp-sep-line"></div>
  </div>
  <div class="lp-stats">
    <div class="lp-stat">
      <div class="lp-stat-num">15%</div>
      <div class="lp-stat-label">Will lead the AI era</div>
    </div>
    <div class="lp-stat-divider"></div>
    <div class="lp-stat">
      <div class="lp-stat-num">10×</div>
      <div class="lp-stat-label">Daniel's academic edge</div>
    </div>
    <div class="lp-stat-divider"></div>
    <div class="lp-stat">
      <div class="lp-stat-num">3</div>
      <div class="lp-stat-label">Pillars: mind, heart, character</div>
    </div>
    <div class="lp-stat-divider"></div>
    <div class="lp-stat">
      <div class="lp-stat-num">15 min</div>
      <div class="lp-stat-label">Daily practice · Grades 3–8</div>
    </div>
  </div>
</div>


<!-- ══════════════════════════════════════════
     DANIEL — THE 10× EXCELLENCE MODEL
════════════════════════════════════════════ -->
<section class="lp-daniel" id="lp-daniel">
  <p class="lp-eyebrow">The Name Behind the Practice</p>
  <h2 class="lp-title">Daniel and His Friends Were the Lions</h2>
  <p class="lp-italic">Not the animal. Not the den. Not the king. The students.</p>
  <div class="lp-rule"></div>

  <p class="lp-daniel-intro">
    When Daniel was thrown into the den of lions, something extraordinary happened.
    The lions — the most fearless predators alive — <strong>did not touch him.</strong>
    Not because of a cage. Not because of a guard.
    Because they recognised something in Daniel they had never encountered before:
    a character so formed, a faith so settled, an excellence so complete
    that even the fiercest adversary stepped back.
    <br><br>
    The lions in Lion's Pen are <strong>not the animals.</strong>
    They are Daniel — and his three friends, Hananiah, Mishael, and Azariah.
    Students who entered the most powerful empire of the ancient world
    and came out <strong>ten times better than everyone in it.</strong>
    <br><br>
    That is what every Aspirant Young Scribe is becoming.
    <em>Not a student who avoids the digital world — one who commands it,
    the way Daniel commanded Babylon.</em>
  </p>

  <div class="lp-tenx">
    <div class="lp-tenx-left">
      <div class="lp-tenx-num">10×</div>
      <div class="lp-tenx-word">Better</div>
      <div class="lp-tenx-ref">Daniel 1:20</div>
    </div>
    <div class="lp-tenx-right">
      <h3>"The Lions Did Not Touch Daniel" — and the King Found Them Ten Times Better</h3>
      <p>Two stories. One truth. In Daniel chapter 1, Nebuchadnezzar examined Daniel and his three friends personally — and found them <em>ten times better</em> than every expert in his kingdom. In Daniel chapter 6, the lions that were meant to destroy him recognised something they could not overcome — and did not touch him.</p>
      <p>Both outcomes came from the same source: a <em>daily practice</em> of reflection, truth-telling, and character formation — maintained every single day, inside the empire itself. Not despite Babylon. Inside it. Through it. Above it.</p>
      <p><em>Daniel and his friends were the lions — in excellence, in faith, in emotional mastery, in character. Lion's Pen builds those same four qualities, one daily reflection at a time.</em></p>
    </div>
  </div>

  <div class="lp-btable">
    <div class="lp-bt-head lp-ancient">Ancient Babylon</div>
    <div class="lp-bt-head lp-digital">Digital Babylon — Today</div>
    <div class="lp-bt-row lp-ancient"><strong>The Empire</strong>The most powerful propaganda system of the ancient world — designed to reshape the minds of its brightest captives.</div>
    <div class="lp-bt-row lp-digital"><strong>The Empire</strong>The most sophisticated attention economy in history — designed to capture, train, and monetize the minds of its youngest users.</div>
    <div class="lp-bt-row lp-ancient"><strong>The Renaming</strong>Nebuchadnezzar gave Daniel a Babylonian name — a new identity built to serve the state.</div>
    <div class="lp-bt-row lp-digital"><strong>The Profile</strong>Social media gives children a curated, performed identity — optimized for engagement, not for truth or growth.</div>
    <div class="lp-bt-row lp-ancient"><strong>The Retraining</strong>Three years of Babylonian education — knowledge and logic designed to produce loyal servants of the empire.</div>
    <div class="lp-bt-row lp-digital"><strong>Cognitive Outsourcing</strong>AI generates their essays, answers their questions, finishes their thoughts — training dependency, not independent excellence.</div>
    <div class="lp-bt-row lp-ancient"><strong>Daniel's Response</strong>He entered the system daily — and daily kept his practice. He did not flee Babylon. He outperformed everyone in it.</div>
    <div class="lp-bt-row lp-digital"><strong>Your Child's Response</strong>They will live in the digital world. The question is whether they direct it — or are directed by it.</div>
  </div>

  <div class="lp-daniel-outcome">
    <span class="lp-label">The Lion's Pen Vision</span>
    <blockquote>
      The lions did not touch Daniel — because he had already become
      something they could not overcome.
      Not in the den. Long before the den.
      In the daily practice of faith, excellence, emotion, and character
      that no empire, no algorithm, and no predator can take away.
      <br><br>
      <em>Lion's Pen is where your child builds that same quality —
      one reflection at a time.</em>
    </blockquote>
    <p class="lp-verse">Daniel 1:20 · Daniel 6:22 · The Foundation of Lion's Pen</p>
  </div>
</section>


<!-- ══════════════════════════════════════════
     THE 15% / 85% DIVIDE
════════════════════════════════════════════ -->
<section class="lp-divide" id="lp-divide">
  <p class="lp-eyebrow">The Stakes for Every Parent</p>
  <h2 class="lp-title">The 15% Divide</h2>
  <p class="lp-italic">The workforce is splitting — which side is your child training for?</p>
  <div class="lp-rule"></div>

  <p class="lp-divide-intro">
    Research from the <strong>World Economic Forum</strong> and <strong>Stanford's AI Index</strong> points to a clear and growing divide in the AI economy. It is not a divide of intelligence or opportunity. It is a divide of <strong>daily habit</strong> — the habit of independent thought, built (or lost) in childhood.
  </p>

  <div class="lp-dc-grid">
    <div class="lp-dc lp-architects">
      <div class="lp-dc-pct">15%</div>
      <div class="lp-dc-name">The Architects of the AI Era</div>
      <div class="lp-dc-title">They Direct. They Command. They Lead.</div>
      <p class="lp-dc-body">Students who develop High Agency. They use AI as a Power Booster — a tool that multiplies their thinking — not a replacement for it. Like Daniel, they are ten times better because they trained their minds when others outsourced theirs.</p>
      <p class="lp-dc-trait">The Advantage</p>
      <p class="lp-dc-body">Human-centric excellence — judgment, ethics, systems thinking, emotional intelligence — that no machine can replicate. These are the students who will oversee AI, not be overseen by it.</p>
      <p class="lp-dc-trait">The Result</p>
      <p class="lp-dc-body">High command. High autonomy. The ability to direct the AI era rather than be swept along by it.</p>
    </div>
    <div class="lp-dc lp-exiles">
      <div class="lp-dc-pct">85%</div>
      <div class="lp-dc-name">The Digital Exiles</div>
      <div class="lp-dc-title">Managed by the Machine They Did Not Master</div>
      <p class="lp-dc-body">Students who surrendered the struggle of thinking for the ease of the algorithm. Not because they lacked intelligence — because the habit of independent thought was never built. The machine did it for them, daily, until they could no longer do it at all.</p>
      <p class="lp-dc-trait">The Warning Signs — Starting Now</p>
      <p class="lp-dc-body">Cognitive outsourcing to AI. Identity erosion through social media. Emotional dependency on engagement and approval. These are not teenage problems — they are habits being formed in grades 3 through 8.</p>
      <p class="lp-dc-trait">The Outcome</p>
      <p class="lp-dc-body">Low-agency roles — managed, directed, and evaluated by systems they never learned to command. Not for lack of talent. For lack of a daily practice.</p>
    </div>
  </div>

  <div class="lp-dw">
    <p class="lp-dw-header">What Parents Need to Know — Now</p>
    <p class="lp-dw-sub">The habits that determine which side of the divide a child lands on are being formed between ages 8 and 14. These are the three silent threats.</p>
    <div class="lp-dw-item">
      <div class="lp-dw-icon">⟳</div>
      <p class="lp-dw-title">Cognitive Outsourcing</p>
      <p class="lp-dw-body">When AI writes the essay, answers the question, and completes the thought — the child's brain stops practicing the skill. Repeated daily, this builds genuine cognitive dependency. Not laziness: a trained inability.</p>
    </div>
    <div class="lp-dw-item">
      <div class="lp-dw-icon">◎</div>
      <p class="lp-dw-title">Social Media &amp; Identity Loss</p>
      <p class="lp-dw-body">When a child's self-worth is built on likes, follows, and curated performance, their sense of identity becomes external and fragile. They learn to be what the feed rewards — not who they actually are.</p>
    </div>
    <div class="lp-dw-item">
      <div class="lp-dw-icon">△</div>
      <p class="lp-dw-title">Emotional Dysregulation</p>
      <p class="lp-dw-body">Constant stimulation, comparison, and feedback addiction erodes the emotional stability needed to think under pressure. Anxiety, distraction, and impulsivity are trained responses to an engineered environment.</p>
    </div>
  </div>
  <div class="lp-dc-bar">
    <p>Lion's Pen is the daily counter-training — <strong>academic excellence, emotional stability, and character formation</strong> — built fifteen minutes at a time, from grades 3 through 8.</p>
  </div>
</section>


<!-- ══════════════════════════════════════════
     THREE PILLARS
════════════════════════════════════════════ -->
<section class="lp-pillars" id="lp-pillars">
  <p class="lp-eyebrow">The Four Qualities of the Lion</p>
  <h2 class="lp-title">Faith. Excellence. Emotion. Character.</h2>
  <p class="lp-italic">What made the lions step back — built daily in the Scriptorium</p>
  <div class="lp-rule"></div>
  <p class="lp-pillars-intro">
    Daniel and his friends were not outstanding in just one dimension.
    The record is clear across two chapters: <strong>academic excellence ten times above their peers</strong> (Daniel 1),
    <strong>unshakable faith and identity</strong> that no empire could rename,
    <strong>emotional steadiness</strong> under the greatest pressure imaginable,
    and <strong>a strength of character</strong> so evident that even lions recognised it (Daniel 6).
    <br><br>
    Lion's Pen is built on those same four qualities — because the AI era demands all four.
  </p>
  <div class="lp-pillar-trio" style="grid-template-columns: repeat(2, 1fr);">
    <div class="lp-pt">
      <span class="lp-pt-roman">I</span>
      <p class="lp-pt-name">The Anchor</p>
      <span class="lp-pt-sub">Unshakable Faith · Identity</span>
      <p class="lp-pt-body">Daniel knew who he was — and no empire could rename him. Nebuchadnezzar tried to give him a new name, new food, new thinking. Daniel refused. Not with rage — with a settled, daily practice of identity. Lion's Pen builds that same unshakable interior in your child: a self that the digital world cannot hollow out, curate, or replace.</p>
      <p class="lp-pt-verse">"Daniel purposed in his heart." — Daniel 1:8</p>
    </div>
    <div class="lp-pt">
      <span class="lp-pt-roman">II</span>
      <p class="lp-pt-name">Lore</p>
      <span class="lp-pt-sub">Academic Excellence · The Mind</span>
      <p class="lp-pt-body">Ten times better — in every subject, before every examiner. Daily metacognitive reflection builds the kind of academic excellence that compounds year after year: students who examine their own thinking learn faster, retain more, and solve harder problems. Not because they are smarter. Because they trained their minds when others outsourced theirs.</p>
      <p class="lp-pt-verse">"Ten times better in all matters of wisdom." — Daniel 1:20</p>
    </div>
    <div class="lp-pt">
      <span class="lp-pt-roman">III</span>
      <p class="lp-pt-name">Tides</p>
      <span class="lp-pt-sub">Emotional Mastery · The Heart</span>
      <p class="lp-pt-body">The lions sensed Daniel's calm — and stepped back. In a world engineered to trigger, exploit, and monetise emotion, the child who can name, understand, and regulate their feelings has an extraordinary advantage. Social media feeds on emotional instability. The Scribe trains emotional stability — daily, deliberately, through structured self-examination.</p>
      <p class="lp-pt-verse">"Understanding in all visions and dreams." — Daniel 1:17</p>
    </div>
    <div class="lp-pt">
      <span class="lp-pt-roman">IV</span>
      <p class="lp-pt-name">Forge</p>
      <span class="lp-pt-sub">Strength of Character · The Will</span>
      <p class="lp-pt-body">Grit, self-control, integrity, and conscientiousness are not traits a child is born with. They are forged — daily — through the decision to do what is right when every pressure says conform. "No error or fault was found in him." That verdict came not from one great moment, but from ten thousand small daily decisions. That is the Forge. That is what made the lions step back.</p>
      <p class="lp-pt-verse">"No error or fault was found in him." — Daniel 6:4</p>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     THE COMPLETE SYSTEM — 4 ELEMENTS
════════════════════════════════════════════ -->
<section class="lp-ecosystem" id="lp-ecosystem">
  <p class="lp-eyebrow">The Complete System</p>
  <h2 class="lp-title">The Story. The Guide. The App. The Family.</h2>
  <p class="lp-italic">Four elements, one mission: raising the 15%</p>
  <div class="lp-rule"></div>
  <div class="lp-eco-grid">
    <div class="lp-eco">
      <span class="lp-eco-roman">I</span>
      <p class="lp-eco-title">Lion's Pen</p>
      <span class="lp-eco-tag">Historical Novel</span>
      <p class="lp-eco-body">Students enter the world of Daniel's Babylon — a story that gives every ritual, every term, and every step of the Scribe's Journey its full weight. When a child reads it, they do not join a program. They join a lineage of thinkers who refused to be outperformed.</p>
    </div>
    <div class="lp-eco">
      <span class="lp-eco-roman">II</span>
      <p class="lp-eco-title">The Young Scribe</p>
      <span class="lp-eco-tag">Student Guide</span>
      <p class="lp-eco-body">The student's companion through the Scribe's Journey — explaining the Scriptorium, the meaning of each step, the Eight Pillars of Excellence, and how to get the most from every session. The guide that makes the practice intelligible and the mission personal.</p>
    </div>
    <div class="lp-eco" style="border-top: 3px solid var(--lp-gold);">
      <span class="lp-eco-roman" style="color: var(--lp-gold);">III</span>
      <p class="lp-eco-title">Lion's Pen App</p>
      <span class="lp-eco-tag" style="color: var(--lp-rust);">Daily Guided Reflection · 15 Minutes</span>
      <p class="lp-eco-body">The daily engine of the entire system. Each evening the Aspirant opens the Scriptorium: The Anchor (stillness), The Oath (truth), The Triad (Lore · Tides · Forge), The Illumination (ancient wisdom). Structured, guided, in their own words — never outsourced to a machine.</p>
      <p class="lp-eco-heart">The Heart of Lion's Pen</p>
    </div>
    <div class="lp-eco">
      <span class="lp-eco-roman">IV</span>
      <p class="lp-eco-title">Our Children in Exile</p>
      <span class="lp-eco-tag">Parent Guide</span>
      <p class="lp-eco-body">Parents are the first educators in this mission. This guide equips them with the philosophy, the Scribe's Code, and the tools to walk alongside their child — understanding the digital threats and the daily practice that answers them.</p>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     THE SCRIBE'S JOURNEY — 4 STEPS
════════════════════════════════════════════ -->
<section class="lp-journey" id="lp-journey">
  <p class="lp-eyebrow" style="color: var(--lp-gold);">How It Works</p>
  <h2 class="lp-title" style="color: #f5f0e8;">The Scribe's Journey</h2>
  <p class="lp-italic" style="color: var(--lp-gold-light);">Four steps · Fifteen minutes · One life-changing habit</p>
  <div class="lp-rule"></div>
  <p class="lp-journey-intro">
    Each day, the <strong>Aspirant Young Scribe</strong> enters their Scriptorium and walks four steps — the same discipline Daniel practiced inside Babylon itself.
  </p>
  <div class="lp-steps">
    <div class="lp-step" data-n="I">
      <span class="lp-step-roman">Step One</span>
      <p class="lp-step-name">The Anchor</p>
      <span class="lp-step-tag">The Rite of Stillness</span>
      <p class="lp-step-body">The Aspirant breathes for 60 seconds, clearing the noise of the digital world before entering the Scriptorium. <em>Excellence requires a still mind.</em> Stillness is the first discipline — and the one the digital empire most actively destroys.</p>
      <p class="lp-step-foot">60 seconds of rhythmic breathing</p>
    </div>
    <div class="lp-step" data-n="II">
      <span class="lp-step-roman">Step Two</span>
      <p class="lp-step-name">The Oath</p>
      <span class="lp-step-tag">The Scribe's Covenant</span>
      <p class="lp-step-body">The Aspirant swears, as Daniel swore: to write only what is true, no matter the cost. <em>The Oath is the foundation of excellence</em> — the daily commitment to self-honesty that separates real growth from performance and borrowed thought.</p>
      <p class="lp-step-foot">The daily commitment to truth</p>
    </div>
    <div class="lp-step" data-n="III">
      <span class="lp-step-roman">Step Three</span>
      <p class="lp-step-name">The Triad</p>
      <span class="lp-step-tag">The Threefold Inquiry of the Forge</span>
      <p class="lp-step-body">The Aspirant reflects across three pillars in full paragraphs — <em>Lore</em> (Mind), <em>Tides</em> (Heart), <em>Forge</em> (Character). Written in their own words, generated by their own mind. Metacognition in practice — the proven engine of academic excellence.</p>
      <p class="lp-step-foot">10 minutes · 3 pillars · Their own words</p>
    </div>
    <div class="lp-step" data-n="IV">
      <span class="lp-step-roman">Step Four</span>
      <p class="lp-step-name">The Illumination</p>
      <span class="lp-step-tag">The Celestial Scriptorium</span>
      <p class="lp-step-body">The Eternal Master Scribes — the great thinkers of history — return a Resonance: ancient proverb or strategic wisdom to guide the Aspirant through tomorrow's trial. <em>The wisdom of those who excelled before them.</em></p>
      <p class="lp-step-foot">Inspired by John Bunyan's Pilgrim's Progress</p>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     EIGHT PILLARS OF EXCELLENCE
════════════════════════════════════════════ -->
<section class="lp-eight" id="lp-code">
  <p class="lp-eyebrow" style="color: var(--lp-gold-light);">The Scribe's Code</p>
  <h2 class="lp-title" style="color: #f5f0e8;">The Eight Pillars of Excellence</h2>
  <p class="lp-italic" style="color: var(--lp-gold-light);">The virtues Daniel built — and machines cannot replicate</p>
  <div class="lp-rule"></div>
  <div class="lp-eight-grid">
    <div class="lp-pillar">
      <p class="lp-pillar-name">Growth Mindset</p>
      <p class="lp-pillar-body">View abilities as forged through effort — transforming failure into the forge of mastery, just as Daniel excelled not despite difficulty but through it.</p>
    </div>
    <div class="lp-pillar">
      <p class="lp-pillar-name">Truthful Thought</p>
      <p class="lp-pillar-body">Eliminate self-deception and false logic. The Scribe who sees clearly solves real problems — not the curated problems the algorithm decides they should have.</p>
    </div>
    <div class="lp-pillar">
      <p class="lp-pillar-name">Grit &amp; Resilience</p>
      <p class="lp-pillar-body">Build long-term stamina and the ability to finish — the quality that made Daniel 10× better than those who quit at difficulty.</p>
    </div>
    <div class="lp-pillar">
      <p class="lp-pillar-name">Emotional Stability</p>
      <p class="lp-pillar-body">Remain calm and rational under pressure. In a world engineered to trigger emotion and hijack judgment, emotional stability is a supreme competitive advantage.</p>
    </div>
    <div class="lp-pillar">
      <p class="lp-pillar-name">Self-Control</p>
      <p class="lp-pillar-body">Override impulse for long-term gain — the bridge between intention and achievement. The first discipline the digital world erodes; the first the Scribe rebuilds.</p>
    </div>
    <div class="lp-pillar">
      <p class="lp-pillar-name">Conscientiousness</p>
      <p class="lp-pillar-body">Organization, discipline, and thoroughness — ensuring that effort translates into results that are complete, accurate, and genuinely the student's own.</p>
    </div>
    <div class="lp-pillar">
      <p class="lp-pillar-name">Character &amp; Agency</p>
      <p class="lp-pillar-body">The captain metaphor — navigating their own journey with intention. The 15% who will lead the AI era will do so because they commanded themselves first.</p>
    </div>
    <div class="lp-pillar">
      <p class="lp-pillar-name">Precise Language</p>
      <p class="lp-pillar-body">Clarity and accuracy in every sentence. The Scribe forges their own words — with precision, intention, and the understanding that borrowed language is borrowed thought.</p>
    </div>
  </div>
  <div class="lp-eight-cta">
    <button class="lp-btn-gold" style="margin-top: 1.5rem;">Begin the Scribe's Practice</button>
  </div>
</section>


<!-- ══════════════════════════════════════════
     SCIENCE OF METACOGNITION
════════════════════════════════════════════ -->
<section class="lp-science" id="lp-science">
  <p class="lp-eyebrow">Evidence-Based Excellence</p>
  <h2 class="lp-title">The Science of Metacognition</h2>
  <p class="lp-italic">Why daily written reflection is the most powerful academic intervention known</p>
  <div class="lp-rule"></div>
  <div class="lp-sci-grid">
    <div class="lp-sci-item">
      <div class="lp-sci-num">0.68</div>
      <div>
        <p class="lp-sci-title">Substantial Academic Gains</p>
        <p class="lp-sci-body">Meta-analytic research reveals effect sizes of 0.68 (primary) and 0.71 (secondary) — among the most effective strategies in Hattie's synthesis of 800+ meta-analyses, outperforming homework, reduced class size, and most forms of tutoring.</p>
      </div>
    </div>
    <div class="lp-sci-item">
      <div class="lp-sci-num">✓</div>
      <div>
        <p class="lp-sci-title">Emotional Intelligence</p>
        <p class="lp-sci-body">Students who examine emotional triggers through structured daily reflection demonstrate measurably improved stress management and social navigation — shifting from reactive to deliberate, from passive to commanding.</p>
      </div>
    </div>
    <div class="lp-sci-item">
      <div class="lp-sci-num">✓</div>
      <div>
        <p class="lp-sci-title">Cross-Disciplinary Excellence</p>
        <p class="lp-sci-body">Metacognitive practice improves problem-solving in mathematics, comprehension in literacy, and reasoning across every subject — because it trains the mind that does all of them, not a single skill in isolation.</p>
      </div>
    </div>
    <div class="lp-sci-item">
      <div class="lp-sci-num">∞</div>
      <div>
        <p class="lp-sci-title">Lifelong Character Formation</p>
        <p class="lp-sci-body">Longitudinal studies link sustained daily reflection to self-management, responsibility, perseverance, empathy, and ethical awareness — the human excellence that no algorithm will replace.</p>
      </div>
    </div>
  </div>
  <div class="lp-sci-quote">
    "Structured reflection — through learning journals, written prompts, and self-assessment tasks — consistently enhances student outcomes across multiple domains. Reflection is most effective when prompts are specific and clear, feedback is consistent, and the practice is sustained over time."
    <cite>Dignath &amp; Büttner (2008) · Hattie (2009) · Efklides et al. (2011) · McAllen (2015) · Oud &amp; Leuqeet et al. (2012)</cite>
  </div>
</section>


<!-- ══════════════════════════════════════════
     TESTIMONIALS
════════════════════════════════════════════ -->
<section class="lp-testi">
  <p class="lp-eyebrow">Trusted by Parents and Educators</p>
  <h2 class="lp-title">From the Scriptorium</h2>
  <div class="lp-rule"></div>
  <div class="lp-stars">★ ★ ★ ★ ★</div>
  <div class="lp-testi-grid">
    <div class="lp-testi-card">
      <div class="lp-testi-mark">"</div>
      <p class="lp-testi-body">My son's grades improved, but that's not the most remarkable thing. He started pushing back when his friends just copied from AI. He said, "That's not how Daniel would do it." He has a standard now. That's what Lion's Pen gave him.</p>
      <p class="lp-testi-name">Sarah M.</p>
      <p class="lp-testi-role">Parent of a 5th Grader</p>
    </div>
    <div class="lp-testi-card">
      <div class="lp-testi-mark">"</div>
      <p class="lp-testi-body">I have watched cognitive outsourcing hollow out an entire generation of students. They are intelligent children who have simply never been asked to do their own thinking. Lion's Pen is the most serious and well-designed answer to that problem I have encountered.</p>
      <p class="lp-testi-name">David R.</p>
      <p class="lp-testi-role">Middle School Principal</p>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     FINAL CTA
════════════════════════════════════════════ -->
<section class="lp-cta">
  <h2>Raise a child<br>the lions cannot touch —<br><em>ten times better.</em></h2>
  <div class="lp-cta-rule"></div>
  <p class="lp-cta-body">
    The novel. The Young Scribe daily guide. The app. The parent guide.
    Everything a family needs to raise a student who commands the AI age —
    not a student commanded by it.
  </p>
  <div class="lp-cta-btns">
    <button class="lp-btn-gold">Begin My Child's Journey</button>
    <button class="lp-btn-outline">Learn More</button>
  </div>
  <p class="lp-cta-note">Grades 3–8 · 15 Minutes a Day · Cancel Anytime · Parent Guide Included</p>
</section>


<!-- ══════════════════════════════════════════
     FOOTER
════════════════════════════════════════════ -->
<footer class="lp-footer">
  <p class="lp-footer-logo">Lion's<span>Pen</span> — The Scribe's Daily Practice</p>
  <p>© 2026 Lion's Pen · Daniel &amp; his friends were the lions · For students who will be ten times better</p>
</footer>
`;
