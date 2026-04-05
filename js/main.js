// ========================================
// Navigation
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = navLinks.querySelectorAll('a');

// Scroll effect on nav
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('nav--scrolled', scrollY > 50);
  lastScroll = scrollY;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navAnchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const id = section.getAttribute('id');
    if (!id) return;
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = navLinks.querySelector(`a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ========================================
// Scroll Reveal (Intersection Observer)
// ========================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ========================================
// Course Card Toggle
// ========================================
document.querySelectorAll('.course').forEach(course => {
  course.addEventListener('click', () => {
    course.classList.toggle('open');
  });
  course.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      course.classList.toggle('open');
    }
  });
});

// ========================================
// Contact Form (Formspree)
// ========================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn__text');
const btnLoading = submitBtn.querySelector('.btn__loading');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;
  formStatus.textContent = '';
  formStatus.className = 'form__status';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
      formStatus.classList.add('form__status--success');
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    formStatus.textContent = 'Something went wrong. Please try emailing me directly.';
    formStatus.classList.add('form__status--error');
  } finally {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
});

// ========================================
// Smooth scroll with offset for nav links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
    const targetPosition = target.offsetTop - navHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  });
});
