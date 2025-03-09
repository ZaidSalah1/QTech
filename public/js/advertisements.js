
// Edit Main Ads📸
let adsImages = []; // Images from DB
let uploadedAdsImg = []; // Newly uploaded images

document.addEventListener("DOMContentLoaded", function () {
    fetch('/ads')  // Fetch ads from DB
        .then(response => response.json())
        .then(data => {
            const swiperContainer = document.querySelector('.swiper-wrapper');
            const imgsContainer = document.querySelector('.imgs_container');

            data.forEach(ad => {
                adsImages.push(ad.image_url); // Store DB images

                // Add image to Swiper and make it clickable
                swiperContainer.innerHTML += `
            <div class="swiper-slide ads-swiper-slide">
                <a href="${ad.url_link || '#'}" target="_blank">
                    <img src="${ad.image_url}" alt="Ad Image">
                </a>
            </div>
        `;

                imgsContainer.appendChild(createImageElement(ad.image_url, "db", null, ad.id, ad.url_link));
            });
        })
        .catch(error => console.error("Error fetching ads:", error));
});



// Handle file selection
document.getElementById("mainAdsFileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        uploadedAdsImg.push(file);
        displayUploadedAdsImages();
    }
});

// Function to create image elements (for both DB and uploaded images)
function createImageElement(imageSrc, type, index = null, adId = null, urlLink = "#") {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("main_ads_img");

    // Create the clickable link
    const link = document.createElement("a");
    link.href = urlLink || "#"; // Default to "#" if no link exists
    link.target = "_blank"; // Open in new tab

    // Create the image element
    const img = document.createElement("img");
    img.src = imageSrc;
    img.width = 150;
    img.alt = "Ad Image";

    link.appendChild(img); // Wrap image inside link

    // Create the delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteIcon.style.cursor = "pointer";

    // Create the edit link container
    const editLinkAd = document.createElement("span");
    editLinkAd.classList.add("editLinkAd");
    editLinkAd.style.cursor = "pointer";

    // Create the edit link icon
    const linkIcon = document.createElement("i");
    linkIcon.classList.add("fa-solid", "fa-link");

    // Add text next to the icon
    const linkText = document.createTextNode(" Add Link");

    // Append icon and text to the editLinkAd span
    editLinkAd.appendChild(linkIcon);
    editLinkAd.appendChild(linkText);

    // Show modal when "Add Link" is clicked
    editLinkAd.addEventListener("click", function () {
        openModal(adId); // Open modal with this ad's ID
    });

    // Remove image when delete icon is clicked
    deleteIcon.addEventListener("click", function () {
        if (type === "db") {
            adsImages = adsImages.filter(url => url !== imageSrc);
        } else if (type === "upload" && index !== null) {
            uploadedAdsImg.splice(index, 1);
        }
        displayUploadedAdsImages();
    });

    // Append elements to the container
    imgContainer.appendChild(link); // Make image clickable
    imgContainer.appendChild(deleteIcon);
    imgContainer.appendChild(editLinkAd);

    return imgContainer;
}


// Display uploaded and DB images together
function displayUploadedAdsImages() {
    const imgsContainer = document.querySelector(".imgs_container");
    imgsContainer.innerHTML = ""; // Clear container

    // Re-display DB images
    adsImages.forEach(url => {
        imgsContainer.appendChild(createImageElement(url, "db"));
    });

    // Re-display uploaded images
    uploadedAdsImg.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgsContainer.appendChild(createImageElement(e.target.result, "upload", index));
        };
        reader.readAsDataURL(file);
    });
}

