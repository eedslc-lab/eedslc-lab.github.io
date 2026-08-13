// Header title
const headerTitle = document.getElementById("header-title");
if (headerTitle) {
    headerTitle.addEventListener("click", () => {
        // window.location.href = "https://www.redrockdemolition.com";
        window.location.href = "index.html";
    });
}

// Menu toggle
const menuToggle = document.getElementById("dropdown-indicator");
const navMenu = document.getElementById("navigation-menu");
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is tapped
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}
const serviceMenuToggle = document.getElementById("service-dropdown-indicator");
const serviceNavMenu = document.getElementById("service-nav-menu");
const serviceMenuDropdown = document.getElementById("service-menu-dropdown")
if (serviceMenuToggle && serviceNavMenu) {
    serviceMenuToggle.addEventListener("click", () => {
        serviceNavMenu.classList.toggle('open');
        serviceMenuDropdown.classList.toggle('open');

    });

    // Close menu when a link is tapped
    serviceNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            serviceNavMenu.classList.remove('open');
        });
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

// Count-up animation for project stat boxes
document.querySelectorAll('.project-buttons').forEach(btn => {
    const target = parseInt(btn.dataset.target);
    if (!target) return;

    const prefix = btn.dataset.prefix || "";
    const suffix = btn.dataset.suffix || "";
    const duration = 4500;
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