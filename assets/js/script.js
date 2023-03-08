// Nav bar functionallity
const burgerIcon = document.querySelector(".burger-icon");
const navbarMenu = document.querySelector(".navbar-menu");
  
burgerIcon.addEventListener("click", function() {
  navbarMenu.classList.toggle("show");
});