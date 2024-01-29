/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var proxyUrl = "http://localhost/CSAD_Mini_Project/proxy.php?user=";
  var lastID =0;
    var c =0;
    var url = "https://2167caa1-ba0b-40ae-a400-933e4194b001-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/carbdata/carbon_footprint/";
    var token = "AstraCS:fZthuZRpyhlmgGzKKsMpTcfb:4701e6d53c6e86b451c23d2e38f874779ea55d76ed802c6a63dbcde5ba3f6bd7"; // Replace with the actual Cassandra token
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Cassandra-Token", token);
    myHeaders.append("Accept", "application/json");
    var total, food, travel, home;
    var totalentry, foodentry, travelentry, homeentry;
    var user="abc";
  // Function to retrieve the statistics from the server
// Function to set the firstname value
  function setFirstnameValue(value) {
    user = value;
  }
// ... (existing code) ...

async function getRecordById(user) {
    console.log("Fetching data for user:", user);
    const options = {
        method: "get"
    };
    try {
        let response = await fetch(proxyUrl + user, options);
        console.log("Response status:", response.status);
        return response;

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

async function renderRecordById() {
    console.log("Rendering record by ID...");
    if (user.selectedIndex === 0) {
        console.log("No user selected.");
    } else {
        let response = await getRecordById(user);
        if (response.status === 200) {
            console.log("Data fetched successfully.");
            records = await response.json();
            let numberOfRecords = records.count;
            if (numberOfRecords === 1) {
                selectedId = records.data[0].id;
                total = records.data[0].total_carbon_footprint;
                food = records.data[0].food_carbon_footprint;
                travel = records.data[0].travel_carbon_footprint;
                home = records.data[0].home_carbon_footprint;
        // Get the average ratios from the database response
        totalentry = records.data[0].total_entry_weight;
        foodentry  = records.data[0].food_entry_weight;
        travelentry = records.data[0].travel_entry_weight;
        homeentry = records.data[0].home_entry_weight;
        // Calculate the values based on the average ratios and entry weights
        const valueFood = (food / foodentry).toFixed(1);
        const valueTravel = (travel / travelentry).toFixed(1);
        const valueHome = (home / homeentry).toFixed(1);
        const valueTotal = (parseFloat(valueFood) + parseFloat(valueTravel) + parseFloat(valueHome)).toFixed(1);
                // Create the charts with the retrieved data
                createBarChart('totalChart', [valueTotal, 150, 100, 50], ['You', 'World', 'SEA', 'Singapore'], 'Total Carbon Footprint');
                createPieChart('foodChart', [valueFood, 80, 50, 20], ['You', 'World', 'SEA', 'Singapore'], 'Food Carbon Footprint');
                createBarChart('homeChart', [valueHome, 120, 80, 40], ['You', 'World', 'SEA', 'Singapore'], 'Home Carbon Footprint');
                createRadarChart('travelChart', [valueTravel, 90, 60, 30], ['You', 'World', 'SEA', 'Singapore'], 'Travel Carbon Footprint');
                // Display the data values
                document.getElementById('homeValue').innerText = `Home Carbon Footprint: ${valueHome}`;
                document.getElementById('foodValue').innerText = `Food Carbon Footprint: ${valueFood}`;
                document.getElementById('travelValue').innerText = `Travel Carbon Footprint: ${valueTravel}`;
                document.getElementById('totalValue').innerText = `Total Carbon Footprint: ${valueTotal}`;
            }
        } else {
            console.log("Data not found in the database.");
            alert(user +" is not in the database");
        }
    }
    // Access the firstname value using the global variable
console.log("Firstname:", user);
}

       

 function createBarChart(id, data, labels, title) {
    var ctx = document.getElementById(id).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'], // Customize the chart colors here
          borderColor: 'rgba(75, 192, 192, 1)', // Customize the chart border colors here
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  


 }
 
// Function to create a pie chart
function createPieChart(id, data, labels, title) {
    var ctx = document.getElementById(id).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'], // Customize the chart colors here
                borderColor: 'rgba(255, 255, 255, 0)', // Set border color to be transparent
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Function to create a radar chart
function createRadarChart(id, data, labels, title) {
    var ctx = document.getElementById(id).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'], // Customize the chart colors here
                borderColor: 'rgba(75, 192, 192, 1)', // Customize the chart border colors here
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}
  // Call the function to fetch data and render charts when the page loads
        window.addEventListener('load', () => {
            renderRecordById();
        });
        