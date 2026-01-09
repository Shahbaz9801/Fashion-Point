// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();
            
            // Validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
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
                document.getElementById('contactEmail').style.borderColor = '#e74c3c';
                alert('Please enter a valid email address.');
            }
            
            if (!isValid) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, simulate submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.style.cssText = `
                    background-color: #2ecc71;
                    color: white;
                    padding: 15px;
                    border-radius: 4px;
                    margin-top: 20px;
                    text-align: center;
                    animation: fadeIn 0.5s ease;
                `;
                successMessage.innerHTML = `
                    <h4 style="margin-bottom: 10px;">Message Sent Successfully!</h4>
                    <p>Thank you, ${name}. We have received your message and will get back to you within 24 hours.</p>
                `;
                
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remove success message after 8 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        if (successMessage.parentNode) {
                            successMessage.parentNode.removeChild(successMessage);
                        }
                    }, 500);
                }, 8000);
            }, 1500);
        });
    }
    
    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon i');
            if (icon) {
                // Add subtle animation to the icon
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Map interaction (simulated)
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            // In a real implementation, this might open a larger map or a modal
            // For now, just add a visual effect
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Show a message
            const mapOverlay = this.querySelector('.map-overlay');
            const originalHTML = mapOverlay.innerHTML;
            
            mapOverlay.innerHTML = `
                <h3>Getting Directions...</h3>
                <p>Opening in Google Maps...</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">(Simulated interaction - would open maps in real implementation)</p>
            `;
            
            setTimeout(() => {
                mapOverlay.innerHTML = originalHTML;
            }, 2000);
        });
    }
    
    // FAQ functionality for contact page
    const contactFaqQuestions = document.querySelectorAll('.faq-question');
    contactFaqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Direct contact link enhancements
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For WhatsApp links, we want them to open in a new tab
            if (this.href.includes('whatsapp')) {
                // Already set to open in new tab via target="_blank"
                return;
            }
            
            // For phone links, we might want to track the click (analytics)
            if (this.href.startsWith('tel:')) {
                // In a real implementation, you might send an analytics event here
                console.log('Phone link clicked:', this.href);
                
                // Add a subtle visual feedback
                this.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                this.style.paddingLeft = '15px';
                this.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    this.style.backgroundColor = '';
                    this.style.paddingLeft = '';
                }, 1000);
            }
        });
    });
});