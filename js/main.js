
// Main JavaScript for Fashion Point Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.querySelector('i').classList.toggle('fa-bars');
                    mobileToggle.querySelector('i').classList.toggle('fa-times');
                }
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other FAQ items (optional)
            // faqQuestions.forEach(otherQuestion => {
            //     if (otherQuestion !== this) {
            //         otherQuestion.parentElement.classList.remove('active');
            //     }
            // });
        });
    });
    
    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    
                    // Reset border color on input
                    field.addEventListener('input', function() {
                        this.style.borderColor = '#ddd';
                    });
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    });
    
    // Product Modal
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    const modalOverlay = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (quickViewButtons.length > 0 && modalOverlay) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get product details from the card
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                const productImage = productCard.querySelector('img').src;
                
                // Create modal content
                const modalBody = modalOverlay.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="modal-product">
                        <div class="modal-product-image">
                            <img src="${productImage}" alt="${productName}">
                        </div>
                        <div class="modal-product-info">
                            <h2>${productName}</h2>
                            <p class="product-category">${productCategory}</p>
                            <div class="product-price">${productPrice}</div>
                            <p class="product-description">Premium quality men's ${productCategory.toLowerCase()} made from high-quality materials for comfort and durability. Perfect for casual wear and everyday use.</p>
                            <div class="product-sizes">
                                <h4>Available Sizes</h4>
                                <div class="size-options">
                                    <button class="size-btn">S</button>
                                    <button class="size-btn active">M</button>
                                    <button class="size-btn">L</button>
                                    <button class="size-btn">XL</button>
                                    <button class="size-btn">XXL</button>
                                </div>
                            </div>
                            <div class="modal-actions">
                                <a href="contact.html" class="btn btn-primary">Inquire Now</a>
                                <a href="wholesale.html" class="btn btn-outline">Wholesale Inquiry</a>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add styles for modal product
                const style = document.createElement('style');
                style.textContent = `
                    .modal-product {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 40px;
                    }
                    
                    .modal-product-image img {
                        width: 100%;
                        border-radius: 8px;
                    }
                    
                    .modal-product-info h2 {
                        font-size: 1.8rem;
                        margin-bottom: 10px;
                    }
                    
                    .product-description {
                        margin: 20px 0;
                        color: #666;
                        line-height: 1.7;
                    }
                    
                    .product-sizes {
                        margin: 25px 0;
                    }
                    
                    .product-sizes h4 {
                        margin-bottom: 15px;
                    }
                    
                    .size-options {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                    }
                    
                    .size-btn {
                        width: 50px;
                        height: 50px;
                        border: 2px solid #ddd;
                        background-color: transparent;
                        border-radius: 4px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .size-btn:hover,
                    .size-btn.active {
                        border-color: var(--gold);
                        background-color: var(--gold);
                        color: var(--primary-black);
                    }
                    
                    .modal-actions {
                        display: flex;
                        gap: 15px;
                        margin-top: 30px;
                    }
                    
                    @media (max-width: 768px) {
                        .modal-actions {
                            flex-direction: column;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                // Open modal
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Size selection
                setTimeout(() => {
                    const sizeButtons = modalBody.querySelectorAll('.size-btn');
                    sizeButtons.forEach(btn => {
                        btn.addEventListener('click', function() {
                            sizeButtons.forEach(b => b.classList.remove('active'));
                            this.classList.add('active');
                        });
                    });
                }, 100);
            });
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
        
        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .business-card, .trust-item, .benefit-card, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-list a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});