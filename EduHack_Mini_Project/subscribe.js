 
 var lastID =0;
    var selectedId =0;
    var url = "https://2167caa1-ba0b-40ae-a400-933e4194b001-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/carbdata/emails";
    var token = "AstraCS:BLQQegSskWcnDKNiQiMDbdJc:58e108b9b3bded8ea406342043a9d66eb2402827a73f34d72f1f773cc5b1b53e"; // Replace with the actual Cassandra token
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Cassandra-Token", token);
    myHeaders.append("Accept", "application/json");
var email;
  // Function to re

  // Function to handle form submission
  function subscribeq() {
    // Get the email input element
    var emailInput = document.getElementById("email");

    // Get the value of the email entered by the user
   email = emailInput.value;

    // Validate the email address
    if (validateEmail( email)) {
      // Email is valid, proceed with subscription (you can add your subscription logic here)
      saveRecord(email);
      closeModal(); // Close the modal after successful subscription
    } else {
      // Email is not valid, show an error message
      alert("Please enter a valid email address.");
    }
  }

  // Function to validate the email address
  function validateEmail(email) {
    // Add your email validation logic here if needed
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  // Function to open charts page in a new window
        document.getElementById("showChartsButton").addEventListener("click", function() {
            window.location.href= "Stats.html";
        });  // Function to open charts page in a new window
        document.getElementById("main").addEventListener("click", function() {
            window.location.href= "header.html";
        });document.getElementById("contact").addEventListener("click", function() {
            window.location.href= "contact.html";
        });
        // Add an event listener to the subscribe button

//retrieve the statistics from the server
// Function to set the firstname value
 
async function getAllRecords(){
    const options={
        method: "get",
        headers: myHeaders
    };
    try{
        let response = await fetch(url);
        return response;
        
    }catch (error){
        console.log(error);
    }
}
async function renderAllrecords(){
        console.log("Rendering all records...");

    let response = await getAllRecords();
    if (response.status ===200){
        console.log("Data fetched successfully.");

        records= await response.json();
        let numberOfRecords = records.count;
    }else {
        console.log("Error reading Records");
    }
}
async function saveRecord(email) {
  let updatedata = '{ "email_id": "' + email + '"}';
  const options = {
    method: "post",
    headers: myHeaders,
    body: updatedata
  };
  try {
    let response = await fetch(url, options); // Pass both the URL and options to fetch
    if (response.status === 201) {
      renderAllrecords();
    alert("Thank you for subscribing!");
    } else {
      const errorMessage = "Error uploading email: " + email+" Try Again Later ";
      console.error(errorMessage);
      alert(errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
}

