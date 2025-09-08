// Animate service cards on scroll (fade up + scale)
document.addEventListener('DOMContentLoaded', function () {
  // Select all service cards (direct children of the grid)
  const cards = document.querySelectorAll('.grid.gap-8 > div.border');
  if (!cards.length) return;

  // Initial state: hidden and slightly downscaled
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.97)';
    card.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
  });

  // IntersectionObserver to trigger animation
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));


  const learnMoreBtn = document.getElementById("learn-more");
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Find the first section after the hero section
      const sections = document.querySelectorAll('section');
      if (sections.length > 1) {
        sections[1].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});
