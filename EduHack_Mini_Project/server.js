/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/api/rss', async (req, res) => {
  try {
    const apiUrl = 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416';
    const response = await axios.get(apiUrl);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching the RSS feed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
