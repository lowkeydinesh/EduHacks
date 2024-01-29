/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var lastID = 0;
var selectedId = 0;
var records; // Add a variable to store the retrieved records

var Cassandra_Token = "AstraCS:xIQXNnkKUpYfJpskkZcyaikB:2ae9164e3c637a6d870a2d615f280565337c2296ed68950f76e5c36cf6791291";
var region = "https://507ead02-9edf-4d88-a801-9979ce4c53ac-asia-south1.apps.astra.datastax.com/api/rest";
var forumurl = region + "/v2/keyspaces/caregiverkeyspace/support_table/";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-Cassandra-Token", Cassandra_Token);
myHeaders.append("Accept", "application/json");

let isDownImage = false;

// Function to toggle chat platform
function toggleChatPlatform() {
  const chatPlatform = document.getElementById('chat-platform');
  chatPlatform.classList.toggle('active');
  if (chatPlatform.classList.contains('active')) {
    renderAllRecords();
  }

  const floatingButton = document.getElementById('floating-button');
  const floatingButtonImg = floatingButton.querySelector('img');

  if (isDownImage) {
    floatingButtonImg.src = 'images/support.png';
    floatingButtonImg.style.width = '80%';
    floatingButtonImg.style.height = '80%';
  } else {
    floatingButtonImg.src = 'images/close.png';
    floatingButtonImg.style.width = '50%';
    floatingButtonImg.style.height = '50%';
  }

  floatingButton.style.transform = 'translateY(-5px)'; // Move the button slightly upwards during the transition

  // Add the transitioning class to enable smooth transitions
  floatingButton.classList.add('transitioning');

  isDownImage = !isDownImage;

  // After a short delay, reset the button's position and remove the transitioning class
  setTimeout(() => {
    floatingButton.style.transform = 'none';
    floatingButton.classList.remove('transitioning');
  }, 300);

  // Remove the rotation classes after a delay to reset the button rotation
  setTimeout(() => {
    floatingButton.classList.remove('rotate-clockwise');
    floatingButton.classList.remove('rotate-anticlockwise');
  }, 400);
}

// Function to send a message
async function sendMessage() {
    const firstname = getFirstnameFromQuery();
    const messageInput = document.getElementById("message-input");
    let message = messageInput.value.trim(); // Trim leading and trailing spaces

    if (message !== '') {
        lastID += 1;
        let updatedata = '{"id":"' + lastID + '","firstname" : "' 
                        + firstname + '","supporttext":"' + message + '"}';
        const options = {
            method: "post",
            headers: myHeaders,
            body: updatedata
        };

        try {
            let response = await fetch(forumurl, options);
            if (response.status === 201) {
                renderAllRecords();
                displayMessageInChat(message); // Display message in chat
                messageInput.value = '';
            } else {
                alert("Insert Fail");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}

// Function to get the firstname from the query parameter
function getFirstnameFromQuery() {
  const firstname = getQueryVariable('firstname');
  return firstname;
}

async function getAllRecords() {
    const firstname = getFirstnameFromQuery();
    console.log('Firstname from query parameter:', firstname);
    
    const options = {
        method: "get",
        headers: myHeaders
    };
    try {
        let response = await fetch(forumurl + "rows", options);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function renderAllRecords() {
  let response = await getAllRecords();
  console.log('Response Status:', response.status);
  if (response.status === 200) {
    records = await response.json();
    console.log('Records:', records);
    let numberOfRecords = records.count;

    // Get the firstname from the query parameter
    const firstname = getFirstnameFromQuery();
    
    // Sort the records in ascending order based on the "id" field
    records.data.sort((a, b) => a.id - b.id);

    // Clear the existing chat messages
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';

    for (let i = 0; i < numberOfRecords; i++) {
        if(lastID < records.data[i].id) {
            lastID = records.data[i].id;
        }
      let record = records.data[i];
      if (record.firstname === firstname) {
        let message = record.supporttext;
        displayMessageInChat(message);
      }
    }
  } else {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = "Error Reading Records";
  }
}


function displayMessageInChat(message) {
    const chatMessages = document.getElementById('chat-messages');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = "chat-message user-message";
    userMessageDiv.textContent = message;
    
    chatMessages.appendChild(userMessageDiv);
}

function openReplyPage() {
    const firstname = getFirstnameFromQuery();
    
    window.location.href = 'reply.html?firstname=' + encodeURIComponent(firstname);
}

function isAdmin() {
    const firstname = getFirstnameFromQuery();
    return firstname === "admin";
  }

  // Function to toggle the visibility of the "Reply Messages" button based on the caregiver's name
  function toggleReplyButtonVisibility() {
    const replyButton = document.getElementById("reply-button");
    if (isAdmin()) {
      replyButton.style.display = "block";
    } else {
      replyButton.style.display = "none";
    }
  }
  
//hard code parts
function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim().toLowerCase();
    
    if (message !== "") {
        var chatMessages = document.getElementById("chat-messages");
        var responseMessage = "";

        // Create a new user message element
        var userMessage = document.createElement("div");
        userMessage.className = "chat-message user-message";
        userMessage.innerText = message;
        chatMessages.appendChild(userMessage);
        messageInput.value = "";

        // Check user's message and generate appropriate responses
        if (message === "hi") {
            responseMessage = "hello";
        } else if (message === "hello") {
            responseMessage = "hi";
        } else if (message === "how do i donate?") {
            responseMessage = "Press the Take Action button on the Header of the website.";
        } else {
            responseMessage = "Thank you for your message! Our support team will get back to you soon.";
        }

        // Display user message first
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Add a delay before showing the admin's reply
        setTimeout(function() {
            // Create a new admin message element
            var adminMessage = document.createElement("div");
            adminMessage.className = "chat-message admin-message";
            adminMessage.innerText = responseMessage;
            chatMessages.appendChild(adminMessage);

            // Scroll to the bottom of the chat messages
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000); // 1000 milliseconds = 1 second delay
    }
}

function generateAutoReply() {
    var autoReply = "Thank you for your message! Our support team will get back to you soon.";

    // Create a new auto-reply message element
    var autoMessage = document.createElement("div");
    autoMessage.className = "chat-message admin-message"; // Add the "admin-message" class
    autoMessage.innerText = autoReply;

    // Append the auto-reply message to the chat messages container
    var chatMessages = document.getElementById("chat-messages");
    chatMessages.appendChild(autoMessage);

    // Scroll to the bottom of the chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
