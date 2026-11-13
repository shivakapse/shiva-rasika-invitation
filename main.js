
/* ==========================================================================
   SHIVA & RASIKA — WEDDING INVITATION
   main.js — all interactive behaviour, driven entirely by config.js
   ========================================================================== */
(function(){
  "use strict";
  const C = WEDDING_CONFIG;
  const $  = (sel,ctx=document)=>ctx.querySelector(sel);
  const $$ = (sel,ctx=document)=>Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------------- */
  /* UTIL                                                              */
  /* ---------------------------------------------------------------- */
  function showToast(msg,ms=2600){
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(()=>t.classList.remove('show'),ms);
  }

  function makePetalLayer(container,count,emojis){
    container.innerHTML='';
    for(let i=0;i<count;i++){
      const p=document.createElement('span');
      p.className='petal';
      p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      p.style.left = Math.random()*100+'%';
      p.style.setProperty('--drift',(Math.random()*120-60)+'px');
      p.style.animationDuration = (8+Math.random()*10)+'s';
      p.style.animationDelay = (Math.random()*10)+'s';
      p.style.fontSize = (12+Math.random()*14)+'px';
      container.appendChild(p);
    }
  }

  function makeSparkLayer(container,count){
    container.innerHTML='';
    for(let i=0;i<count;i++){
      const s=document.createElement('span');
      s.className='spark';
      s.style.left = Math.random()*100+'%';
      s.style.bottom = '-10px';
      s.style.animationDuration=(4+Math.random()*5)+'s';
      s.style.animationDelay=(Math.random()*6)+'s';
      container.appendChild(s);
    }
  }

  /* ---------------------------------------------------------------- */
  /* 1. PRELOADER                                                      */
  /* ---------------------------------------------------------------- */
  window.addEventListener('load',()=>{
    setTimeout(()=>$('#preloader').classList.add('hidden'),400);
  });

  /* ---------------------------------------------------------------- */
  /* 2. SPLASH SCREEN                                                  */
  /* ---------------------------------------------------------------- */
  $('#splashMantra').textContent = C.splash.mantra;
  $('#splashSub').textContent = C.splash.subtitle;
  makePetalLayer($('#splashPetals'),18,['\u2740','\u273F','\u2740']);

  function ringTempleBell(){
    const bell = $('#bellAudio');
    bell.volume = 0.5;
    bell.play().catch(()=>{ /* autoplay blocked until gesture — fine */ });
  }

  window.addEventListener('DOMContentLoaded',()=>{
    ringTempleBell();
    setTimeout(()=>{
      $('#splash').classList.add('hidden');
      initEnvelope();
    }, C.splash.duration || 3200);
  });

  /* ---------------------------------------------------------------- */
  /* 3. ENVELOPE                                                       */
  /* ---------------------------------------------------------------- */
  function initEnvelope(){
    $('#envelopeTo').textContent = C.envelope.toLine + ' — you';
    $('#envelopePrompt').textContent = C.envelope.prompt;
    $('#envelopeSeal').textContent = C.envelope.seal;

    const envelope = $('#envelope');
    envelope.addEventListener('click', openEnvelope, { once:true });
  }

  function openEnvelope(){
    const envelope = $('#envelope');
    envelope.classList.add('open');
    ringTempleBell();

    setTimeout(()=>{
      $('#envelope-screen').classList.add('hidden');
      revealSite();
    }, 1300);
  }

  function revealSite(){
    $('#site').classList.add('revealed');
    startBackgroundMusic();
    document.body.style.overflow='';
    initAOSAndReveals();
    startCountdown();
    initParticleAtmosphere();
  }

  /* ---------------------------------------------------------------- */
  /* 4. BACKGROUND MUSIC / FLOATING PLAYER                             */
  /* ---------------------------------------------------------------- */
  const bgm = $('#bgmAudio');
  $('#musicTitle').textContent = C.audio.trackTitle;

  function startBackgroundMusic(){
    bgm.volume = parseFloat($('#musicVolume').value);
    bgm.play().then(()=>{
      $('#musicPlayer').classList.add('playing');
      $('#musicToggle').innerHTML = '<i class="fa-solid fa-pause"></i>';
    }).catch(()=>{
      // autoplay blocked — user can press play manually
      $('#musicToggle').innerHTML = '<i class="fa-solid fa-play"></i>';
    });
  }

  $('#musicToggle').addEventListener('click',()=>{
    if(bgm.paused){
      bgm.play();
      $('#musicPlayer').classList.add('playing');
      $('#musicToggle').innerHTML = '<i class="fa-solid fa-pause"></i>';
    }else{
      bgm.pause();
      $('#musicPlayer').classList.remove('playing');
      $('#musicToggle').innerHTML = '<i class="fa-solid fa-play"></i>';
    }
  });
  $('#musicVolume').addEventListener('input',e=>{ bgm.volume = parseFloat(e.target.value); });

  /* ---------------------------------------------------------------- */
  /* 5. NAVBAR                                                         */
  /* ---------------------------------------------------------------- */
  $('#navBrand').textContent = C.couple.groom.firstName[0] + ' & ' + C.couple.bride.firstName[0];

  const navbar = $('#navbar');
  window.addEventListener('scroll',()=>{
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateScrollProgress();
    updateFabsVisibility();
  });

  $('#navToggle').addEventListener('click',()=>{
    $('#navLinks').classList.toggle('open');
  });
  $$('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));

  function updateScrollProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
    $('#scrollProgress').style.width = scrolled+'%';
  }

  /* Theme toggle (dark mode) */
  const themeToggle = $('#themeToggle');
  themeToggle.addEventListener('click',()=>{
    const isDark = document.body.getAttribute('data-theme')==='dark';
    document.body.setAttribute('data-theme', isDark ? 'light':'dark');
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  });

  /* ---------------------------------------------------------------- */
  /* 6. HERO SLIDER                                                    */
  /* ---------------------------------------------------------------- */
  $('#heroGroom').textContent = C.couple.groom.firstName;
  $('#heroBride').textContent = C.couple.bride.firstName;
  $('#heroDate').innerHTML = '<i class="fa-regular fa-calendar"></i>&nbsp; '+C.wedding.dateDisplay;
  $('#heroVenue').innerHTML = '<i class="fa-solid fa-location-dot"></i>&nbsp; '+C.wedding.venueName;

  (function buildHeroSlider(){
    const wrap = $('#heroSlides');
    const dots = $('#heroDots');
    C.heroSlides.forEach((slide,i)=>{
      const div = document.createElement('div');
      div.className = 'hero-slide placeholder' + (i===0?' active':'');
      // Real photo would use: div.style.backgroundImage = `url(${slide.image})`;
      // A gradient placeholder is used until real images are supplied in /images.
      div.innerHTML = `<span style="position:absolute;bottom:14%;left:50%;translate:-50% 0;font-family:var(--font-script);font-size:2.2rem;color:rgba(232,204,122,.5);">Shiva &amp; Rasika</span>`;
      wrap.appendChild(div);

      const dot = document.createElement('button');
      if(i===0) dot.classList.add('active');
      dot.addEventListener('click',()=>goToSlide(i));
      dots.appendChild(dot);
    });

    let current = 0;
    const slides = $$('.hero-slide',wrap);
    const dotEls = $$('button',dots);

    function goToSlide(i){
      slides[current].classList.remove('active');
      dotEls[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dotEls[current].classList.add('active');
    }
    function next(){ goToSlide((current+1)%slides.length); }
    setInterval(next, 5200);
  })();

  makePetalLayer($('#heroPetals'),14,['\u2740','\u273F']);
  makeSparkLayer($('#heroSparks'),22);

  /* ---------------------------------------------------------------- */
  /* 7. COUNTDOWN                                                      */
  /* ---------------------------------------------------------------- */
  function startCountdown(){
    const target = new Date(C.wedding.date).getTime();
    function tick(){
      const now = Date.now();
      let diff = target - now;
      if(diff < 0) diff = 0;
      const d = Math.floor(diff/86400000);
      const h = Math.floor(diff%86400000/3600000);
      const m = Math.floor(diff%3600000/60000);
      const s = Math.floor(diff%60000/1000);
      $('#cdDays').textContent = String(d).padStart(2,'0');
      $('#cdHours').textContent = String(h).padStart(2,'0');
      $('#cdMins').textContent = String(m).padStart(2,'0');
      $('#cdSecs').textContent = String(s).padStart(2,'0');
    }
    tick();
    setInterval(tick,1000);
  }



  $('#addCalendarBtn').addEventListener('click',()=>{
    const start = C.wedding.date.replace(/[-:]/g,'').split('.')[0]+'Z';
    const endDate = new Date(new Date(C.wedding.date).getTime()+ 6*3600000);
    const end = endDate.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
    const text = encodeURIComponent(`${C.couple.groom.firstName} & ${C.couple.bride.firstName}'s Wedding`);
    const loc = encodeURIComponent(C.wedding.venueAddress);
    const details = encodeURIComponent(`Join us as we celebrate the wedding of ${C.couple.groom.fullName} and ${C.couple.bride.fullName}.`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&location=${loc}&details=${details}`;
    window.open(url,'_blank');
  });

/* 8. OUR STORY TIMELINE
   Temporarily disabled. Original config and HTML can be restored later.
*/
(function buildStory(){
  const el = $('#storyTimeline');

  if (!el || !C.story || !C.story.length) return;

  C.story.forEach(item=>{
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-media reveal">
        <div class="ph"><span><i class="fa-solid ${item.icon}"></i></span></div>
      </div>
      <div class="timeline-card reveal">
        <div class="tl-icon"><i class="fa-solid ${item.icon}"></i></div>
        <h3>${item.title}</h3>
        <div class="tl-date">${item.date}</div>
        <p>${item.text}</p>
      </div>`;
    el.appendChild(div);
  });
})();


/* 9. GALLERY + LIGHTBOX
   Temporarily disabled when the Gallery HTML is hidden.
   Original functionality is retained for future restoration.
*/

if ($('#galleryGrid') && $('#lightbox')) {

  let galleryImages = [];

  (function buildGallery(){
    const grid = $('#galleryGrid');
    grid.innerHTML = '';

    galleryImages = C.heroSlides.map(s => s.image);

    galleryImages.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'gallery-item reveal';

      const img = document.createElement('img');
      img.src = src;
      img.alt = `Shiva and Rasika - Photo ${i + 1}`;
      img.loading = 'lazy';

      item.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.textContent = 'Shiva & Rasika';
      item.appendChild(overlay);

      item.addEventListener('click', () => openLightbox(i));
      grid.appendChild(item);
    });
  })();

  let lightboxIndex = 0;

  function openLightbox(i){
    lightboxIndex = i;
    renderLightbox();
    $('#lightbox').classList.add('active');
  }

  function renderLightbox(){
    $('#lightboxImg').src = galleryImages[lightboxIndex];
    $('#lightboxImg').alt = `Shiva and Rasika - Photo ${lightboxIndex + 1}`;
  }

  $('#lightboxClose').addEventListener('click', () => {
    $('#lightbox').classList.remove('active');
  });

  $('#lightbox').addEventListener('click', e => {
    if(e.target.id === 'lightbox'){
      $('#lightbox').classList.remove('active');
    }
  });

  $('#lightboxPrev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    renderLightbox();
  });

  $('#lightboxNext').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    renderLightbox();
  });

  document.addEventListener('keydown', e => {
    if(!$('#lightbox').classList.contains('active')) return;

    if(e.key === 'Escape') $('#lightbox').classList.remove('active');
    if(e.key === 'ArrowLeft') $('#lightboxPrev').click();
    if(e.key === 'ArrowRight') $('#lightboxNext').click();
  });

  (function(){
    let x0 = null;
    const lb = $('#lightbox');

    lb.addEventListener('touchstart', e => {
      x0 = e.touches[0].clientX;
    });

    lb.addEventListener('touchend', e => {
      if(x0 === null) return;

      const dx = e.changedTouches[0].clientX - x0;

      if(Math.abs(dx) > 50){
        dx > 0 ? $('#lightboxPrev').click() : $('#lightboxNext').click();
      }

      x0 = null;
    });
  })();

}

  /* ---------------------------------------------------------------- */
  /* 10. EVENTS                                                        */
  /* ---------------------------------------------------------------- */
  (function buildEvents(){
    const grid = $('#eventsGrid');
    C.events.forEach(ev=>{
      const card = document.createElement('div');
      card.className = 'event-card reveal';
      card.style.setProperty('--ev-color', ev.color);
      card.innerHTML = `
        <div class="event-icon"><i class="fa-solid ${ev.icon}"></i></div>
        <h3>${ev.name}</h3>
        <div class="event-date">${ev.dateDisplay}</div>
        <div class="event-time">${ev.time}</div>
        <p>${ev.description}</p>`;
      grid.appendChild(card);
    });
  })();



