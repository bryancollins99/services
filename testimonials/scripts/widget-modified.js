// Hardcoded testimonials from the CSV file
async function loadTestimonials() {
    // Return hardcoded testimonials instead of loading from CSV
    return [
        {
            type: "text",
            createdAt: "Apr 22, 2025",
            submitterName: "Eric Hahn",
            submitterEmail: "",
            submitterAvatar: "",
            message: "Thank you, sir. The presentation was fantastic, and I am extremely grateful for your expertise, and your time."
        },
        {
            type: "text",
            createdAt: "Apr 10, 2025",
            submitterName: "Kimberly Guerre",
            submitterEmail: "",
            submitterAvatar: "",
            message: "I really appreciate all your offerings in addition to the 1:1. You are a fantastic teacher and just really deliver so much value without the annoying bits so many video presenters have. I recommend you like crazy to my friends and colleagues. Thanks for being so helpful. I know I'm much further in using Claude as a valuable tool in my work thanks to your teaching."
        },
        {
            type: "text",
            createdAt: "Apr 2, 2025",
            submitterName: "Ezra Sitt",
            submitterEmail: "",
            submitterAvatar: "",
            message: "Hi Bryan, I am loving this newsletter. One thing that has been a real game-changer for me is your advice to always tell chatgpt that it is an expert on whatever you are asking it. I even do it when asking it to search for products."
        },
        {
            type: "text",
            createdAt: "Mar 20, 2025",
            submitterName: "Trevor Smith",
            submitterEmail: "",
            submitterAvatar: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F1cba4c65-d0b3-492a-a7e8-0c7185d43075%2Favatar?alt=media&token=5d69a0f6-09b1-4a06-88ac-ef5c5f1ba3f7",
            message: "Hi Bryan, This is great, it's helping me set up the prompts for writing content for my new site."
        },
        {
            type: "text",
            createdAt: "Mar 20, 2025",
            submitterName: "Benjamin Price",
            submitterEmail: "",
            submitterAvatar: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F1ea6659d-fa4e-4cb2-b4fc-243e1d03ea6a%2Favatar?alt=media&token=48ba732a-dc6a-4f68-bb7c-56f872c52527",
            message: "Loving Prompt Writing Studio. Thank you."
        },
        {
            type: "text",
            createdAt: "Sep 7, 2024",
            submitterName: "Steve Williams",
            submitterEmail: "stevesup@fastmail.com",
            submitterAvatar: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F43c1e38c-17af-4237-bac7-b5f9c92234a2%2Favatar?alt=media&token=ba53c5fd-0779-4c67-8edd-11c4c5f910d8",
            message: "Hello, I'm Steve, and I recently attended a workshop by Bryan Collins on writing and repurposing. I loved his training, along with all the provided materials. This will help me get up to speed with the current writing trends. As a bonus, Bryan shared his personal writing workflow and content strategy, which inspired me to leverage technology to my advantage. I highly recommend Bryan Collins' courses!"
        }
    ];
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
    // Simple initialization with default settings
    new TestimonialWidget({
        layout: 'modern',
        transition: 'fade',
        animationSpeed: 5000,
        autoplay: true,
        showControls: true
    });
});
