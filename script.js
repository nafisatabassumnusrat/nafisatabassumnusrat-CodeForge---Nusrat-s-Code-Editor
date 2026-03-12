/* ══════════════════════════════════════════════
   Nusrat's Code Editor — script.js
   Author: Nafisa Tabassum Nusrat
   ══════════════════════════════════════════════ */

/* ════════════════════════════════════════
   THEME — LIGHT / DARK
════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('nusrat-theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light-mode');
  updateToggleIcon();
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('nusrat-theme', isLight ? 'light' : 'dark');
  updateToggleIcon();
}

function updateToggleIcon() {
  const knob  = document.querySelector('.toggle-knob');
  const label = document.querySelector('.toggle-label');
  const isLight = document.body.classList.contains('light-mode');
  if (knob)  knob.textContent  = isLight ? '☀️' : '🌙';
  if (label) label.textContent = isLight ? 'Light' : 'Dark';
}

/* ════════════════════════════════════════
   LOADER
════════════════════════════════════════ */
window.addEventListener('load', () => {
  initTheme();

  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
      document.getElementById('site').classList.add('visible');
      initEditor();
    }, 500);
  }, 2400);
});

/* ════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const target  = document.getElementById('page-' + name);
  const navLink = document.querySelector('[data-page="' + name + '"]');
  if (target)  target.classList.add('active');
  if (navLink) navLink.classList.add('active');
  document.getElementById('navLinks').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ════════════════════════════════════════
   HTML / CSS / JS EDITOR
════════════════════════════════════════ */
function initEditor() {
  document.getElementById('html-editor').value =
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello, Nusrat's CodeForge! ✦</h1>
  <p>Edit HTML, CSS and JS to see live output.</p>
  <button id="btn">Click me!</button>
</body>
</html>`;

  document.getElementById('css-editor').value =
`body {
  font-family: 'Segoe UI', sans-serif;
  background: #0a0b0f;
  color: #e8eaf0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  text-align: center;
  gap: 16px;
}
h1 {
  font-size: 2rem;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p { color: #7a80a0; }
button {
  padding: 12px 28px;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}
button:hover { transform: scale(1.05); }`;

  document.getElementById('js-editor').value =
`const btn = document.getElementById('btn');
const h1  = document.querySelector('h1');
const colors = [
  'linear-gradient(135deg,#00d4ff,#a855f7)',
  'linear-gradient(135deg,#00ff88,#00d4ff)',
  'linear-gradient(135deg,#ff6b35,#ffd700)',
  'linear-gradient(135deg,#a855f7,#ff6b35)'
];
let i = 0;
btn.addEventListener('click', () => {
  i = (i + 1) % colors.length;
  h1.style.background = colors[i];
  h1.style.webkitBackgroundClip = 'text';
  h1.style.webkitTextFillColor  = 'transparent';
  btn.textContent = 'Change again ✦';
});`;

  liveUpdate();
}

function liveUpdate() {
  const html = document.getElementById('html-editor').value;
  const css  = document.getElementById('css-editor').value;
  const js   = document.getElementById('js-editor').value;
  const doc =
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' + css + '</style></head>' +
    (html.includes('<body') ? html : '<body>' + html + '</body>') +
    '<script>try{' + js + '}catch(e){console.error(e);}<\/script></html>';
  document.getElementById('preview-frame').srcdoc = doc;
}

function runCode() {
  liveUpdate();
  showToast('▶ Code executed!');
}

/* ════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════ */
function submitContact() {
  const name  = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg   = document.getElementById('contact-msg').value.trim();
  if (!name || !email || !msg) { showToast('⚠ Please fill in all fields'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('⚠ Please enter a valid email'); return; }
  document.getElementById('form-success').style.display = 'block';
  document.getElementById('contact-name').value  = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-msg').value   = '';
  showToast('✓ Message sent!');
}

/* ════════════════════════════════════════
   TOAST
════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ════════════════════════════════════════
   TAB KEY IN TEXTAREAS
════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Tab' && e.target.tagName === 'TEXTAREA') {
    e.preventDefault();
    const ta = e.target, s = ta.selectionStart, end = ta.selectionEnd;
    ta.value = ta.value.substring(0, s) + '  ' + ta.value.substring(end);
    ta.selectionStart = ta.selectionEnd = s + 2;
    liveUpdate();
  }
});
