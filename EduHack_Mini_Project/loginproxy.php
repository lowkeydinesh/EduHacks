<?php
$url = "https://2167caa1-ba0b-40ae-a400-933e4194b001-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/login/users/";
$token = "AstraCS:BLQQegSskWcnDKNiQiMDbdJc:58e108b9b3bded8ea406342043a9d66eb2402827a73f34d72f1f773cc5b1b53e"; // Replace with your token

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url . '?' . $_SERVER['QUERY_STRING']);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "X-Cassandra-Token: " . $token,
    "Accept: application/json"
));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
