//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// Function to download and display images
function downloadAndDisplayImages(images) {
  // Clear the existing content in the output div
  output.innerHTML = '';

  // Create promises for each image download
  const promises = images.map(image => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        // Once image is loaded, append it to the output div
        output.appendChild(img);
        resolve();
      };
      img.onerror = () => {
        // If image fails to load, reject the promise with an error
        reject(new Error(`Failed to load image's URL: ${image.url}`));
      };
    });
  });

  // Return a promise that resolves when all images are downloaded and displayed
  return Promise.all(promises);
}

// Add click event listener to the button
btn.addEventListener("click", () => {
  // Call the function to download and display images
  downloadAndDisplayImages(images)
    .then(() => {
      console.log("Images downloaded and displayed successfully.");
    })
    .catch(error => {
      console.error("Error downloading and displaying images:", error.message);
    });
});




