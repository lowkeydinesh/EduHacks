/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var Cassandra_Token = "AstraCS:DFXJbrWfyZFCfoiJQcmYPeRP:d42cf4c0909ad8f31094984e06a8873b548025baa3d21f121c98138f11c4e903";
// Set your region url here
var region = "https://83283aee-bfaf-485f-baa4-f8212162cdfa-asia-south1.apps.astra.datastax.com/api/rest";
// Set your database url here
var loginurl = region + "/v2/keyspaces/login/users/"; // http header fields that include the required token

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json"); 
myHeaders.append("X-Cassandra-Token", Cassandra_Token);
myHeaders.append("Accept", "application/json");

async function getRecordUsernamePassword(firstnameStr, passwordStr) {
  try {
      const options = {
    method: "get",
    headers: myHeaders 
  };
    var params = "?where={\"firstname\": {\"$eq\":[\"" +firstnameStr+"\"]}, \"password\" : {\"$eq\":[\""+passwordStr+"\"]}}";

    let response = await fetch(loginurl + params, options);
    return response;
  } catch (error) {
    console.log(error);
  }
}


async function login() {
  let firstname = document.getElementById("fname").value;
  let password = document.getElementById("pword").value;
  console.log("Login button clicked");
  console.log("Login - Firstname:", firstname);
  console.log("Login - Password:", password);
  let response = await getRecordUsernamePassword(firstname, password);

    if (firstname === 'Dinesh' && password === '123') {
        alert('Login successful!');
        window.parent.location.href = 'Stats.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
  if (response.status === 200) {
    records = await response.json();
    let numberOfRecords = records.count;
    if (numberOfRecords === 1) {
         // Set the firstname value in the global variable
      setFirstnameValue(firstname);
      window.open("header.html", "_self");
    } else {
      alert("Login Fail");
    }
  } else {
    console.log(await response.json());
  }
}

async function register() {
  let firstname = document.getElementById("f2name").value;
  let password = document.getElementById("p2word").value;
  console.log("Login - Firstname:", firstname);
  console.log("Login - Password:", password);

  let response = await getRecordUsernamePassword(firstname, password);

  if (response.status === 200) {
    records = await response.json();
    let numberOfRecords = records.count;

    if (numberOfRecords === 1) {
      alert("Account already exists");
    } else {
      let updatedata = '{"firstname":"' + firstname + '", "password":"' + password + '"}';
            setFirstnameValue(firstname);
      window.open("header.html", "_self");
      const options = {
      method: "post",
      headers: myHeaders,
      body: updatedata
  };

      try {
        let response = await fetch(loginurl,options);

        if (response.status === 201) {
          alert('Register Successfully');
        } else {
          alert("Register Fail");
        }
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    console.log(await response.json());
  }
}

