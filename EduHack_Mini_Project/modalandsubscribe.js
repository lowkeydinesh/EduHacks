/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var closeBtn = document.getElementsByClassName("close")[0];
 // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }
  function setModalDisplayedCookie() {
  document.cookie = "modalDisplayed=true; expires=; path=/";
}
  // Show the modal when the page loads
  window.onload = function() {
if (document.cookie.indexOf("modalDisplayed=true") < 0) {
    modal.style.display = "block";
    setModalDisplayedCookie();
  }  };

  // Close the modal when the close button is clicked
  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  // Close the modal when the user clicks outside of it
  window.onclick = function(event) {
  if (modal.style.display === "block" && (event.target === modal || event.target.classList.contains("close"))) {
      closeModal();
  } // Close the modal when clicking outside the modal content    }
  };
      
      
 var loginModal = document.getElementById("loginModal");
  var loginIframe = document.getElementById("loginIframe");
  var showLoginButton = document.getElementById("showLoginButton");

  function openLoginModal() {
    loginModal.style.display = "block";
  }

  function closeLoginModal() {
    loginModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === loginModal || event.target.classList.contains("close")) {
      closeLoginModal();
    }
  };

  showLoginButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior
    openLoginModal();
  });
      
  var donateModal = document.getElementById("donateModal");
  var donateIframe = document.getElementById("donateIframe");
  var showdonateButton = document.getElementById("showdonateButton");
  
  function opendonateModal() {
    donateModal.style.display = "block";
  }

  function closedonateModal() {
    donateModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === donateModal || event.target.classList.contains("close")) {
      closedonateModal();
    }
  };

  showdonateButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior
    opendonateModal();
  });

    //  document.getElementById("subscribeBtn").addEventListener("click", subscribe);
// Function to handle form submission
 const emailInput = document.getElementById('email1');
  const thankYouMessage = document.getElementById('thankYouMessage');

  // Assuming you have a function to validate the email
  function isValidEmail(email) {
    // Add your email validation logic here
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return true;
  }

  document.getElementById('subscribeBtn').addEventListener('click', function (e) {
    e.preventDefault();
    if (isValidEmail(emailInput.value)) {
        emailInput.value = ''; // Clear the input
      thankYouMessage.classList.remove('hidden'); // Show the thank you message
      setTimeout(function () {
        thankYouMessage.classList.add('hidden'); // Hide the thank you message after a few seconds
      }, 3000); // Adjust the time as needed (3000ms = 3 seconds)
    }
  });
  
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// ... your previous code ...

// Function to handle subscription in the modal
function subscribe() {
  var emailInput = document.getElementById("email");
  var modalThankYouMessage = document.getElementById("modalThankYouMessage");

  if (isValidEmail(emailInput.value)) {
    emailInput.value = ''; // Clear the input
    modalThankYouMessage.classList.remove('hidden'); // Show the thank you message
    setTimeout(function () {
      modalThankYouMessage.classList.add('hidden'); // Hide the thank you message after a few seconds
    }, 3000); // Adjust the time as needed (3000ms = 3 seconds)
  }
}

// ... your previous code ...

//function subscribehardcode1() {
  // Get the email input element
 // var emailInput = document.getElementById("email1");

  // Get the value of the email entered by the user
  //email = emailInput.value;

  // Validate the email address
 // if (validateEmail(email)) {
    // Email is valid, proceed with subscription (you can add your subscription logic here)
    //saveRecord(email);
   //      alert("Thank you for subscribing!");

     //   } else {
    // Email is not valid, show an error message
   // alert("Please enter a valid email address.");
  //}
//}/
document.getElementById("showChartsButton").addEventListener("click", function() {
    window.location.href = "Stats.html";
});

document.getElementById("main").addEventListener("click", function() {
    window.location.href = "mainpage.html";
});

document.getElementById("contact").addEventListener("click", function() {
    window.location.href = "contact.html";
});

