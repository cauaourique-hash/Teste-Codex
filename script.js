// Controle do menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Animações de entrada ao rolar a página
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Animação discreta para números de indicadores
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const prefix = counter.dataset.prefix || '';
  const suffix = counter.dataset.suffix || '';
  const duration = 1400;
  const startTime = performance.now();

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing suave para um efeito mais premium
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * easedProgress);

    counter.textContent = `${prefix}${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = `${prefix}${target}${suffix}`;
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.7,
  }
);

counters.forEach((counter) => counterObserver.observe(counter));
