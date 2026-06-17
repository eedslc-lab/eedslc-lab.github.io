const punkTheme = document.getElementById("punk-theme");
const earthyTheme = document.getElementById("earthy-theme");
const classyTheme = document.getElementById("classy-theme");
const catFilter = document.getElementById("cat-button");
const dogFilter = document.getElementById("dog-button");
const foxFilter = document.getElementById("fox-button");
let activeFilters = [];


document.getElementById("navigation-home").addEventListener("click", e => {
    window.location.replace("index.html") //I tried a legit backward navigation but it kept taking me to a previous gallery page if i visited the image page first, this was the only work-around i could find
});
let r = document.querySelector(':root');
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
catFilter.addEventListener("click", e => {
    applyFilter("cat")
});
dogFilter.addEventListener("click", e => {
    applyFilter("dog")
});
foxFilter.addEventListener("click", e => {
    applyFilter("fox")
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
    }

    if (theme === "earthy") {
        r.style.setProperty("--background-color-1", "#36563e");
        r.style.setProperty("--background-color-2", "#23190C");
        r.style.setProperty("--background-color-3", "#bec991");
        r.style.setProperty("--background-color-4", "#283928");
        r.style.setProperty("--background-color-5", "#948363");
        r.style.setProperty("--font-color", "#23190C");
        r.style.setProperty("--font-family", 'Winter-Trees');
        earthyTheme.checked = true;
    }

    if (theme === "classy") {
        r.style.setProperty("--background-color-1", "#5E5D5C");
        r.style.setProperty("--background-color-2", "#A9A9A9");
        r.style.setProperty("--background-color-3", "#FECEE9");
        r.style.setProperty("--background-color-4", "#FFF5EE");
        r.style.setProperty("--background-color-5", "#788475");
        r.style.setProperty("--font-color", "#23190C");
        r.style.setProperty("--font-family", 'Titillium');
        classyTheme.checked = true;
    }
};
function applyFilter(category) {
    if (activeFilters.includes(category)) {
        activeFilters = activeFilters.filter(f => f !== category);
    } else {
        activeFilters.push(category);
    }
    loadFavorites(); 
}

async function loadFavorites() {
    const res = await fetch('/favs.txt');
    
    let favs = [];
    try {
        favs = await res.json();
    } catch {
        favs = [];
    }

    let filtered = favs;

    if (activeFilters.length > 0) {
        filtered = favs.filter(fav => activeFilters.includes(fav.category));
    }

    displayFavorites(filtered);
};
function displayFavorites(favs) {
    const gallery = document.getElementById("image-gallery");
    gallery.innerHTML = ""
    favs.forEach(fav => {
        const card = document.createElement("div");
        card.classList.add("cards");

        const img = document.createElement("img");
        img.classList.add("image-in-card")
        img.src = fav.image;

        const category = document.createElement("div");
        category.innerText = "Category: " + fav.category;

        const date = document.createElement("div");
        date.innerText = "Date Added: " + fav.date;

        const unFavorite = document.createElement("button");
        unFavorite.classList.add("unfavorite")
        unFavorite.innerText = "Unfavorite"
        unFavorite.addEventListener("click", async () => {
            await removeFavorite(fav.id);
            loadFavorites();
        });

        img.addEventListener("click", e => {
            window.location.href = `image.html?id=${fav.id}`;
        });

        card.appendChild(img);
        card.appendChild(category); 
        card.appendChild(date);
        card.appendChild(unFavorite);
        gallery.appendChild(card);
    });
};
async function removeFavorite(id) {
    const res = await fetch('/favs.txt');
    let favs = await res.json();

    favs = favs.filter(f => f.id !== id);

    await fetch('/api/update-favs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favs)
    });
};
window.onload = loadFavorites;