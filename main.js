// Header title
const headerTitle = document.getElementById("header-title");
if (headerTitle) {
    headerTitle.addEventListener("click", () => {
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

const projectImages = [
    "project1.jpg",
    "project2.jpg",
    "project3.jpg",
    "project4.jpg",
    "project5.jpg",
    "project6.jpg",
    "project7.jpg",
    "project8.jpg"
];

const projectContainer = document.getElementById("project-card-container");

projectImages.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("project-cards");

    const img = document.createElement("img");
    img.classList.add("project-card-image");
    img.src = image;
    img.alt = "Project Image";

    card.appendChild(img);
    projectContainer.appendChild(card);
});