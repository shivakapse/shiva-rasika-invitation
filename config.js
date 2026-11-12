
/* ==========================================================================
   WEDDING CONFIG
   Every piece of text, date, and content lives here.
   Edit this file only — nothing is hardcoded in the HTML/JS.
   ========================================================================== */

const WEDDING_CONFIG = {

  // ------------------------------------------------------------------------
  // COUPLE
  // ------------------------------------------------------------------------
  couple: {
    groom: {
      firstName: "Shiva",
      fullName: "Shiva Murlidhar Kapse",
      family: "Kapse Family",
      instagram: "mr.shiva_kapse"
    },
    bride: {
      firstName: "Rasika",
      fullName: "Rasika Pise",
      family: "Pise Family"
    },
    hashtag: "#ShivaWedsRasika"
  },

  // ------------------------------------------------------------------------
  // CORE WEDDING DETAILS
  // ------------------------------------------------------------------------
  wedding: {
    date: "2026-12-18T18:10:00",
    dateDisplay: "18th December 2026",
    day: "Friday",
    time: "6:10 PM",
    venueName: "Milan Hall",
    venueAddress: "Milan Hall, Chimur, District Chandrapur, Maharashtra 442903",
    venueCity: "Chimur, Chandrapur",
    venuePincode: "442903",
    mapsQuery: "Milan Hall, Chimur, Chandrapur, Maharashtra 442903",
    mapsEmbedQuery: "Milan+Hall,+Chimur,+Chandrapur,+Maharashtra+442903"
  },

  // ------------------------------------------------------------------------
  // OPENING / SPLASH
  // ------------------------------------------------------------------------
  splash: {
    mantra: "\u0950 \u0936\u094D\u0930\u0940 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903 \u0950",
    subtitle: "Invoking blessings before the beginning",
    duration: 3200
  },

  envelope: {
    seal: "S \u2022 R",
    prompt: "Tap the seal to open your invitation",
    toLine: "An invitation for"
  },

  // ------------------------------------------------------------------------
  // AUDIO
  // ------------------------------------------------------------------------
  audio: {
    bgm: "music/wedding.mp3",
    bell: "music/temple-bell.mp3",
    trackTitle: "Wedding Theme"
  },

  // ------------------------------------------------------------------------
  // HERO SLIDER
  // ------------------------------------------------------------------------
  
heroSlides: [
  { image: "images/couple1.JPG", caption: "Our beautiful journey" },
  { image: "images/couple2.JPG", caption: "A moment of love" },
  { image: "images/couple3.JPG", caption: "Together forever" },
  { image: "images/couple4.JPG", caption: "Memories together" },
  { image: "images/couple5.JPG", caption: "A promise of forever" },
  { image: "images/couple6.JPG", caption: "Two hearts, one journey" },
  { image: "images/couple7.jpg", caption: "A special moment" },
  { image: "images/couple8.JPG", caption: "Happiness together" },
  { image: "images/couple9.JPG", caption: "Our story continues" }
],

  // ------------------------------------------------------------------------
  // OUR STORY TIMELINE
  // ------------------------------------------------------------------------
  story: [
    {
      title: "First Meeting",
      date: "21 June 2026",
      text: "Our first meeting took place at Neri.",
      image: "images/couple1.JPG",
      icon: "fa-heart-circle-bolt"
    },
    {
      title: "Tilak Ceremony",
      date: "19 July 2026",
      text: "The Tilak ceremony was celebrated in Yavatmal.",
      image: "images/couple2.JPG",
      icon: "fa-hands-holding-circle"
    },
    {
      title: "Engagement",
      date: "13 December 2026",
      text: "Shiva and Rasika will celebrate their engagement with the blessings of their families.",
      image: "images/couple3.JPG",
      icon: "fa-ring"
    },
    {
      title: "Wedding",
      date: "18 December 2026 · 6:10 PM",
      text: "Shiva and Rasika will begin their beautiful journey of married life",
      image: "images/0B5A1764.JPG",
      icon: "fa-om"
    }
  ],

  // ------------------------------------------------------------------------
  // EVENTS
  // ------------------------------------------------------------------------
  events: [
    {
      name: "Engagement",
      date: "2026-12-13",
      dateDisplay: "13 December 2026",
      time: "Time to be announced",
      description: "Join Shiva and Rasika as they celebrate their engagement.",
      icon: "fa-ring",
      color: "#D4AF37"
    },
    {
      name: "Haldi",
      date: "2026-12-17",
      dateDisplay: "17 December 2026",
      time: "At home",
      description: "A traditional Haldi celebration with family and loved ones.",
      icon: "fa-seedling",
      color: "#D4AF37"
    },
    {
      name: "Wedding",
      date: "2026-12-18",
      dateDisplay: "18 December 2026",
      time: "6:10 PM",
      description: "Shiva and Rasika take their wedding vows at Milan Hall, Chimur.",
      icon: "fa-om",
      color: "#D4AF37"
    },
    {
      name: "Reception",
      date: "2026-12-19",
      dateDisplay: "19 December 2026",
      time: "Time and venue to be announced",
      description: "Celebrate the newly-wed couple at their reception.",
      icon: "fa-champagne-glasses",
      color: "#C67A89"
    }
  ],

  // ------------------------------------------------------------------------
  // FAMILIES
  // ------------------------------------------------------------------------
  families: [],

  // ------------------------------------------------------------------------
  // VENUE / TRAVEL
  // ------------------------------------------------------------------------
  travel: {
    parking: "Ample on-site parking available at Milan Hall premises.",
    railway: "Nearest railway station: Chimur Railway Station, approx. 2 km from venue.",
    hotels: [
      { name: "Hotel Regency Inn", distance: "1.8 km from venue" },
      { name: "Chandrapur Residency", distance: "3.2 km from venue" },
      { name: "Milan Guest House", distance: "0.5 km from venue" }
    ]
  },

  // ------------------------------------------------------------------------
  // RSVP
  // Retained temporarily for compatibility with existing JavaScript.
  // ------------------------------------------------------------------------
  rsvp: {
    whatsappNumber: "917776037673"
  },

  // ------------------------------------------------------------------------
  // SOCIAL
  // ------------------------------------------------------------------------
  social: {
    instagram: "https://instagram.com/mr.shiva_kapse"
  },

  // ------------------------------------------------------------------------
  // QUOTES (rotating)
  // ------------------------------------------------------------------------
  quotes: [
    "\u0938\u092A\u094D\u0924\u092A\u0926\u0940 \u0938\u0902\u0917 \u091A\u0932\u0924\u093E \u0938\u093E\u0925 \u091C\u0928\u094D\u092E\u094B\u091C\u0928\u094D\u092E\u0940\u091A\u093E \u2014 seven steps taken together, a bond for lifetimes.",
    "Two souls, one journey, blessed by family and destiny.",
    "In the presence of fire and family, two hearts become one.",
    "A love written by fate, blessed by elders, celebrated by all."
  ],

  // ------------------------------------------------------------------------
  // GUEST BOOK
  // ------------------------------------------------------------------------
  guestBookSeed: [
    {
      name: "Kapse Family",
      message: "Wishing Shiva and Rasika a lifetime of love and happiness."
    },
    {
      name: "Pise Family",
      message: "Our hearts are full. Welcome to the family, Shiva."
    }
  ],

  // ------------------------------------------------------------------------
  // SEO
  // ------------------------------------------------------------------------
  seo: {
    title: "Shiva \u2764 Rasika | Wedding Invitation",
    description: "Join Shiva Kapse and Rasika Pise as they celebrate their wedding on 18th December 2026 at 6:10 PM at Milan Hall, Chimur, Chandrapur.",
    keywords: "Shiva Kapse, Rasika Pise, wedding invitation, Chimur wedding, Milan Hall wedding",
    ogImage: "images/couple1.JPG"
  }

};
