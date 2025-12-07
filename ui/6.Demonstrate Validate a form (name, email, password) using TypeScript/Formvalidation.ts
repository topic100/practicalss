// Grab elements from DOM
const form = document.getElementById("myForm") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const nameError = document.getElementById("nameError") as HTMLElement;
const emailError = document.getElementById("emailError") as HTMLElement;
const passwordError = document.getElementById("passwordError") as HTMLElement;

// Utility to validate email
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Main validation function
function validateForm(): boolean {
    let isValid = true;

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validate name
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Name must be at least 2 characters.";
        isValid = false;
    }

    // Validate email
    if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate password
    if (passwordInput.value.trim().length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        isValid = false;
    }

    return isValid;
}

// Attach form submit handler
form.addEventListener("submit", function (event: Event) {
    event.preventDefault(); // Prevent form submission
    if (validateForm()) {
        alert("Form submitted successfully!");
        form.reset();
    }
});
