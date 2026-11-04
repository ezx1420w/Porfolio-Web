// ---- Menú hamburguesa ----
const burger = document.getElementById('burger'), menu = document.getElementById('mobile-menu');
function toggleMenu(open) {
  menu.classList.toggle('hidden', !open);
  burger.setAttribute('aria-expanded', open);
  document.getElementById('b-open').classList.toggle('hidden', open);
  document.getElementById('b-close').classList.toggle('hidden', !open);
}
burger.addEventListener('click', () => toggleMenu(menu.classList.contains('hidden')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// ---- Rotación de roles con efecto máquina de escribir ----
const roles = ['Ezequiel Alfonso Porfolio'];
const el = document.getElementById('role');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let r = 0, c = 0, del = false;
function type() {
  const w = roles[r];
  el.textContent = w.slice(0, c);
  if (!del && c === w.length) { del = true; return setTimeout(type, 1600); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 35 : 75);
}
still ? (el.textContent = roles[0]) : type();

// ---- Filtros de proyectos ----
const btns = document.querySelectorAll('.f'), projs = document.querySelectorAll('.proj');
btns.forEach(b => b.addEventListener('click', () => {
  btns.forEach(x => {
    const on = x === b;
    x.setAttribute('aria-pressed', on);
    x.classList.toggle('border-neon', on); x.classList.toggle('text-neon', on);
    x.classList.toggle('border-line', !on); x.classList.toggle('text-mute', !on);
  });
  projs.forEach(p => p.classList.toggle('off', b.dataset.f !== 'all' && p.dataset.c !== b.dataset.f));
}));

// ---- Copiar email con feedback ----
const toast = document.getElementById('toast'), copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(EMAIL); }
  catch { const t = document.createElement('textarea'); t.value = EMAIL; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
  copyBtn.textContent = '¡Copiado!';
  toast.textContent = EMAIL;
  setTimeout(() => { copyBtn.textContent = 'Copiar email'; toast.textContent = ''; }, 2200);
});

// ---- Aparición al hacer scroll (Intersection Observer) ----
const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.rv').forEach(n => io.observe(n));

document.getElementById('year').textContent = new Date().getFullYear();
