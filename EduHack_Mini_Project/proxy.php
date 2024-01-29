
<?php
$url = "https://2167caa1-ba0b-40ae-a400-933e4194b001-asia-south1.apps.astra.datastax.com/api/rest/v2/keyspaces/carbdata/carbon_footprint/";
$token = "AstraCS:fZthuZRpyhlmgGzKKsMpTcfb:4701e6d53c6e86b451c23d2e38f874779ea55d76ed802c6a63dbcde5ba3f6bd7"; // Replace with your token

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url . $_GET['user']);
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
