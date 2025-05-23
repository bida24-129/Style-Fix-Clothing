document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Testimonial functionality
    const testimonialsPerPage = 4;
    let currentPage = 1;
    const allTestimonials = Array.from(document.querySelectorAll('.testimonial'));
    const totalPages = Math.ceil(allTestimonials.length / testimonialsPerPage);
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');
    const pageIndicator = document.querySelector('.page-indicator');

    function showTestimonials(page) {
        // Hide all testimonials first
        allTestimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });

        // Calculate which testimonials to show
        const startIndex = (page - 1) * testimonialsPerPage;
        const endIndex = startIndex + testimonialsPerPage;
        const testimonialsToShow = allTestimonials.slice(startIndex, endIndex);

        // Show the selected testimonials
        testimonialsToShow.forEach(testimonial => {
            testimonial.style.display = 'block';
        });

        // Update button visibility
        backBtn.style.display = page === 1 ? 'none' : 'inline-block';
        nextBtn.style.display = page === totalPages ? 'none' : 'inline-block';
        
        // Update page indicator
        if (pageIndicator) {
            pageIndicator.textContent = `Page ${page} of ${totalPages}`;
        }
    }

    function changePage(direction) {
        currentPage += direction;
        showTestimonials(currentPage);
    }

    // Initialize
    showTestimonials(currentPage);

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changePage(1));
    }
    if (backBtn) {
        backBtn.addEventListener('click', () => changePage(-1));
    }
});