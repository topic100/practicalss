// Select the toggle button and the document body 
var toggleButton = document.getElementById("theme-toggle");
var body = document.body;
// Function to apply a given theme 
function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}
// Check saved theme in localStorage or default to light 
var savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);
// Add event listener for toggle button 
toggleButton.addEventListener("click", function () {
    var currentTheme = body.getAttribute("data-theme");
    var newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
});
