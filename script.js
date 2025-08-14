// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCustomCursor();
    initSmoothScrolling();
    initNavbar();
    initAnimations();
    initMessageGenerator();
    initCounters();
    initParallaxEffects();
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        const delay = 0.1;
        followerX += (mouseX - followerX) * delay;
        followerY += (mouseY - followerY) * delay;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor effects on hover
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .tech-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = '#feca57';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
    });
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

}

// Navbar Functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = 
                        (Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1) + 's';
                    entry.target.style.animation = 'slideUp 0.6s ease forwards';
                }
                
                if (entry.target.classList.contains('tech-item')) {
                    entry.target.style.animationDelay = 
                        (Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.05) + 's';
                    entry.target.style.animation = 'fadeIn 0.4s ease forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .tech-item, .about-text, .contact-info, .contact-form');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Message Generator Functionality
function initMessageGenerator() {
    const occasionSelect = document.getElementById('occasion');
    const customOccasionGroup = document.getElementById('customOccasionGroup');
    
    // Show/hide custom occasion input
    if (occasionSelect) {
        occasionSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customOccasionGroup.style.display = 'block';
            } else {
                customOccasionGroup.style.display = 'none';
            }
        });
    }
    
    // Initialize option button functionality
    initOptionButtons();
}

// Option Button Functionality
function initOptionButtons() {
    console.log('Initializing option buttons...');
    
    // Handle occasion options
    const occasionOptions = document.querySelectorAll('#occasionOptions .option-btn');
    const occasionSelect = document.getElementById('occasion');
    const customOccasionGroup = document.getElementById('customOccasionGroup');
    
    console.log('Found', occasionOptions.length, 'occasion options');
    
    occasionOptions.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Occasion option clicked:', this.dataset.value);
            // Remove selected class from all buttons in this group
            occasionOptions.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            this.classList.add('selected');
            // Update hidden select value
            if (occasionSelect) {
                occasionSelect.value = this.dataset.value;
                
                // Show/hide custom occasion input
                if (this.dataset.value === 'custom') {
                    customOccasionGroup.style.display = 'block';
                } else {
                    customOccasionGroup.style.display = 'none';
                }
            }
        });
    });
    
    // Handle relationship options
    const relationshipOptions = document.querySelectorAll('#relationshipOptions .option-btn');
    const relationshipSelect = document.getElementById('relationship');
    
    console.log('Found', relationshipOptions.length, 'relationship options');
    
    relationshipOptions.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Relationship option clicked:', this.dataset.value);
            // Remove selected class from all buttons in this group
            relationshipOptions.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            this.classList.add('selected');
            // Update hidden select value
            if (relationshipSelect) {
                relationshipSelect.value = this.dataset.value;
            }
        });
    });
    
    // Handle tone options
    const toneOptions = document.querySelectorAll('#toneOptions .option-btn');
    const toneSelect = document.getElementById('tone');
    
    console.log('Found', toneOptions.length, 'tone options');
    
    toneOptions.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Tone option clicked:', this.dataset.value);
            // Remove selected class from all buttons in this group
            toneOptions.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            this.classList.add('selected');
            // Update hidden select value
            if (toneSelect) {
                toneSelect.value = this.dataset.value;
            }
        });
    });
    
    // Initialize default tone selection
    const defaultToneBtn = document.querySelector('#toneOptions .option-btn[data-value="warm"]');
    if (defaultToneBtn && toneSelect) {
        toneSelect.value = 'warm';
    }
    
    console.log('Option buttons initialized successfully');
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #00d4aa, #00d4aa);' : 'background: linear-gradient(45deg, #ff6b6b, #ff4757);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Window Load Event
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Window Resize Event
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent elements
    console.log('Window resized');
}, 250));

