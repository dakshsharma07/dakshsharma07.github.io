// Intersection Observer for fade animations
document.addEventListener('DOMContentLoaded', () => {
    // Observer configuration
    // threshold: 0.1 means the animation triggers when 10% of the element is visible
    // rootMargin: '0px' means no additional margin around the viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    // Create the Intersection Observer
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        // Handle each observed element
        entries.forEach(entry => {
            const el = entry.target;

            // When element becomes visible
            if (entry.isIntersecting) {
                el.classList.add('fade-in');
                el.classList.remove('fade-out');
            } 
            // When element leaves view
            else {
                // Only apply fade-out if element has already been in view
                // This prevents elements from being hidden before they've been shown
                if (el.classList.contains('fade-in')) {
                    el.classList.add('fade-out');
                    el.classList.remove('fade-in');
                }
            }
        });
    }, observerOptions);

    // Handle regular sections (Challenge, Solution, Why Civisight)
    // These sections fade in/out as a whole
    const regularSections = [
        document.querySelector('.challenge-section'),
        document.querySelector('.solution-section'),
        document.querySelector('.why-civisight')
    ];

    // Handle How It Works steps
    // This section has special handling for individual steps
    const stepsContainer = document.querySelector('.steps-container');
    if (stepsContainer) {
        // Add fade-scroll to the container
        stepsContainer.classList.add('fade-scroll');
        fadeObserver.observe(stepsContainer);

        // Get all step items and add fade-scroll with delay
        const stepItems = stepsContainer.querySelectorAll('.step-item');
        stepItems.forEach((step, index) => {
            // Add fade-scroll class
            step.classList.add('fade-scroll');
            // Add delay based on step index (0.1s per step)
            // This creates a sequential fade-in effect
            step.style.transitionDelay = `${index * 0.1}s`;
            // Start observing this step
            fadeObserver.observe(step);
        });
    }

    // Observe regular sections
    regularSections.forEach((el) => {
        if (el) {
            el.classList.add('fade-scroll');
            fadeObserver.observe(el);
        }
    });

    // Force initial observer check after page load
    // This ensures elements are visible on initial page load
    window.requestAnimationFrame(() => {
        // Handle steps container and individual steps
        if (stepsContainer) {
            const rect = stepsContainer.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Fade in the container
                stepsContainer.classList.add('fade-in');
                stepsContainer.classList.remove('fade-out');

                // Fade in each step with delay
                const stepItems = stepsContainer.querySelectorAll('.step-item');
                stepItems.forEach((step, index) => {
                    step.classList.add('fade-in');
                    step.classList.remove('fade-out');
                });
            }
        }

        // Handle regular sections
        regularSections.forEach((el) => {
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('fade-in');
                    el.classList.remove('fade-out');
                }
            }
        });
    });
});
