AOS.init({
    duration: 800,
    once: true
});

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll from hero to activities
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            const activitiesSection = document.querySelector('.activities-main');
            if (activitiesSection) {
                window.scrollTo({
                    top: activitiesSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Animation for activity cards on scroll
    const activityCards = document.querySelectorAll('.activity-card');
    
    const animateCards = function() {
        activityCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 200);
            }
        });
    };
    
    // Set initial state
    activityCards.forEach(card => {
        card.style.transition = 'all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)';
    });
    
    // Check on load
    animateCards();
    
    // Check on scroll
    window.addEventListener('scroll', animateCards);
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