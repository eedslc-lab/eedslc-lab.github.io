var r = document.querySelector(':root');
const punkTheme = document.getElementById("punk-theme");
const earthyTheme = document.getElementById("earthy-theme");
const classyTheme = document.getElementById("classy-theme");
const img = document.getElementById("single-image");
const categoryText = document.getElementById("category");
const dateText = document.getElementById("date");
const unfavoriteButton = document.getElementById("unfavorite-button");
const backButton = document.getElementById("back-button");

const favoriteImage = document.getElementById("favorite-image");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
}
punkTheme.addEventListener("click", e => {
     if (e.target.checked){
        localStorage.setItem("theme", "punk");
        applyTheme("punk");

    }
});
earthyTheme.addEventListener("click", e => {
     if (e.target.checked){
        localStorage.setItem("theme", "earthy");
        applyTheme("earthy");
    }
});
classyTheme.addEventListener("click", e => {
     if (e.target.checked){
        localStorage.setItem("theme", "classy");
        applyTheme("classy");
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
        r.style.setProperty("--font-size", ".8em");
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





const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadImage() {
    const res = await fetch('/favs.txt');

    let favs = [];
    try {
        favs = await res.json();
    } catch {
        favs = [];
    }

    const fav = favs.find(item => item.id === id);

    if (!fav) {
        window.location.href = "gallery.html";
        return;
    }

    img.src = fav.image;
    categoryText.innerText = "Category: " + fav.category;
    dateText.innerText = "Date Added: " + fav.date;

    unfavoriteButton.addEventListener("click", async () => {
        await removeFavorite(favs);
        window.location.href = "gallery.html";
    });
}

async function removeFavorite(favs) {
    const updated = favs.filter(item => item.id !== id);

    await fetch('/api/update-favs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
    });
}

backButton.addEventListener("click", () => {
    window.history.back();
});

// Run on load
loadImage();