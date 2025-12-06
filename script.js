"use strict";

// =========================
// THEME SWITCHER (LIGHT / DARK MODE)
// =========================

const modeSelect = document.getElementById("mode-select");

modeSelect.addEventListener("change", function () {
    const mode = modeSelect.value;

    if (mode === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});


// =========================
// PRODUCT DISPLAY LOGIC
// =========================

// Product data
const products = [
    {
        name: "Rose Quartz Set",
        image: "images/kambria-trout-8XgdwxIJQAQ-unsplash.jpg",
        description: "Soft pink marble accents with a glossy finish. Perfect for everyday elegance."
    },
    {
        name: "Midnight Gloss Set",
        image: "images/allison-christine-n4MHxHD1dKI-unsplash.jpg",
        description: "Deep glossy black with a subtle shimmer. Perfect for a bold, modern look."
    },
    {
        name: "French Luxe Set",
        image: "images/bryony-elena-tXwBDZS2JxQ-unsplash.jpg",
        description: "Classic French manicure with a luxe twist. Elegant and timeless."
    }
];

// HTML elements for product display
const productControls = document.querySelectorAll("#product-controls button");
const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");

// Change product when a button is clicked
productControls.forEach(button => {
    button.addEventListener("click", function () {
        const index = this.getAttribute("data-product");
        const chosen = products[index];

        productImage.src = chosen.image;
        productName.textContent = chosen.name;
        productDescription.textContent = chosen.description;
    });
});


// =========================
// GAME PLAY (GUESS A NUMBER)
// =========================

const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const gameResult = document.getElementById("game-result");

guessButton.addEventListener("click", function () {
    const userGuess = Number(guessInput.value);

    // Validate input
    if (userGuess < 1 || userGuess > 10) {
        gameResult.textContent = "Please enter a number between 1 and 10.";
        gameResult.style.color = "red";
        return;
    }

    // Generate random number
    const randomNum = Math.floor(Math.random() * 10) + 1;

    // Display result
    if (userGuess === randomNum) {
        gameResult.textContent = `You guessed ${userGuess}. The number was ${randomNum}. You win!`;
        gameResult.style.color = "green";
    } else {
        gameResult.textContent = `You guessed ${userGuess}. The number was ${randomNum}. Try again!`;
        gameResult.style.color = "red";
    }
});


// =========================
// CONTACT FORM VALIDATION
// =========================

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop form from submitting

    // Input fields
    const fullName = document.getElementById("full-name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const comments = document.getElementById("comments");

    // Error spans
    const nameErr = document.getElementById("name-error");
    const phoneErr = document.getElementById("phone-error");
    const emailErr = document.getElementById("email-error");
    const commentsErr = document.getElementById("comments-error");
    const methodErr = document.getElementById("method-error");

    // Reset all errors
    nameErr.textContent = "";
    phoneErr.textContent = "";
    emailErr.textContent = "";
    commentsErr.textContent = "";
    methodErr.textContent = "";

    let isValid = true;

    // Full name required
    if (fullName.value.trim() === "") {
        nameErr.textContent = "Full name is required.";
        isValid = false;
    }

    // Comments required
    if (comments.value.trim() === "") {
        commentsErr.textContent = "Comments are required.";
        isValid = false;
    }

    // Check preferred contact method
    const selectedMethod = document.querySelector("input[name='contact-method']:checked");

    if (!selectedMethod) {
        methodErr.textContent = "Please select your preferred contact method.";
        isValid = false;
    }

    // If preferred method is phone, phone must be valid
    if (selectedMethod && selectedMethod.value === "phone") {
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(phone.value)) {
            phoneErr.textContent = "Enter a valid 10-digit phone number.";
            isValid = false;
        }
    }

    // If preferred method is email, email must be valid
    if (selectedMethod && selectedMethod.value === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value)) {
            emailErr.textContent = "Enter a valid email address.";
            isValid = false;
        }
    }

    // Stop if errors exist
    if (!isValid) return;

    // Create customer object
    const customer = {
        name: fullName.value,
        phone: phone.value,
        email: email.value,
        contactMethod: selectedMethod.value,
        comments: comments.value
    };

    // Show thank you message
    const thankYou = document.getElementById("thank-you-message");
    thankYou.innerHTML = `
        <strong>Thank you for your message, ${customer.name}!</strong><br>
        We will contact you via <em>${customer.contactMethod}</em> shortly.<br><br>
        <strong>Your Comments:</strong> ${customer.comments}
    `;

    // Reset the form
    form.reset();
});