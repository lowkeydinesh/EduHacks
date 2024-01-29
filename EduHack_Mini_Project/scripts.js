/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


// Add your JavaScript code here
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // You can add code to handle form submission and display the Thank You message here
  showThankYouMessage();
});

function showThankYouMessage() {
  const thankYouDiv = document.querySelector(".thank-you");
  thankYouDiv.style.display = "block";
  // You can add animations or effects to the Thank You message here
  // For example, you can use CSS transitions or animations to fade in the message
}
// Add your JavaScript code here
function initMap() {
  // Replace the placeholder coordinates with your organization's location
  var mapCoordinates = { lat: 1.2929, lng: 103.8547 }; // Example coordinates for New York City

  var mapOptions = {
    zoom: 15,
    center: mapCoordinates,
    disableDefaultUI: true, // Hide default map controls
    styles: [ /* Add your custom map styles here */ ]
  };

  var map = new google.maps.Map(document.querySelector('.interactive-map'), mapOptions);

  // Add a marker to the map
  var marker = new google.maps.Marker({
    position: mapCoordinates,
    map: map,
    title: 'Your Organization Location'
  });
  
   // Show the map container once the map is loaded and ready
  document.querySelector('.interactive-map').style.display = 'block';

}
