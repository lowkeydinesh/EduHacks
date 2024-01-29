<?php
// Allow requests from your frontend domain (replace 'http://your-frontend-domain.com' with your actual domain)
header("Access-Control-Allow-Origin: *");

// Fetch the RSS feed data from the remote server
$url = "http://wbcsd.org/rss/feed/wbcsd";
$rssData = file_get_contents($url);

// Send the RSS feed data to the frontend
header("Content-Type: application/json");
echo $rssData;