/* ---------------------------------------------------------------- */
/* 11. VENUE AND CITY TEMPERATURES                                   */
/* ---------------------------------------------------------------- */

// ================================================================
// WEDDING VENUE - MILAN HALL, CHIMUR
// ================================================================

const venueAddress = $('#venueAddress');
const venueNavBtn = $('#venueNavBtn');

if (venueAddress) {
  venueAddress.textContent = C.wedding.venueAddress;
}

if (venueNavBtn) {
  venueNavBtn.href =
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(C.wedding.mapsQuery)}&travelmode=driving`;

  venueNavBtn.target = '_blank';
  venueNavBtn.rel = 'noopener noreferrer';
}

// ================================================================
// RECEPTION VENUE - AMRUT CELEBRATIONS, YAVATMAL
// ================================================================

const receptionVenue = $('#receptionVenue');
const receptionAddress = $('#receptionAddress');
const receptionNavBtn = $('#receptionNavBtn');

if (receptionVenue) {
  receptionVenue.textContent = C.reception.venueName;
}

if (receptionAddress) {
  receptionAddress.textContent = C.reception.venueAddress;
}


if (receptionNavBtn) {
  const receptionDestination =
    C.reception.mapsQuery;

  receptionNavBtn.href =
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(receptionDestination)}&travelmode=driving`;

  receptionNavBtn.target = "_blank";
  receptionNavBtn.rel = "noopener noreferrer";
}


