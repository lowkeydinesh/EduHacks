<?php
// Allow requests from your frontend domain (replace 'http://your-frontend-domain.com' with your actual domain)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Set headers for authentication
$headers = apache_request_headers();
$x_cassandra_token = $headers["X-Cassandra-Token"];

// Assuming you have the token in the X-Cassandra-Token header
if ($x_cassandra_token !== null) {
    header("X-Cassandra-Token: " . $x_cassandra_token);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $firstname = $_GET['firstname'];
    $password = $_GET['password'];

    // Perform database query and validation
    // ... (Your authentication logic)

    // Example: Check if user exists and password matches
    if ($userExists && $passwordMatches) {
        $response = array('success' => true);
    } else {
        $response = array('success' => false, 'message' => 'Login failed');
    }

    echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $firstname = $data['firstname'];
    $password = $data['password'];

    // Perform database registration
    // ... (Your registration logic)

    // Example: Insert new user data into the database
    if ($registrationSuccessful) {
        $response = array('success' => true);
    } else {
        $response = array('success' => false, 'message' => 'Registration failed');
    }

    echo json_encode($response);
}
?>
