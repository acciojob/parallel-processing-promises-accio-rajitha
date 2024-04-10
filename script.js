//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// Function to download images
function downloadImages(imageUrls) {
  return Promise.all(imageUrls.map(({url}) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
      img.src = url;
    });
  }));
}

// Function to display images on the webpage
function displayImages(images) {
  const output = document.getElementById("output");
  output.innerHTML = ''; // Clear previous images
  images.forEach(img => {
    output.appendChild(img);
  });
}

// Event listener for button click
const btn = document.getElementById("download-images-button");
btn.addEventListener('click', () => {
  downloadImages(images)
    .then(images => {
      displayImages(images);
    })
    .catch(error => {
      console.error('Error downloading images:', error);
    });
});