// Navigation Helper Functions
function scrollToGenerator() {
    document.querySelector('#generator').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToExamples() {
    document.querySelector('#examples').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Message Generation Function
function generateMessage() {
    const occasion = document.getElementById('occasion').value;
    const customOccasion = document.getElementById('customOccasion').value;
    const recipientName = document.getElementById('recipientName').value;
    const relationship = document.getElementById('relationship').value;
    const tone = document.getElementById('tone').value;
    const additionalDetails = document.getElementById('additionalDetails').value;
    
    // Validation
    if (!occasion) {
        showNotification('Please select an occasion.', 'error');
        return;
    }
    
    if (occasion === 'custom' && !customOccasion.trim()) {
        showNotification('Please describe your custom occasion.', 'error');
        return;
    }
    
    if (!recipientName.trim()) {
        showNotification('Please enter the recipient\'s name.', 'error');
        return;
    }
    
    if (!relationship) {
        showNotification('Please select your relationship.', 'error');
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Simulate AI processing delay
    setTimeout(() => {
        const message = generatePersonalizedMessage({
            occasion: occasion === 'custom' ? customOccasion : occasion,
            recipientName,
            relationship,
            tone,
            additionalDetails
        });
        
        displayGeneratedMessage(message);
    }, 2000);
}

// Generate personalized message based on inputs
function generatePersonalizedMessage(data) {
    const templates = getMessageTemplates();
    const occasionKey = data.occasion === 'custom' ? 'custom' : data.occasion;
    
    let template = templates[occasionKey] || templates.custom;
    if (Array.isArray(template)) {
        template = template[Math.floor(Math.random() * template.length)];
    }
    
    // Customize message based on relationship and tone
    let message = template
        .replace('{name}', data.recipientName)
        .replace('{occasion}', data.occasion);
    
    // Adjust tone
    message = adjustMessageTone(message, data.tone, data.relationship);
    
    // Add additional details if provided
    if (data.additionalDetails.trim()) {
        message += ` ${data.additionalDetails.trim()}`;
    }
    
    return message;
}

// Message templates for different occasions
function getMessageTemplates() {
    return {
        birthday: [
            "Happy Birthday, {name}! 🎉 Wishing you a year filled with happiness, success, and all the things that bring you joy. May this special day be just the beginning of another wonderful year ahead!",
            "Happy Birthday, {name}! 🎂 Another year of amazing memories, growth, and adventures. Your presence brings so much light into the world. Hope your special day is as wonderful as you are!",
            "Wishing you the happiest of birthdays, {name}! 🎈 May this new year of life bring you endless opportunities, beautiful moments, and all the happiness your heart can hold."
        ],
        anniversary: [
            "Happy Anniversary, {name}! ❤️ Celebrating another year of love, laughter, and beautiful memories together. Here's to many more years of happiness and adventures ahead!",
            "Congratulations on your anniversary, {name}! 💕 Your love story continues to inspire everyone around you. Wishing you both continued happiness and love.",
            "Happy Anniversary, {name}! 🥂 Another year of partnership, growth, and shared dreams. May your bond continue to grow stronger with each passing year."
        ],
        wedding: [
            "Congratulations on your wedding day, {name}! 💒 Wishing you both a lifetime of love, happiness, and beautiful memories together. May your marriage be everything you've dreamed of and more!",
            "Best wishes on your special day, {name}! 👰 May your marriage be filled with endless love, joy, and wonderful adventures together.",
            "Congratulations, {name}! 💍 Wishing you both a beautiful wedding day and a marriage filled with love, laughter, and happiness."
        ],
        graduation: [
            "Congratulations on your graduation, {name}! 🎓 Your hard work, dedication, and perseverance have paid off beautifully. This is just the beginning of an exciting journey ahead!",
            "Way to go, {name}! 📚 Your graduation is a testament to your commitment and determination. The future holds so many amazing possibilities for you!",
            "Congratulations, {name}! 🎉 You've achieved something truly special. Your education will open doors to incredible opportunities ahead."
        ],
        promotion: [
            "Congratulations on your promotion, {name}! 🎉 Your hard work, dedication, and leadership qualities have truly paid off. Well deserved success!",
            "Amazing news about your promotion, {name}! 💼 Your professionalism and commitment have been recognized. Wishing you continued success!",
            "Congratulations, {name}! 🚀 Your promotion is well-deserved recognition of your talents and efforts. Excited to see what you achieve next!"
        ],
        newjob: [
            "Congratulations on your new job, {name}! 🎉 This exciting opportunity is perfect for someone with your skills and passion. Wishing you great success!",
            "Best wishes on your new position, {name}! 💼 Your new workplace is lucky to have someone so talented and dedicated. Go shine!",
            "Congratulations, {name}! 🌟 Your new job is the perfect next step in your career journey. Excited to hear about all your future achievements!"
        ],
        retirement: [
            "Happy Retirement, {name}! 🎉 After years of dedication and hard work, you've earned this time to relax and enjoy life. Wishing you a fulfilling retirement!",
            "Congratulations on your retirement, {name}! 🌅 May this new chapter bring you joy, relaxation, and time for all the things you love most.",
            "Best wishes for your retirement, {name}! ⛳ You've worked so hard - now it's time to enjoy the fruits of your labor. Happy retirement!"
        ],
        baby: [
            "Congratulations on your new baby, {name}! 👶 What a wonderful blessing! Wishing you and your little one health, happiness, and lots of precious moments together.",
            "Welcome to parenthood, {name}! 🍼 Your new bundle of joy is so lucky to have you. Wishing your growing family all the love and happiness in the world.",
            "Congratulations, {name}! 🎈 Your new arrival is absolutely precious. May this journey of parenthood bring you endless joy and beautiful memories."
        ],
        valentines: [
            "Happy Valentine's Day, {name}! 💝 You bring so much love and happiness into my life. Thank you for being such an incredible part of my world.",
            "To my amazing {name}, Happy Valentine's Day! ❤️ Every day with you feels like a celebration of love. You mean everything to me.",
            "Happy Valentine's Day, {name}! 🌹 You make every day brighter with your love and kindness. Feeling grateful for you today and always."
        ],
        mothers: [
            "Happy Mother's Day, {name}! 🌸 Thank you for all the love, wisdom, and care you've given. You're an amazing mother and an inspiration to us all.",
            "Wishing you a beautiful Mother's Day, {name}! 💐 Your love and dedication as a mother shine through in everything you do. You deserve all the appreciation today!",
            "Happy Mother's Day, {name}! 👑 You're not just a wonderful mother, but an incredible person who deserves to be celebrated today and every day."
        ],
        fathers: [
            "Happy Father's Day, {name}! 👨‍👧‍👦 Thank you for being such an amazing dad and role model. Your love and guidance mean the world to our family.",
            "Wishing you a fantastic Father's Day, {name}! 🎣 Your wisdom, strength, and caring nature make you an exceptional father. Enjoy your special day!",
            "Happy Father's Day, {name}! 🏆 You're an incredible dad who deserves recognition for all the love and support you provide. Hope your day is wonderful!"
        ],
        christmas: [
            "Merry Christmas, {name}! 🎄 Wishing you and your loved ones a holiday season filled with joy, love, and wonderful memories. Hope Santa brings you everything you wish for!",
            "Happy Holidays, {name}! ❄️ May this Christmas bring you peace, happiness, and quality time with those you cherish most. Merry Christmas!",
            "Merry Christmas, {name}! 🎅 Sending warm wishes for a magical holiday season filled with love, laughter, and all your favorite traditions."
        ],
        newyear: [
            "Happy New Year, {name}! 🎊 Wishing you 365 days of happiness, success, and new adventures. May this year bring you everything you're hoping for!",
            "Cheers to the New Year, {name}! 🥳 Here's to fresh starts, new opportunities, and making more amazing memories together in the year ahead!",
            "Happy New Year, {name}! ✨ May this year be filled with growth, joy, and all the success you deserve. Excited to see what the future holds for you!"
        ],
        condolence: [
            "My deepest condolences, {name}. Please know that you're in my thoughts and prayers during this difficult time. Sending you love and strength.",
            "I'm so sorry for your loss, {name}. Wishing you peace and comfort as you navigate through this challenging time. You're not alone.",
            "Sending heartfelt sympathy, {name}. May loving memories bring you comfort and peace during this difficult time. Thinking of you."
        ],
        getsoon: [
            "Get well soon, {name}! 🌻 Sending you healing thoughts and positive energy. Hope you're feeling better very soon and back to your wonderful self!",
            "Wishing you a speedy recovery, {name}! 💪 Take care of yourself and know that you're in my thoughts. Hope you feel better soon!",
            "Sending healing wishes your way, {name}! 🌈 Rest up and take care of yourself. Looking forward to seeing you healthy and happy again soon!"
        ],
        congratulations: [
            "Congratulations, {name}! 🎉 You've achieved something truly wonderful and you should be so proud. Well done on this amazing accomplishment!",
            "Way to go, {name}! 🌟 Your success is well-deserved and inspiring. Congratulations on this fantastic achievement!",
            "Congratulations, {name}! 🎊 This is such exciting news! Your hard work and dedication have truly paid off."
        ],
        thankyou: [
            "Thank you so much, {name}! 🙏 Your kindness and support mean more to me than words can express. I'm truly grateful for everything you do.",
            "I can't thank you enough, {name}! 💚 Your generosity and thoughtfulness have made such a difference. You're absolutely wonderful!",
            "Heartfelt thanks, {name}! ✨ Your help and support have been incredible. I feel so lucky to have someone like you in my life."
        ],
        apology: [
            "I'm truly sorry, {name}. I realize my actions may have hurt you, and I deeply regret that. Please know that I value our relationship and hope we can move forward.",
            "My sincere apologies, {name}. I take full responsibility for my mistake and I'm committed to making things right. Thank you for your patience and understanding.",
            "I owe you an apology, {name}. I'm sorry for any pain or disappointment I may have caused. Your forgiveness would mean everything to me."
        ],
        custom: "Wishing you all the best on your special {occasion}, {name}! 🎉 May this moment bring you joy, happiness, and wonderful memories to cherish."
    };
}

// Adjust message tone based on relationship and tone preference
function adjustMessageTone(message, tone, relationship) {
    const adjustments = {
        formal: {
            prefix: "",
            suffix: " Best regards.",
            replacements: {
                "!": ".",
                "amazing": "excellent",
                "awesome": "outstanding",
                "great": "wonderful"
            }
        },
        funny: {
            prefix: "",
            suffix: " Hope you don't mind my attempt at humor! 😄",
            emojis: [" 😂", " 🎉", " 🎈", " 🥳"]
        },
        heartfelt: {
            prefix: "From the bottom of my heart, ",
            suffix: " You mean so much to me.",
            replacements: {
                "great": "truly meaningful",
                "nice": "deeply touching",
                "good": "heartwarming"
            }
        },
        casual: {
            prefix: "Hey there! ",
            suffix: " Catch you later! 😊",
            replacements: {
                "wonderful": "awesome",
                "excellent": "great",
                "magnificent": "cool"
            }
        },
        inspirational: {
            prefix: "",
            suffix: " Remember, the sky's the limit! ⭐",
            replacements: {
                "good luck": "believe in yourself",
                "hope": "know",
                "maybe": "certainly"
            }
        }
    };
    
    const adjustment = adjustments[tone] || {};
    let adjustedMessage = message;
    
    // Apply replacements
    if (adjustment.replacements) {
        Object.entries(adjustment.replacements).forEach(([from, to]) => {
            adjustedMessage = adjustedMessage.replace(new RegExp(from, 'gi'), to);
        });
    }
    
    // Add prefix and suffix
    if (adjustment.prefix) adjustedMessage = adjustment.prefix + adjustedMessage;
    if (adjustment.suffix) adjustedMessage = adjustedMessage + adjustment.suffix;
    
    // Add random emoji for funny tone
    if (tone === 'funny' && adjustment.emojis) {
        const randomEmoji = adjustment.emojis[Math.floor(Math.random() * adjustment.emojis.length)];
        adjustedMessage = adjustedMessage + randomEmoji;
    }
    
    return adjustedMessage;
}

// Show loading state
function showLoading() {
    const messageDisplay = document.getElementById('messageDisplay');
    messageDisplay.innerHTML = `
        <div class="loading">
            <i class="fas fa-magic"></i>
            <div>
                <h3>Crafting your perfect message...</h3>
                <div class="loading-dots">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            </div>
        </div>
    `;
}

// Display generated message
function displayGeneratedMessage(message) {
    const messageDisplay = document.getElementById('messageDisplay');
    const messageActions = document.getElementById('messageActions');
    
    messageDisplay.innerHTML = `<div class="generated-message">${message}</div>`;
    messageActions.style.display = 'flex';
    
    // Store message for later use
    window.currentMessage = message;
    
    // Add animation
    messageDisplay.style.opacity = '0';
    setTimeout(() => {
        messageDisplay.style.opacity = '1';
        messageDisplay.style.transition = 'opacity 0.5s ease';
    }, 100);
}

// Copy message to clipboard
function copyMessage() {
    if (window.currentMessage) {
        navigator.clipboard.writeText(window.currentMessage).then(() => {
            showNotification('Message copied to clipboard! 📋', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.currentMessage;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Message copied to clipboard! 📋', 'success');
        });
    }
}

// Regenerate message with same inputs
function regenerateMessage() {
    generateMessage();
}

// Download message as text file
function downloadMessage() {
    if (window.currentMessage) {
        const blob = new Blob([window.currentMessage], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'occasion-message.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showNotification('Message downloaded! 📄', 'success');
    }
}

// Additional Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('btn-generate')) { // Skip for generate button
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
