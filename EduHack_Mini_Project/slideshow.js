/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
// Declare the player variable in the global scope
let player;

  const aboutLink = document.querySelector('.dropdown > a');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  aboutLink.addEventListener('click', function (event) {
    event.preventDefault();
    dropdownMenu.classList.toggle('show');
  });

  // Close the dropdown when clicking outside
  window.addEventListener('click', function (event) {
    if (!aboutLink.contains(event.target)) {
      dropdownMenu.classList.remove('show');
    }
  });


  // JavaScript code for the slideshow
  const slideshow = document.querySelector('.slideshow');
  let slideIndex = 0;

  function showSlides() {
    const slides = slideshow.children;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 3000); // Change slide every 3 seconds (adjust as needed)
  }

  showSlides(); // Start the slideshow
function onYouTubeIframeAPIReady() {
  player = new YT.Player('muteYouTubeVideoPlayer', {
    videoId: 'qA4GQDUgQBc', // Replace 'YOUR_VIDEO_ID' with your actual YouTube Video ID or URL
    width: '100%',               // Player width (in px)
    height: '100%',            // Player height (in px) with a 16:9 aspect ratio (adjust as needed)
    playerVars: {
      autoplay: 1,            // Auto-play the video on load
      controls: 0,            // Hide pause/play buttons in player
      showinfo: 0,            // Hide the video title
      modestbranding: 1,      // Hide the YouTube logo
      loop: 1,                // Run the video in a loop
      fs: 0,                  // Hide the full screen button
      cc_load_policy: 0,      // Hide closed captions
      iv_load_policy: 3,      // Hide the video annotations
      autohide: 0             // Hide video controls when playing
    },
    events: {
      onReady: function (e) {
        e.target.mute();      // Mute the video when it's ready to play
      }
    }
  });
}

// Scroll to the video section and play the video when the "Learn More" button is clicked
document.getElementById('learn-more-button').addEventListener('click', function() {
  // Scroll to the video section using smooth behavior
  document.getElementById('video-section').scrollIntoView({ behavior: 'smooth' });

  // If the YouTube video player is ready (player variable exists), play the video
  if (player) {
    player.playVideo();
  }
});
// Get the modal element
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var closeBtn = document.getElementsByClassName("close")[0];

  // Show the modal when the page loads
  window.onload = function() {
    modal.style.display = "block";
  };

  // Close the modal when the close button is clicked
  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  // Close the modal when the user clicks outside of it
  window.onclick = function(event) {
    if (event.target === modal || event.target.classList.contains("close")) {
        modal.style.display = "none";
    }
  };