// images.js
// Dynamically loads images and videos from image_list.json
// Videos are displayed before images.

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


let mediaCache = null;


// ---------------- LOAD JSON ----------------


async function loadMedia() {

    if (mediaCache) {
        return mediaCache;
    }


    const response = await fetch(
        IMAGE_LIST
    );


    if (!response.ok) {
        throw new Error(
            `Failed to load ${IMAGE_LIST}`
        );
    }


    mediaCache = await response.json();


    mediaCache.images ??= [];
    mediaCache.videos ??= [];


    return mediaCache;
}



// ---------------- CREATE IMAGE CARD ----------------


function renderImageCard(
    container,
    src,
    cardClass,
    imageClass,
    alt
) {

    const card = document.createElement(
        "div"
    );

    card.classList.add(
        cardClass
    );


    const img = document.createElement(
        "img"
    );


    img.classList.add(
        imageClass
    );


    img.src = `images/${src}`;

    img.alt = alt;

    img.loading = "lazy";

    img.decoding = "async";


    card.appendChild(
        img
    );


    container.appendChild(
        card
    );
}



// ---------------- CREATE VIDEO CARD ----------------


function renderVideoCard(
    container,
    src,
    cardClass,
    videoClass,
    ariaLabel
) {

    const card = document.createElement(
        "div"
    );

    card.classList.add(
        cardClass
    );


    const video = document.createElement(
        "video"
    );


    video.classList.add(
        videoClass
    );


    video.src = `images/${src}`;

    video.muted = true;

    video.autoplay = true;

    video.loop = true;

    video.playsInline = true;

    video.preload = "metadata";


    video.setAttribute(
        "aria-label",
        ariaLabel
    );


    card.appendChild(
        video
    );


    container.appendChild(
        card
    );
}



// ---------------- RENDER MEDIA ----------------


function renderMedia(
    container,
    media,
    folder,
    cardClass,
    imageClass,
    videoClass,
    altBase
) {


    const items = [];


    media.videos
        .filter(path => path.startsWith(folder))
        .forEach(path => {

            items.push({
                type: "video",
                path
            });

        });



    media.images
        .filter(path => path.startsWith(folder))
        .forEach(path => {

            items.push({
                type: "image",
                path
            });

        });



    // Videos first, then alphabetical
    items.sort((a, b) => {

        if (a.type !== b.type) {

            return a.type === "video"
                ? -1
                : 1;

        }


        return a.path.localeCompare(
            b.path
        );

    });



    let photoNumber = 1;

    let videoNumber = 1;



    items.forEach(item => {


        if (item.type === "video") {


            renderVideoCard(
                container,
                item.path,
                cardClass,
                videoClass,
                `${altBase} video ${videoNumber++}`
            );


        } else {


            renderImageCard(
                container,
                item.path,
                cardClass,
                imageClass,
                `${altBase} photo ${photoNumber++}`
            );

        }

    });

}



// ---------------- PROJECT PAGE ----------------


async function initProjectMedia() {


    const container = document.getElementById(
        "project-card-container"
    );


    if (!container) {
        return;
    }


    const media = await loadMedia();


    renderMedia(
        container,
        media,
        "project-images/",
        "project-cards",
        "project-card-image",
        "project-card-video",
        "Red Rock Demolition completed project"
    );

}



// ---------------- SERVICE PAGES ----------------


async function initServiceMedia() {


    const container = document.getElementById(
        "service-card-container"
    );


    if (!container) {
        return;
    }


    const service = document.body.dataset.service;


    if (!service) {
        return;
    }


    const media = await loadMedia();


    renderMedia(
        container,
        media,
        `service-images/${service}/`,
        "service-cards",
        "service-card-image",
        "service-card-video",
        `Red Rock Demolition ${SERVICE_LABELS[service] || "Service"}`
    );

}



// ---------------- START ----------------


(async () => {

    try {

        await initProjectMedia();

        await initServiceMedia();

    }

    catch (error) {

        console.error(
            error
        );

    }

})();