<?php
// Construct the URL based on the query string received from client-side
$url = "https://2167caa1-ba0b-40ae-a400-933e4194b001-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/login/users/" . $_SERVER['QUERY_STRING'];

// Use file_get_contents to fetch the remote server's response
$response = file_get_contents($url);

// Output the response to the client-side
echo $response;
?>
