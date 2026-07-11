/* =========================================================
   Happy Birthday Juliza — script.js
   Mengatur seluruh interaksi: loader, buka hadiah, surat
   dengan efek mengetik, galeri foto, kembang api, dan kontrol.
========================================================= */

document.addEventListener('componentsLoaded', () => {

  /* ---------- Elemen utama ---------- */
  const loader        = document.getElementById('loader');
  const heroSection    = document.getElementById('hero');
  const openGiftBtn    = document.getElementById('openGift');
  const giftBox        = document.getElementById('gift-box');

  const passcodeScreen = document.getElementById('passcode-screen');
  const passcodeCard   = document.querySelector('.passcode-card');
  const pcDay          = document.getElementById('pcDay');
  const pcMonth        = document.getElementById('pcMonth');
  const passcodeWarning = document.getElementById('passcodeWarning');
  const passcodeSubmit  = document.getElementById('passcodeSubmit');
  const hintBtn         = document.getElementById('hintBtn');
  const passcodeHint    = document.getElementById('passcodeHint');

  const quizScreen     = document.getElementById('quiz-screen');
  const quizCard       = document.querySelector('.quiz-card');
  const quizOptions    = document.querySelectorAll('.quiz-option');
  const senderNameInput = document.getElementById('senderNameInput');
  const quizWarning    = document.getElementById('quizWarning');

  const senderNameEnding = document.getElementById('senderNameEnding');
  const senderNameFinal  = document.getElementById('senderNameFinal');

  const storySection   = document.getElementById('story');
  const letterScene     = document.querySelector('.scene-letter');
  const gallerySection = document.querySelector('.scene-gallery');
  const fireworksScene = document.querySelector('.scene-fireworks');

  const envelope       = document.getElementById('envelope');
  const typewriterEl   = document.getElementById('typewriter');
  const nextGalleryBtn = document.getElementById('nextGallery');

  const slideImage     = document.getElementById('slideImage');
  const photoCaption   = document.getElementById('photoCaption');
  const gallerySectionTitle = document.getElementById('gallerySectionTitle');

  const controls       = document.getElementById('controls');
  const prevSceneBtn   = document.getElementById('prevScene');
  const nextSceneBtn   = document.getElementById('nextScene');

  const replayBtn      = document.getElementById('replay');
  const bgMusic        = document.getElementById('bgMusic');

  const finalMessage   = document.getElementById('finalMessage');
  const closeFinalBtn  = document.getElementById('closeFinal');

  const skipBtn        = document.getElementById('skipAnimation');
  const transition     = document.getElementById('transition');

  const fireworksCanvas = document.getElementById('fireworksCanvas');
  const ctx = fireworksCanvas.getContext('2d');

  /* ---------- Panggilan hasil kuis & nama pengirim ---------- */
  const nicknameMap = { A: 'Faza', B: 'Aja', C: 'Juliza', D: 'Julian' };
  let chosenNickname = 'Faza';
  let senderName = '';

  /* ---------- Konten surat (typewriter) ---------- */
  function getLetterText() {
    return `Hai ${chosenNickname},

Di hari spesialmu ini, aku ingin kamu tahu betapa berartinya kamu.
Semoga tahun ini membawa lebih banyak tawa, kedamaian, dan mimpi
yang perlahan menjadi kenyataan.

Terima kasih sudah menjadi dirimu sendiri.

Selamat ulang tahun. 🎂`;
  }

  /* ---------- Galeri foto (dibagi per section) ---------- */
  const gallerySections = [
    {
      title: 'Keluarga',
      photos: [
        { src: 'assets/keluarga1.jpeg', caption: 'Waktu paling hangat adalah saat berkumpul bersama orang-orang tersayang.' }
      ]
    },
    {
      title: 'Momen Tahunan',
      photos: [
        { src: 'assets/tahunan.jpeg', caption: 'Melewati setiap momen, senang maupun berat, dan tetap melangkah maju.' },
        { src: 'assets/moment2.jpg', caption: 'Senyum yang mekar seindah bunga-bunga ini.' },
        { src: 'assets/moment3.jpg', caption: 'Momen sederhana yang selalu berhasil bikin tersenyum.' },
        { src: 'assets/moment5.jpeg', caption: 'Perjalanan panjang selalu jadi cerita yang seru untuk diingat.' }
      ]
    },
    {
      title: 'Bersama Teman',
      photos: [
        { src: 'assets/moment6.jpeg', caption: 'Tawa bersama sahabat yang selalu bikin rindu.' },
        { src: 'assets/moment4.jpeg', caption: 'Menikmati waktu, menikmati pemandangan, menikmati hidup.' },
        { src: 'assets/moment.jpg', caption: 'Di balik semua kesibukan, tetap semangat menjalani hari.' }
      ]
    }
  ];
  let sectionIndex = 0;
  let galleryIndex = 0;

  /* =========================================================
     1. LOADER
  ========================================================= */
  const loaderStart = Date.now();
  const MIN_LOADER_TIME = 1400;

  window.addEventListener('load', () => {
    const elapsed = Date.now() - loaderStart;
    const wait = Math.max(0, MIN_LOADER_TIME - elapsed);
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => loader.classList.add('hidden'), 800);
    }, wait);
  });

  /* Jaga-jaga jika event load lambat/tidak terpicu */
  setTimeout(() => {
    if (!loader.classList.contains('hidden')) {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => loader.classList.add('hidden'), 800);
    }
  }, 4000);

  /* =========================================================
     2. TRANSISI ANTAR SCENE (fade overlay)
  ========================================================= */
  function fadeTransition(callback, duration = 500) {
    const fade = transition.querySelector('.fade');
    transition.classList.remove('hidden');
    fade.style.opacity = '1';
    setTimeout(() => {
      callback();
      setTimeout(() => {
        fade.style.opacity = '0';
        setTimeout(() => transition.classList.add('hidden'), duration);
      }, 50);
    }, duration);
  }

  /* =========================================================
     3. PASSCODE (VERIFIKASI TANGGAL LAHIR)
  ========================================================= */
  const CORRECT_DAY = 12;
  const CORRECT_MONTH = 7;

  function checkPasscode() {
    const d = parseInt(pcDay.value, 10);
    const m = parseInt(pcMonth.value, 10);

    if (d === CORRECT_DAY && m === CORRECT_MONTH) {
      passcodeWarning.classList.add('hidden');
      fadeTransition(() => {
        passcodeScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
      });
    } else {
      passcodeWarning.classList.remove('hidden');
      passcodeCard.classList.remove('shake');
      void passcodeCard.offsetWidth; /* reset animasi shake */
      passcodeCard.classList.add('shake');
    }
  }

  passcodeSubmit.addEventListener('click', checkPasscode);

  [pcDay, pcMonth].forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkPasscode();
    });
  });

  pcDay.addEventListener('input', () => {
    if (pcDay.value.length >= 2) pcMonth.focus();
  });

  hintBtn.addEventListener('click', () => {
    passcodeHint.classList.toggle('hidden');
  });

  /* =========================================================
     4. NAMA PENGIRIM & KUIS PANGGILAN
  ========================================================= */
  quizOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choice;
      const typedName = senderNameInput.value.trim();

      if (!typedName) {
        quizWarning.classList.remove('hidden');
        quizCard.classList.remove('shake');
        void quizCard.offsetWidth; /* reset animasi shake */
        quizCard.classList.add('shake');
        return;
      }

      quizWarning.classList.add('hidden');
      chosenNickname = nicknameMap[choice] || 'Faza';
      senderName = typedName;
      senderNameEnding.textContent = senderName;
      senderNameFinal.textContent = senderName;

      fadeTransition(() => {
        quizScreen.classList.add('hidden');
        heroSection.classList.remove('hidden');
      });
    });
  });

  /* =========================================================
     5. BUKA HADIAH -> MASUK KE SURAT
  ========================================================= */
  function openGift() {
    tryPlayMusic();
    fadeTransition(() => {
      heroSection.classList.add('hidden');
      storySection.classList.remove('hidden');
      letterScene.classList.remove('hidden');
      gallerySection.classList.add('hidden');
      fireworksScene.classList.add('hidden');
      skipBtn.classList.remove('hidden');
      startTypewriter();
    });
  }

  openGiftBtn.addEventListener('click', openGift);
  giftBox.addEventListener('click', openGift);

  function tryPlayMusic() {
    if (bgMusic) {
      bgMusic.volume = 0.6;
      bgMusic.play().catch(() => {
        /* Browser mungkin memblokir autoplay tanpa interaksi; abaikan. */
      });
    }
  }

  /* =========================================================
     6. EFEK MENGETIK (TYPEWRITER)
  ========================================================= */
  let typewriterTimeout = null;

  function startTypewriter() {
    const letterText = getLetterText();
    typewriterEl.textContent = '';
    let i = 0;
    clearTimeout(typewriterTimeout);

    nextGalleryBtn.classList.remove('show');

    function typeChar() {
      if (i < letterText.length) {
        typewriterEl.textContent += letterText.charAt(i);
        i++;
        typewriterTimeout = setTimeout(typeChar, 28);
      } else {
        nextGalleryBtn.classList.add('show');
      }
    }
    typeChar();
  }

  function finishTypewriterInstantly() {
    clearTimeout(typewriterTimeout);
    typewriterEl.textContent = getLetterText();
    nextGalleryBtn.classList.add('show');
  }

  /* =========================================================
     7. SURAT -> GALERI
  ========================================================= */
  nextGalleryBtn.addEventListener('click', () => {
    goToGallery();
  });

  function goToGallery() {
    fadeTransition(() => {
      letterScene.classList.add('hidden');
      gallerySection.classList.remove('hidden');
      controls.classList.remove('hidden');
      sectionIndex = 0;
      galleryIndex = 0;
      renderGalleryImage();
    });
  }

  function renderGalleryImage() {
    const section = gallerySections[sectionIndex];
    const item = section.photos[galleryIndex];
    gallerySectionTitle.textContent = section.title;
    slideImage.style.opacity = '0';
    setTimeout(() => {
      slideImage.src = item.src;
      photoCaption.textContent = item.caption;
      slideImage.style.transition = 'opacity .6s ease';
      slideImage.style.opacity = '1';
    }, 250);
  }

  /* =========================================================
     8. KONTROL GALERI (PREV / NEXT, MELINTASI SECTION)
  ========================================================= */
  nextSceneBtn.addEventListener('click', () => {
    const currentSection = gallerySections[sectionIndex];
    if (galleryIndex < currentSection.photos.length - 1) {
      galleryIndex++;
      renderGalleryImage();
    } else if (sectionIndex < gallerySections.length - 1) {
      sectionIndex++;
      galleryIndex = 0;
      renderGalleryImage();
    } else {
      goToFireworks();
    }
  });

  prevSceneBtn.addEventListener('click', () => {
    if (galleryIndex > 0) {
      galleryIndex--;
      renderGalleryImage();
    } else if (sectionIndex > 0) {
      sectionIndex--;
      galleryIndex = gallerySections[sectionIndex].photos.length - 1;
      renderGalleryImage();
    }
  });

  /* =========================================================
     9. GALERI -> KEMBANG API (PENUTUP)
  ========================================================= */
  function goToFireworks() {
    fadeTransition(() => {
      gallerySection.classList.add('hidden');
      controls.classList.add('hidden');
      fireworksScene.classList.remove('hidden');
      resizeCanvas();
      startFireworks();
      setTimeout(showFinalMessage, 6000);
    });
  }

  /* =========================================================
     10. LEWATI ANIMASI
  ========================================================= */
  skipBtn.addEventListener('click', () => {
    finishTypewriterInstantly();
    goToGallery();
  });

  /* =========================================================
     11. PESAN AKHIR (FINAL CARD)
  ========================================================= */
  function showFinalMessage() {
    finalMessage.classList.remove('hidden');
  }

  closeFinalBtn.addEventListener('click', () => {
    finalMessage.classList.add('hidden');
  });

  /* =========================================================
     12. PUTAR ULANG
  ========================================================= */
  replayBtn.addEventListener('click', () => {
    fadeTransition(() => {
      stopFireworks();
      finalMessage.classList.add('hidden');
      fireworksScene.classList.add('hidden');
      storySection.classList.add('hidden');
      skipBtn.classList.add('hidden');
      heroSection.classList.remove('hidden');
      sectionIndex = 0;
      galleryIndex = 0;
      if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
    });
  });

  /* =========================================================
     13. KEMBANG API (CANVAS)
  ========================================================= */
  let fireworksAnimId = null;
  let particles = [];

  function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  function randomColor() {
    const colors = ['#ffd966', '#ff5b7d', '#7ecbff', '#b98cff', '#8effc1', '#fff2a8'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createBurst(x, y) {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 3;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: randomColor(),
        size: 2 + Math.random() * 2
      });
    }
  }

  let fireworksSpawnInterval = null;

  function startFireworks() {
    particles = [];
    stopFireworks();

    fireworksSpawnInterval = setInterval(() => {
      const x = Math.random() * fireworksCanvas.width;
      const y = Math.random() * fireworksCanvas.height * 0.5 + 40;
      createBurst(x, y);
    }, 900);

    function animate() {
      ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.alpha -= 0.012;
      });
      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      fireworksAnimId = requestAnimationFrame(animate);
    }
    animate();
  }

  function stopFireworks() {
    if (fireworksAnimId) cancelAnimationFrame(fireworksAnimId);
    if (fireworksSpawnInterval) clearInterval(fireworksSpawnInterval);
    fireworksAnimId = null;
    fireworksSpawnInterval = null;
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  }

  /* =========================================================
     14. DEKORASI LATAR (partikel & bintang jatuh acak)
  ========================================================= */
  function scatterRandom(containerId, selector) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll(selector).forEach(el => {
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
    });
  }

  scatterRandom('light-particles', 'span');
  scatterRandom('shooting-stars', '.meteor');

  /* Inisialisasi ukuran canvas sejak awal */
  resizeCanvas();
});
