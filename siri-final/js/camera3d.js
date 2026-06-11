/* ════════════════════════════════════════════════
   3D CAMERA — js/camera3d.js  (v2 — detailed rebuild)
   Three.js animated camera model for the hero section.
   Requires three.js r128 loaded before this file.

   STRUCTURE:
     1. Renderer & Scene setup
     2. Lighting rig
     3. Material palette
     4. Helper primitives
     5. Camera body
     6. Pentaprism hump
     7. Viewfinder eyecup
     8. Lens mount ring
     9. Lens barrel (multi-segment)
    10. Front lens element & aperture blades
    11. Top controls (shutter, mode dial, exposure dial, ISO dial, on/off)
    12. Back panel (LCD, D-pad, thumb wheel, back buttons, joystick)
    13. Left side (port covers, mic)
    14. Right side (card slot, grip texture)
    15. Bottom (tripod socket, battery door)
    16. Strap lugs
    17. Body screws & nameplate
    18. Animation loop (auto-spin + scroll rotation)
════════════════════════════════════════════════ */

function init3D() {
  const canvas = document.getElementById('camera-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const par = canvas.parentElement;
  let W = par.clientWidth, H = par.clientHeight;

  /* ── 1. RENDERER & SCENE ── */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
  cam.position.set(0, 0.6, 11);
  cam.lookAt(0, 0, 0);

  /* ── 2. LIGHTING RIG ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const keyL = new THREE.DirectionalLight(0xffffff, 1.3);
  keyL.position.set(7, 12, 9);
  keyL.castShadow = true;
  keyL.shadow.mapSize.set(1024, 1024);
  scene.add(keyL);

  const fillL = new THREE.DirectionalLight(0xaac8e8, 0.45);
  fillL.position.set(-6, 4, 6);
  scene.add(fillL);

  const rimL = new THREE.DirectionalLight(0xffeedd, 0.6);
  rimL.position.set(4, -4, -6);
  scene.add(rimL);

  const topL = new THREE.DirectionalLight(0xffffff, 0.25);
  topL.position.set(0, 12, 0);
  scene.add(topL);

  const goldL = new THREE.PointLight(0xC9A84C, 1.2, 28);
  goldL.position.set(-5, 4, 7);
  scene.add(goldL);

  const lensSpotL = new THREE.SpotLight(0xaaddff, 1.5, 20, Math.PI / 8, 0.4);
  lensSpotL.position.set(6, 2, 8);
  lensSpotL.target.position.set(4, 0, 0);
  scene.add(lensSpotL);
  scene.add(lensSpotL.target);

  const underL = new THREE.PointLight(0x334455, 0.4, 15);
  underL.position.set(0, -6, 3);
  scene.add(underL);

  /* ── 3. MATERIAL PALETTE ── */
  const M = {
    bodyBlack:  new THREE.MeshStandardMaterial({ color: 0x0d0d0d, roughness: 0.28, metalness: 0.70 }),
    bodyDark:   new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.42, metalness: 0.55 }),
    rubber:     new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.95, metalness: 0.02 }),
    rubberGrip: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.98, metalness: 0.01 }),
    silver:     new THREE.MeshStandardMaterial({ color: 0x909090, roughness: 0.18, metalness: 0.92 }),
    silverDark: new THREE.MeshStandardMaterial({ color: 0x686868, roughness: 0.28, metalness: 0.88 }),
    chrome:     new THREE.MeshStandardMaterial({ color: 0xb8b8b8, roughness: 0.08, metalness: 0.98 }),
    gold:       new THREE.MeshStandardMaterial({ color: 0xC9A84C, roughness: 0.22, metalness: 0.94 }),
    goldLight:  new THREE.MeshStandardMaterial({ color: 0xE8C97A, roughness: 0.18, metalness: 0.92 }),
    glassBody:  new THREE.MeshStandardMaterial({ color: 0x080e18, roughness: 0.03, metalness: 0.96 }),
    lensBlue:   new THREE.MeshStandardMaterial({ color: 0x4477aa, roughness: 0.03, metalness: 0.97, transparent: true, opacity: 0.88 }),
    lensCoat:   new THREE.MeshStandardMaterial({ color: 0x223355, roughness: 0.02, metalness: 0.99, transparent: true, opacity: 0.82 }),
    screen:     new THREE.MeshStandardMaterial({ color: 0x060c14, roughness: 0.06, metalness: 0.12, emissive: 0x0a1a2e, emissiveIntensity: 0.7 }),
    screenGlow: new THREE.MeshStandardMaterial({ color: 0x0a1828, roughness: 0.01, metalness: 0.1,  emissive: 0x0a1828, emissiveIntensity: 1.0, transparent: true, opacity: 0.85 }),
    redDot:     new THREE.MeshStandardMaterial({ color: 0xdd2222, roughness: 0.3,  metalness: 0.1,  emissive: 0xaa1111, emissiveIntensity: 0.6 }),
    lensGlow:   new THREE.MeshStandardMaterial({ color: 0x001133, roughness: 0.01, metalness: 0.98, emissive: 0x0033aa, emissiveIntensity: 1.6, transparent: true, opacity: 0.88 }),
    pupil:      new THREE.MeshStandardMaterial({ color: 0x00010a, roughness: 0.01, metalness: 0.99, emissive: 0x001044, emissiveIntensity: 2.0 }),
    corner:     new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.50, metalness: 0.40 }),
    afPoint:    new THREE.MeshStandardMaterial({ color: 0xff4400, roughness: 0.4,  metalness: 0.0,  emissive: 0xff2200, emissiveIntensity: 0.5, transparent: true, opacity: 0.9 }),
    greenLED:   new THREE.MeshStandardMaterial({ color: 0x00ff44, roughness: 0.3,  metalness: 0.0,  emissive: 0x00cc33, emissiveIntensity: 1.2, transparent: true, opacity: 0.95 }),
    redLED:     new THREE.MeshStandardMaterial({ color: 0xff2200, roughness: 0.3,  metalness: 0.0,  emissive: 0xff1100, emissiveIntensity: 1.2, transparent: true, opacity: 0.95 }),
    portRubber: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.90, metalness: 0.03 }),
  };

  /* ── 4. HELPER PRIMITIVES ── */
  const grp = new THREE.Group();

  function add(mesh) { grp.add(mesh); return mesh; }

  function box(w, h, d, mat, x, y, z, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.castShadow = true;
    return add(m);
  }

  function cyl(rTop, rBot, h, mat, x, y, z, segs = 40, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, segs), mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.castShadow = true;
    return add(m);
  }

  // Cylinder oriented along X axis
  function cylX(rTop, rBot, h, mat, x, y, z, segs = 40) {
    return cyl(rTop, rBot, h, mat, x, y, z, segs, 0, 0, Math.PI / 2);
  }

  function ring(outerR, innerR, h, mat, x, y, z, segs = 48) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false, curveSegments: segs });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = Math.PI / 2;
    m.position.set(x, y, z);
    return add(m);
  }

  function torus(R, r, mat, x, y, z, axis = 'z') {
    const m = new THREE.Mesh(new THREE.TorusGeometry(R, r, 12, 48), mat);
    if (axis === 'x') m.rotation.x = Math.PI / 2;
    else if (axis === 'y') m.rotation.y = Math.PI / 2;
    m.position.set(x, y, z);
    return add(m);
  }

  function sphere(r, mat, x, y, z, wSeg = 24, hSeg = 16) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, wSeg, hSeg), mat);
    m.position.set(x, y, z);
    return add(m);
  }

  /* ── 5. CAMERA BODY ── */
  // Main body block — slightly rounded feel via multiple layers
  box(4.6, 2.9, 1.85, M.bodyBlack, 0, 0, 0);

  // Rubber grip on right side (front)
  box(1.05, 2.88, 0.16, M.rubber, 1.92, 0.0,  0.92);
  box(1.05, 2.88, 0.16, M.rubber, 1.92, 0.0, -0.92);

  // Grip texture bumps (front right)
  for (let i = -4; i <= 4; i++) {
    box(0.92, 0.06, 0.18, M.rubberGrip, 1.92, i * 0.28, 0.94);
  }

  // Top grip rubber pad
  box(1.1, 0.16, 0.65, M.rubber, 1.6, 1.35, 0.93);

  // Corner edge trims
  const trimData = [
    [4.62, 0.07, 0.07,  0,  1.42,  0.91],
    [4.62, 0.07, 0.07,  0,  1.42, -0.91],
    [4.62, 0.07, 0.07,  0, -1.42,  0.91],
    [4.62, 0.07, 0.07,  0, -1.42, -0.91],
    [0.07, 2.92, 0.07,  2.28, 0,  0.91],
    [0.07, 2.92, 0.07,  2.28, 0, -0.91],
    [0.07, 2.92, 0.07, -2.28, 0,  0.91],
    [0.07, 2.92, 0.07, -2.28, 0, -0.91],
  ];
  trimData.forEach(([w, h, d, x, y, z]) => box(w, h, d, M.corner, x, y, z));

  /* ── 6. PENTAPRISM HUMP ── */
  // Base block
  box(1.2, 0.65, 0.78, M.bodyBlack, -0.3, 1.77, 0);

  // Slanted front face (simulated via thin angled slabs)
  const humpSlant = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.80), M.bodyDark);
  humpSlant.position.set(-0.3, 2.1, 0);
  humpSlant.rotation.z = 0.32;
  grp.add(humpSlant);

  const humpSlant2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.80), M.bodyDark);
  humpSlant2.position.set(-0.3, 2.08, 0);
  humpSlant2.rotation.z = -0.32;
  grp.add(humpSlant2);

  // Top cap
  box(0.9, 0.08, 0.52, M.silverDark, -0.3, 2.16, 0);

  // Hot shoe
  box(0.72, 0.08, 0.38, M.silver, -0.3, 2.21, 0);
  // Hot shoe contacts
  for (let i = -1; i <= 1; i++) {
    box(0.06, 0.04, 0.28, M.chrome, -0.3 + i * 0.22, 2.26, 0);
  }

  // Logo / model name plate
  box(0.65, 0.07, 0.06, M.gold,  -0.3, 2.15, -0.04);
  box(0.55, 0.05, 0.04, M.goldLight, -0.3, 2.18, -0.03);

  /* ── 7. VIEWFINDER EYECUP ── */
  cylX(0.25, 0.27, 0.20, M.silverDark, -0.3, 1.46, -0.95, 36);
  cylX(0.22, 0.25, 0.06, M.rubber,     -0.3, 1.46, -1.07, 36);
  cylX(0.17, 0.17, 0.05, M.lensBlue,   -0.3, 1.46, -1.12, 32);
  torus(0.24, 0.04, M.rubber, -0.3, 1.46, -0.97, 'x');
  torus(0.20, 0.025, M.gold,  -0.3, 1.46, -1.04, 'x');

  /* ── 8. LENS MOUNT RING ── */
  // Outer mount flange
  cylX(1.08, 1.08, 0.22, M.silverDark, 2.18, 0, 0, 52);
  cylX(1.11, 1.11, 0.06, M.gold,       2.29, 0, 0, 52);
  // Inner throat
  cylX(0.95, 0.95, 0.25, M.bodyBlack,  2.10, 0, 0, 52);
  cylX(0.85, 0.85, 0.28, M.glassBody,  2.08, 0, 0, 52);
  // Mount bayonet notches (3 tabs)
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.12), M.chrome);
    tab.position.set(2.28, Math.sin(angle) * 0.98, Math.cos(angle) * 0.98);
    tab.rotation.x = angle;
    grp.add(tab);
  }
  // Mount index dot (red)
  sphere(0.065, M.redDot, 2.3, 0.98, 0);

  /* ── 9. LENS BARREL (multi-segment) ── */
  const barrelSegs = [
    { r: 1.00, h: 0.55, m: M.bodyBlack,  x: 2.52 },
    { r: 0.96, h: 0.18, m: M.silverDark, x: 2.86 },
    { r: 0.92, h: 0.62, m: M.bodyBlack,  x: 3.19 },
    { r: 0.88, h: 0.10, m: M.gold,       x: 3.54 },
    { r: 0.84, h: 0.52, m: M.bodyBlack,  x: 3.80 },
    { r: 0.80, h: 0.18, m: M.silverDark, x: 4.10 },
    { r: 0.76, h: 0.48, m: M.bodyBlack,  x: 4.38 },
    { r: 0.72, h: 0.14, m: M.silver,     x: 4.66 },
    { r: 0.70, h: 0.32, m: M.bodyBlack,  x: 4.86 },
  ];
  barrelSegs.forEach(s => cylX(s.r, s.r, s.h, s.m, s.x, 0, 0, 48));

  // Focus ring rubber grip (wide ribbed ring)
  torus(0.91, 0.078, M.rubber, 3.19, 0, 0, 'y');
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.04), M.rubberGrip);
    rib.position.set(3.19, Math.sin(a) * 0.91, Math.cos(a) * 0.91);
    rib.rotation.x = a;
    grp.add(rib);
  }

  // Zoom ring rubber grip
  torus(0.83, 0.065, M.rubber, 3.80, 0, 0, 'y');
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.14, 0.04), M.rubberGrip);
    rib.position.set(3.80, Math.sin(a) * 0.83, Math.cos(a) * 0.83);
    rib.rotation.x = a;
    grp.add(rib);
  }

  // Gold accent rings
  torus(0.95, 0.038, M.gold,  2.85, 0, 0, 'y');
  torus(0.87, 0.032, M.gold,  3.54, 0, 0, 'y');
  torus(0.79, 0.028, M.gold,  4.10, 0, 0, 'y');
  torus(0.71, 0.024, M.gold,  4.66, 0, 0, 'y');

  // AF/MF switch on barrel
  box(0.12, 0.28, 0.07, M.silverDark, 3.5,  0.84, 0.01);
  box(0.12, 0.10, 0.09, M.silver,     3.5,  0.72, 0.01);

  // OIS switch
  box(0.10, 0.22, 0.07, M.silverDark, 4.0,  0.80, 0.01);
  box(0.10, 0.08, 0.09, M.silver,     4.0,  0.69, 0.01);

  // Distance window (small glass panel on top of barrel)
  box(0.45, 0.14, 0.05, M.glassBody, 3.20, 0.84, 0.0);
  box(0.38, 0.10, 0.03, M.lensBlue,  3.20, 0.84, 0.02);

  /* ── 10. FRONT LENS ELEMENT & APERTURE BLADES ── */
  // Front hood mount thread
  cylX(0.73, 0.73, 0.10, M.silverDark, 4.92, 0, 0, 44);
  torus(0.71, 0.03, M.gold, 4.97, 0, 0, 'y');

  // Outer glass ring
  cylX(0.69, 0.69, 0.08, M.glassBody, 5.01, 0, 0, 44);

  // AR-coated front element (multi-layer)
  cylX(0.61, 0.61, 0.06, M.lensBlue,  5.05, 0, 0, 40);
  cylX(0.52, 0.52, 0.05, M.lensCoat,  5.08, 0, 0, 40);
  cylX(0.40, 0.40, 0.04, M.lensBlue,  5.11, 0, 0, 36);

  // Pupil / deep center
  const pupilMesh = cylX(0.26, 0.26, 0.04, M.pupil, 5.14, 0, 0, 32);

  // Inner glow
  const glowMesh = cylX(0.16, 0.16, 0.03, M.lensGlow, 5.16, 0, 0, 24);

  // Aperture blades (9-blade)
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.038, 0.025),
      M.bodyBlack
    );
    blade.rotation.z = a;
    blade.rotation.x = Math.PI / 2;
    blade.position.set(5.10, 0, 0);
    grp.add(blade);
  }

  /* ── 11. TOP CONTROLS ── */

  // --- Shutter button ---
  cylX(0.30, 0.34, 0.24, M.silver,    1.9, 1.52, 0.94, 36);
  cylX(0.22, 0.30, 0.09, M.gold,      1.9, 1.52, 1.07, 36);
  cylX(0.08, 0.08, 0.05, M.goldLight, 1.9, 1.52, 1.13, 24);
  // AF-ON indicator ring
  torus(0.30, 0.025, M.gold, 1.9, 1.52, 0.95, 'x');

  // --- Main mode dial ---
  cylX(0.50, 0.50, 0.20, M.silver,    0.82, 1.52, 0.94, 44);
  torus(0.48, 0.038, M.gold,          0.82, 1.52, 0.94, 'x');
  // Dial markings (12 ticks)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const mk = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.025), M.silverDark);
    mk.position.set(0.82 + 0.40 * Math.cos(a), 1.52 + 0.40 * Math.sin(a), 1.04);
    grp.add(mk);
  }
  // Mode indicator (small orange marker)
  const modeMarker = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.10, 0.03), M.gold);
  modeMarker.position.set(0.82, 1.92, 1.04);
  grp.add(modeMarker);
  // Center lock button
  cylX(0.10, 0.10, 0.06, M.silverDark, 0.82, 1.52, 1.07, 20);

  // --- Exposure compensation dial ---
  cylX(0.34, 0.34, 0.14, M.bodyDark,  -0.02, 1.52, 0.94, 40);
  torus(0.32, 0.026, M.silver, -0.02, 1.52, 0.94, 'x');
  // EV ticks
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const mk2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.055, 0.02), M.silver);
    mk2.position.set(-0.02 + 0.27 * Math.cos(a), 1.52 + 0.27 * Math.sin(a), 1.03);
    grp.add(mk2);
  }

  // --- ISO dial (smaller, left of EV) ---
  cylX(0.26, 0.26, 0.11, M.bodyDark, -0.62, 1.52, 0.94, 36);
  torus(0.24, 0.020, M.gold, -0.62, 1.52, 0.94, 'x');

  // --- ON/OFF switch ring ---
  torus(0.30, 0.07, M.silverDark, 1.9, 1.52, 0.94, 'x');
  box(0.38, 0.18, 0.07, M.bodyBlack, 1.6, 1.52, 1.02);
  box(0.14, 0.16, 0.09, M.silver,    1.68, 1.52, 1.06);

  // --- Front control dial (sub-command dial) ---
  cylX(0.22, 0.22, 0.10, M.silverDark, 2.25, 1.10, 0.94, 32);
  torus(0.20, 0.020, M.silver, 2.25, 1.10, 0.94, 'x');

  // --- Drive mode button ---
  cylX(0.12, 0.12, 0.06, M.silver, -1.28, 1.52, 0.96, 20);
  // --- WB button ---
  cylX(0.12, 0.12, 0.06, M.silver, -1.62, 1.52, 0.96, 20);
  // --- Metering button ---
  cylX(0.12, 0.12, 0.06, M.silver, -1.96, 1.52, 0.96, 20);

  // --- Flash sync port cover ---
  box(0.14, 0.14, 0.05, M.bodyDark, -2.05, 1.15, 0.95);

  /* ── 12. BACK PANEL ── */

  // --- LCD screen ---
  box(2.15, 1.45, 0.045, M.silverDark, -0.52, -0.20, -0.93);
  box(2.00, 1.32, 0.040, M.screen,     -0.52, -0.20, -0.95);

  // Screen glow layer
  const scrGlow = new THREE.Mesh(
    new THREE.BoxGeometry(1.92, 1.26, 0.01),
    M.screenGlow
  );
  scrGlow.position.set(-0.52, -0.20, -0.96);
  grp.add(scrGlow);

  // Screen grid (simulate UI grid lines)
  for (let i = -2; i <= 2; i++) {
    const gl = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.005, 0.005), new THREE.MeshStandardMaterial({ color: 0x1a3050, emissive: 0x0a2040, emissiveIntensity: 0.5 }));
    gl.position.set(-0.52, -0.20 + i * 0.26, -0.965);
    grp.add(gl);
  }
  for (let i = -3; i <= 3; i++) {
    const gl = new THREE.Mesh(new THREE.BoxGeometry(0.005, 1.24, 0.005), new THREE.MeshStandardMaterial({ color: 0x1a3050, emissive: 0x0a2040, emissiveIntensity: 0.5 }));
    gl.position.set(-0.52 + i * 0.30, -0.20, -0.965);
    grp.add(gl);
  }

  // AF point indicator (center)
  const afPoint = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.005), M.afPoint);
  afPoint.position.set(-0.52, -0.20, -0.968);
  grp.add(afPoint);

  // --- D-pad ---
  box(0.72, 0.72, 0.055, M.bodyDark,  -1.72, -0.14, -0.96);
  cylX(0.18, 0.18, 0.07, M.silver,    -1.72, -0.14, -0.99, 24);
  // D-pad arms
  [0, 90, 180, 270].forEach(deg => {
    const r = deg * Math.PI / 180;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.065), M.bodyDark);
    arm.position.set(-1.72 + 0.24 * Math.cos(r), -0.14 + 0.24 * Math.sin(r), -0.975);
    grp.add(arm);
  });
  // D-pad arrow indicators
  [0, 90, 180, 270].forEach(deg => {
    const r = deg * Math.PI / 180;
    const arr = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.01), M.silverDark);
    arr.position.set(-1.72 + 0.24 * Math.cos(r), -0.14 + 0.24 * Math.sin(r), -0.965);
    grp.add(arr);
  });

  // --- Joystick (multi-selector) ---
  cylX(0.14, 0.14, 0.06, M.silver,    -1.05, 0.50, -0.99, 20);
  cylX(0.08, 0.08, 0.04, M.silverDark,-1.05, 0.50, -1.03, 16);

  // --- Thumb command dial (rear) ---
  cylX(0.26, 0.26, 0.14, M.silver,    -1.05, -0.65, -0.97, 32);
  torus(0.24, 0.022, M.silverDark,    -1.05, -0.65, -0.97, 'x');
  // Knurling
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const k = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.02), M.silverDark);
    k.position.set(-1.05 + 0.21 * Math.cos(a), -0.65 + 0.21 * Math.sin(a), -0.98);
    grp.add(k);
  }

  // --- Back buttons (cluster) ---
  const backBtnPos = [
    [-1.72, 0.60],
    [-1.72, 0.34],
    [-1.40, 0.60],
    [-1.40, 0.34],
    [-1.10, 0.60],
    [-1.10, 0.34],
  ];
  backBtnPos.forEach(([bx, by]) => {
    cylX(0.12, 0.12, 0.055, M.silver, bx, by, -0.99, 20);
  });

  // --- MENU / OK / DELETE buttons ---
  [
    [-0.18, 0.60],
    [-0.18, 0.35],
    [-0.18, 0.10],
  ].forEach(([bx, by]) => {
    box(0.22, 0.12, 0.055, M.bodyDark, bx, by, -0.97);
  });

  // --- Playback / Info buttons ---
  cylX(0.13, 0.13, 0.055, M.silver, 0.28, 0.60, -0.99, 20);
  cylX(0.13, 0.13, 0.055, M.silver, 0.28, 0.35, -0.99, 20);

  // --- Live View switch ---
  torus(0.20, 0.07, M.silverDark, -1.05, -0.50, -0.97, 'x');
  cylX(0.08, 0.08, 0.06, M.silver, -1.05, -0.50, -1.01, 16);

  // --- AF-ON button ---
  box(0.28, 0.14, 0.06, M.silver, 0.55, -0.45, -0.98);

  // --- Status LED strip ---
  box(0.06, 0.06, 0.03, M.greenLED, 2.15,  1.22, -0.97);
  box(0.06, 0.06, 0.03, M.redLED,   2.15,  1.08, -0.97);

  /* ── 13. LEFT SIDE (port covers) ── */
  // Port door
  box(0.07, 1.20, 0.85, M.rubber, -2.32, 0.20, 0.0);
  // Port cover hinge detail
  box(0.06, 0.08, 0.78, M.silver, -2.32, 0.78, 0.0);

  // Ports (HDMI, USB-C, headphone, mic)
  const ports = [
    [0.22, 0.14, -2.29,  0.55, -0.08],
    [0.18, 0.18, -2.29,  0.20, -0.08],
    [0.10, 0.10, -2.29, -0.12, -0.08],
    [0.10, 0.06, -2.29, -0.35, -0.08],
  ];
  ports.forEach(([pw, ph, px, py, pz]) => {
    box(0.03, ph, pw, M.bodyDark, px, py, pz);
  });

  // Built-in mic holes (small dots)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      sphere(0.028, M.bodyDark, -2.32, 0.88 + i * 0.055, -0.30 + j * 0.08);
    }
  }

  /* ── 14. RIGHT SIDE (card slot) ── */
  // Card slot door
  box(0.07, 1.10, 0.85, M.bodyDark, 2.32, -0.30, 0.0);
  box(0.06, 0.08, 0.80, M.silver,   2.32,  0.25, 0.0);

  // Card slots (dual SD)
  box(0.04, 0.30, 0.26, M.bodyDark, 2.30, -0.18,  0.18);
  box(0.04, 0.30, 0.26, M.bodyDark, 2.30, -0.18, -0.18);

  // Card slot eject pin
  cylX(0.04, 0.04, 0.04, M.silver, 2.32, -0.62, 0.28, 12);

  /* ── 15. BOTTOM ── */
  // Tripod socket (1/4" standard)
  cylX(0.14, 0.14, 0.08, M.silver, 0.2, -1.46, 0, 20);
  cylX(0.09, 0.09, 0.05, M.bodyDark, 0.2, -1.46, 0, 16);

  // Battery door
  box(1.85, 0.07, 1.12, M.bodyDark, -0.35, -1.47, 0);
  box(0.22, 0.06, 0.10, M.silver,   -0.35, -1.46, 0.5);
  // Battery door latch
  box(0.18, 0.08, 0.08, M.silverDark, -0.35, -1.46, 0.58);

  // Bottom screws
  [
    [ 1.7, -1.44,  0.88],
    [ 1.7, -1.44, -0.88],
    [-1.7, -1.44,  0.88],
    [-1.7, -1.44, -0.88],
  ].forEach(([sx, sy, sz]) => {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.045, 10), M.silver);
    screw.rotation.x = Math.PI / 2;
    screw.position.set(sx, sy, sz);
    grp.add(screw);
  });

  /* ── 16. STRAP LUGS ── */
  [-2.22, 2.22].forEach(lx => {
    box(0.24, 0.42, 1.86, M.bodyDark, lx, 0.92, 0);
    // Lug ring slot
    box(0.18, 0.10, 1.86, M.bodyBlack, lx, 1.15, 0);
    torus(0.13, 0.045, M.chrome, lx, 1.16, 0, 'y');
  });

  /* ── 17. BODY SCREWS & NAMEPLATE ── */
  // Visible Phillips screws on front face
  [
    [ 1.9, -1.32,  0.92],
    [ 1.9, -1.32, -0.92],
    [-1.9, -1.32,  0.92],
    [-1.9, -1.32, -0.92],
    [-1.9,  1.32,  0.92],
    [-1.9,  1.32, -0.92],
  ].forEach(([sx, sy, sz]) => {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.035, 8), M.silverDark);
    screw.rotation.x = Math.PI / 2;
    screw.position.set(sx, sy, sz);
    grp.add(screw);
    // Phillips cross
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.018, 0.015), M.bodyBlack);
    c1.position.set(sx, sy, sz + 0.03);
    grp.add(c1);
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.09, 0.015), M.bodyBlack);
    c2.position.set(sx, sy, sz + 0.03);
    grp.add(c2);
  });

  // Gold nameplate (front body)
  box(1.62, 0.22, 0.028, M.gold,      -0.38, 0.90, 0.93);
  box(1.50, 0.16, 0.022, M.goldLight, -0.38, 0.90, 0.94);
  // Nameplate rivets
  [-0.9, -0.55, -0.20, 0.14].forEach(ox => {
    const rivet = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.03, 8), M.goldLight);
    rivet.rotation.x = Math.PI / 2;
    rivet.position.set(-0.38 + ox, 0.90, 0.955);
    grp.add(rivet);
  });

  // Red/orange brand circle mark
  sphere(0.055, M.redDot, 2.30, 0.88, 0.93);

  // Front AF-assist LED
  sphere(0.06, M.redLED, 2.15, -0.55, 0.94);

  /* ── FINAL GROUP POSITIONING ── */
  scene.add(grp);
  grp.position.set(-0.5, 0.15, 0);
  grp.scale.setScalar(0.80);

  /* ── 18. ANIMATION LOOP ── */
  let tgtY = 0.18, curY = 0.18;
  const autoSpd = 0.0028;
  let autoSpin = 0;

  window.addEventListener('scroll', () => {
    const sh = document.documentElement.scrollHeight - window.innerHeight;
    if (sh > 0) tgtY = 0.18 + (window.scrollY / sh) * Math.PI * 3.0;
  });

  function tick(t) {
    requestAnimationFrame(tick);

    autoSpin += autoSpd;
    curY += (tgtY - curY) * 0.055;
    grp.rotation.y = curY + autoSpin;
    grp.rotation.x = Math.sin(t * 0.00038) * 0.048;

    // Breathing pulse — lens glow
    M.lensGlow.emissiveIntensity = 1.2 + Math.sin(t * 0.0021) * 0.55;
    M.pupil.emissiveIntensity    = 1.8 + Math.sin(t * 0.0021) * 0.4;

    // Screen glow pulse
    M.screenGlow.emissiveIntensity = 0.6 + Math.sin(t * 0.0014) * 0.28;
    M.screen.emissiveIntensity     = 0.5 + Math.sin(t * 0.0014) * 0.22;

    // AF point flicker
    M.afPoint.emissiveIntensity = 0.3 + Math.abs(Math.sin(t * 0.0008)) * 0.5;

    // Gold light breathe
    goldL.intensity = 0.9 + Math.sin(t * 0.0017) * 0.28;

    // LED blink
    M.greenLED.emissiveIntensity = (Math.sin(t * 0.003) > 0.7) ? 1.4 : 0.3;

    renderer.render(scene, cam);
  }

  requestAnimationFrame(tick);

  window.addEventListener('resize', () => {
    W = par.clientWidth;
    H = par.clientHeight;
    renderer.setSize(W, H);
    cam.aspect = W / H;
    cam.updateProjectionMatrix();
  });
}