// Handle Upload Button Click
document.querySelector('.btnAd').addEventListener('click', async () => {
    if (uploadedAdsImg.length > 0 || adsImages.length > 0) {
        const uploadedAdsImgURL = [];

        // Upload new images to the server
        for (const file of uploadedAdsImg) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("upload-ads-image", { method: "POST", body: formData });
                const data = await response.json();

                if (data.url) {
                    uploadedAdsImgURL.push(data.url);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        // Combine DB images + newly uploaded image URLs
        const allAdsImages = [...adsImages, ...uploadedAdsImgURL];

        const formDataToSend = {
            ad_type: "big",
            uploadedAdsImgURL: allAdsImages
        };

        const response = await fetch("/upload-ads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataToSend)
        });

        const data = await response.json();
        console.log("Success:", data);
    }
});


// Function to open modal
function openModal(adId) {
    const modal = document.getElementById("linkModal");
    modal.style.display = "flex";  // Show modal
    modal.dataset.adId = adId; // Store ad ID in modal

}

// Function to close modal
function closeModal() {
    document.getElementById("linkModal").style.display = "none";
}

// Close modal when clicking "X"
document.querySelector(".close").addEventListener("click", closeModal);

// Close modal when clicking outside of it
window.addEventListener("click", function (event) {
    const modal = document.getElementById("linkModal");
    if (event.target === modal) {
        closeModal();
    }
});

