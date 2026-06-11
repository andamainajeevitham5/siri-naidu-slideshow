/* ════════════════════════════════════════════════
   APP — js/app.js
   Navigation, page builders, lightbox, form.
════════════════════════════════════════════════ */

/* ── NAVIGATION ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  ensureFooter(id);
}
function goHome() { showPage('home'); }

function ensureFooter(id) {
  const map = {
    home: 'home-footer',
    collections: 'colls-footer',
    category: 'cat-footer',
    about: 'about-footer',
    contact: 'contact-footer'
  };
  const el = document.getElementById(map[id]);
  if (el) el.innerHTML = footerHTML();
}

function footerHTML() {
  return `
    <div class="ft-logo">Siri Naidu</div>
    <div class="ft-tag">Photography By</div>

    <div class="ft-social-cards">

      <a href="https://www.instagram.com/photography_by_siri_naidu" target="_blank" class="ft-social-card">
        <div class="ft-sc-icon ft-sc-ig">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" stroke-width="1.6"/>
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
          </svg>
        </div>
        <div class="ft-sc-info">
          <span class="ft-sc-platform">Instagram</span>
          <span class="ft-sc-handle">@photography_by_siri_naidu</span>
          <span class="ft-sc-cta">View Profile →</span>
        </div>
      </a>

      <a href="https://www.facebook.com/share/1JZyDX3ASm/" target="_blank" class="ft-social-card">
        <div class="ft-sc-icon ft-sc-fb">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="ft-sc-info">
          <span class="ft-sc-platform">Facebook</span>
          <span class="ft-sc-handle">Photography by Siri Naidu</span>
          <span class="ft-sc-cta">View Profile →</span>
        </div>
      </a>

    </div>

    <ul class="ft-links">
      <li><button onclick="goHome()">Home</button></li>
      <li><button onclick="showPage('collections')">Collections</button></li>
      <li><button onclick="showPage('about')">About</button></li>
      <li><button onclick="showPage('contact')">Contact</button></li>
    </ul>
    <div class="ft-copy">© 2024 Photography by Siri Naidu · Hyderabad, Telangana</div>
  `;
}

function toggleMob() { document.getElementById('mob-menu').classList.toggle('open'); }
function closeMob()  { document.getElementById('mob-menu').classList.remove('open'); }

/* ── NAV DROPDOWN + MOBILE CATS ── */
function buildNavDropdown() {
  document.getElementById('nav-dropdown').innerHTML =
    CATS.map(c => `<button onclick="openCat('${c.id}')">${c.emoji} ${c.name}</button>`).join('');
  document.getElementById('mob-cats').innerHTML =
    CATS.map(c => `<button class="mob-sub" onclick="openCat('${c.id}');closeMob()">${c.emoji} ${c.name}</button>`).join('');
}

/* ── OPEN CATEGORY PAGE ── */
function openCat(id) {
  const c = CATS.find(x => x.id === id);
  if (!c) return;

  document.getElementById('bc-name').textContent    = c.name;
  document.getElementById('cath-bg').style.background = c.gradient;
  document.getElementById('cath-label').textContent = c.name + ' Collection';
  document.getElementById('cath-title').textContent = c.name;
  document.getElementById('cath-tagline').textContent = c.tagline;
  document.getElementById('cta-title').textContent  = 'Book a ' + c.name + ' Session';
  document.getElementById('cta-sub').textContent    = c.ctaSub;

  /* mandala dynamic spokes */
  const spokes = [0,30,60,90,120,150,180,210,240,270,300,330];
  const petals = [0,45,90,135,180,225,270,315];
  const m = document.getElementById('cath-mandala');
  const old = m.querySelector('.dyn-g');
  if (old) m.removeChild(old);
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'dyn-g');
  spokes.forEach(a => {
    const r = a * Math.PI / 180;
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', 100 + 22 * Math.cos(r)); l.setAttribute('y1', 100 + 22 * Math.sin(r));
    l.setAttribute('x2', 100 + 95 * Math.cos(r)); l.setAttribute('y2', 100 + 95 * Math.sin(r));
    l.setAttribute('stroke', '#C9A84C'); l.setAttribute('stroke-width', '0.3');
    g.appendChild(l);
  });
  petals.forEach(a => {
    const r = a * Math.PI / 180;
    const ci = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ci.setAttribute('cx', 100 + 60 * Math.cos(r));
    ci.setAttribute('cy', 100 + 60 * Math.sin(r));
    ci.setAttribute('r', '4'); ci.setAttribute('fill', 'none');
    ci.setAttribute('stroke', '#C9A84C'); ci.setAttribute('stroke-width', '0.4');
    g.appendChild(ci);
  });
  m.appendChild(g);

  /* info block */
  document.getElementById('cat-intro-wrap').innerHTML = `
    <div class="ci-left">
      <h2>${c.name}<br><em>Photography</em></h2>
      <p>${c.about}</p>
      <div style="margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap">
        <button class="btn-solid" onclick="showPage('contact')">Book Now</button>
        <a href="tel:9000008808" class="btn-outline">Call Us</a>
      </div>
    </div>
    <div class="ci-right">
      <ul class="ci-details">
        ${c.details.map(d => `<li><span>${d.icon}</span><div><strong>${d.label}</strong>${d.val}</div></li>`).join('')}
      </ul>
      <div style="padding:1.2rem;border:1px solid var(--bdr);background:var(--gray2)">
        <div class="sec-label" style="margin-bottom:.4rem">Need to Talk?</div>
        <div style="font-size:.83rem;color:var(--gray);line-height:1.7;font-weight:300">
          <a href="tel:9000008808" style="color:var(--k)">9000008808</a> &nbsp;|&nbsp;
          <a href="tel:6302287207" style="color:var(--k)">6302287207</a><br>
          <a href="mailto:dhana63022@gmail.com" style="color:var(--gray)">dhana63022@gmail.com</a>
        </div>
      </div>
    </div>
  `;

  buildCatGallery(c);
  showPage('category');
}

