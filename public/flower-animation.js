// Flower-like animation for services section
document.addEventListener('DOMContentLoaded', () => {
  // Make sure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Get all service cards
  const serviceCards = document.querySelectorAll('.categories_showcase_card');
  const serviceContent = document.querySelector('.categories_showcase_content');
  
  if (!serviceCards.length || !serviceContent) {
    console.error('Service cards or content not found');
    return;
  }

  // Reset initial state
  gsap.set(serviceCards, {
    scale: 0,
    opacity: 0,
    transformOrigin: 'center center'
  });

  gsap.set(serviceContent, {
    opacity: 0,
    y: 30
  });

  // Create the flower animation timeline
  const flowerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#services',
      start: 'top 70%',
      end: 'bottom 70%',
      toggleActions: 'play none none reverse',
      // markers: true, // For debugging
    }
  });

  // First card appears in center
  flowerTimeline.to(serviceCards[0], {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  });

  // Other cards appear in sequence around the first one
  flowerTimeline.to(serviceCards.slice(1), {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    stagger: {
      each: 0.1,
      from: 'start',
      grid: 'auto',
      ease: 'power2.inOut'
    },
    ease: 'back.out(1.4)'
  }, '-=0.4');

  // Show category labels with a slight delay
  flowerTimeline.to('.category_label', {
    opacity: 1,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power1.inOut'
  }, '-=0.2');

  // Finally show the content
  flowerTimeline.to(serviceContent, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.3');

  // Add hover effects to cards
  serviceCards.forEach(card => {
    gsap.set(card, { transformOrigin: 'center center' });
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.in'
      });
    });
  });
});