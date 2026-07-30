// images.js
// Loads image paths from image_list.json and automatically renders
// project and service image galleries.

const IMAGE_LIST = "image_list.json";

const SERVICE_LABELS = {
    "interior-demo": "Interior Demolition",
    "exterior-demo": "Exterior Demolition",
    "dry-ice": "Dry Ice Blasting",
    "dxr-brokk": "DXR & BROKK Robotic Demolition",
    "spyder-crane": "Spyder Crane",
    "concrete-grinding": "Concrete Grinding & Shaving",
    "saw-cutting": "Saw Cutting & Removal",
    "trash-chute": "Trash Chute Rental",
    "shoring": "Shoring",
    "structural-demo": "Structural Demolition"
};

// Load the JSON file
async function loadImages() {
    const response = await fetch(IMAGE_LIST);
    if (!response.ok) {
        throw new Error(`Failed to load ${IMAGE_LIST}`);
    }
    return await response.json();
}

// Creates the image cards
function renderCards(container, sources, cardClass, imageClass, altBase) {
    sources.forEach((src, i) => {
        const card = document.createElement("div");
        card.classList.add(cardClass);

        const img = document.createElement("img");
        img.classList.add(imageClass);
        img.src = `images/${src}`;
        img.alt = `${altBase} photo ${i + 1}`;
        img.loading = "lazy";
        img.decoding = "async";

        card.appendChild(img);
        container.appendChild(card);
    });
}

// ---- PROJECT PAGE ----
async function initProjectImages() {
    const container = document.getElementById("project-card-container");
    if (!container) return;

    const images = await loadImages();

    const projectImages = images.filter(path =>
        path.startsWith("projects/")
    );

    renderCards(
        container,
        projectImages,
        "project-cards",
        "project-card-image",
        "Red Rock Demolition completed project"
    );
}

// ---- SERVICE PAGES ----
async function initServiceImages() {
    const container = document.getElementById("service-card-container");
    if (!container) return;

    const currentService = document.body.dataset.service;
    if (!currentService) return;

    const images = await loadImages();

    const serviceImages = images.filter(path =>
        path.startsWith(`service-images/${currentService}/`)
    );

    renderCards(
        container,
        serviceImages,
        "service-cards",
        "service-card-image",
        `Red Rock Demolition ${SERVICE_LABELS[currentService] || "Service"}`
    );
}

// Initialize whichever gallery exists on the page.
(async () => {
    try {
        await initProjectImages();
        await initServiceImages();
    } catch (error) {
        console.error(error);
    }
})();