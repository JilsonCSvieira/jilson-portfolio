/* =============================================
   JILSON VIEIRA — PORTFOLIO JAVASCRIPT
   script.js
   ============================================= */

/* ---- YEAR IN FOOTER ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* =============================================
   NAV — scroll shadow + active link
   ============================================= */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  /* shadow on scroll */
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  /* active nav link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* =============================================
   MOBILE NAV — hamburger toggle
   ============================================= */
const hamburger  = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
  document.body.style.overflow = navLinksList.classList.contains('open') ? 'hidden' : '';
});

/* Close mobile nav on link click */
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =============================================
   SCROLL ANIMATIONS — Intersection Observer
   ============================================= */
const animEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      /* stagger siblings inside grids/timelines */
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

/* Add stagger delays to grid children */
document.querySelectorAll('.tech-grid, .projects-grid, .edu-grid, .contact-links').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.dataset.delay = i * 75;
  });
});

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.dataset.delay = i * 120;
});

animEls.forEach(el => observer.observe(el));

/* =============================================
   TERMINAL TYPEWRITER
   ============================================= */
const terminalBody = document.getElementById('terminal-body');

const lines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'kv',     key: 'name',     val: '"Jilson Vieira"' },
  { type: 'kv',     key: 'location', val: '"Quincy, MA 🇧🇷"' },
  { type: 'kv',     key: 'focus',    val: '"Backend & Full-Stack"' },
  { type: 'kv',     key: 'exploring',val: '"ML Systems"' },
  { type: 'blank' },
  { type: 'prompt', text: '$ cat skills.txt' },
  { type: 'plain',  text: 'Java • C++ • JavaScript',  color: 't-val' },
  { type: 'plain',  text: 'HTML • CSS • AWS Cloud',   color: 't-val' },
  { type: 'plain',  text: 'Git • Databases',          color: 't-val' },
  { type: 'blank' },
  { type: 'prompt', text: '$ echo $STATUS' },
  { type: 'plain',  text: 'Open to opportunities ✅', color: 't-val' },
];

let lineIndex = 0;
let charIndex = 0;
let currentEl = null;

function renderLine(line) {
  const div = document.createElement('div');

  if (line.type === 'blank') {
    terminalBody.appendChild(document.createElement('br'));
    return null;
  }

  if (line.type === 'prompt') {
    div.innerHTML = `<span class="t-prompt">$ </span><span class="t-muted"></span>`;
    terminalBody.appendChild(div);
    return div.querySelector('.t-muted');
  }

  if (line.type === 'kv') {
    div.innerHTML = `<span class="t-key">${line.key}</span><span class="t-muted">: </span><span class="${'t-val'}"></span>`;
    terminalBody.appendChild(div);
    return div.querySelector('.t-val');
  }

  if (line.type === 'plain') {
    div.innerHTML = `<span class="${line.color}"></span>`;
    terminalBody.appendChild(div);
    return div.querySelector(`.${line.color}`);
  }

  return null;
}

function getLineText(line) {
  if (line.type === 'prompt') return line.text.replace('$ ', '');
  if (line.type === 'kv')     return line.val;
  if (line.type === 'plain')  return line.text;
  return '';
}

/* Cursor element */
const cursor = document.createElement('span');
cursor.className = 't-cursor';

function type() {
  if (lineIndex >= lines.length) {
    /* remove cursor at end */
    cursor.remove();
    return;
  }

  const line = lines[lineIndex];

  if (line.type === 'blank') {
    terminalBody.appendChild(document.createElement('br'));
    lineIndex++;
    charIndex = 0;
    currentEl = null;
    setTimeout(type, 120);
    return;
  }

  /* start of a new line */
  if (charIndex === 0) {
    currentEl = renderLine(line);
    if (!currentEl) {
      lineIndex++;
      setTimeout(type, 100);
      return;
    }
    currentEl.appendChild(cursor);
  }

  const text = getLineText(line);

  if (charIndex < text.length) {
    currentEl.insertBefore(document.createTextNode(text[charIndex]), cursor);
    charIndex++;
    setTimeout(type, line.type === 'prompt' ? 55 : 30);
  } else {
    /* line done */
    cursor.remove();
    terminalBody.appendChild(cursor); /* move to next line position */
    lineIndex++;
    charIndex = 0;
    currentEl = null;
    setTimeout(type, line.type === 'prompt' ? 200 : 80);
  }
}

/* Start typing after a short delay */
setTimeout(type, 600);

/* =============================================
   SMOOTH SCROLL — polyfill offset for fixed nav
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    window.scrollTo({ top: target.offsetTop - navH - 8, behavior: 'smooth' });
  });
});