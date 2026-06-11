/* ════════════════════════════════════════════════
   DATA — js/data.js
   Edit category details, images, and text here.
════════════════════════════════════════════════ */

const CATS = [
  {
    id:'wedding', name:'Wedding', emoji:'💒',
    desc:'Capturing the most beautiful day of your life',
    tagline:'Where two souls become one',
    gradient:'linear-gradient(140deg,#100500 0%,#2d1200 40%,#1a0800 100%)',
    details:[
      {icon:'◆',label:'Duration',val:'8–12 hours coverage'},
      {icon:'◇',label:'Delivery',val:'300+ edited photographs'},
      {icon:'✦',label:'Includes',val:'Getting ready, ceremony, portraits, reception'},
      {icon:'◈',label:'Style',val:'Documentary + artistic portraiture'},
    ],
    about:'Our wedding photography blends documentary storytelling with artful composition. We honour every sacred ritual — the muhurtham, saptapadi, mangalsutra — while capturing the laughter, tears, and stolen glances in between. We work unobtrusively so you can be fully present in your most important moments.',
    ctaSub:'Let us document every precious moment of your wedding day',

    /* ── COLLECTION CARD COVER IMAGE ──
       Change this path to your actual image file.
       Example: 'images/wedding-cover.jpg'             */
    coverImage: 'images/wedding-4.jpg',

    /* ── CATEGORY GALLERY IMAGES (6 images) ──
       Replace each path with your actual image files. */
    gallery: [
      'images/wedding-1.jpg',   /* big hero cell (top-left) */
      'images/wedding-2.jpg',
      'images/wedding-3.jpg',
      'images/wedding-4.jpg',
      'images/wedding-5.jpg',
   
    ]
  },
  {
    id:'engagement', name:'Engagement', emoji:'💍',
    desc:'Celebrating the beginning of forever',
    tagline:'Your love story begins here',
    gradient:'linear-gradient(140deg,#080818 0%,#181838 40%,#0e0e28 100%)',
    details:[
      {icon:'◆',label:'Duration',val:'2–4 hours shoot'},
      {icon:'◇',label:'Delivery',val:'100–150 edited photographs'},
      {icon:'✦',label:'Includes',val:'Multiple outfits, locations, candid moments'},
      {icon:'◈',label:'Style',val:'Romantic + contemporary'},
    ],
    about:'An engagement session is where we begin to understand your story together. Whether at a favourite location in Hyderabad or a destination of your choosing, we create relaxed, genuine portraits that show the world who you are as a couple.',
    ctaSub:'Let\'s capture your love story in beautiful, timeless photographs',

    coverImage: 'images/engagement-1.jpg',
    gallery: [
      'images/engagement-1.jpg',
      'images/engagement-2.jpg',
      'images/engagement-3.jpg',
      'images/engagement-4.jpg',
      'images/engagement-5.jpg',
      
    ]
  },
  {
    id:'reception', name:'Reception', emoji:'🎉',
    desc:'Joyful celebrations, vibrant memories',
    tagline:'Every toast, every dance, every smile',
    gradient:'linear-gradient(140deg,#050f08 0%,#0d2815 40%,#081810 100%)',
    details:[
      {icon:'◆',label:'Duration',val:'4–8 hours evening coverage'},
      {icon:'◇',label:'Delivery',val:'200+ edited photographs'},
      {icon:'✦',label:'Includes',val:'Décor, entrances, speeches, dancing'},
      {icon:'◈',label:'Style',val:'Vibrant + candid documentary'},
    ],
    about:'Receptions are alive with colour, dance, and the energy of everyone you love gathered together. We work discreetly and dynamically to document every toast, every dance, and every heartfelt embrace without interrupting the flow of the evening.',
    ctaSub:'Document every joyful moment of your reception celebration',

    coverImage: 'images/reception-3.jpg',
    gallery: [
      'images/reception-1.jpg',
      'images/reception-2.jpg',
      'images/reception-3.jpg',
      'images/reception-4.jpg',
      'images/reception-5.jpg',

    ]
  },
  {
    id:'vratham', name:'Vratham', emoji:'🕉️',
    desc:'Sacred traditions preserved in time',
    tagline:'Ancient blessings, eternal memories',
    gradient:'linear-gradient(140deg,#180800 0%,#3d1500 40%,#280c00 100%)',
    details:[
      {icon:'◆',label:'Duration',val:'3–6 hours coverage'},
      {icon:'◇',label:'Delivery',val:'150–200 edited photographs'},
      {icon:'✦',label:'Includes',val:'Rituals, haldi, family blessings, prayer moments'},
      {icon:'◈',label:'Style',val:'Reverent documentary + detail shots'},
    ],
    about:'The Vratham ceremony is among the most sacred pre-wedding rituals in Telugu culture. We approach these intimate gatherings with deep respect and quiet sensitivity — capturing the prayers, the haldi, and the blessings that carry generations of tradition.',
    ctaSub:'Let us preserve the sacred traditions of your Vratham ceremony',

    coverImage: 'images/vratham-3.jpg',
    gallery: [
      'images/vratham-1.jpg',
      'images/vratham-2.jpg',
      'images/vratham-3.jpg',
      'images/vratham-4.jpg',
      'images/vratham-5.jpg',

    ]
  },
  {
    id:'couple', name:'Couple Shoot', emoji:'👫',
    desc:'Love stories told through the lens',
    tagline:'Just the two of you, beautifully captured',
    gradient:'linear-gradient(140deg,#0a001a 0%,#1f0040 40%,#120028 100%)',
    details:[
      {icon:'◆',label:'Duration',val:'2–3 hours session'},
      {icon:'◇',label:'Delivery',val:'80–120 edited photographs'},
      {icon:'✦',label:'Includes',val:'Multiple locations or a styled shoot'},
      {icon:'◈',label:'Style',val:'Natural, playful + editorial'},
    ],
    about:'A dedicated couple shoot gives you the gift of time — time to be yourselves, to be playful, to simply exist together while we create images that reflect your unique dynamic. Perfect as pre-wedding photos, anniversary celebrations, or simply because you deserve beautiful images.',
    ctaSub:'Book a relaxed, fun couple session — just the two of you',

    coverImage: 'images/couple-1.jpg',
    gallery: [
      'images/couple-1.jpg',
      'images/couple-2.jpg',
      'images/couple-3.jpg',
      'images/couple-4.jpg',
      'images/couple-5.jpg',
      
    ]
  },
  {
    id:'personal', name:'Personal Shoot', emoji:'📸',
    desc:'Authentic portraits of individuality',
    tagline:'Your story, your light, your moment',
    gradient:'linear-gradient(140deg,#001818 0%,#003838 40%,#002020 100%)',
    details:[
      {icon:'◆',label:'Duration',val:'1–2 hours session'},
      {icon:'◇',label:'Delivery',val:'40–60 edited photographs'},
      {icon:'✦',label:'Includes',val:'Styled shoot, wardrobe guidance, location scouting'},
      {icon:'◈',label:'Style',val:'Clean, confident, contemporary portraiture'},
    ],
    about:'Whether for a milestone birthday, a professional headshot, or simply a desire to have beautiful images of yourself at this chapter of life, our personal shoots are tailored entirely to your vision — your style, your story, your light.',
    ctaSub:'Book a personal session that celebrates you, exactly as you are',

    coverImage: 'images/personal-4.jpg',
    gallery: [
      'images/personal-1.jpg',
      'images/personal-2.jpg',
      'images/personal-3.jpg',
      'images/personal-4.jpg',
      'images/personal-5.jpg',
      
    ]
  },
  {
    id:'others', name:'Others', emoji:'✨',
    desc:'Special moments, unique stories',
    tagline:'Every celebration deserves to be remembered',
    gradient:'linear-gradient(140deg,#101010 0%,#252525 40%,#181818 100%)',
    details:[
      {icon:'◆',label:'Covers',val:'Naming ceremony, Grihapravesham, Graduation'},
      {icon:'◇',label:'Also',val:'Corporate events, product shoots, birthdays'},
      {icon:'✦',label:'Duration',val:'Customised to your event'},
      {icon:'◈',label:'Style',val:'Tailored to each unique occasion'},
    ],
    about:'Life is full of celebrations that deserve to be remembered — naming ceremonies, grihapravesham, graduations, corporate events, farewell parties, and more. Whatever the occasion, we bring the same level of care, artistry, and attention to detail.',
    ctaSub:'Whatever the occasion — we\'ll make it unforgettable',

    coverImage: 'images/others-4.jpg',
    gallery: [
      'images/others-1.jpg',
      'images/others-2.jpg',
      'images/others-3.jpg',
      'images/others-4.jpg',
      'images/others-5.jpg',
      
    ]
  }
];