/* ── MANDALA SVG HELPER ── */
function mandala(cls) {
  const spokes = [0,45,90,135,180,225,270,315];
  const lines = spokes.map(a => {
    const r = a * Math.PI / 180;
    return `<line x1="${50+12*Math.cos(r)}" y1="${50+12*Math.sin(r)}" x2="${50+48*Math.cos(r)}" y2="${50+48*Math.sin(r)}" stroke="#C9A84C" stroke-width="0.35"/>`;
  }).join('');
  const dots = [0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
    const r = a * Math.PI / 180;
    return `<circle cx="${50+38*Math.cos(r)}" cy="${50+38*Math.sin(r)}" r="2" fill="#C9A84C" opacity=".5"/>`;
  }).join('');
  return `<svg class="${cls}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="#C9A84C" stroke-width=".35" fill="none"/>
    <circle cx="50" cy="50" r="38" stroke="#C9A84C" stroke-width=".35" fill="none"/>
    <circle cx="50" cy="50" r="25" stroke="#C9A84C" stroke-width=".35" fill="none"/>
    <circle cx="50" cy="50" r="12" stroke="#C9A84C" stroke-width=".35" fill="none"/>
    ${lines}${dots}
  </svg>`;
}

/* ════════════════════════════════════════════════
   BUILD HOME COLLECTIONS GRID
════════════════════════════════════════════════ */
function buildHomeCats() {
  const g = document.getElementById('hcats-grid');
  g.innerHTML = CATS.map(c => `
    <div class="hcat-card" onclick="openCat('${c.id}')">
      <div class="hcat-thumb" style="background:${c.gradient}">
        <!-- ── Cover image for "${c.name}" card ── -->
        <img src="${c.coverImage}" alt="${c.name}">
        ${mandala('hcat-mandala')}
        <div class="hcat-ov"></div>
        <span class="hcat-emoji">${c.emoji}</span>
        <div class="hcat-cursor-glow"></div>
      </div>
      <div class="hcat-info">
        <div class="hcat-name">${c.name}</div>
        <div class="hcat-desc">${c.desc}</div>
        <button class="hcat-btn">Explore</button>
      </div>
    </div>
  `).join('');

  /* wrap the "View All" button for reveal animation */
  const cta = document.querySelector('#page-home .home-cats [style*="text-align:center"]');
  if (cta) cta.classList.add('hcats-cta-wrap');

  initCollectionsAnim();
  initCursorGlow();
}

/* ════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
════════════════════════════════════════════════ */
function initCollectionsAnim() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('anim-in');
        /* keep revealed — don't unobserve so re-entry still works */
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  /* header elements */
  document.querySelectorAll('.home-cats-head .sec-label, .home-cats-head .sec-title, .home-cats-head .ornament')
    .forEach(el => io.observe(el));

  /* cards */
  document.querySelectorAll('.hcat-card').forEach(el => io.observe(el));

  /* cta button */
  const cta = document.querySelector('.hcats-cta-wrap');
  if (cta) io.observe(cta);
}

