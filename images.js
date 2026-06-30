// images.js
// Instead of hardcoding filenames, this tries to load photo1, photo2, photo3...
// from each folder (checking .jpg, .jpeg, .png, .webp) and stops as soon as a
// number has no matching file in any extension.
//
// Just drop files named photo1.jpg, photo2.png, photo3.jpeg, etc. into the
// matching folder — no code changes needed when you add more.

const PROJECT_FOLDER = "images/projects";

const SERVICE_FOLDERS = {
    "interior-demo": "images/service-images/interior-demo",
    "exterior-demo": "images/service-images/exterior-demo",
    "dry-ice": "images/service-images/dry-ice",
    "dxr-brokk": "images/service-images/dxr-brokk",
    "spyder-crane": "images/service-images/spyder-crane",
    "concrete-grinding": "images/service-images/concrete-grinding",
    "saw-cutting": "images/service-images/saw-cutting",
    "trash-chute": "images/service-images/trash-chute"
};

// Extensions to try for each photo number, in order.
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

// Tries to load a single image URL. Resolves true/false, never rejects.
function imageExists(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

// Tries photoN.jpg, photoN.jpeg, photoN.png, photoN.webp for a given N.
// Returns the working src string, or null if none of them exist.
async function findPhotoSrc(folder, number) {
    for (const ext of EXTENSIONS) {
        const src = `${folder}/photo${number}.${ext}`;
        if (await imageExists(src)) {
            return src;
        }
    }
    return null;
}

// Walks photo1, photo2, photo3... until one is missing in every extension,
// returns the list of found src strings. Caps at maxCount as a safety net.
async function collectPhotos(folder, maxCount = 200) {
    const found = [];
    for (let i = 1; i <= maxCount; i++) {
        const src = await findPhotoSrc(folder, i);
        if (!src) break;
        found.push(src);
    }
    return found;
}

function renderCards(container, sources, cardClass, imageClass, altText) {
    sources.forEach(src => {
        const card = document.createElement("div");
        card.classList.add(cardClass);

        const img = document.createElement("img");
        img.classList.add(imageClass);
        img.src = src;
        img.alt = altText;

        card.appendChild(img);
        container.appendChild(card);
    });
}

// ---- RENDER PROJECTS (project.html) ----
async function initProjectImages() {
    const projectContainer = document.getElementById("project-card-container");
    if (!projectContainer) return;

    const sources = await collectPhotos(PROJECT_FOLDER);
    renderCards(projectContainer, sources, "project-cards", "project-card-image", "Project Image");
}

// ---- RENDER SERVICE IMAGES (any service-*.html page) ----
async function initServiceImages() {
    const serviceContainer = document.getElementById("service-card-container");
    if (!serviceContainer) return;

    // body needs data-service="interior-demo" (etc.) set in each service HTML file
    const currentService = document.body.dataset.service;
    const folder = SERVICE_FOLDERS[currentService];
    if (!folder) return;

    const sources = await collectPhotos(folder);
    renderCards(serviceContainer, sources, "service-cards", "service-card-image", "Service Image");
}

initProjectImages();
initServiceImages();