// Event 1: onclick - Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.onclick = function() {
    navMenu.classList.toggle('active');
};

// Event 2: onmouseover - Stylist Card Hover Effect
const stylistCards = document.querySelectorAll('.stylist-card');
stylistCards.forEach(card => {
    card.onmouseover = function() {
        this.style.borderLeft = '5px solid #667eea';
    };
    card.onmouseout = function() {
        this.style.borderLeft = 'none';
    };
});

// Dynamic Range Slider Update
const experienceSlider = document.getElementById('experience');
const expValue = document.getElementById('exp-value');

experienceSlider.oninput = function() {
    expValue.textContent = this.value + ' years';
};

// Form Validation & Dynamic Content - Search Form
const searchForm = document.querySelector('.search-form');
const searchResults = document.getElementById('searchResults');
const stylistGrid = document.getElementById('stylistGrid');
const allCards = document.querySelectorAll('.stylist-card');

searchForm.onsubmit = function(e) {
    e.preventDefault();
    
    const location = document.getElementById('location').value.trim();
    const service = document.getElementById('service').value;
    const priceRange = document.getElementById('price-range').value;
    const experience = parseInt(document.getElementById('experience').value);
    
    // Validation
    if (location.length < 3) {
        alert('Please enter a valid location (minimum 3 characters)');
        return false;
    }
    
    // Filter stylists based on criteria
    let matchCount = 0;
    allCards.forEach(card => {
        const cardService = card.getAttribute('data-service');
        const cardPrice = card.getAttribute('data-price');
        const cardExp = parseInt(card.getAttribute('data-exp'));
        
        let matches = true;
        
        // Filter by service
        if (service !== 'all' && cardService !== service) {
            matches = false;
        }
        
        // Filter by price range
        if (priceRange !== cardPrice) {
            matches = false;
        }
        
        // Filter by experience
        if (cardExp < experience) {
            matches = false;
        }
        
        // Show/hide cards
        if (matches) {
            card.style.display = 'block';
            matchCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Dynamic content update without page reload
    const serviceText = service === 'all' ? 'All Services' : service.charAt(0).toUpperCase() + service.slice(1);
    searchResults.innerHTML = `
        <div class="results-message">
            <h3>Search Results</h3>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Service:</strong> ${serviceText}</p>
            <p><strong>Price Range:</strong> ${priceRange}</p>
            <p><strong>Minimum Experience:</strong> ${experience} years</p>
            <p class="${matchCount > 0 ? 'success-msg' : 'error-msg'}">
                ${matchCount > 0 ? `✓ Found ${matchCount} stylist(s) matching your criteria!` : '✗ No stylists found. Try adjusting your filters.'}
            </p>
        </div>
    `;
    
    searchResults.style.display = 'block';
    setTimeout(() => {
        document.getElementById('stylists').scrollIntoView({ behavior: 'smooth' });
    }, 500);
};

// Modal Popup for Booking
const modal = document.getElementById('bookingModal');
const bookBtns = document.querySelectorAll('.book-btn');
const closeModal = document.querySelector('.close-modal');
const modalStylistName = document.getElementById('modalStylistName');

bookBtns.forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault();
        const stylistName = this.getAttribute('data-stylist');
        const price = this.getAttribute('data-price');
        modalStylistName.textContent = `Booking with ${stylistName} (${price})`;
        modal.style.display = 'block';
    };
});

closeModal.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Form Validation - Booking Form
const bookingForm = document.getElementById('bookingForm');
const bookingStatus = document.getElementById('bookingStatus');

bookingForm.onsubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('bookName').value.trim();
    const email = document.getElementById('bookEmail').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    
    // Validation
    if (name.length < 2) {
        bookingStatus.innerHTML = '<p class="error-msg">Name must be at least 2 characters</p>';
        return false;
    }
    
    if (!email.includes('@')) {
        bookingStatus.innerHTML = '<p class="error-msg">Please enter a valid email</p>';
        return false;
    }
    
    if (phone.length !== 10 || isNaN(phone)) {
        bookingStatus.innerHTML = '<p class="error-msg">Phone must be 10 digits</p>';
        return false;
    }
    
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        bookingStatus.innerHTML = '<p class="error-msg">Please select a future date</p>';
        return false;
    }
    
    // Success message
    bookingStatus.innerHTML = `
        <p class="success-msg">✓ Booking confirmed for ${name} on ${date} at ${time}!</p>
        <p>Confirmation email sent to ${email}</p>
    `;
    
    setTimeout(() => {
        modal.style.display = 'none';
        bookingForm.reset();
        bookingStatus.innerHTML = '';
    }, 3000);
};

// Form Validation - Contact Form
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

contactForm.onsubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Validation
    if (name.length < 2) {
        contactStatus.innerHTML = '<p class="error-msg">Name must be at least 2 characters</p>';
        return false;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        contactStatus.innerHTML = '<p class="error-msg">Please enter a valid email address</p>';
        return false;
    }
    
    if (message.length < 10) {
        contactStatus.innerHTML = '<p class="error-msg">Message must be at least 10 characters</p>';
        return false;
    }
    
    // Success - Dynamic content update
    contactStatus.innerHTML = `
        <p class="success-msg">✓ Thank you ${name}! Your message has been sent successfully.</p>
        <p>We'll respond to ${email} within 24 hours.</p>
    `;
    
    contactForm.reset();
    
    setTimeout(() => {
        contactStatus.innerHTML = '';
    }, 5000);
};