/* ════════════════════════════════════════════════
   HOME FEATURED GALLERY IMAGES
   Replace each path with your actual image files.
   9 images total — heights are set automatically.
════════════════════════════════════════════════ */
const HOME_GALLERY_IMAGES = [
  'images/others-1.jpg',   /* tall  — 260px */
  'images/others-2.jpg',   /* short — 200px */
  'images/others-3.jpg',   /* tall  — 300px */
  'images/others-4.jpg',   /* short — 180px */
  'images/others-5.jpg',   /* mid   — 240px */
  'images/wedding-5.jpg',   /* short — 200px */
  'images/personal-2.jpg',   /* tall  — 280px */
  'images/personal-3.jpg',   /* short — 160px */
  'images/wedding-1.jpg',   /* mid   — 220px */
];

/* ════════════════════════════════════════════════
   HOME > ABOUT TEASER SECTION IMAGE
   The portrait/photographer image shown on home page.
════════════════════════════════════════════════ */
const HOME_ABOUT_IMAGE = 'images/wedding-2.jpg';

/* ════════════════════════════════════════════════
   ABOUT PAGE PORTRAIT IMAGE
   The larger photographer portrait on the About page.
════════════════════════════════════════════════ */
const ABOUT_PAGE_IMAGE = 'images/about.png';
