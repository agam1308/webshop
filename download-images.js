const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { name: 'headphones.jpg', text: 'Wireless Headphones' },
  { name: 'smartwatch.jpg', text: 'Smart Watch' },
  { name: 'laptop-stand.jpg', text: 'Laptop Stand' },
  { name: 'running-shoes.jpg', text: 'Running Shoes' },
  { name: 'yoga-mat.jpg', text: 'Yoga Mat' },
  { name: 'tshirt.jpg', text: 'Cotton T-Shirt' },
  { name: 'jeans.jpg', text: 'Denim Jeans' },
  { name: 'plant-pots.jpg', text: 'Plant Pots' },
  { name: 'desk-lamp.jpg', text: 'LED Desk Lamp' },
  { name: 'book.jpg', text: 'Programming Book' }
];

const downloadImage = (filename, text) => {
  // Using loremflickr.com to get real photos based on keywords
  // Format: https://loremflickr.com/width/height/keyword1,keyword2
  // We use the text as keywords (removing spaces)
  const keywords = text.toLowerCase().replace(/ /g, ',');
  const url = `https://loremflickr.com/800/800/${keywords}/all`;
  
  const filePath = path.join('public', 'images', filename);
  
  const file = fs.createWriteStream(filePath);
  https.get(url, (response) => {
    // LoremFlickr redirects to the actual image
    if (response.statusCode === 301 || response.statusCode === 302) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
            redirectUrl = `https://loremflickr.com${redirectUrl}`;
        }
        
        https.get(redirectUrl, (redirectResponse) => {
            redirectResponse.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename} (Real Photo)`);
            });
        }).on('error', (err) => {
            fs.unlink(filename);
            console.error(`Error downloading ${filename}:`, err.message);
        });
        return;
    }
    
    if (response.statusCode !== 200) {
        console.error(`Failed to download ${filename}: Status ${response.statusCode}`);
        return;
    }
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename} (Real Photo)`);
    });
  }).on('error', (err) => {
    fs.unlink(filename);
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

if (!fs.existsSync(path.join('public', 'images'))) {
    fs.mkdirSync(path.join('public', 'images'), { recursive: true });
}

images.forEach(img => downloadImage(img.name, img.text));
