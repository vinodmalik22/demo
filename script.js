// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY-IV4RnBd-OI1_0V1PuFENSOxR3XDbAI",
    authDomain: "grassfront-15e46.firebaseapp.com",
    projectId: "grassfront-15e46",
    storageBucket: "grassfront-15e46.firebasestorage.app",
    messagingSenderId: "436105330236",
    appId: "1:436105330236:web:0e6b97899b1f8155b00d39",
    measurementId: "G-0BXVHJMH6Q"
};

// Initialize Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const subject = document.getElementById('userSubject').value.trim();
        const message = document.getElementById('userMessage').value.trim();

        // Validate inputs
        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'text-center text-sm text-yellow-400 mt-4';
            formMessage.classList.remove('hidden');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Check if Firebase is initialized
            if (!db) {
                throw new Error('Firebase not initialized');
            }

            console.log('Attempting to save data...');

            // Add data to Firestore
            const docRef = await db.collection('contacts').add({
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'new'
            });

            console.log('Document written with ID:', docRef.id);

            // Show success message
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'text-center text-sm text-green-400 mt-4';
            formMessage.classList.remove('hidden');

            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);

            let errorMsg = 'Oops! Something went wrong. Please try again.';

            // Provide more specific error messages
            if (error.code === 'permission-denied') {
                errorMsg = 'Permission denied. Please contact support.';
            } else if (error.code === 'unavailable') {
                errorMsg = 'Service unavailable. Please check your internet connection.';
            } else if (error.message.includes('Firebase not initialized')) {
                errorMsg = 'Connection error. Please refresh the page.';
            }

            formMessage.textContent = errorMsg;
            formMessage.className = 'text-center text-sm text-red-400 mt-4';
            formMessage.classList.remove('hidden');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        const icon = this.querySelector('.material-symbols-outlined');
        icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
        });
    });
}

// Curtain Overlay Animation
const curtainOverlay = document.getElementById('curtainOverlay');

if (curtainOverlay) {
    // Support both touch and mouse events
    const triggerCurtain = function () {
        curtainOverlay.classList.add('curtain-up');
    };

    curtainOverlay.addEventListener('mouseenter', triggerCurtain);
    curtainOverlay.addEventListener('touchstart', triggerCurtain, { passive: true });
}

// Frame animation
const frameAnimation = document.getElementById('frame-animation');
const totalFrames = 40;
let currentFrame = 1;
let animationInterval = null;

function updateFrame() {
    if (frameAnimation) {
        const frameNumber = String(currentFrame).padStart(3, '0');
        const newSrc = `image/ezgif-frame-${frameNumber}.jpg`;

        // Preload next frame for smoother animation on mobile
        const img = new Image();
        img.onload = function () {
            frameAnimation.src = newSrc;
        };
        img.src = newSrc;

        currentFrame = (currentFrame % totalFrames) + 1;
    }
}

// Adjust frame rate based on device performance
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const frameDelay = isMobile ? 200 : 150; // Slower on mobile for better performance

// Start animation when page loads
if (frameAnimation) {
    animationInterval = setInterval(updateFrame, frameDelay);
}

// Pause animation when page is not visible (saves battery on mobile)
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        if (animationInterval) clearInterval(animationInterval);
    } else {
        if (frameAnimation) {
            animationInterval = setInterval(updateFrame, frameDelay);
        }
    }
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all fade-in sections
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Observe popup sections
    document.querySelectorAll('.popup-section, .popup-left, .popup-right').forEach(section => {
        observer.observe(section);
    });
});

// Advanced 3D Tilt Card with Mouse Tracking
function setupTiltCard(card) {
    var rafId = null;
    var currentRotateX = 0;
    var currentRotateY = 0;
    var currentTranslateY = 0;
    var targetRotateX = 0;
    var targetRotateY = 0;
    var targetTranslateY = 0;
    var springFactor = 0.12;

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function animate() {
        currentRotateX = lerp(currentRotateX, targetRotateX, springFactor);
        currentRotateY = lerp(currentRotateY, targetRotateY, springFactor);
        currentTranslateY = lerp(currentTranslateY, targetTranslateY, springFactor);

        card.style.transform = 'perspective(1500px) rotateX(' + currentRotateX + 'deg) rotateY(' + currentRotateY + 'deg) translateY(' + currentTranslateY + 'px) scale3d(1.02, 1.02, 1.02)';

        if (
            Math.abs(currentRotateX - targetRotateX) > 0.01 ||
            Math.abs(currentRotateY - targetRotateY) > 0.01 ||
            Math.abs(currentTranslateY - targetTranslateY) > 0.01
        ) {
            rafId = requestAnimationFrame(animate);
        }
    }

    function resetAnimation() {
        currentRotateX = lerp(currentRotateX, 0, springFactor);
        currentRotateY = lerp(currentRotateY, 0, springFactor);
        currentTranslateY = lerp(currentTranslateY, 0, springFactor);

        card.style.transform = 'perspective(1500px) rotateX(' + currentRotateX + 'deg) rotateY(' + currentRotateY + 'deg) translateY(' + currentTranslateY + 'px) scale3d(1, 1, 1)';

        if (
            Math.abs(currentRotateX) > 0.01 ||
            Math.abs(currentRotateY) > 0.01 ||
            Math.abs(currentTranslateY) > 0.01
        ) {
            rafId = requestAnimationFrame(resetAnimation);
        } else {
            card.style.transform = '';
        }
    }

    function handleMouseEnter(e) {
        card.style.transition = '';
    }

    function handleMouseMove(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateYVal = ((x - centerX) / centerX) * 18;
        var rotateXVal = ((centerY - y) / centerY) * 18;
        targetRotateX = rotateXVal;
        targetRotateY = rotateYVal;
        var distX = Math.abs(x - centerX) / centerX;
        var distY = Math.abs(y - centerY) / centerY;
        var cornerProximity = Math.max(distX, distY);
        targetTranslateY = cornerProximity * 10;
        card.style.setProperty('--mouse-x', (x / rect.width) * 100 + '%');
        card.style.setProperty('--mouse-y', (y / rect.height) * 100 + '%');
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
    }

    function handleMouseLeave(e) {
        targetRotateX = 0;
        targetRotateY = 0;
        targetTranslateY = 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(resetAnimation);
    }

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
}

