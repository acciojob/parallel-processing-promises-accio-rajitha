//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

 // Attach event listener to the button
    btn.addEventListener("click", () => {
        // Call downloadImages function to start downloading images
        downloadImages(images)
            .then(displayImages)
            .catch(error => {
                console.error(error);
            });
    });

    // Function to download images in parallel
    function downloadImages(images) {
        // Map each image URL to a promise representing its download
        const downloadPromises = images.map(image => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = image.url;
                img.onload = () => resolve(img); // Resolve the promise when image is successfully loaded
                img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`)); // Reject the promise if image fails to load
            });
        });

        // Use Promise.all() to wait for all images to be downloaded
        return Promise.all(downloadPromises);
    }

    // Function to display downloaded images on the webpage
    function displayImages(downloadedImages) {
        // Clear the existing content of the output div
        output.innerHTML = "";
        // Append each downloaded image to the output div
        downloadedImages.forEach(image => {
            output.appendChild(image);
        });
    }

