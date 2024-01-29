<?php
$url = "https://2167caa1-ba0b-40ae-a400-933e4194b001-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/carbdata/emails";
$token = "AstraCS:BLQQegSskWcnDKNiQiMDbdJc:58e108b9b3bded8ea406342043a9d66eb2402827a73f34d72f1f773cc5b1b53e"; // Replace with your token

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the email from the POST request
    $email = $_POST['email'];

    $data = json_encode(array('email_id' => $email));

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: application/json",
        "X-Cassandra-Token: " . $token,
        "Accept: application/json"
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Method Not Allowed';
}
?>
