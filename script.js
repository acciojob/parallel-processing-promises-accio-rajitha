//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadAndDisplayImages(images) {
        const promises = [];

        images.forEach(image => {
          const promise = new Promise((resolve, reject) => {
            fetch(image.url)
              .then(response => {
                if (!response.ok) {
                  reject(new Error(`Failed to load image's URL: ${image.url}`));
                }
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                output.appendChild(imgElement);
                resolve();
              })
              .catch(error => {
                reject(error);
              });
          });

          promises.push(promise);
        });

        return Promise.all(promises);
      }

      btn.addEventListener("click", () => {
        downloadAndDisplayImages(images)
          .then(() => {
            console.log("All images downloaded successfully.");
          })
          .catch(error => {
            console.error("Error downloading images:", error.message);
          });
      });

