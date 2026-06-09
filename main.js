// Header title
const headerTitle = document.getElementById("header-title");
if (headerTitle) {
    headerTitle.addEventListener("click", () => {
        // foer testing
        // window.location.href = "../home/index.html"; 
        // for website
        window.location.href = "/home/index.html"; 

    });
}

// Menu toggle
const menuToggle = document.getElementById("dropdown-indicator");
const navMenu = document.getElementById("navigation-menu");
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle('open');
    });
}

// Service card flip on hover
document.querySelectorAll('.service-cards').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('flipped');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('flipped');
    });
});

// Service buttons — navigate to their page by href, no JS needed
// (buttons are now <a> tags in the updated index.html)

// Count-up animation for project stat boxes
document.querySelectorAll('.project-buttons').forEach(btn => {
    const target = parseInt(btn.dataset.target);
    if (!target) return;

    const prefix = btn.dataset.prefix || "";
    const suffix = btn.dataset.suffix || "";
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        const current = Math.min(Math.round(increment * step), target);
        btn.textContent = prefix + current + suffix;
        if (step >= steps) clearInterval(timer);
    }, duration / steps);
});