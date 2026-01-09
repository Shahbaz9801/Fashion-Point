// Wholesale Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Wholesale form validation
    const wholesaleForm = document.getElementById('wholesaleForm');
    
    if (wholesaleForm) {
        wholesaleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const business = document.getElementById('business').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const quantity = document.getElementById('quantity').value;
            
            // Validation
            let isValid = true;
            const requiredFields = wholesaleForm.querySelectorAll('[required]');
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    
                    field.addEventListener('input', function() {
                        this.style.borderColor = '#ddd';
                    });
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                isValid = false;
                document.getElementById('email').style.borderColor = '#e74c3c';
                alert('Please enter a valid email address.');
            }
            
            if (!isValid) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, simulate submission
            const submitBtn = wholesaleForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you, ${name}! Your wholesale inquiry has been submitted. Our team will contact you within 24 hours.`);
                
                wholesaleForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top of form
                wholesaleForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1500);
        });
    }
    
    // Animate pricing cards on scroll
    const animatePricingCards = function() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                // Stagger the animation
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 200);
            }
        });
    };
    
    // Initial check
    animatePricingCards();
    
    // Check on scroll
    window.addEventListener('scroll', animatePricingCards);
    
    // FAQ functionality for wholesale page
    const wholesaleFaqQuestions = document.querySelectorAll('.faq-question');
    wholesaleFaqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Add click event to wholesale inquiry buttons in pricing cards
    const pricingInquiryButtons = document.querySelectorAll('.pricing-card .btn');
    pricingInquiryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If button is not the main form button
            if (!this.classList.contains('btn-block')) {
                e.preventDefault();
                
                // Get pricing tier from the card
                const pricingCard = this.closest('.pricing-card');
                const pricingTitle = pricingCard.querySelector('.pricing-title').textContent;
                const pricingPrice = pricingCard.querySelector('.pricing-price').textContent;
                
                // Scroll to inquiry form
                const inquirySection = document.getElementById('inquiry');
                if (inquirySection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const sectionPosition = inquirySection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: sectionPosition,
                        behavior: 'smooth'
                    });
                    
                    // Auto-fill the quantity field based on the pricing tier
                    setTimeout(() => {
                        const quantityField = document.getElementById('quantity');
                        if (quantityField) {
                            let quantityValue = '';
                            
                            if (pricingTitle === 'Starter') {
                                quantityValue = '50-200';
                            } else if (pricingTitle === 'Professional') {
                                quantityValue = '201-500';
                            } else if (pricingTitle === 'Enterprise') {
                                quantityValue = '501-1000';
                            }
                            
                            if (quantityValue) {
                                quantityField.value = quantityValue;
                                
                                // Show a subtle notification
                                const notification = document.createElement('div');
                                notification.style.cssText = `
                                    background-color: #d4af37;
                                    color: #121212;
                                    padding: 10px 15px;
                                    border-radius: 4px;
                                    margin-top: 10px;
                                    font-weight: 600;
                                    animation: fadeIn 0.5s ease;
                                `;
                                notification.textContent = `"${pricingTitle}" tier (${pricingPrice}) pre-selected`;
                                
                                const formGroup = quantityField.closest('.form-group');
                                formGroup.appendChild(notification);
                                
                                // Remove notification after 5 seconds
                                setTimeout(() => {
                                    notification.style.opacity = '0';
                                    notification.style.transition = 'opacity 0.5s ease';
                                    setTimeout(() => {
                                        if (notification.parentNode) {
                                            notification.parentNode.removeChild(notification);
                                        }
                                    }, 500);
                                }, 5000);
                            }
                        }
                    }, 500);
                }
            }
        });
    });
});