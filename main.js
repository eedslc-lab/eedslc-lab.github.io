let homeNav = document.getElementById("home-nav");
let serviceNav = document.getElementById("service-nav");
let aboutNav = document.getElementById("about-nav");
let projectNav = document.getElementById("projects-nav");
let contactNav = document.getElementById("contact-nav");
let headerTitle = document.getElementById("header-title");
headerTitle.addEventListener("click", () => {
    window.location.replace("index.html")
})
homeNav.addEventListener("click" , () =>{
    console.log("clicked")
});