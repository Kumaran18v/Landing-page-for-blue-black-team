// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Function to format numbers in Indian system
function formatIndianNumber(num) {
    const numStr = num.toString();
    let formattedNum = '';
    let count = 0;
    
    // Handle decimals
    const parts = numStr.split('.');
    const integerPart = parts[0];
    
    // Process from right to left
    for (let i = integerPart.length - 1; i >= 0; i--) {
        if (count === 0) {
            formattedNum = integerPart[i] + formattedNum;
            count++;
        } else if (count === 3) {
            formattedNum = ',' + integerPart[i] + formattedNum;
            count++;
        } else if (count === 5 || count === 7 || count === 9) {
            formattedNum = ',' + integerPart[i] + formattedNum;
            count++;
        } else {
            formattedNum = integerPart[i] + formattedNum;
            count++;
        }
    }
    
    // Add decimal part if exists
    if (parts.length > 1) {
        formattedNum += '.' + parts[1];
    }
    
    return formattedNum;
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Scroll-based Navigation Highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Format numbers on page load
document.addEventListener('DOMContentLoaded', () => {
    // Format phone number
    const phoneElement = document.querySelector('.contact-info p:nth-child(2)');
    if (phoneElement) {
        const phoneNumber = phoneElement.textContent.match(/\d+/g).join('');
        phoneElement.textContent = `Phone: +91 ${formatIndianNumber(phoneNumber)}`;
    }

    // Add some example numbers in the about section
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    statsContainer.innerHTML = `
        <div class="stat-item">
            <h3>${formatIndianNumber(10000)}+</h3>
            <p>Projects Completed</p>
        </div>
        <div class="stat-item">
            <h3>${formatIndianNumber(500000)}+</h3>
            <p>Happy Clients</p>
        </div>
        <div class="stat-item">
            <h3>${formatIndianNumber(1000000)}+</h3>
            <p>Lines of Code</p>
        </div>
    `;

    const aboutContent = document.querySelector('.about-content');
    aboutContent.insertBefore(statsContainer, aboutContent.querySelector('.values'));
});