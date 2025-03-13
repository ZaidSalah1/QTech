// import { response } from "express";

// const { response } = require("express");


// =================== 🚀🚀🚀 Editing Section Start 🚀🚀🚀 =================== \\


let selectedImagesArray = [];
let currProductId = null;
// Fetch and display products

const products_div = document.getElementById("products_dev");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let offset = 0;
const limit = 15; // Number of products per batch
function getProducts() {
    fetch(`/products2?limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const images = product.images || [];
                let img1 = product.images[0] || 'default.jpg';
                let img2 = product.images[1] || img1;

                img1 = img1.startsWith("https") ? img1 : `${img1}`;
                img2 = img2.startsWith("https") ? img2 : `${img2}`;

                let priceHTML = `
                <div class="price">
                    <p><span>₪${product.price}</span></p>
                </div>
            `;

                if (product.discount && product.discount < product.price && product.discount != 0) {
                    priceHTML = `
                    <div class="price">
                        <p class="discounted_price">₪${product.discount}</p>
                        <p class="old_price"><s>₪${product.price}</s></p>
                    </div>
                `;
                }

                products_div.innerHTML += `
                <div class="product" data-product-id="${product.id}">  
                    <div class="img_product">
                        <img src="${img1}" alt="">
                        <img class="img_hover" src="${img2}" alt="">
                    </div>
                    <h3 class="name_product">
                        ${product.name}
                    </h3>
                    ${priceHTML}
                    <div class="edit_btn">
                        Edit <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
            `;
            });

            offset += limit;

            // Add event listeners to the "Edit" buttons
            const editButtons = document.querySelectorAll('.edit_btn');

            editButtons.forEach((btn) => {
                btn.addEventListener('click', function () {
                    // Get product ID (from the data attribute)
                    const productId = this.closest('.product').getAttribute('data-product-id');
                    console.log("Editing product ID:", productId); // Debugging line

                    // Show the edit product window
                    productsContent.style.display = 'none';
                    editProductWindow.style.display = 'block';

                    // Fetch product details
                    fetch(`/product/${productId}`)
                        .then(response => response.json())
                        .then(product => {
                            console.log("Product details from backend:", product);
                            currProductId = productId; // Set the current product ID
                            // Populate the form fields
                            document.getElementById('editProductName').value = product.name;
                            document.getElementById('editProductDescription').value = product.description;
                            document.getElementById('editBasePricing').value = product.price;
                            document.getElementById('editStock').value = product.quantity;
                            document.getElementById('editDiscount').value = product.discount;

                            // Fetch and populate product types
                            fetch('/productTypes')
                                .then(response => response.json())
                                .then(productTypes => {
                                    const select = document.getElementById('editProductTypeSelect');
                                    select.innerHTML = '<option value="0">Select a Product Type</option>'; // Clear existing options

                                    productTypes.forEach(productType => {
                                        const option = document.createElement('option');
                                        option.value = productType.id;
                                        option.textContent = productType.name;
                                        select.appendChild(option);
                                    });

                                    select.value = product.product_type_id; // Set selected value for product type
                                })
                                .catch(error => console.error("Error fetching product types:", error));

                            selectedImagesArray = product.images;

                            const selectedImages = document.querySelector('.selected-images-edit');

                            selectedImages.innerHTML = `
                            <div class="image-container">
                                <div class="bigImgContainer">
                                    <img src="${selectedImagesArray[0] instanceof File ? URL.createObjectURL(selectedImagesArray[0]) : selectedImagesArray[0]}" 
                                        class="big-img" 
                                        alt="Selected Image">
                                    <span class="removeBigImg">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </span>
                                </div>
                                
                                <div class="small-img">
                                    ${selectedImagesArray.slice(1).map((fileOrUrl, index) => {
                                const imageUrl = fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
                                return `
                                            <div class="smallImgContainer">
                                                <img src="${imageUrl}" class="img small-img" alt="Preview ${index + 1}">
                                                <span class="removeSmallImg" data-index="${index + 1}">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </span>
                                            </div>
                                        `;
                            }).join('')}
                                    <div class="add-boxV2" onclick="document.getElementById('editAdditionalFileInput').click()">
                                        <span>+</span>
                                    </div>
                                </div>
                            </div>
                        `;

                            // Add event listeners after rendering
                            document.querySelector('.removeBigImg')?.addEventListener('click', removeEditBigImage);
                            document.querySelectorAll('.removeSmallImg').forEach(item => {
                                item.addEventListener('click', function () {
                                    const index = parseInt(this.getAttribute('data-index'));
                                    removeEditSmallImage(index);
                                });
                            });

                        })
                        .catch(error => console.error("Error fetching product details:", error));
                });
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}
getProducts();
// Load more products when button is clicked
loadMoreBtn.addEventListener("click", getProducts);



document.getElementById('edit_Product_Form').addEventListener('submit', async function (event) {
    event.preventDefault();

    showLoadingAnimation();

    const updatedProduct = {
        name: document.getElementById('editProductName').value,
        description: document.getElementById('editProductDescription').value,
        price: parseFloat(document.getElementById('editBasePricing').value),
        quantity: parseInt(document.getElementById('editStock').value),
        type_id: parseInt(document.getElementById('editProductTypeSelect').value),
        discount: Number.isInteger(parseInt(document.getElementById("editDiscount").value))
            ? parseInt(document.getElementById("editDiscount").value)
            : 0,

        images: selectedImagesArray.filter(img => typeof img === "string") // Only keep valid URLs
    };

    if (selectedImagesArray.length > 0) {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const uploadedURLs = await uploadEditFiles(selectedImagesArray);
            updatedProduct.images.push(...uploadedURLs);
            await sendEditFormData(updatedProduct, currProductId); // Send the form data to the server
            // alert("Product UPDATED successfully!");
            hideLoadingAnimation();

            closeModal(); // Close the modal
        } catch (error) {
            console.error("Error:", error);
            hideLoadingAnimation();
            alert("Error Updating product. Please try again.");
        }
    } else {
        console.log("No images selected.");
        hideLoadingAnimation();
        alert("Please select at least one image.");
    }


});


// Function to upload files and return their URLs
async function uploadEditFiles(files) {
    const uploadedURLs = [];

    for (const file of files) {
        if (!(file instanceof File)) {
            // Skip URLs, only upload new files
            uploadedURLs.push(file);
            continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/upload-image", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                console.error("Upload failed:", response.statusText);
                continue;
            }

            const data = await response.json();
            if (data.url) {
                uploadedURLs.push(data.url);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return uploadedURLs;
}

// Function to send form data to the server
async function sendEditFormData(formData, productId) {
    const response = await fetch(`/updateProduct2/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    showSuccessEditModal();
    return data;
}


// Function to handle file selection for editing product images
function handleEditFileSelect(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file && file instanceof File) {
        selectedImagesArray.push(file); // Store the File object
        updateEditImagePreview(); // Update the preview
    } else {
        console.error("The selected file is invalid.");
    }
}