// ================================================================
// LIVE CITY TEMPERATURES - CHIMUR AND YAVATMAL
// ================================================================

async function loadCityTemperature(latitude, longitude, targetId) {
  const target = document.getElementById(targetId);

  if (!target) return;

  target.textContent = 'Loading...';

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=Asia%2FKolkata`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Weather service unavailable');
    }

    const data = await response.json();
    const temperature = data.current?.temperature_2m;

    if (typeof temperature === 'number' && Number.isFinite(temperature)) {
      target.textContent = `${Math.round(temperature)}°C`;
    } else {
      target.textContent = 'Currently unavailable';
    }

  } catch (error) {
    console.error(`Temperature loading failed for ${targetId}:`, error);
    target.textContent = 'Currently unavailable';
  }
}

// Chimur coordinates
loadCityTemperature(
  20.7333,
  79.3667,
  'weatherChimur'
);

// Yavatmal coordinates
loadCityTemperature(
  20.3932,
  78.1320,
  'weatherYavatmal'
);


  /* ---------------------------------------------------------------- */
  /* 12. QUOTE STRIP (typing animation, rotating)                      */
  /* ---------------------------------------------------------------- */
  (function typingQuotes(){
    const el = $('#quoteStrip');
    let qi = 0, ci = 0, deleting = false;
    function frame(){
      const full = C.quotes[qi];
      if(!deleting){
        ci++;
        el.textContent = full.slice(0,ci);
        if(ci>=full.length){ deleting=true; setTimeout(frame,2200); return; }
      }else{
        ci--;
        el.textContent = full.slice(0,ci);
        if(ci<=0){ deleting=false; qi=(qi+1)%C.quotes.length; setTimeout(frame,400); return; }
      }
      setTimeout(frame, deleting?18:32);
    }
    frame();
  })();



  /* ---------------------------------------------------------------- */
  /* 13. GUEST BOOK (in-memory, seeded from config)                    */
  /* ---------------------------------------------------------------- */
  let guestBook = [...C.guestBookSeed];
  function renderGuestBook(){
    const list = $('#gbList');
    list.innerHTML = guestBook.map(g=>`
      <div class="gb-note"><div class="name">${g.name}</div><p>${g.message}</p></div>
    `).join('');
  }
  renderGuestBook();
  $('#gbForm').addEventListener('submit',e=>{
    e.preventDefault();
    const name = $('#gbName').value.trim();
    const message = $('#gbMessage').value.trim();
    if(!name || !message) return;
    guestBook.unshift({name,message});
    renderGuestBook();
    $('#gbForm').reset();
    showToast('Thank you for your blessing \u2764');
  });

  /* ---------------------------------------------------------------- */
  /* 14. SOCIAL / FOOTER LINKS                                         */
  /* ---------------------------------------------------------------- */
  $('#footerInsta').href = C.social.instagram;
  if(C.rsvp && C.rsvp.whatsappNumber && $('#footerWhatsapp')){
    $('#footerWhatsapp').href = `https://wa.me/${C.rsvp.whatsappNumber}`;
  }

  /* ---------------------------------------------------------------- */
  /* 15. FLOATING FABS: scroll-top, share menu, pdf                    */
  /* ---------------------------------------------------------------- */
  function updateFabsVisibility(){
    $('#topFab').classList.toggle('show', window.scrollY > 700);
  }
  $('#topFab').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  $('#shareFab').addEventListener('click',()=>$('#shareMenu').classList.toggle('open'));
  document.addEventListener('click',e=>{
    if(!e.target.closest('.floating-stack') ) $('#shareMenu').classList.remove('open');
  });

  $('#shareWhatsapp').addEventListener('click',()=>{
    const text = encodeURIComponent(`You're invited! ${C.couple.groom.fullName} & ${C.couple.bride.fullName}'s wedding — ${C.wedding.dateDisplay} at ${C.wedding.venueName}. ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`,'_blank');
    $('#shareMenu').classList.remove('open');
  });
  $('#shareCopy').addEventListener('click',()=>{
    navigator.clipboard.writeText(window.location.href).then(()=>showToast('Invitation link copied!'));
    $('#shareMenu').classList.remove('open');
  });
  $('#sharePdf').addEventListener('click',()=>{
    showToast('Preparing your invitation for download…');
    window.print();
    $('#shareMenu').classList.remove('open');
  });

  /* ---------------------------------------------------------------- */
  /* 16. REVEAL-ON-SCROLL (AOS + IntersectionObserver fallback)        */
  /* ---------------------------------------------------------------- */
  function initAOSAndReveals(){
    if(window.AOS){ AOS.init({ once:true, duration:900, easing:'ease-out-cubic' }); }
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    },{ threshold:0.15 });
    $$('.reveal').forEach(el=>io.observe(el));
  }

  /* ---------------------------------------------------------------- */
  /* 17. PARTICLES.JS AMBIENT ATMOSPHERE (hero section)                 */
  /* ---------------------------------------------------------------- */
  function initParticleAtmosphere(){
    if(!window.particlesJS) return;
    const holder = document.createElement('div');
    holder.id = 'particles-hero';
    holder.style.cssText = 'position:absolute;inset:0;z-index:2;pointer-events:none;';
    $('.hero').appendChild(holder);
    particlesJS('particles-hero', {
      particles:{
        number:{ value:38, density:{ enable:true, value_area:900 } },
        color:{ value:'#D4AF37' },
        shape:{ type:'circle' },
        opacity:{ value:0.5, random:true },
        size:{ value:2.4, random:true },
        line_linked:{ enable:false },
        move:{ enable:true, speed:0.6, direction:'top', random:true, out_mode:'out' }
      },
      interactivity:{ events:{ onhover:{ enable:false }, onclick:{ enable:false } } },
      retina_detect:true
    });
  }

  /* ---------------------------------------------------------------- */
  /* 18. MOUSE GLOW (desktop only, subtle)                              */
  /* ---------------------------------------------------------------- */
  (function mouseGlow(){
    if(matchMedia('(pointer:coarse)').matches) return;
    const glow = document.createElement('div');
    glow.style.cssText = 'position:fixed;width:340px;height:340px;border-radius:50%;pointer-events:none;z-index:1;background:radial-gradient(circle,rgba(212,175,55,.06),transparent 70%);transform:translate(-50%,-50%);transition:opacity .3s;';
    document.body.appendChild(glow);
    window.addEventListener('mousemove',e=>{
      glow.style.left = e.clientX+'px';
      glow.style.top = e.clientY+'px';
    });
  })();

  /* ---------------------------------------------------------------- */
  /* 19. GSAP hero name entrance (subtle, plays once site is revealed) */
  /* ---------------------------------------------------------------- */
  const siteObserver = new MutationObserver(()=>{
    if($('#site').classList.contains('revealed') && window.gsap){
      gsap.fromTo('.hero-eyebrow',{opacity:0,y:-14},{opacity:1,y:0,duration:1,ease:'power3.out'});
      gsap.fromTo('.hero-names',{opacity:0,y:24},{opacity:1,y:0,duration:1.1,delay:.15,ease:'power3.out'});
      gsap.fromTo('.hero-meta',{opacity:0,y:16},{opacity:1,y:0,duration:1,delay:.35,ease:'power3.out'});
      gsap.fromTo('.hero-cta',{opacity:0,y:16},{opacity:1,y:0,duration:1,delay:.5,ease:'power3.out'});
      siteObserver.disconnect();
    }
  });
  siteObserver.observe($('#site'),{ attributes:true, attributeFilter:['class'] });

  /* ---------------------------------------------------------------- */
  /* 20. ACTIVE NAV LINK ON SCROLL                                     */
  /* ---------------------------------------------------------------- */
  const sections = ['home','story','events','gallery','venue'];
  window.addEventListener('scroll',()=>{
    let currentSection = sections[0];
    sections.forEach(id=>{
      const el = document.getElementById(id);
      if(el && window.scrollY >= el.offsetTop - 140) currentSection = id;
    });
    $$('#navLinks a').forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#'+currentSection);
    });
  });

})();
