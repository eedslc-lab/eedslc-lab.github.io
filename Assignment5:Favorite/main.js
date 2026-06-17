var r = document.querySelector(':root');
const punkTheme = document.getElementById("punk-theme");
const earthyTheme = document.getElementById("earthy-theme");
const classyTheme = document.getElementById("classy-theme");
const dogButton = document.getElementById("dog-button");
const catButton = document.getElementById("cat-button");
const foxButton = document.getElementById("fox-button");
const generateImage = document.getElementById("generate-image");
const favoriteImage = document.getElementById("favorite-image");
const imageDiv = document.getElementById("image")
var imageURL = ""
var imageType = "fox"
getFox();

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
}
punkTheme.addEventListener("click", e => {
     if (e.target.checked){
        localStorage.setItem("theme", "punk");
        applyTheme("punk")
    }
});
earthyTheme.addEventListener("click", e => {
     if (e.target.checked){
        localStorage.setItem("theme", "earthy");
        applyTheme("earthy")
    }
});
classyTheme.addEventListener("click", e => {
     if (e.target.checked){
        localStorage.setItem("theme", "classy");
        applyTheme("classy")
    }
});
function applyTheme(theme) {
    if (theme === "punk") {
        r.style.setProperty("--background-color-1", "#130203");
        r.style.setProperty("--background-color-2", "#FFFF00");
        r.style.setProperty("--background-color-3", "#FB62F6");
        r.style.setProperty("--background-color-4", "#F8F8FF");
        r.style.setProperty("--background-color-5", "#FF1493");
        r.style.setProperty("--font-color", "#FFFF00");
        r.style.setProperty("--font-family", 'Steps-Mono');
        punkTheme.checked = true;
    };

    if (theme === "earthy") {
        r.style.setProperty("--background-color-1", "#36563e");
        r.style.setProperty("--background-color-2", "#23190C");
        r.style.setProperty("--background-color-3", "#bec991");
        r.style.setProperty("--background-color-4", "#283928");
        r.style.setProperty("--background-color-5", "#948363");
        r.style.setProperty("--font-color", "#23190C");
        r.style.setProperty("--font-family", 'Winter-Trees');
        earthyTheme.checked = true;
    };

    if (theme === "classy") {
        r.style.setProperty("--background-color-1", "#5E5D5C");
        r.style.setProperty("--background-color-2", "#A9A9A9");
        r.style.setProperty("--background-color-3", "#FECEE9");
        r.style.setProperty("--background-color-4", "#FFF5EE");
        r.style.setProperty("--background-color-5", "#788475");
        r.style.setProperty("--font-color", "#23190C");
        r.style.setProperty("--font-family", 'Titillium');
        classyTheme.checked = true;
    };
};


dogButton.addEventListener("click", e => {
    if (e.target.checked){
        imageType = "dog";
        getDog();
    };
});

catButton.addEventListener("click", e => {
    if (e.target.checked){
        imageType = "cat";
        getCat();
    };
});

foxButton.addEventListener("click", e => {
    if (e.target.checked){
        imageType = "fox";
        getFox();
    };
});

generateImage.addEventListener("click", e => {
    if (dogButton.checked){
        imageType = "dog"
        getDog();
    };
    if (catButton.checked){
        imageType = "cat"
        getCat();
    };
    if (foxButton.checked){
        imageType = "fox"
        getFox();
    };
});

favoriteImage.addEventListener("click", toggleFavorite);

async function getDog() {
    const result1 = await fetch("https://dog.ceo/api/breeds/image/random")
    const result2 = await result1.json();
    imageURL = result2.message;
    imageDiv.setAttribute("src", result2.message);
    document.getElementById("image-api").innerText = "WebAPI: https://dog.ceo/api/breeds/image/random";
    document.getElementById("image-url").innerText = `ImageURL: ${imageURL}`;
    updateFavoriteUI();
};

async function getCat() {
    const result1 = await fetch("https://api.thecatapi.com/v1/images/search")
    const result2 = await result1.json();
    imageURL = result2[0].url;
    imageDiv.setAttribute("src", result2[0].url);
    document.getElementById("image-api").innerText = "WebAPI: https://api.thecatapi.com/v1/images/search";
    document.getElementById("image-url").innerText = `ImageURL: ${imageURL}`;
    updateFavoriteUI();
};

async function getFox() {
    const result1 = await fetch("https://randomfox.ca/floof/")
    const result2 = await result1.json();
    imageURL = result2.image;
    imageDiv.setAttribute("src", result2.image);
    document.getElementById("image-api").innerText = "WebAPI: https://randomfox.ca/floof/";
    document.getElementById("image-url").innerText = `ImageURL: ${imageURL}`;
    updateFavoriteUI();
};



function getApiUrl() {
    if (imageType === "dog") return "https://dog.ceo/api/breeds/image/random";
    if (imageType === "cat") return "https://api.thecatapi.com/v1/images/search";
    if (imageType === "fox") return "https://randomfox.ca/floof/";
};

async function toggleFavorite() {
    let res = await fetch('/favs.txt');
    let favs = [];
    try {
        favs = await res.json();
    } catch {
        favs = [];
    }

    const existingIndex = favs.findIndex(f => f.image === imageURL);

    if (existingIndex >= 0) {
        favs.splice(existingIndex, 1);
        favoriteImage.value = "Favorite";
    } else {
        const fullDate = new Date()
        const day = fullDate.getDate();
        const month = fullDate.getMonth() + 1;
        const year = fullDate.getFullYear();
        const date = `${month}-${day}-${year}`
        const favorite = {
            id: Date.now().toString(),
            image: imageURL,
            category: imageType,
            apiUrl: getApiUrl(),
            date: date
        };
        favs.push(favorite);
        favoriteImage.value = "Unfavorite";
    }

    await fetch('/api/update-favs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favs)
    });
};

async function updateFavoriteUI() {
    let res = await fetch('/favs.txt');
    let favs = [];
    try {
        favs = await res.json();
    } catch {
        favs = [];
    }

    const existing = favs.find(f => f.image === imageURL);
    if (existing) {
        favoriteImage.value = "Unfavorite";
    } else {
        favoriteImage.value = "Favorite";
    }
};