document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper with the coverflow effect
  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 2, // 👈 Show the 3rd slide (middle one)
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 350,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination"
    }
  });

  // Handling hover effect for car cards
  const carCards = document.querySelectorAll('.car-card');
  carCards.forEach(card => {
    let step = 1;
    let interval;

    card.addEventListener('mouseenter', () => {
      card.classList.add('hovering');
      step = 1;
      interval = setInterval(() => {
        step++;
        if (step > 3) step = 1; // Cycle back to 1
        card.classList.remove('step-1', 'step-2', 'step-3');
        card.classList.add(`step-${step}`);
      }, 500); // Change image every 500ms
    });

    card.addEventListener('mouseleave', () => {
      clearInterval(interval);
      card.classList.remove('hovering', 'step-1', 'step-2', 'step-3');
    });
  });
});