function updateEditImagePreview() {
    const selectedImages = document.querySelector('.selected-images-edit');

    if (selectedImagesArray.length > 0) {
        // First image as big preview (handling both new File objects and existing URLs)
        const bigImageUrl = selectedImagesArray[0] instanceof File
            ? URL.createObjectURL(selectedImagesArray[0])
            : selectedImagesArray[0];

        // Small images preview
        const smallImagesHtml = selectedImagesArray.slice(1).map((fileOrUrl, index) => {
            const imageUrl = fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
            return `
                <div class="smallImgContainer">
                    <img src="${imageUrl}" alt="Preview ${index + 1}" class="small-img">
                    <span class="removeSmallImg" data-index="${index + 1}">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                </div>
            `;
        }).join('');

        // Updating the image container
        selectedImages.innerHTML = `
            <div class="image-container">
                <div class="bigImgContainer">
                    <img src="${bigImageUrl}" class="big-img" alt="Selected Image">
                    <span class="removeBigImg">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                </div>
                
                <div class="small-img">
                    ${smallImagesHtml}
                    <div class="add-boxV2" onclick="document.getElementById('editAdditionalFileInput').click()">
                        <span>+</span>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners after rendering
        document.querySelector('.removeBigImg').addEventListener('click', removeEditBigImage);
        document.querySelectorAll('.removeSmallImg').forEach(item => {
            item.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                removeEditSmallImage(index);
            });
        });
    } else {
        selectedImages.innerHTML = ""; // Clear if no images
    }
}

// Function to remove the big image and update the main image to the next in the array
function removeEditBigImage() {
    selectedImagesArray.shift(); // Remove first (big) image
    // If there are still images, set the new first image as the main one
    if (selectedImagesArray.length > 0) {
        updateEditImagePreview(); // Refresh UI
    } else {
        const selectedImages = document.querySelector('.selected-images-edit');
        selectedImages.innerHTML = `
                <div class="add-box" onclick="document.getElementById('editAdditionalFileInput').click()">
                            <span><i class="fa-solid fa-camera"></i></span>
                        </div>
                        <img id="previewImageMain"
                            style="display: none; width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">
                        <input type="file" id="editAdditionalFileInput" style="display: none;" accept="image/*">
        `;
        document.getElementById('editAdditionalFileInput').addEventListener('change', handleEditFileSelect);
    }
}

// Function to remove a small image and update the preview
function removeEditSmallImage(index) {
    selectedImagesArray.splice(index, 1); // Remove selected small image
    updateEditImagePreview(); // Refresh UI
}




// Create additional file input dynamically for editing images
const editAdditionalFileInput = document.createElement('input');
editAdditionalFileInput.type = 'file';
editAdditionalFileInput.id = 'editAdditionalFileInput';
editAdditionalFileInput.style.display = 'none';
editAdditionalFileInput.accept = 'image/*';
editAdditionalFileInput.addEventListener('change', handleEditFileSelect);
document.body.appendChild(editAdditionalFileInput);



// // Function to update the image preview when editing
// function updateEditImagePreview() {
//     const selectedImages = document.querySelector('.selected-images-edit');
//     if (selectedImagesArray.length > 0) {
//         // Handle big image preview
//         const bigImageUrl = selectedImagesArray[0] instanceof File
//             ? URL.createObjectURL(selectedImagesArray[0])
//             : selectedImagesArray[0];

//         // Handle small images preview
//         const smallImagesHtml = selectedImagesArray.slice(1).map((fileOrUrl, index) => {
//             const imageUrl = fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
//             return `<img src="${imageUrl}" alt="Preview ${index + 1}">`;
//         }).join('');

//         selectedImages.innerHTML = `
//             <div class="image-container">
//                 <img src="${bigImageUrl}" class="big-img" alt="Selected Image">
//                 <div class="small-img">
//                     ${smallImagesHtml}
//                     <div class="add-boxV2" onclick="document.getElementById('editAdditionalFileInput').click()">
//                         <span>+</span>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// }


// =================== 🏁🏁🏁 Section Editing product Finished 🏁🏁🏁 =================== \\
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
// =================== 🚀🚀🚀 Adding Section Start 🚀🚀🚀 =================== \\

// Function to handle file selection

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        selectedImagesArray.push(file); // Add to array
        updateImagePreview(); // Refresh preview
    }
}

