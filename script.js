/* ==========================================================================
   Antoinette Wright - LKsmilez Life Insurance JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar & Scroll-Spy Active State Logic
  const navbar = document.getElementById('navbar');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileDrawerLinks = document.querySelectorAll('.drawer-links .drawer-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Include Contact in scroll-spy when user reaches bottom of page
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
      setActiveNavLink('contact');
    }
  });

  // Function to set active class on nav links
  function setActiveNavLink(targetId) {
    if (!targetId) return;

    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileDrawerLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Scroll-Spy using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-84px 0px -40% 0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          setActiveNavLink(id);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Update active class immediately on click
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (targetId) setActiveNavLink(targetId);
    });
  });

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (targetId) setActiveNavLink(targetId);
    });
  });

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    mobileToggle?.classList.add('active');
    const toggleIcon = mobileToggle?.querySelector('i');
    if (toggleIcon) {
      toggleIcon.className = 'fa-solid fa-xmark';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    mobileToggle?.classList.remove('active');
    const toggleIcon = mobileToggle?.querySelector('i');
    if (toggleIcon) {
      toggleIcon.className = 'fa-solid fa-bars-staggered';
    }
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  mobileDrawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    }
  });



  // 4. Testimonial Carousel
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dots = document.querySelectorAll('#carouselDots .dot');
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.testi-card').length;

  function updateCarousel(slideIndex) {
    currentSlide = (slideIndex + totalSlides) % totalSlides;
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  prevBtn?.addEventListener('click', () => updateCarousel(currentSlide - 1));
  nextBtn?.addEventListener('click', () => updateCarousel(currentSlide + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index') || '0', 10);
      updateCarousel(index);
    });
  });

  // Auto scroll testimonials every 6 seconds
  setInterval(() => {
    updateCarousel(currentSlide + 1);
  }, 6000);

  // 5. Quote Wizard Modal Logic
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
  const closeQuoteModalBtn = document.getElementById('closeQuoteModal');

  function openQuoteModal() {
    quoteModal?.classList.add('open');
    quoteModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeDrawer();
  }

  function closeQuoteModal() {
    quoteModal?.classList.remove('open');
    quoteModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openQuoteBtns.forEach(btn => btn.addEventListener('click', openQuoteModal));
  closeQuoteModalBtn?.addEventListener('click', closeQuoteModal);

  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const wStep1Next = document.getElementById('wStep1Next');
  const wStep2Prev = document.getElementById('wStep2Prev');
  const wStep2Next = document.getElementById('wStep2Next');
  const wStep3Reset = document.getElementById('wStep3Reset');
  const wizardProgress = document.getElementById('wizardProgress');

  function goToStep(num) {
    step1?.classList.remove('active');
    step2?.classList.remove('active');
    step3?.classList.remove('active');

    if (num === 1) {
      step1?.classList.add('active');
      if (wizardProgress) wizardProgress.style.width = '33%';
    } else if (num === 2) {
      step2?.classList.add('active');
      if (wizardProgress) wizardProgress.style.width = '66%';
    } else if (num === 3) {
      step3?.classList.add('active');
      if (wizardProgress) wizardProgress.style.width = '100%';
      calculateWizardResult();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D86C8A', '#5B2A3C', '#F8DCE4', '#C9A27E']
        });
      } catch (e) {
        console.log('Confetti burst!');
      }
    }
  }

  wStep1Next?.addEventListener('click', () => {
    const name = document.getElementById('wFirstName')?.value.trim();
    if (!name) { alert('Please enter your first name.'); return; }
    goToStep(2);
  });

  wStep2Prev?.addEventListener('click', () => goToStep(1));
  wStep2Next?.addEventListener('click', () => goToStep(3));
  wStep3Reset?.addEventListener('click', () => goToStep(1));

  function calculateWizardResult() {
    const age = parseInt(document.getElementById('wAge')?.value || '34', 10);
    const coverage = parseInt(document.getElementById('wCoverage')?.value || '500000', 10);
    const wResPrice = document.getElementById('wResPrice');
    const wResSummary = document.getElementById('wResSummary');

    let baseRate = (coverage / 100000) * 3.6;
    if (age > 30) baseRate += (age - 30) * 0.3;

    if (wResPrice) wResPrice.textContent = `$${baseRate.toFixed(2)}`;
    if (wResSummary) wResSummary.textContent = `$${coverage.toLocaleString()} Coverage • 20-Year Term`;
  }

  document.getElementById('wizardForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Antoinette Wright has received your quote request and will be in touch shortly.');
    closeQuoteModal();
    goToStep(1);
  });

  // 6. Booking Consultation Modal Logic
  const bookingModal = document.getElementById('bookingModal');
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const closeBookingModalBtn = document.getElementById('closeBookingModal');

  function openBookingModal() {
    bookingModal?.classList.add('open');
    bookingModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeDrawer();
  }

  function closeBookingModal() {
    bookingModal?.classList.remove('open');
    bookingModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBookingBtns.forEach(btn => btn.addEventListener('click', openBookingModal));
  closeBookingModalBtn?.addEventListener('click', closeBookingModal);

  document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Consultation request confirmed! Antoinette looks forward to connecting with you.');
    closeBookingModal();
  });

  // 7. Plan Detail Modal
  const planModal = document.getElementById('planModal');
  const closePlanModalBtn = document.getElementById('closePlanModal');
  const planModalContent = document.getElementById('planModalContent');
  const openPlanBtns = document.querySelectorAll('.open-plan-modal');

  const planDetailsData = {
    term: {
      title: "Term Life Insurance with Antoinette",
      image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=800&q=80",
      description: "Term life insurance provides maximum protection during your key earning years. It's the most straightforward and affordable way to protect your children's upbringing, mortgage, and daily bills.",
      benefits: [
        "Guaranteed Level Monthly Premiums that never increase.",
        "Tax-Free Lump Sum Payout directly to your family.",
        "Flexible terms: 10, 15, 20, or 30 years to match your family needs.",
        "Convertible to permanent coverage without medical requalification."
      ],
      fit: "Parents with dependent kids, homeowners with a mortgage, young families."
    },
    whole: {
      title: "Whole Life Permanent Insurance",
      image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&w=800&q=80",
      description: "Whole life insurance provides lifetime protection that never expires. Your locked-in premium rate stays fixed for your entire life while building guaranteed tax-deferred cash value.",
      benefits: [
        "Coverage that lasts your entire lifetime.",
        "Guaranteed cash value accumulation you can borrow against.",
        "Fixed rates that will never go up with age or health changes.",
        "Tax-free legacy payout for children and estate planning."
      ],
      fit: "Anyone seeking lifelong financial security, cash value savings, and estate legacy."
    },
    universal: {
      title: "Universal Flexible Life Insurance",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
      description: "Universal life insurance pairs permanent protection with adjustable monthly premium payments and interest-earning cash growth potential.",
      benefits: [
        "Adjustable monthly premiums to fit changing budgets.",
        "Flexibility to increase or decrease coverage as needs change.",
        "Tax-deferred interest accumulation on cash value balance.",
        "Flexible estate planning strategies."
      ],
      fit: "Professionals and retirees who want customizable permanent coverage options."
    },
    final: {
      title: "Final Expense Burial Coverage",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      description: "Final expense insurance is a specialized, smaller permanent policy designed to shield your children and spouse from funeral costs, burial fees, and medical debt.",
      benefits: [
        "Immediate cash benefit paid quickly to your family.",
        "No medical physical exam required for most policies.",
        "Policy rates locked in for life.",
        "Affordable policy amounts ranging from $5,000 to $35,000."
      ],
      fit: "Seniors and individuals looking to relieve family of end-of-life financial burden."
    },
    mortgage: {
      title: "Mortgage Protection Insurance",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      description: "Mortgage protection term coverage is structured to pay off your home mortgage balance if a primary homeowning provider passes away.",
      benefits: [
        "Ensures your spouse and children can remain in their family home.",
        "Matches your exact mortgage payoff term (15 or 30 years).",
        "Can include living benefits for critical illness.",
        "Simple digital application process."
      ],
      fit: "New homeowners, mortgage holders, and growing families."
    }
  };

  openPlanBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const planKey = btn.getAttribute('data-plan');
      const data = planDetailsData[planKey];
      if (!data) return;

      planModalContent.innerHTML = `
        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-plum); margin-bottom: 16px; text-align: center;">${data.title}</h3>
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 20px;" />
        <p style="font-size: 1.05rem; color: var(--color-charcoal); margin-bottom: 20px; line-height: 1.6;">${data.description}</p>
        <h4 style="font-size: 1.1rem; color: var(--color-plum); margin-bottom: 12px;">Key Benefits &amp; Features:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
          ${data.benefits.map(b => `<li style="display: flex; gap: 10px; font-size: 0.95rem; color: var(--color-charcoal);"><i class="fa-solid fa-heart" style="color: var(--color-rose); margin-top: 2px;"></i> ${b}</li>`).join('')}
        </ul>
        <div style="background: var(--color-petal); padding: 14px 18px; border-radius: var(--radius-md); font-size: 0.9rem; color: var(--color-muted); margin-bottom: 24px;">
          <strong>Best Fit For:</strong> ${data.fit}
        </div>
        <button class="btn btn-primary btn-full open-quote-modal">Get a Custom Quote with Antoinette</button>
      `;

      planModalContent.querySelector('.open-quote-modal')?.addEventListener('click', () => {
        closePlanModal();
        openQuoteModal();
      });

      planModal?.classList.add('open');
      planModal?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closePlanModal() {
    planModal?.classList.remove('open');
    planModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closePlanModalBtn?.addEventListener('click', closePlanModal);

  // 8. Main Contact Form Submission
  const mainContactForm = document.getElementById('mainContactForm');
  mainContactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Antoinette Wright has received your quote request and will reach out to you directly via your preferred contact method.');
    mainContactForm.reset();
  });

  // 9. Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Subscribed! Thank you for joining Antoinette’s family protection newsletter.');
    newsletterForm.reset();
  });

  // 10. Legal Modals
  const legalModal = document.getElementById('legalModal');
  const closeLegalModalBtn = document.getElementById('closeLegalModal');
  const legalModalContent = document.getElementById('legalModalContent');
  const openLegalBtns = document.querySelectorAll('.open-legal-modal');

  openLegalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-legal');
      let title = "Privacy Policy";
      let body = "Antoinette Wright and LKsmilez Life Insurance respect your privacy. All information submitted on this site is kept 100% confidential and is strictly used to provide requested life insurance quotes.";

      if (type === 'terms') {
        title = "Terms of Use";
        body = "By using this site, you agree to receive life insurance information and rate estimates. All quotes generated are non-binding estimates subject to final underwriting carrier review.";
      } else if (type === 'licensing') {
        title = "Licensing & Disclaimers";
        body = "Antoinette Wright is an independent licensed life insurance professional [NPN: #19827401]. Products and availability vary by state. This website is for informational purposes only.";
      }

      legalModalContent.innerHTML = `
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--color-plum); margin-bottom: 16px;">${title}</h3>
        <p style="font-size: 1rem; color: var(--color-charcoal); line-height: 1.7;">${body}</p>
      `;

      legalModal?.classList.add('open');
      legalModal?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLegalModal() {
    legalModal?.classList.remove('open');
    legalModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeLegalModalBtn?.addEventListener('click', closeLegalModal);

  // Close modals on backdrop click & Esc key
  window.addEventListener('click', (e) => {
    if (e.target === quoteModal) closeQuoteModal();
    if (e.target === bookingModal) closeBookingModal();
    if (e.target === planModal) closePlanModal();
    if (e.target === legalModal) closeLegalModal();
    if (e.target === whoCardModal) closeWhoCardModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteModal();
      closeBookingModal();
      closePlanModal();
      closeLegalModal();
      closeWhoCardModal();
    }
  });

  // 11. Scroll Reveal & Pop-up Modal Logic for Who I Help Cards
  const whoCards = document.querySelectorAll('.who-card');
  const whoCardModal = document.getElementById('whoCardModal');
  const closeWhoCardModalBtn = document.getElementById('closeWhoCardModal');
  const whoModalContent = document.getElementById('whoModalContent');

  if (whoCards.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    whoCards.forEach(card => revealObserver.observe(card));
  }

  function openWhoCardModal(card) {
    const title = card.getAttribute('data-title');
    const image = card.getAttribute('data-image');
    const alt = card.getAttribute('data-alt');
    const longDesc = card.getAttribute('data-long');
    const icon = card.getAttribute('data-icon') || 'fa-heart';
    const bulletsRaw = card.getAttribute('data-bullets');
    let bullets = [];
    try {
      bullets = JSON.parse(bulletsRaw || '[]');
    } catch(e) {
      bullets = [];
    }

    const bulletsHTML = bullets.map(b => `<li><i class="fa-solid fa-circle-check"></i> <span>${b}</span></li>`).join('');

    if (whoModalContent) {
      whoModalContent.innerHTML = `
        <div class="who-modal-layout">
          <div class="who-modal-img-col">
            <img src="${image}" alt="${alt}" class="who-modal-img" />
          </div>
          <div class="who-modal-info-col">
            <div class="who-modal-badge-tag">
              <i class="fa-solid ${icon}"></i> Personalized Family Protection
            </div>
            <h3 class="who-modal-title">${title}</h3>
            <p class="who-modal-long-desc">${longDesc}</p>
            <ul class="who-modal-bullets">
              ${bulletsHTML}
            </ul>
            <div class="who-modal-actions">
              <button type="button" class="btn btn-primary btn-lg modal-get-quote-btn">
                <i class="fa-solid fa-sparkles"></i> Get a Free Quote
              </button>
              <a href="https://calendly.com/lksmiles2020/30min" target="_blank" rel="noopener noreferrer" class="btn btn-secondary modal-book-call-btn">
                <i class="fa-solid fa-calendar"></i> Book a Consultation
              </a>
            </div>
          </div>
        </div>
      `;

      whoModalContent.querySelector('.modal-get-quote-btn')?.addEventListener('click', () => {
        closeWhoCardModal();
        openQuoteModal();
      });

      whoModalContent.querySelector('.modal-book-call-btn')?.addEventListener('click', () => {
        closeWhoCardModal();
      });
    }

    whoCardModal?.classList.add('open');
    whoCardModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeWhoCardModal() {
    whoCardModal?.classList.remove('open');
    whoCardModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  whoCards.forEach(card => {
    card.addEventListener('click', () => openWhoCardModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWhoCardModal(card);
      }
    });
  });

  closeWhoCardModalBtn?.addEventListener('click', closeWhoCardModal);

});
