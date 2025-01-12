// Function to check if an element is in the viewport (with early trigger)
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger animation when the section is 100px before entering the viewport
    return rect.top < windowHeight - 100 && rect.bottom > 0;
}

// Function to add the 'visible' class to sections when they come into view
function handleScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('visible');
        }
    });
}

// Initial check when the page loads (also trigger on load for animations)
document.addEventListener('DOMContentLoaded', () => {
    // Force all sections to be invisible on page load
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('visible'); // Ensure no section is visible at the start
    });

    // Trigger visibility check on page load
    handleScroll(); // Check visibility of sections initially

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);
});

// Ensure sections animate correctly when a link is clicked
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Scroll smoothly to the section
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Trigger the fade-in animation for the section
        setTimeout(() => {
            targetSection.classList.add('visible');
        }, 300);  // Delay to ensure smooth scrolling is done before fade-in
    });
});
