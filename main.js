let homeNav = document.getElementById("home-nav");
let serviceNav = document.getElementById("service-nav");
let aboutNav = document.getElementById("about-nav");
let projectNav = document.getElementById("projects-nav");
let contactNav = document.getElementById("contact-nav");
let headerTitle = document.getElementById("header-title");
let menuIndicate = document.getElementById("dropdown-indicator");
let clicked =  "false";
menuIndicate.addEventListener("click", () => {
    if (clicked === "false") {
        document.getElementById("navigation-menu").style.display = "flex";
        clicked = "true";
    } else {
        document.getElementById("navigation-menu").style.display = "none";
        clicked = "false";
    };
});
headerTitle.addEventListener("click", () => {
    window.location.replace("index.html")
});
homeNav.addEventListener("click" , () =>{
    console.log("clicked")
});