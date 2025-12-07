// Select the toggle button and the document body 
const toggleButton = document.getElementById("theme-toggle") as HTMLButtonElement;
const body = document.body;

// Function to apply a given theme 
function applyTheme(theme: "light" | "dark") {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

// Check saved theme in localStorage or default to light 
const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
applyTheme(savedTheme);

// Add event listener for toggle button 
toggleButton.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme") as "light" | "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
});