/* ════════════════════════════════════════════════
   CURSOR GLOW — follows mouse inside each card
════════════════════════════════════════════════ */
function initCursorGlow() {
  document.querySelectorAll('.hcat-thumb').forEach(thumb => {
    const glow = thumb.querySelector('.hcat-cursor-glow');
    if (!glow) return;
    thumb.addEventListener('mousemove', e => {
      const r = thumb.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top  = (e.clientY - r.top)  + 'px';
      glow.style.opacity = '1';
    });
    thumb.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  });
}

/* ════════════════════════════════════════════════
   BUILD COLLECTIONS PAGE GRID
════════════════════════════════════════════════ */
function buildCollsGrid() {
  const g = document.getElementById('colls-grid');
  g.innerHTML = CATS.map(c => `
    <div class="coll-card" onclick="openCat('${c.id}')">
      <div class="coll-thumb" style="background:${c.gradient}">
        <!-- ── Cover image for "${c.name}" collection card ── -->
        <img src="${c.coverImage}" alt="${c.name}">
        ${mandala('coll-mandala')}
        <div class="coll-ov"></div>
        <div class="coll-bottom">
          <span class="coll-name">${c.name}</span>
          <span class="coll-sub">${c.desc}</span>
        </div>
      </div>
      <div class="coll-info">
        <div class="coll-desc">${c.about.substring(0, 110)}…</div>
        <button class="coll-arrow">View Collection</button>
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════
   BUILD CATEGORY GALLERY (bento grid, 6 images)
════════════════════════════════════════════════ */
function buildCatGallery(c) {
  document.getElementById('gal-bento').innerHTML = c.gallery.map((src, i) => `
    <div class="${i === 0 ? 'bento-cell gal-bento-big' : 'bento-cell'}" onclick="openLB('${src}')">
      <!-- ── ${c.name} gallery image ${i + 1} ── -->
      <div class="ph" style="height:100%"><img src="${src}" alt="${c.name} photo ${i + 1}"></div>
      <div class="bento-ov"></div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════
   BUILD HOME FEATURED GALLERY (masonry, 9 images)
════════════════════════════════════════════════ */
function buildHomeGal() {
  const g  = document.getElementById('hgal-grid');
  const hs = ['260px','200px','300px','180px','240px','200px','280px','160px','220px'];
  g.innerHTML = HOME_GALLERY_IMAGES.map((src, i) => `
    <div class="hgal-item" onclick="openLB('${src}')" style="height:${hs[i]}">
      <!-- ── Home gallery image ${i + 1} ── -->
      <div class="ph" style="height:100%"><img src="${src}" alt="Featured photo ${i + 1}"></div>
      <div class="hgal-ov"></div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════
   BUILD HOME ABOUT TEASER IMAGE
════════════════════════════════════════════════ */
function buildHomeAboutImage() {
  const wrap = document.getElementById('ha-img');
  if (!wrap) return;
  /* ── Home about portrait image ── */
  wrap.innerHTML = `<img src="${HOME_ABOUT_IMAGE}" alt="Siri Naidu">`;
}

/* ════════════════════════════════════════════════
   BUILD ABOUT PAGE PORTRAIT IMAGE
════════════════════════════════════════════════ */
function buildAboutImage() {
  const wrap = document.getElementById('about-pic');
  if (!wrap) return;
  /* ── About page portrait image ── */
  wrap.innerHTML = `<img src="${ABOUT_PAGE_IMAGE}" alt="Siri Naidu">`;
}

/* ── LIGHTBOX ── */
function openLB(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (img && src) img.src = src;
  lb.classList.add('open');
}
function closeLB() {
  const img = document.getElementById('lightbox-img');
  if (img) img.src = '';
  document.getElementById('lightbox').classList.remove('open');
}

/* ── CONTACT FORM ── */
function sendToWhatsApp(e) {
  e.preventDefault();
  const f = e.target;
  const name    = f.querySelector('[name="name"]').value.trim();
  const phone   = f.querySelector('[name="phone"]').value.trim();
  const email   = f.querySelector('[name="email"]').value.trim();
  const event   = f.querySelector('[name="event"]').value;
  const date    = f.querySelector('[name="date"]').value;
  const msg     = f.querySelector('[name="msg"]').value.trim();

  const text = [
    `Hello Photography by Siri Naidu 📷`,
    ``,
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Email:* ${email}`,
    event ? `*Event Type:* ${event}` : null,
    date  ? `*Event Date:* ${date}`  : null,
    msg   ? `*Message:* ${msg}`      : null,
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/919000008808?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

/* ── INIT ── */
window.addEventListener('load', () => {
  buildNavDropdown();
  buildHomeCats();
  buildHomeGal();
  buildHomeAboutImage();
  buildAboutImage();
  buildCollsGrid();
  ensureFooter('home');
  init3D();
});
