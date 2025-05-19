// Load testimonials from CSV
async function loadTestimonials() {
    try {
        const response = await fetch('/resources/testimonials-in-become-a-writer-today.csv');
        const csvText = await response.text();
        const testimonials = parseCSV(csvText);
        return testimonials;
    } catch (error) {
        console.error('Error loading testimonials:', error);
        return [];
    }
}

function isValidTestimonial(message) {
    const cleanMessage = message.replace(/<[^>]*>/g, '').trim();
    return cleanMessage.length >= 50 && 
           /[.!?]$/.test(cleanMessage) && 
           /\s/.test(cleanMessage) && 
           !/^(hi|hello|hey|thanks|thank you)/i.test(cleanMessage);
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
        // Split by comma but preserve quoted values
        const values = [];
        let currentValue = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue); // Push the last value

        const testimonial = {};
        headers.forEach((header, index) => {
            testimonial[header] = values[index]?.replace(/^"|"$/g, '') || '';
        });
        return testimonial;
    }).filter(t => t.message && t.message.trim() !== '' && isValidTestimonial(t.message));
}

class TestimonialWidget {
    constructor(config = {}) {
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.animationSpeed = config.animationSpeed || 5000;
        this.transitionSpeed = config.transitionSpeed || 500;
        this.isAnimating = false;
        this.testimonials = [];
        this.config = {
            layout: config.layout || 'modern', // 'modern', 'minimal', 'classic'
            transition: config.transition || 'fade', // 'fade', 'slide', 'flip'
            autoplay: config.autoplay !== false,
            showControls: config.showControls !== false
        };

        this.init();
    }

    async init() {
        const container = document.querySelector('.testimonial-container');
        container.classList.add(this.config.layout);
        
        this.testimonials = await loadTestimonials();
        if (this.testimonials.length > 0) {
            this.createTestimonials();
            this.setupControls();
            if (this.config.autoplay) {
                this.startAutoPlay();
            }
        }
    }

    createTestimonials() {
        const wrapper = document.querySelector('.testimonials-wrapper');
        
        this.testimonials.forEach((testimonial, index) => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = `testimonial ${this.config.transition} ${index === 0 ? 'active' : ''}`;
            
            // Clean up the message (remove HTML tags if present)
            const cleanMessage = testimonial.message.replace(/<[^>]*>/g, '');
            
            // Format the date
            const date = new Date(testimonial.createdAt);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Handle avatar URL
            let avatarUrl = testimonial.submitterAvatar;
            if (!avatarUrl || avatarUrl.trim() === '') {
                const initials = this.getInitials(testimonial.submitterName);
                avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=fff&size=150`;
            }
            
            testimonialElement.innerHTML = `
                <div class="testimonial-content">${cleanMessage}</div>
                <div class="testimonial-author">
                    <img src="${avatarUrl}" 
                         alt="${testimonial.submitterName}" 
                         class="author-image" 
                         onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(this.getInitials(testimonial.submitterName))}&background=random&color=fff&size=150'">
                    <div class="author-info">
                        <h3 class="author-name">${testimonial.submitterName}</h3>
                        <p class="author-role">${formattedDate}</p>
                    </div>
                </div>
            `;
            wrapper.appendChild(testimonialElement);
        });
    }

    getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    setupControls() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const container = document.querySelector('.testimonial-container');

        prevBtn.addEventListener('click', () => {
            if (!this.isAnimating) {
                this.showPrevious();
            }
        });
        nextBtn.addEventListener('click', () => {
            if (!this.isAnimating) {
                this.showNext();
            }
        });

        // Pause auto-play on hover
        container.addEventListener('mouseenter', () => this.stopAutoPlay());
        container.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        if (!this.isAnimating) {
            const swipeThreshold = 50;
            if (startX - endX > swipeThreshold) {
                this.showNext();
            } else if (endX - startX > swipeThreshold) {
                this.showPrevious();
            }
        }
    }

    showTestimonial(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const testimonials = document.querySelectorAll('.testimonial');
        const currentTestimonial = testimonials[this.currentIndex];
        const nextTestimonial = testimonials[index];

        // Remove active class from current testimonial
        currentTestimonial.classList.remove('active');
        currentTestimonial.classList.add('fade-out');

        // Add active class to next testimonial
        nextTestimonial.classList.remove('fade-out');
        nextTestimonial.classList.add('active');

        // Add direction-based classes for slide transition
        if (this.config.transition === 'slide') {
            const direction = index > this.currentIndex ? 'slide-left' : 'slide-right';
            nextTestimonial.classList.add(direction);
        }

        this.currentIndex = index;

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
            if (this.config.transition === 'slide') {
                nextTestimonial.classList.remove('slide-left', 'slide-right');
            }
        }, this.transitionSpeed);
    }

    showNext() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }

    showPrevious() {
        const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (!this.isAnimating) {
                this.showNext();
            }
        }, this.animationSpeed);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize the widget with configuration
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialWidget({
        layout: 'modern', // or 'minimal' or 'classic'
        transition: 'fade', // or 'slide' or 'flip'
        animationSpeed: 5000,
        autoplay: true,
        showControls: true
    });
}); 