// Function to update the image preview
function updateImagePreview() {
    const selectedImages = document.querySelector('.selected-images');

    if (selectedImagesArray.length > 0) {
        const bigImageUrl = URL.createObjectURL(selectedImagesArray[0]); // First image as big preview
        const smallImagesHtml = selectedImagesArray.slice(1).map((file, index) => `
            <div class="smallImgContainer">
                <img src="${URL.createObjectURL(file)}" alt="Preview ${index + 1}" class="small-img">
                <span class="removeSmallImg" data-index="${index + 1}">
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </div>
        `).join('');

        selectedImages.innerHTML = `
            <div class="image-container">
                <div class="bigImgContainer">
                    <img src="${bigImageUrl}" class="big-img" alt="Selected Image">
                    <span class="removeBigImg">
                        <i class="fa-solid fa-trash-can"></i>
                    </span>
                </div>
                
                <div class="small-img">
                    ${smallImagesHtml}
                    <div class="add-boxV2" onclick="document.getElementById('additionalFileInput').click()">
                        <span>+</span>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners after rendering
        document.querySelector('.removeBigImg').addEventListener('click', removeBigImage);
        document.querySelectorAll('.removeSmallImg').forEach(item => {
            item.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                removeSmallImage(index);
            });
        });
    } else {
        selectedImages.innerHTML = ""; // Clear if no images
    }
}

// Function to remove the big image and update the main image to the next in the array
function removeBigImage() {
    selectedImagesArray.shift(); // Remove first (big) image
    // If there are still images, set the new first image as the main one
    if (selectedImagesArray.length > 0) {
        updateImagePreview(); // Refresh UI
    } else {
        const selectedImages = document.querySelector('.selected-images');
        selectedImages.innerHTML = `
                <div class="add-box" onclick="document.getElementById('fileInput').click()">
                            <span><i class="fa-solid fa-camera"></i></span>
                        </div>
                        <img id="previewImageMain"
                            style="display: none; width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">
                        <input type="file" id="fileInput" style="display: none;" accept="image/*">
        `;
        document.getElementById('fileInput').addEventListener('change', handleFileSelect);
    }
}

// Function to remove a small image and update the preview
function removeSmallImage(index) {
    selectedImagesArray.splice(index, 1); // Remove selected small image
    updateImagePreview(); // Refresh UI
}


// Function to trigger additional file input
function addAdditionalImage() {
    document.getElementById('additionalFileInput').click();
}

// Create additional file input dynamically
const additionalFileInput = document.createElement('input');
additionalFileInput.type = 'file';
additionalFileInput.id = 'additionalFileInput';
additionalFileInput.style.display = 'none';
additionalFileInput.accept = 'image/*';
additionalFileInput.addEventListener('change', handleFileSelect);
document.body.appendChild(additionalFileInput);

// Attach event listener to the main file input
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

// Handle form submission
document.getElementById('add_Product_Form').addEventListener('submit', async function (event) {
    event.preventDefault();

    showLoadingAnimation();

    // Prepare form data
    const formData = {
        name: document.getElementById("productName").value,
        price: parseFloat(document.getElementById("basePricing").value),
        description: document.getElementById("productDescription").value,
        quantity: parseInt(document.getElementById("Stock").value),
        discount: document.getElementById("discount").value.trim() !== ""
            ? parseInt(document.getElementById("discount").value)
            : 0,

        type_id: parseInt(document.getElementById("productTypeSelect").value),
        images: [] // Will be populated with image URLs
    };

    console.log("discount--->", parseFloat(document.getElementById("discount").value));

    // Upload images and get their URLs
    if (selectedImagesArray.length > 0) {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const uploadedURLs = await uploadFiles(selectedImagesArray);
            formData.images.push(...uploadedURLs);
            await sendFormData(formData); // Send the form data to the server
            // alert("Product added successfully!");
            hideLoadingAnimation();

            //closeModal(); // Close the modal
        } catch (error) {
            console.error("Error:", error);
            hideLoadingAnimation();
            alert("Error adding product. Please try again.");
        }
    } else {
        console.log("No images selected.");
        alert("Please select at least one image.");
        hideLoadingAnimation();
    }
});

// Function to upload files and return their URLs
async function uploadFiles(files) {
    const uploadedURLs = [];
    for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/upload-image", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.url) {
            uploadedURLs.push(data.url);
        }
    }
    return uploadedURLs;
}

// Function to send form data to the server
async function sendFormData(formData) {
    const response = await fetch("/add-product2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        // Hide the loading animation after success
        hideLoadingAnimation();
        // Show the success modal
        showSuccessModal();
        getProducts();
    }
}





// Function to close the modal
function closeModal() {
    const modal = document.getElementById("addProductWindow"); // Replace "addProductWindow" with your modal's ID
    if (modal) {
        modal.style.display = "none";
    }
}

// =================== 🏁🏁🏁 Section Adding product Finished 🏁🏁🏁 =================== \\
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
// =================== 🚀🚀🚀 Orders Section Start 🚀🚀🚀 =================== \\


// Function to fetch and display orders
function displayOrders(filter = "All Orders") {
    const ordersSection = document.getElementById("orders-section");

    // Set the initial HTML structure for the orders section
    ordersSection.innerHTML = `
        <h1 style="color: #033b4a;">Orders</h1>
        <div class="tab-container">
            <div class="tab-buttons">
                <button class="tab-button ${filter === "All Orders" ? "active" : ""}" data-filter="All Orders">All Orders</button>
                <button class="tab-button ${filter === "Pending" ? "active" : ""}" data-filter="Pending">Pending</button>
                <button class="tab-button ${filter === "In Progress" ? "active" : ""}" data-filter="In Progress">In Progress</button>
                <button class="tab-button ${filter === "Delivered" ? "active" : ""}" data-filter="Delivered">Delivered</button>
                <button class="tab-button ${filter === "Cancelled" ? "active" : ""}" data-filter="Cancelled">Cancelled</button>
            </div>
        </div>
        
         <!-- Dropdown for smaller screens -->
       <div class="filter-container">
            <label for="order-filter-dropdown"><i class="fa-solid fa-filter"></i> Filter Orders:</label>
            <select id="order-filter-dropdown" class="custom-dropdown">
                <option value="All Orders">All Orders</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
            </select>
        </div>


        <div class="order-list"></div> <!-- Add the order-list container -->
    `;

    const orderList = ordersSection.querySelector(".order-list");

    // Fetch orders from the server
    fetch("/orders")
        .then(response => response.json())
        .then(orders => {
            // if (orders.length > 0) {
            //     ordersSection.style.display = "block";
            // }

            // Clear existing orders
            orderList.innerHTML = "";

            // Filter orders based on the selected filter
            const filteredOrders = orders.filter(order =>
                filter === "All Orders" || order.status === filter
            );

            // Sort orders by order_date (descending) in case there is any issue with the backend
            // Sort orders by order_date (newest to oldest)
            const sortedOrders = [...filteredOrders].sort((a, b) => {
                return new Date(b.order_date).getTime() - new Date(a.order_date).getTime();
            });

            // Loop through each order and generate HTML
            sortedOrders.forEach(order => {
                const productNames = order.items.map(item => `- ${item.product_name}`).join('<br>');
                const productImages = order.items.map(item => item.image || "placeholder.jpg"); // Fallback for missing images
                const statusClass = `status-${order.status.toLowerCase().replace(' ', '-')}`;

                const orderHTML = `
    <div class="order_product">
        <div class="swiper-container order-swiper"> <!-- Changed to order-swiper -->
            <div class="swiper-wrapper">
                ${productImages.map(img => `<div class="swiper-slide"><img src="${img}" alt="Product Image"></div>`).join('')}
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="order_texts">
            <p><i class="fas fa-tag"></i> Product/s Name:</p>
            <div class="product-names-container">
                <span class="product-names">${productNames}</span>
            </div>
            <p><i class="fa-solid fa-user"></i> Customer Name: <span>${order.user_name}</span></p>
            <p class = "orderEmail"><i class="fa-solid fa-envelope"></i> Email: <span>${order.user_email}</span></p>
            <p class = "orderPhone"><i class="fa-solid fa-phone"></i> Phone: <span>${order.user_phone}</span></p>
            <p><i class="fa-solid fa-map-marker-alt"></i> Address: <span>${order.user_address}</span></p>
            <p><i class="fa-solid fa-calendar"></i> Order Date: 
                <span>${new Date(order.order_date).toLocaleDateString()} ${new Date(order.order_date).toLocaleTimeString()}</span>
            </p>
            <p><i class="fas fa-cubes"></i> Quantity: <span>${order.items.reduce((sum, item) => sum + (isNaN(item.quantity) ? 0 : item.quantity), 0)}</span></p>
            <p><i class="fas fa-dollar-sign"></i> Total Price: <span>₪${order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span></p>
            <p><i class="fas fa-barcode"></i> Order Id: <span>#${order.order_id}</span></p>
        </div>
        <div class="status">
            <div class="status-dropdown">
                <span class="current-status ${statusClass}">${order.status || 'Pending'}</span>
                <div class="dropdown-content">
                    <p data-order-id="${order.order_id}" data-status="Pending">Pending</p>
                    <p data-order-id="${order.order_id}" data-status="In Progress">In Progress</p>
                    <p data-order-id="${order.order_id}" data-status="Delivered">Delivered</p>
                    <p data-order-id="${order.order_id}" data-status="Cancelled">Cancelled</p>
                </div>
            </div>
        </div>
        <div class="contact">
            <p><i class="fa-solid fa-envelope"></i> Email: <span>${order.user_email}</span></p>
            <p><i class="fa-solid fa-phone"></i> Phone: <span>${order.user_phone}</span></p>
        </div>
    </div>
`;


                // Append the order HTML to the order list
                orderList.innerHTML += orderHTML;
            });


            const statusDropdownItems = ordersSection.querySelectorAll('.dropdown-content p');
            statusDropdownItems.forEach(item => {
                item.addEventListener('click', () => {
                    const orderId = item.getAttribute('data-order-id');
                    const newStatus = item.getAttribute('data-status');
                    console.log(newStatus + " " + orderId);

                    updateStatus(orderId, newStatus);
                })
            })


            // Initialize Swipers specifically for orders
            const orderSwiperContainers = document.querySelectorAll(".swiper-container.order-swiper");
            orderSwiperContainers.forEach(container => {
                const images = container.querySelectorAll("img");
                let loadedCount = 0;

                images.forEach(img => {
                    img.addEventListener("load", () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            new Swiper(container, {
                                loop: true,
                                pagination: {
                                    el: ".swiper-pagination",
                                    clickable: true,
                                },
                                navigation: {
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                },
                            });
                        }
                    });

                    // Handle image loading errors
                    img.addEventListener("error", () => {
                        img.src = "placeholder.jpg"; // Fallback to placeholder image if error occurs
                        loadedCount++;
                        if (loadedCount === images.length) {
                            new Swiper(container, {
                                loop: true,
                                pagination: {
                                    el: ".swiper-pagination",
                                    clickable: true,
                                },
                                navigation: {
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                },
                            });
                        }
                    });
                });
            });


        })
        .catch(error => console.error("Error fetching orders:", error));

    // Add event listeners to tab buttons after rendering the HTML
    const tabButtons = ordersSection.querySelectorAll(".tab-button");
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedFilter = button.getAttribute("data-filter");
            displayOrders(selectedFilter); // Call displayOrders with the selected filter
        });
    });

    // Add event listener for dropdown filter on mobile
    const orderFilterDropdown = document.getElementById("order-filter-dropdown");
    if (orderFilterDropdown) {
        orderFilterDropdown.addEventListener("change", () => {
            const selectedFilter = orderFilterDropdown.value;
            displayOrders(selectedFilter);
        });
    }
}

function updateStatus(orderId, newStatus) {
    fetch("/updateOrderStatus", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderId: orderId,
            newStatus: newStatus
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log("Success:", data.message);
                alert("Order status updated successfully!");
                displayOrders();
            } else {
                console.error("Error:", data.error);
                alert("Failed to update order status.");
            }
        })
        .catch(error => console.error("Request Error:", error));

}


// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    displayOrders("All Orders"); // Initial call to display all orders
});


// =================== 🚀🚀🚀 Search Section Start 🚀🚀🚀 =================== \\

document.getElementById('searchForm').addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents the document click event from triggering immediately
    // getRandomSearchItem();
    searchItem();
});

document.addEventListener('click', (event) => {
    const searchDropdown = document.querySelector('.searchDropdown');
    const searchForm = document.getElementById('searchForm');

    if (!searchDropdown || !searchForm) return;

    // Check if the clicked element is NOT inside the search form or dropdown
    if (!searchForm.contains(event.target) && !searchDropdown.contains(event.target)) {
        searchDropdown.style.display = "none"; // Hide the dropdown
    }
});


function getRandomSearchItem() {
    if (!all_products_json) {
        console.warn("Products data is not loaded yet!");
        return;
    }

    const searchDropdown = document.querySelector('.searchDropdown');
    if (!searchDropdown) return console.error("searchDropdown element not found!");

    const allProducts = Object.values(all_products_json); // Convert object into array of products

    // Fisher-Yates shuffle for better randomness
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }
    shuffleArray(allProducts);

    // Get the first 7 items from the shuffled array
    const randomProducts = allProducts.slice(0, 7);

    // Clear previous items
    searchDropdown.innerHTML = '';

    // Display the randomly selected items
    randomProducts.forEach(product => {

        const images = product.images || [];
        let img1 = images[0] || 'default.jpg'; // Use the first image or a default
        // let img2 = images[1] || img1; // Use the second image or fallback to the first

        // Ensure the image paths are valid         ///uploads/
        img1 = img1.startsWith("http") ? img1 : `${img1}`; // Use `/uploads/` for local images
        // img2 = img2.startsWith("http") ? img2 : `${img2}`; // Use `/uploads/` for local images

        searchDropdown.innerHTML += `
            <a href="" class="searchItem">
                <img src="${img1 || '../img/default.jpg'}" alt="${product.name}">
                <div class="name_price">
                    <p class="name">${product.name}</p>
                    <div class="price">
                        <p class="search_price">₪${product.price}</p>
                            ${product.discount && product.discount < product.price ? `<p class="old_price">₪${product.discount}</p>` : ''}
                    </div>
                </div>  
            </a>
        `;
    });

    // Show the dropdown (optional)
    searchDropdown.style.display = "block";
}

function searchItem() {
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.querySelector('.searchDropdown');

    searchInput.addEventListener('input', () => {



        const query = searchInput.value.toLowerCase();
        searchDropdown.innerHTML = ''; // Clear previous search results

        const filteredProducts = Object.keys(all_products_json)
            .map(key => all_products_json[key])
            .filter(product => {
                return product.name.toLowerCase().includes(query);
            });

        if (filteredProducts.length === 0) {
            // Display "No results found" message if no matches
            searchDropdown.innerHTML = `
        <div class="noResult">
            <i class="fas fa-search"></i> <!-- Font Awesome search icon -->
            <p>No Result Found</p>
        </div>
    `;
        } else {

            localStorage.setItem('searchInput', query);

            // Display filtered products
            filteredProducts.forEach(product => {

                const images = product.images || [];
                let img1 = images[0] || 'default.jpg';

                // Ensure the image path is valid
                img1 = img1.startsWith("https") ? img1 : `${img1}`;

                // Create a container for the search item
                const searchItem = document.createElement('a');
                // searchItem.href = `item.html?id=${product.id}`;
                searchItem.className = 'searchItem';

                // Add a placeholder image or loading spinner
                searchItem.innerHTML = `
                <img src="../img/default.jpg" data-src="${img1 || '../img/default.jpg'}" alt="${product.name}" loading="lazy">
                <div class="name_price">
                    <p class="name">${product.name}</p>
                    <div class="price">
                        <p class="search_price">₪${product.price}</p>
                            ${product.discount && product.discount < product.price ? `<p class="old_price">₪${product.discount}</p>` : ''}
                    </div>
                </div>
            `;
                searchItem.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default link behavior
                    event.stopPropagation(); // Stop event bubbling to parent elements
                    searchDropdown.style.display = "none";
                    searchEdit(product.id);
                });


                // Append the search item to the dropdown
                searchDropdown.appendChild(searchItem);

                // Load the actual image asynchronously
                const imgElement = searchItem.querySelector('img');
                const actualImage = new Image();
                actualImage.src = imgElement.dataset.src;
                actualImage.onload = () => {
                    imgElement.src = actualImage.src; // Replace placeholder with actual image
                };
            });
        }

        // Show the dropdown
        searchDropdown.style.display = "block";
    });
}


// Define test function globally
function searchEdit(productId) {
    console.log("Opening edit page for product:", productId);

    // Hide all content sections
    dashboardContent.style.display = 'none';
    productsContent.style.display = 'none';
    ordersContent.style.display = 'none';  // Make sure orders is also hidden
    customersContent.style.display = 'none';
    adsSectionWindow.style.display = 'none';
    repoertsContent.style.display = 'none';
    addProductWindow.style.display = 'none';

    // Show only the edit product window
    editProductWindow.style.display = 'block';

    fetch(`/product/${productId}`)
        .then(response => response.json())
        .then(product => {
            console.log("Product details from backend:", product);
            currProductId = productId; // Set the current product ID

            // Populate the form fields
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductDescription').value = product.description;
            document.getElementById('editBasePricing').value = product.price;
            document.getElementById('editStock').value = product.quantity;
            document.getElementById('editDiscount').value = product.discount;

            // Fetch and populate product types
            fetch('/productTypes')
                .then(response => response.json())
                .then(productTypes => {
                    const select = document.getElementById('editProductTypeSelect');
                    select.innerHTML = '<option value="0">Select a Product Type</option>'; // Clear existing options

                    productTypes.forEach(productType => {
                        const option = document.createElement('option');
                        option.value = productType.id;
                        option.textContent = productType.name;
                        select.appendChild(option);
                    });

                    select.value = product.product_type_id; // Set selected value for product type
                })
                .catch(error => console.error("Error fetching product types:", error));

            selectedImagesArray = product.images;

            const selectedImages = document.querySelector('.selected-images-edit');
            selectedImages.innerHTML = `
                <div class="image-container">
                    <div class="bigImgContainer">
                        <img src="${selectedImagesArray[0] instanceof File ? URL.createObjectURL(selectedImagesArray[0]) : selectedImagesArray[0]}" 
                            class="big-img" 
                            alt="Selected Image">
                        <span class="removeBigImg">
                            <i class="fa-solid fa-trash-can"></i>
                        </span>
                    </div>
                    
                    <div class="small-img">
                        ${selectedImagesArray.slice(1).map((fileOrUrl, index) => {
                const imageUrl = fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
                return `
                                <div class="smallImgContainer">
                                    <img src="${imageUrl}" class="img small-img" alt="Preview ${index + 1}">
                                    <span class="removeSmallImg" data-index="${index + 1}">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </span>
                                </div>
                            `;
            }).join('')}
                        <div class="add-boxV2" onclick="document.getElementById('editAdditionalFileInput').click()">
                            <span>+</span>
                        </div>
                    </div>
                </div>
            `;

            // Add event listeners after rendering
            document.querySelector('.removeBigImg')?.addEventListener('click', removeEditBigImage);
            document.querySelectorAll('.removeSmallImg').forEach(item => {
                item.addEventListener('click', function () {
                    const index = parseInt(this.getAttribute('data-index'));
                    removeEditSmallImage(index);
                });
            });

        })
        .catch(error => console.error("Error fetching product details:", error));
}



// =================== 🚀🚀🚀 Modals Section Start 🚀🚀🚀 =================== \\

// Function to show the success modal
// Show the success modal
function showSuccessModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
        modal.style.display = "flex"; // Show modal
        document.getElementById("overlay").style.display = "block";
        document.querySelector('.modal_msg').textContent = "Product Added successfully.";
    }

    // Auto-close modal after 3.5 seconds
    setTimeout(() => {
        modal.style.display = "none";
        document.getElementById("overlay").style.display = "none";
        window.location.reload();
    }, 3000);
}

function showSuccessEditModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
        modal.style.display = "flex"; // Show modal
        document.getElementById("overlay").style.display = "block";
        document.querySelector('.modal_msg').textContent = "Product Edited successfully.";
    }

    // Auto-close modal after 3.5 seconds
    setTimeout(() => {
        modal.style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }, 3000);
}

// Function to show the loading animation
function showLoadingAnimation() {
    document.getElementById("loadingAnimation").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
}

// Function to hide the loading animation
function hideLoadingAnimation() {
    document.getElementById("loadingAnimation").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Close modal when clicking "X" button
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("close")) {
        document.getElementById("successModal").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        window.location.reload();
    }
});










// document.getElementById("addProductForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Collect form data
//     const formData = {
//         name: document.getElementById("productName").value,
//         price: parseFloat(document.getElementById("productPrice").value),
//         description: document.getElementById("productDescription").value,
//         quantity: parseInt(document.getElementById("productQuantity").value),
//         discount: parseFloat(document.getElementById("productDisPrice").value) || 0,
//         type: document.getElementById("productType").value,
//         images: [] // Will be populated with image URLs or files
//     };

//     // Handle main image URL
//     const mainImageUrl = document.getElementById("productImageUrlMain").value;
//     if (mainImageUrl) {
//         formData.images.push(mainImageUrl);
//     }

//     // Handle additional image URLs from selectedUrls array
//     if (selectedUrls.length > 0) {
//         formData.images.push(...selectedUrls); // Add all URLs from selectedUrls
//     }

//     console.log("Selected URLs:", selectedUrls); // Debugging line
//     console.log("Form Data Before File Uploads:", formData); // Debugging line

//     // Handle file uploads
//     const mainImageFile = document.getElementById("productImageMain").files[0];
//     const additionalImageFiles = document.getElementById("productImages").files;

//     // Function to handle file uploads (if needed)
//     const uploadFiles = async (files) => {
//         const uploadedUrls = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);

//             const response = await fetch("/upload-image", {
//                 method: "POST",
//                 body: formData
//             });
//             const data = await response.json();
//             if (data.url) {
//                 uploadedUrls.push(data.url);
//             }
//         }
//         return uploadedUrls;
//     };

//     // Upload files and add URLs to formData.images
//     if (mainImageFile || additionalImageFiles.length > 0) {
//         const files = [];
//         if (mainImageFile) files.push(mainImageFile);
//         if (additionalImageFiles.length > 0) files.push(...additionalImageFiles);

//         uploadFiles(files)
//             .then(uploadedUrls => {
//                 formData.images.push(...uploadedUrls);
//                 sendFormData(formData);
//             })
//             .catch(error => {
//                 console.error("Error uploading files:", error);
//                 alert("Error uploading images. Please try again.");
//             });
//     } else {
//         sendFormData(formData);
//     }

//     selectedUrls = []; // Clear the selectedUrls array after submission
// });

// // Function to create an image preview for the main image
// function createUrlImagePreviewMain(src) {
//     const imgWrapper = document.createElement('div');
//     imgWrapper.classList.add('image-wrapper');

//     const imgElement = document.createElement('img');
//     imgElement.src = src;
//     imgElement.classList.add('preview-image');

//     imgWrapper.appendChild(imgElement);
//     return imgWrapper;
// }

// function updateMainImagePreview() {
//     const mainImageUrl = document.getElementById("productImageUrlMain").value;
//     const mainImagePreviewContainer = document.getElementById("mainImagePreviewContainer");

//     mainImagePreviewContainer.innerHTML = "";

//     if (mainImageUrl) {
//         const imgWrapper = createUrlImagePreviewMain(mainImageUrl);
//         mainImagePreviewContainer.prepend(imgWrapper);
//     }

// }

// let selectedUrls = []; // Array to store all image URLs

// // Function to update the additional image previews
// function updateAdditionalImagePreview() {
//     const urlInput = document.getElementById("productImageUrl").value;
//     const imagePreviewContainer = document.getElementById("imagePreviewContainer");

//     // Clear the input field after processing
//     document.getElementById("productImageUrl").value = "";

//     if (urlInput) {
//         selectedUrls.push(urlInput); // Add the new URL to the array
//     }

//     // Clear the container before re-rendering
//     imagePreviewContainer.innerHTML = "";

//     // Render all images in the selectedUrls array
//     selectedUrls.forEach((imageUrl, index) => {
//         const imagePreviewHTML = `
//             <div class="image-wrapper" data-index="${index}">
//                 <div class="remove_image">
//                     <i class="fa-solid fa-trash-can"></i>
//                 </div>
//                 <img src="${imageUrl}" class="preview-image">
//             </div>
//         `;
//         imagePreviewContainer.innerHTML += imagePreviewHTML; // Append the new preview
//     });
// }

// // Function to remove an image
// function removeImage(index) {

//     selectedUrls.splice(index, 1); // Remove the image URL from the array
//     updateAdditionalImagePreview(); // Re-render the previews
// }

// // Add event delegation for remove buttons
// document.getElementById("imagePreviewContainer").addEventListener("click", function (event) {
//     const removeButton = event.target.closest(".remove_image");
//     if (removeButton) {
//         const imageWrapper = removeButton.closest(".image-wrapper");
//         const index = parseInt(imageWrapper.getAttribute("data-index")); // Get the index from the data attribute
//         removeImage(index); // Call the remove function
//     }
// });

// // Add event listeners
// document.getElementById("productImageUrl").addEventListener("input", updateAdditionalImagePreview);

// document.getElementById("productImageUrlMain").addEventListener("input", updateMainImagePreview);



// function sendFormData(formData) {
//     fetch("/add-product", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Success:", data);
//             alert("Product added successfully!");
//             closeModal(); // Close the modal after successful submission
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             alert("Error adding product. Please try again.");
//         });
// }

// Function to close the modal


// function closeModal() {
//     document.getElementById("addProductModal").style.display = "none";
// }

// Function to handle dropdown selection
// function selectType(type) {
//     document.getElementById("productType").value = type;
//     toggleDropdown();
// }

// // Function to toggle dropdown visibility
// function toggleDropdown() {
//     const dropdownList = document.getElementById("dropdownList");
//     dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
// }

// // Close the modal when clicking the close button
// document.querySelector(".close").addEventListener("click", closeModal);

// // Close the modal when clicking outside of it
// window.addEventListener("click", function (event) {
//     const modal = document.getElementById("addProductModal");
//     if (event.target === modal) {
//         closeModal();
//     }
// });