// Handle Save Button Click
document.getElementById("saveUrl").addEventListener("click", async function () {
    const newUrl = document.getElementById("urlInput").value.trim(); // Get the URL input
    const adId = document.getElementById("linkModal").dataset.adId; // Get stored ad ID

    console.log("New URL:", newUrl);  // Debugging
    console.log("Ad ID:", adId);  // Debugging

    if (newUrl && adId) {
        try {
            const response = await fetch(`/ads/${adId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url_link: newUrl })  // FIXED: Ensure correct key name
            });

            const data = await response.json();
            console.log("Response Data:", data);

            if (data.message) {
                alert(`Ad link updated successfully for Ad ID: ${adId}`);
                closeModal(); // Close modal after saving
            } else {
                alert("Failed to update link.");
            }
        } catch (error) {
            console.error("Error updating ad link:", error);
        }
    } else {
        alert("Please enter a valid URL.");
    }
});




document.addEventListener("DOMContentLoaded", function () {
    fetch('/bannerAds')
        .then(response => response.json())
        .then(data => {
            const bannerContainer = document.querySelector('.bannerContainer');
            data.forEach(banner => {
                bannerContainer.innerHTML += `
                <div class="banner_img" data-banner-id="${banner.id}">
                    <div class="image_wrapper">
                        <a href="${banner.url_link || '#'}" target="_blank">
                            <img src="${banner.image_url}" alt="Ad Image">
                        </a>
                        <span class="edit_banner_ads"><i class="fa-regular fa-pen-to-square"></i></span>
                        <span class="editBannerUrl">
                            <i class="fa-solid fa-link"></i> Add Link
                        </span>
                    </div>
                </div>
            `;
            });

            const editBannerUrlButtons = document.querySelectorAll('.editBannerUrl'); // Select all edit URL buttons
            const fileInput = document.getElementById('bannerFileInput'); // File input for image selection

            // Loop over each editBannerUrl button and add click event listener
            editBannerUrlButtons.forEach(button => {
                button.addEventListener("click", (event) => {
                    let banner = event.target.closest(".banner_img");
                    if (banner) {
                        selectedBannerId = banner.getAttribute("data-banner-id");
                        openBannerModal(selectedBannerId); // Open modal with the correct banner ID
                    }
                });
            });

            // Save URL when clicking "Save"
            document.getElementById("saveBannerUrl").addEventListener("click", () => {
                const newUrl = document.getElementById("urlBannerInput").value.trim(); // Get the URL input

                if (!selectedBannerId) {
                    console.error("No banner selected.");
                    return;
                }

                if (!newUrl) {
                    console.error("No URL entered.");
                    return;
                }

                // Send the updated URL to the database
                fetch(`/ads/${selectedBannerId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url_link: newUrl }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);

                        // Close the modal after saving
                        closeBanneModal();
                    })
                    .catch(error => {
                        console.error("Error updating ad URL:", error);
                    });
            });
        });

    // Function to open modal
    function openBannerModal(bannerId) {
        document.getElementById("linkBannerModal").style.display = "flex"; // Show modal
        console.log("Clicked Banner ID:", bannerId);
    }

    // Function to close modal
    function closeBanneModal() {
        document.getElementById("linkBannerModal").style.display = "none";
    }

    // Close modal when clicking "X"
    document.querySelector(".close").addEventListener("click", closeBanneModal);

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        const modal = document.getElementById("linkBannerModal");
        if (event.target === modal) {
            closeBanneModal();
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let selectedCardId = null; // Move this here so it's accessible to the whole script

    fetch('/cardAds')
        .then(response => response.json())
        .then(data => {
            const cardAdsContainer = document.querySelector('.cardAds');
            data.forEach(card => {
                cardAdsContainer.innerHTML += `
                <div class="cardImgContainer" data-card-id="${card.id}">
                    <img class="cardImg" src="${card.image_url}">
                    <span class="editCardAd"><i class="fa-regular fa-pen-to-square"></i></span>
                    <span class="editCardUrl">
                        <i class="fa-solid fa-link"></i> Add Link
                    </span>
                </div>
            `;
            });

            const editIcons = document.querySelectorAll('.editCardAd');
            const fileInput = document.getElementById('cardFileInput');
            let selectedImage = null;

            editIcons.forEach(icon => {
                icon.addEventListener('click', function () {
                    selectedImage = icon.closest('.cardImgContainer').querySelector('.cardImg');
                    fileInput.click();
                });
            });

            fileInput.addEventListener('change', function (event) {
                if (!selectedImage) return;

                const selectedFile = event.target.files[0];
                const cardImgId = selectedImage.getAttribute('data-card-id');

                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile);

                    fetch('/upload-ads-image', {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.url) {
                                const newImageUrl = data.url;
                                selectedImage.src = newImageUrl;
                                return fetch('/update-card-image', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        bannerId: cardImgId,
                                        newImageUrl: newImageUrl,
                                    })
                                });
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data.message);
                        })
                        .catch(error => {
                            console.error("Error uploading/updating the image:", error);
                        });
                }
            });

            // Click event to open the modal and store card ID
            document.querySelectorAll('.editCardUrl').forEach(editBtn => {
                editBtn.addEventListener("click", function (event) {
                    let cardContainer = event.target.closest(".cardImgContainer");
                    if (cardContainer) {
                        selectedCardId = cardContainer.getAttribute("data-card-id");
                        openCardModal(selectedCardId);
                    }
                });
            });
        })
        .catch(error => console.error("Error fetching card ads:", error));

    // Click event for saving the URL
    document.getElementById("saveCardUrl").addEventListener("click", () => {
        const newUrl = document.getElementById("urlCardInput").value.trim(); // Get the URL input

        if (!selectedCardId) {
            console.error("No card selected.");
            return;
        }

        if (!newUrl) {
            console.error("No URL entered.");
            return;
        }

        // Send the updated URL to the database
        fetch(`/ads/${selectedCardId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url_link: newUrl }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                closeCardModal(); // Close the modal after saving
            })
            .catch(error => {
                console.error("Error updating ad URL:", error);
            });
    });

});

// Function to open modal
function openCardModal(cardId) {
    document.getElementById("linkCardModal").style.display = "flex"; // Show modal
    console.log("Clicked Card ID:", cardId);
}

// Function to close modal
function closeCardModal() {
    document.getElementById("linkCardModal").style.display = "none";
}

// Close modal when clicking "X"
document.querySelector(".close").addEventListener("click", closeCardModal);

// Close modal when clicking outside of it
window.addEventListener("click", function (event) {
    const modal = document.getElementById("linkCardModal");
    if (event.target === modal) {
        closeCardModal();
    }
});


