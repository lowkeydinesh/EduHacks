var email;

function subscribe() {
    var emailInput = document.getElementById("email");
    email = emailInput.value;

    if (validateEmail(email)) {
        alert("Thank you for subscribing!");
        closeModal(); // Close the modal after successful subscription
    } else {
        alert("Please enter a valid email address.");
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.getElementById("showChartsButton").addEventListener("click", function() {
    window.location.href = "Stats.html";
});

document.getElementById("main").addEventListener("click", function() {
    window.location.href = "header.html";
});

document.getElementById("contact").addEventListener("click", function() {
    window.location.href = "contact.html";
});
