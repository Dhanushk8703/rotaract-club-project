document.addEventListener('DOMContentLoaded', function () {
  // Home button function
  window.goHome = function () {
    window.location.href = 'index.html';
  };

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.mission, .vision, .about-content, .about-image, .join-us-container');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        const animation = element.classList.contains('mission') ? 'fadeInUp' :
          element.classList.contains('vision') ? 'fadeInUp' :
            element.classList.contains('about-content') ? 'fadeInLeft' :
              element.classList.contains('about-image') ? 'fadeInRight' :
                'fadeInUp';

        element.classList.add('animate__animated', `animate__${ animation }`);
      }
    });
  };

  // Initial check on load
  animateOnScroll();

  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Join Us button animation
  const joinBtn = document.querySelector('.join-btn');
  if (joinBtn) {
    joinBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // Add animation
      this.classList.add('animate_animated', 'animate_pulse');

      // Remove animation after it completes
      setTimeout(() => {
        this.classList.remove('animate_animated', 'animate_pulse');
      }, 1000);

      // Show confirmation (in a real app, this would submit a form)
      setTimeout(() => {
        alert('Thank you for your interest in joining Rotaract! We will contact you soon with more information.');
      }, 1500);
    });
  }

  // Image gallery hover effects
  const thumbItems = document.querySelectorAll('.thumb-item');
  thumbItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.querySelector('img').style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', function () {
      this.querySelector('img').style.transform = 'scale(1)';
    });
  });

  // Add delay to mission and vision animations
  const mission = document.querySelector('.mission');
  const vision = document.querySelector('.vision');

  if (mission && vision) {
    setTimeout(() => {
      mission.classList.add('animate_animated', 'animate_fadeInUp');
    }, 200);

    setTimeout(() => {
      vision.classList.add('animate_animated', 'animate_fadeInUp');
    }, 400);
  }
});

const reveals = document.querySelectorAll('.reveal');
const scrollTrigger = () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
};
window.addEventListener('scroll', scrollTrigger);
window.addEventListener('load', scrollTrigger);