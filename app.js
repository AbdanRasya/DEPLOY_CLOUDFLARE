/**
 * AESTHETIC MINIMALIST PORTFOLIO
 * Vanilla JavaScript (ES6+) — Clean Micro-interactions
 */

(function () {
  'use strict';

  // Project Data Store
  const PROJECTS_DATA = {
    '1': {
      category: 'WEB PROJECT // CMS',
      title: 'Kolektif Jurnal — Platform Baca Minimalis',
      desc: 'Sebuah eksplorasi arsitektur web editorial yang berfokus pada pengalaman membaca tanpa gangguan (distraction-free reading). Dibangun dengan struktur semantik murni, hierarki tipografi berimbang, dan sistem tema dinamis.',
      tags: ['HTML5 Semantic', 'CSS Grid', 'Vanilla JS', 'Local Storage', 'Typography'],
      year: '2026',
      demoUrl: '#projects'
    },
    '2': {
      category: 'AUDIO & DSP // WEB APP',
      title: 'Aether // Ambient Sound Generator',
      desc: 'Generator audio sintetis procedural untuk fokus dan meditasi. Menggunakan Web Audio API native tanpa sampel suara eksternal, dilengkapi oscilloscope visualizer interaktif berbasis Canvas 2D.',
      tags: ['Web Audio API', 'Canvas 2D', 'Procedural Math', 'Sound Synthesis'],
      year: '2026',
      demoUrl: '#projects'
    },
    '3': {
      category: 'UI/UX // DESIGN SYSTEM',
      title: 'Kura — Minimal UI Design System',
      desc: 'Koleksi komponen UI monokromatis dan modular untuk aplikasi produktivitas. Dirancang dengan panduan aksesibilitas WCAG AA, rasio kontras tinggi, dan kurva interaksi yang halus.',
      tags: ['Figma', 'Design System', 'Tokens', 'Accessibility', 'Interaction'],
      year: '2025',
      demoUrl: '#projects'
    },
    '4': {
      category: 'FRONTEND // E-COMMERCE',
      title: 'Studio Keramik — Objek Seni Artisan',
      desc: 'Etalase digital interaktif untuk studio keramik lokal. Mengedepankan transisi gambar yang halus, performa cepat pada perangkat seluler, dan micro-interactions pada keranjang belanja.',
      tags: ['Responsive Web', 'CSS Animations', 'Modern JS', 'Image Optimization'],
      year: '2025',
      demoUrl: '#projects'
    }
  };

  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const liveClockEl = document.getElementById('liveClock');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const contactForm = document.getElementById('contactForm');
  const toastEl = document.getElementById('toast');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Modal Elements
  const detailModal = document.getElementById('detailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechList = document.getElementById('modalTechList');
  const modalYear = document.getElementById('modalYear');
  const modalActionBtn = document.getElementById('modalActionBtn');

  let toastTimeout = null;

  /**
   * 1. Theme Management (Light / Dark)
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.dataset.theme = initialTheme;

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme-preference', newTheme);
        showToast(`Tema dialihkan ke mode ${newTheme === 'dark' ? 'gelap' : 'terang'}`);
      });
    }
  }

  /**
   * 2. Live Local Clock (WIB / Jakarta Time)
   */
  function startLiveClock() {
    if (!liveClockEl) return;

    function update() {
      const now = new Date();
      // Format to GMT+7 (Asia/Jakarta)
      const options = {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const timeStr = new Intl.DateTimeFormat('id-ID', options).format(now);
      liveClockEl.textContent = timeStr.replace(/\./g, ':');
    }

    update();
    setInterval(update, 1000);
  }

  /**
   * 3. Toast Notifications
   */
  function showToast(message) {
    if (!toastEl) return;

    clearTimeout(toastTimeout);
    toastEl.textContent = message;
    toastEl.classList.add('show');

    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  /**
   * 4. Copy Email to Clipboard
   */
  function initCopyEmail() {
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', () => {
      const email = 'rasya@example.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => showToast('✓ Alamat email berhasil disalin!'))
          .catch(() => showToast(`Email: ${email}`));
      } else {
        showToast(`Email: ${email}`);
      }
    });
  }

  /**
   * 5. Project Filtering
   */
  function initProjectFilter() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.dataset.filter;

        projectCards.forEach(card => {
          const cat = card.dataset.category;
          if (filterVal === 'all' || cat === filterVal) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease';
              card.style.opacity = '1';
            }, 20);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /**
   * 6. Project Detail Modal
   */
  function openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data || !detailModal) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalYear.textContent = data.year;

    // Populate tech list
    modalTechList.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      modalTechList.appendChild(span);
    });

    modalActionBtn.onclick = () => {
      detailModal.close();
      showToast(`Membuka demonstrasi: ${data.title}`);
    };

    detailModal.showModal();
  }

  function initDetailModal() {
    // Buttons inside cards
    document.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        openProjectModal(id);
      });
    });

    // Close actions
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => detailModal.close());
    }
    if (modalDismissBtn) {
      modalDismissBtn.addEventListener('click', () => detailModal.close());
    }

    // Click outside modal backdrop to close
    if (detailModal) {
      detailModal.addEventListener('click', (e) => {
        const rect = detailModal.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                            rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) detailModal.close();
      });
    }
  }

  /**
   * 7. Contact Form Handling
   */
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !message) {
        showToast('Mohon lengkapi semua kolom.');
        return;
      }

      // Show success feedback
      showToast(`Terima kasih ${name}, pesan Anda telah terkirim!`);
      contactForm.reset();
    });
  }

  /**
   * Document Ready Initialization
   */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    startLiveClock();
    initCopyEmail();
    initProjectFilter();
    initDetailModal();
    initContactForm();
  });

})();
