const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const countObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) return;
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1300;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
      el.textContent = value >= 1000 ? `${Math.floor(value / 1000)}K+` : `${value}${target < 100 ? '+' : ''}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  countObserver.disconnect();
});

const stats = document.querySelector('.stats');
if (stats) countObserver.observe(stats);

const menu = document.querySelector('.menu');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('.nav-links').classList.toggle('open');
});
