// This would typically fetch from an API or database
const testimonials = [
    {
        content: "This product has completely transformed how I work. The ease of use and powerful features make it a must-have tool.",
        author: "Sarah Johnson",
        role: "Product Manager"
    },
    {
        content: "I've tried many similar tools, but this one stands out for its reliability and customer support. Highly recommended!",
        author: "Michael Chen",
        role: "Software Engineer"
    },
    {
        content: "The best decision we made was implementing this solution. It's streamlined our entire workflow.",
        author: "Emily Rodriguez",
        role: "Team Lead"
    }
];

function displayTestimonials() {
    const container = document.getElementById('testimonials-container');
    
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial-item';
        testimonialElement.innerHTML = `
            <div class="testimonial-content">${testimonial.content}</div>
            <div class="testimonial-author">${testimonial.author} - ${testimonial.role}</div>
            <div class="testimonial-actions">
                <button onclick="editTestimonial(${index})">Edit</button>
                <button onclick="deleteTestimonial(${index})">Delete</button>
            </div>
        `;
        container.appendChild(testimonialElement);
    });
}

function editTestimonial(index) {
    // In a real implementation, this would open an edit form
    console.log('Edit testimonial:', index);
}

function deleteTestimonial(index) {
    // In a real implementation, this would delete the testimonial
    console.log('Delete testimonial:', index);
}

// Initialize the admin interface
document.addEventListener('DOMContentLoaded', () => {
    displayTestimonials();
}); 