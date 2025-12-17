// ============================================
// SCROLL TO TOP BUTTON FUNCTIONALITY
// ============================================

/**
 * Scrolls the page smoothly to the top
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Show/Hide scroll to top button based on scroll position
 * Button appears after scrolling down 300px
 */
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) {
        console.warn('Scroll to top button not found in DOM');
        return;
    }
    
    // Show button when scrolled down 300px from top
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

/**
 * Alternative implementation with debouncing for better performance
 * Uncomment this and comment out the above if you want debounced scrolling
 */
/*
let scrollTimeout;

window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Clear the timeout if it exists
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Set a new timeout
    scrollTimeout = setTimeout(function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }, 100); // Check every 100ms instead of on every scroll event
});
*/

/**
 * Initialize scroll button on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        console.log('✅ Scroll to top button initialized successfully');
        
        // Add click event listener
        scrollToTopBtn.addEventListener('click', scrollToTop);
    } else {
        console.error('❌ Scroll to top button not found. Make sure there is a button with id="scrollToTop" in your HTML');
    }
});