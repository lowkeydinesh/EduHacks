// Function to fetch the RSS feed from the PHP proxy
async function fetchRSS() {
  try {
    const response = await fetch('http://localhost/CSAD_Mini_Project/rss-proxy.php');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(xmlText, 'application/xml');
    return xmlDOM;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return null;
  }
}

// Function to extract headlines and images from the RSS feed and display them on the page
async function displayHeadlines() {
  const xmlDOM = await fetchRSS();
  if (!xmlDOM) return;

  const headlinesContainer = document.getElementById('headlines');

  const items = xmlDOM.querySelectorAll('item');
  items.forEach(item => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const imageElement = item.querySelector('enclosure');
    const image = imageElement ? imageElement.getAttribute('url') : ''; // Use empty string if the image URL is not available

    const card = document.createElement('div');
    card.className = 'card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    // Create an <a> element to link to the article
    const articleLink = document.createElement('a');
    articleLink.href = link;

    // Create an <img> element for the image or use a placeholder icon image if the image URL is not available
    const imageTag = document.createElement('img');
    imageTag.src = image || "images/icon.png"; // Use the placeholder icon image if the image URL is empty

    // Set alt attribute for the image
    imageTag.alt = "No image found"; // Use the headline as the alt text

    // Append the image element to the <a> element
    articleLink.appendChild(imageTag);

    // Append the <a> element to the image container
    imageContainer.appendChild(articleLink);

    card.appendChild(imageContainer);

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;
    cardContent.appendChild(cardTitle);

    const cardLink = document.createElement('div');
    cardLink.className = 'card-link';
    const linkElement = document.createElement('a');
    linkElement.textContent = 'Read Article';
    linkElement.href = link;
    cardLink.appendChild(linkElement);
    cardContent.appendChild(cardLink);

    card.appendChild(cardContent);
    headlinesContainer.appendChild(card);
  });
}

// Call the displayHeadlines function when the DOM is ready
document.addEventListener('DOMContentLoaded', displayHeadlines);
