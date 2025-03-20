document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNavigation = document.querySelector('.primary-navigation');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpened = primaryNavigation.classList.contains('active');
            primaryNavigation.classList.toggle('active');
            mobileNavToggle.setAttribute('aria-expanded', !isOpened);
        });
    }

    // Project Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Show the current slide
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            currentSlide = index;
        }

        // Next slide button
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Previous slide button
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Indicator buttons
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Modal Functionality
    const modal = document.getElementById('modal');
    const learnMoreBtn = document.getElementById('learn-more');
    const closeButtons = document.querySelectorAll('.close-button');

    if (learnMoreBtn && modal) {
        learnMoreBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Accordion Functionality for FAQ
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class on the clicked button
            button.classList.toggle('active');
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('success-modal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate Name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Email
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) {
                document.getElementById('email-error').textContent = 'Valid email is required';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Subject
            const subject = document.getElementById('subject');
            if (!subject.value.trim()) {
                document.getElementById('subject-error').textContent = 'Subject is required';
                document.getElementById('subject-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Message
            const message = document.getElementById('message');
            if (!message.value.trim() || message.value.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the form data to a server here
                
                // Reset form
                contactForm.reset();
                
                // Show success modal
                if (successModal) {
                    successModal.classList.add('active');
                }
            }
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});