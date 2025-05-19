// Simple testimonial carousel script
document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let isAnimating = false;
    
    // Set animation speed
    const animationSpeed = 5000;
    const transitionSpeed = 500;
    let autoPlayInterval = null;
    
    function showTestimonial(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hide current testimonial
        testimonials[currentIndex].classList.remove('active');
        
        // Show new testimonial
        currentIndex = index;
        testimonials[currentIndex].classList.add('active');
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, transitionSpeed);
    }
    
    function showNext() {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    function showPrevious() {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }
    
    // Add event listeners to buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (!isAnimating) {
                showPrevious();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (!isAnimating) {
                showNext();
            }
        });
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (!isAnimating) {
                showNext();
            }
        }, animationSpeed);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Pause auto-play on hover
    const container = document.querySelector('.testimonial-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Start auto-play
    startAutoPlay();
});
