// Gallery Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Filter gallery items
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });



    // Animation for gallery items
    const animateGalleryItems = function () {
        galleryItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });

    // Check on load
    animateGalleryItems();

    // Check on scroll
    window.addEventListener('scroll', animateGalleryItems);
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