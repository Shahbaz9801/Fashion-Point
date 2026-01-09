// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        // T-Shirts
        { id: 1, name: "Premium Cotton T-Shirt", category: "t-shirts", price: "$24.99", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 2, name: "V-Neck Casual T-Shirt", category: "t-shirts", price: "$22.99", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 3, name: "Classic White T-Shirt", category: "t-shirts", price: "$19.99", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 4, name: "Striped Casual T-Shirt", category: "t-shirts", price: "$26.99", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        
        // Casual Shirts
        { id: 5, name: "Classic Casual Shirt", category: "shirts", price: "$39.99", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 6, name: "Checkered Flannel Shirt", category: "shirts", price: "$44.99", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 7, name: "Denim Shirt", category: "shirts", price: "$42.99", image: "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 8, name: "Linen Casual Shirt", category: "shirts", price: "$49.99", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        
        // Jeans
        { id: 9, name: "Slim Fit Jeans", category: "jeans", price: "$49.99", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 10, name: "Classic Blue Jeans", category: "jeans", price: "$45.99", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 11, name: "Black Denim Jeans", category: "jeans", price: "$52.99", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 12, name: "Relaxed Fit Jeans", category: "jeans", price: "$47.99", image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        
        // Trousers
        { id: 13, name: "Casual Trousers", category: "trousers", price: "$34.99", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 14, name: "Chino Pants", category: "trousers", price: "$39.99", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 15, name: "Formal Trousers", category: "trousers", price: "$54.99", image: "https://images.unsplash.com/photo-1594938350609-7b6e8a7a1c2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 16, name: "Cargo Pants", category: "trousers", price: "$44.99", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        
        // Joggers
        { id: 17, name: "Cotton Joggers", category: "joggers", price: "$29.99", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 18, name: "Fleece Joggers", category: "joggers", price: "$34.99", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 19, name: "Sport Joggers", category: "joggers", price: "$39.99", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { id: 20, name: "Designer Joggers", category: "joggers", price: "$49.99", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ];
    
    // DOM Elements
    const productsGrid = document.querySelector('.products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreButton = document.getElementById('loadMore');
    
    // Initial state
    let currentFilter = 'all';
    let displayedProducts = 8;
    
    // Render products
    function renderProducts(filter = 'all', count = displayedProducts) {
        // Clear current products
        productsGrid.innerHTML = '';
        
        // Filter products
        let filteredProducts = products;
        if (filter !== 'all') {
            filteredProducts = products.filter(product => product.category === filter);
        }
        
        // Limit number of products to display
        const productsToShow = filteredProducts.slice(0, count);
        
        // Create product cards
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.category = product.category;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-overlay">
                        <button class="btn-quick-view">Quick View</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${formatCategory(product.category)}</p>
                    <div class="product-price">${product.price}</div>
                    <a href="contact.html" class="btn-inquiry">Inquiry</a>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Update load more button visibility
        if (loadMoreButton) {
            if (filteredProducts.length <= count) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'inline-block';
            }
        }
        
        // Reattach quick view event listeners
        setTimeout(() => {
            const quickViewButtons = document.querySelectorAll('.btn-quick-view');
            quickViewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Get product details from the card
                    const productCard = this.closest('.product-card');
                    const productName = productCard.querySelector('.product-name').textContent;
                    const productCategory = productCard.querySelector('.product-category').textContent;
                    const productPrice = productCard.querySelector('.product-price').textContent;
                    const productImage = productCard.querySelector('img').src;
                    
                    // Open modal (assuming main.js is loaded)
                    const event = new CustomEvent('openProductModal', {
                        detail: { productName, productCategory, productPrice, productImage }
                    });
                    window.dispatchEvent(event);
                });
            });
        }, 100);
    }
    
    // Format category for display
    function formatCategory(category) {
        const categories = {
            't-shirts': 'T-Shirts',
            'shirts': 'Casual Shirts',
            'jeans': 'Jeans',
            'trousers': 'Trousers',
            'joggers': 'Joggers'
        };
        return categories[category] || category;
    }
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter
            currentFilter = this.dataset.filter;
            displayedProducts = 8;
            
            // Render filtered products
            renderProducts(currentFilter, displayedProducts);
            
            // Scroll to products section
            const productsSection = document.querySelector('.all-products');
            if (productsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const sectionPosition = productsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: sectionPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Load more products
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            displayedProducts += 4;
            renderProducts(currentFilter, displayedProducts);
        });
    }
    
    // Category card click event
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button inside
            if (!e.target.closest('.btn')) {
                const category = this.dataset.category;
                
                // Find and click the corresponding filter button
                filterButtons.forEach(button => {
                    if (button.dataset.filter === category) {
                        button.click();
                    }
                });
            }
        });
    });
    
    // Initialize with all products
    renderProducts();
    
    // Listen for custom event from main.js
    window.addEventListener('openProductModal', function(e) {
        // This event would be handled by main.js
        // We're just triggering the quick view button click
        const quickViewButton = document.querySelector('.btn-quick-view');
        if (quickViewButton) {
            quickViewButton.click();
        }
    });
});