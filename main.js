let homeNav = document.getElementById("home-nav");
let serviceNav = document.getElementById("service-nav");
let aboutNav = document.getElementById("about-nav");
let projectNav = document.getElementById("projects-nav");
let contactNav = document.getElementById("contact-nav");
let headerTitle = document.getElementById("header-title");
let menuToggle = document.getElementById("dropdown-indicator");
let navMenu = document.getElementById("navigation-menu");
let clicked =  "false";
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle('open');
});
headerTitle.addEventListener("click", () => {
    window.location.replace("index.html")
});
homeNav.addEventListener("click" , () =>{
    console.log("clicked")
});
document.querySelectorAll('.service-cards').forEach(card => {
    card.addEventListener('click', () => {
        setTimeout(() => card.classList.toggle('flipped'), 150);
    });
});
document.querySelectorAll('.card-front').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add("highlight");
    })
    card.addEventListener('mouseleave', () => {
        card.classList.remove('highlight');
    });
});


