// src/lib/scripts/animate-on-scroll.js

/**
 * Initializes an IntersectionObserver to animate elements when they enter the viewport.
 * Elements with class .animate-fade-* will receive the 'is-visible' class.
 */
export const animateOnScroll = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
      //   ".animate-fade-up, .animate-fade-right, .animate-fade-left, .animate-fade-down",
      '.animate-fade-up, .animate-fade-right, .animate-fade-left, .animate-fade-down',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );

    if (animatedElements.length === 0) {
      return;
    }
    for (const element of animatedElements) {
      observer.observe(element);
    }
  });
};