// Initialize each card by ID
window.addEventListener('load', function () {
    // Setup each card individually by ID
    var card1 = document.getElementById('tilt-card-1');
    var card2 = document.getElementById('tilt-card-2');
    var card3 = document.getElementById('tilt-card-3');
    var card4 = document.getElementById('tilt-card-4');
    var card5 = document.getElementById('tilt-card-5');
    var card6 = document.getElementById('tilt-card-6');

    if (card1) setupTiltCard(card1);
    if (card2) setupTiltCard(card2);
    if (card3) setupTiltCard(card3);
    if (card4) setupTiltCard(card4);
    if (card5) setupTiltCard(card5);
    if (card6) setupTiltCard(card6);

    // Scroll Animation - Boxes slide from left one by one (every time)
    var coreSection = document.getElementById('core-offering');
    var coreBoxes = document.querySelectorAll('.core-box');
    var isAnimating = false;
    var animationTimeouts = [];

    function triggerScrollAnimation() {
        var sectionRect = coreSection.getBoundingClientRect();
        var windowHeight = window.innerHeight;

        // Check if section is in view
        var isInView = sectionRect.top < windowHeight - 100 && sectionRect.bottom > 100;

        if (isInView && !isAnimating) {
            isAnimating = true;

            coreBoxes.forEach(function (box, index) {
                var timeout = setTimeout(function () {
                    box.classList.add('slide-in');

                    setTimeout(function () {
                        box.classList.add('animation-done');
                    }, 400);

                }, index * 400);
                animationTimeouts.push(timeout);
            });

            // Remove scroll listener after animation plays once
            window.removeEventListener('scroll', triggerScrollAnimation);
        }
    }

    window.addEventListener('scroll', triggerScrollAnimation);
    triggerScrollAnimation(); // Check on page load

    // Start wire animation
    setTimeout(() => {
        updateWireConnections();
        animateWires();
    }, 100);
});

// Update Wire Connections for Projects Section - Curved paths
function updateWireConnections() {
    const container = document.querySelector('#projects .relative');
    if (!container) return;

    const centerLogo = container.querySelector('.central-logo');
    const bubbles = container.querySelectorAll('.product-bubble');
    const wires = container.querySelectorAll('.connection-wire');

    if (!centerLogo || bubbles.length === 0 || wires.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const centerRect = centerLogo.getBoundingClientRect();

    // Calculate center point of the logo
    const centerX = centerRect.left - containerRect.left + centerRect.width / 2;
    const centerY = centerRect.top - containerRect.top + centerRect.height / 2;

    bubbles.forEach((bubble, index) => {
        const bubbleRect = bubble.getBoundingClientRect();
        const bubbleX = bubbleRect.left - containerRect.left + bubbleRect.width / 2;
        const bubbleY = bubbleRect.top - containerRect.top + bubbleRect.height / 2;

        if (wires[index]) {
            // Calculate control point for curved path (quadratic bezier)
            // Control point creates the curve - positioned perpendicular to the line
            const midX = (centerX + bubbleX) / 2;
            const midY = (centerY + bubbleY) / 2;

            // Calculate perpendicular offset for curve
            const dx = bubbleX - centerX;
            const dy = bubbleY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const curvature = distance * 0.2; // 20% of distance for curve depth

            // Perpendicular direction
            const perpX = -dy / distance;
            const perpY = dx / distance;

            // Control point offset from midpoint
            const controlX = midX + perpX * curvature;
            const controlY = midY + perpY * curvature;

            // Create quadratic bezier curve path
            const pathData = `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${bubbleX} ${bubbleY}`;
            wires[index].setAttribute('d', pathData);
        }
    });
}

// Update wires on animation frame for smooth movement
function animateWires() {
    updateWireConnections();
    requestAnimationFrame(animateWires);
}

// Update on resize
window.addEventListener('resize', updateWireConnections);

// Media Panel Functions
function openMediaPanel(panelId) {
    closeMediaPanels();
    const panel = document.getElementById(panelId);
    const coverContent = document.getElementById('mediaCoverContent');
    
    if (panel) {
        panel.classList.remove('translate-y-full');
        panel.classList.add('translate-y-0');
    }
    
    if (coverContent) {
        coverContent.style.opacity = '0';
        coverContent.style.pointerEvents = 'none';
    }
}

function closeMediaPanels() {
    const announcementPanel = document.getElementById('announcementPanel');
    const overviewPanel = document.getElementById('overviewPanel');
    const coverContent = document.getElementById('mediaCoverContent');
    
    if (announcementPanel) {
        announcementPanel.classList.remove('translate-y-0');
        announcementPanel.classList.add('translate-y-full');
    }
    if (overviewPanel) {
        overviewPanel.classList.remove('translate-y-0');
        overviewPanel.classList.add('translate-y-full');
    }
    
    if (coverContent) {
        setTimeout(() => {
            coverContent.style.opacity = '1';
            coverContent.style.pointerEvents = 'auto';
        }, 300);
    }
}
