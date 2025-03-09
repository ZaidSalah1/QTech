// const { response, json } = require("express");



// Function to display random products in the dropdown
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
            <a href="item.html?id=${product.id}" class="searchItem">
                <img src="${img1 || '../img/default.jpg'}" alt="${product.name}">
                <div class="name_price">
                    <p class="name">${product.name}</p>
                    <div class="price">
                        <p class="search_price">₪${product.price}</p>
                        ${product.discount && product.discount > product.price ? `<p class="old_price">₪${product.discount}</p>` : ''}
                    </div>
                </div>  
            </a>
        `;
    });

    // Show the dropdown (optional)
    searchDropdown.style.display = "block";
}

document.addEventListener('click', function (event) {
    const searchContainer = document.querySelector('.searchContainer');
    const searchDropdown = document.querySelector('.searchDropdown');

    // Check if the click is outside the search container
    if (!searchContainer.contains(event.target)) {
        searchDropdown.style.display = "none";
    }
});


// function searchItem() {
//     const searchInput = document.getElementById('searchInput');
//     const searchDropdown = document.querySelector('.searchDropdown');

//     searchInput.addEventListener('input', () => {
//         const query = searchInput.value.toLowerCase();
//         searchDropdown.innerHTML = ''; // Clear previous search results

//         const filteredProducts = Object.keys(all_products_json)
//             .map(key => all_products_json[key])
//             .filter(product => {
//                 return product.name.toLowerCase().includes(query);
//             });

//         if (filteredProducts.length === 0) {
//             // Display "No results found" message if no matches
//             searchDropdown.innerHTML = `
//             <div class="noResult">
//                 <i class="fas fa-search"></i> <!-- Font Awesome search icon -->
//                 <p>No Result Found</p>
//             </div>
//         `;
//         } else {

//             localStorage.setItem('searchInput', query);

//             // Display filtered products
//             filteredProducts.forEach(product => {
//                 const images = product.images || [];
//                 let img1 = images[0] || 'default.jpg';

//                 // Ensure the image path is valid
//                 img1 = img1.startsWith("https") ? img1 : `${img1}`;

//                 // Create a container for the search item
//                 const searchItem = document.createElement('a');
//                 searchItem.href = `item.html?id=${product.id}`;
//                 searchItem.className = 'searchItem';

//                 // Add a placeholder image or loading spinner
//                 searchItem.innerHTML = `
//                     <img src="../img/placeholder.jpg" data-src="${img1 || '../img/default.jpg'}" alt="${product.name}" loading="lazy">
//                     <div class="name_price">
//                         <p class="name">${product.name}</p>
//                         <div class="price">
//                             <p class="search_price">₪${product.price}</p>
//                             ${product.discount && product.discount > product.price ? `<p class="old_price">₪${product.discount}</p>` : ''}
//                         </div>
//                     </div>
//                 `;

//                 // Append the search item to the dropdown
//                 searchDropdown.appendChild(searchItem);

//                 // Load the actual image asynchronously
//                 const imgElement = searchItem.querySelector('img');
//                 const actualImage = new Image();
//                 actualImage.src = imgElement.dataset.src;
//                 actualImage.onload = () => {
//                     imgElement.src = actualImage.src; // Replace placeholder with actual image
//                 };
//             });
//         }

//         // Show the dropdown
//         searchDropdown.style.display = "block";
//     });
// }

// function SearchResultScreen() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const query = urlParams.get('q');
//     const products_search = document.getElementById('products_search');

//     if (query) {
//         products_search.innerHTML = ``;
//         const filteredProducts = Object.keys(all_products_json)
//             .map(key => all_products_json[key])
//             .filter(product => {
//                 return product.name.toLowerCase().includes(query);
//             });


//         if (filteredProducts.length > 0) {
//             filteredProducts.forEach(product => {
//                 products_search.innerHTML += `
//                     <div class="product">
//                         <div class="icons">     
//                             <span><i class="fa-solid fa-cart-plus"></i></span>
//                             <span><i class="fa-solid fa-heart"></i></span>
//                             <span><i class="fa-solid fa-share"></i></span>
//                         </div>

//                         <div class="img_product">
//                             <img src="${product.img}" alt="">
//                             <img class="img_hover" src="${product.img_hover}" alt="">
//                         </div>

//                         <h3 class="name_product">
//                             <a href="item.html?id=${product.id}">${product.name}</a>
//                         </h3>

//                         <div class="stars">
//                             <i class="fa-solid fa-star"></i>
//                             <i class="fa-solid fa-star"></i>
//                             <i class="fa-solid fa-star"></i>
//                             <i class="fa-solid fa-star"></i>
//                             <i class="fa-solid fa-star"></i>
//                         </div>
//                     </div>
//                     `;
//             })
//         }else{
//             products_search.textContent = "nothing found"
//         }
//     } else {
//         products_search.textContent = 'No search input found.';
//     }
// }





// document.addEventListener("DOMContentLoaded", () => {
//     const searchForm = document.querySelector('.search');
//     if (searchForm) {
//         searchForm.addEventListener('submit', function (event) {
//             event.preventDefault(); // Prevent default form submission

//             // Use searchForm instead of 'this'
//             const searchInput = searchForm.querySelector('input[type="search"]');
//             if (!searchInput) {
//                 console.error("searchInput element not found!");
//                 return;
//             }

//             const query = searchInput.value.trim();

//             if (query) {
//                 // Redirect to search_results.html with the query as a URL parameter
//                 window.location.href = `search_results.html?q=${encodeURIComponent(query)}`;
//             } else {
//                 alert("Please enter a search term.");
//             }
//         });
//     }
// });



// Add event listener to hide dropdown when clicking outside




// Attach event listener to the search input
// document.addEventListener("DOMContentLoaded", () => {
//     setTimeout(() => {
//         const searchInput = document.querySelector("#searchInput");
//         if (searchInput) {
//             searchInput.addEventListener("input", searchItem); // Use "input" instead of "focus"
//         } else {
//             console.error("searchInput element not found!");
//         }
//     }, 100); // 100ms delay, adjust as needed
// });

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#searchInput");
    if (searchInput) {
        searchInput.addEventListener("focus", getRandomSearchItem);
    } else {
        console.error("searchInput element not found!");
    }
});



// New Arrival products
const swiper_items_sale = document.getElementById("swiper_items_sale");

fetch('/newest10Product')
    .then(response => response.json())
    .then(data => {
        // Sort products by created_at in descending order
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Get the 10 newest products
        const newestProducts = data.slice(0, 15);

        // Get favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        newestProducts.forEach(product => {
            const images = product.images || [];
            let img1 = images[0] || 'default.jpg'; // Use the first image or a default
            let img2 = images[1] || img1; // Use the second image or fallback to the first

            // Ensure the image paths are valid
            img1 = img1.startsWith("http") ? img1 : `${img1}`; // Use `/uploads/` for local images
            img2 = img2.startsWith("http") ? img2 : `${img2}`; // Use `/uploads/` for local images

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

            let discountBadge = "";
            if (product.discount && product.discount < product.price && product.discount !== 0) {
                const discountPercentage = Math.round(((product.price - product.discount) / product.price) * 100);
                discountBadge = `<div class="discount-badge">${discountPercentage}% OFF</div>`;
            }


            // Check if the product is sold out
            const isSoldOut = !product.quantity || product.quantity <= 0;

            // Check if the product is in favorites
            const isFavorited = favorites.some(item => item.id === product.id);

            // Add the product to the swiper
            swiper_items_sale.innerHTML += `
            <div class="product swiper-slide">
                ${discountBadge} <!-- Add the discount badge here -->
        
                <div class="icons">
                    ${isSoldOut ? '' : `
                        <span>
                            <i onclick="addToCart('${product.id}', this); event.stopPropagation();" class="fa-solid fa-cart-plus"></i>
                        </span>
                    `}
                    <span class="favItemm">
                        <i class="${isFavorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"
                        style="${isFavorited ? 'color: red;' : ''}"
                        data-product-id="${product.id}">
                        </i>
                    </span>
                    <span><i class="fa-solid fa-share"></i></span>
                </div>
        
                <div class="img_product">
                    <img src="${img1}" alt="${product.name}">
                    <img class="img_hover" src="${img2}" alt="${product.name}">
                </div>
        
                <h3 class="name_product">
                    <a>${product.name}</a>
                </h3>
        
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <span>0 Review(s)</span>
                </div>
        
                ${priceHTML}
        
                ${isSoldOut ? `
                    <div class="sold_out">
                        <p>Sold Out</p>
                    </div>
                ` : ''}
            </div>
        `;
        
        });
    })
    .catch(error => {
        console.error("Error fetching newest products:", error);
    });

// Use event delegation for dynamically added elements
swiper_items_sale.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-heart')) {
        console.log("Favorite icon clicked!"); // Debugging log
        event.preventDefault();
        event.stopPropagation();

        const heartIcon = event.target;

        // Toggle favorite styles
        heartIcon.classList.toggle('fa-solid');
        heartIcon.classList.toggle('fa-regular');
        heartIcon.style.color = heartIcon.classList.contains('fa-solid') ? 'red' : '';

        const productId = heartIcon.getAttribute('data-product-id').trim();
        addToFav(productId, heartIcon);

        return false; // ✅ Prevents any further bubbling
    }
});

swiper_items_sale.addEventListener('click', function (event) {
    const productDiv = event.target.closest('.product');

    if (event.target.classList.contains('fa-heart')) {
        return; // ✅ Stop here if the click is on the favorite icon
    }

    if (productDiv) {
        const productId = productDiv.querySelector('.fa-heart').getAttribute('data-product-id').trim();
        window.location.href = `item.html?id=${productId}`;
    }
});



// Discounted products
const other_product_swiper = document.getElementById("other_product_swiper");

fetch('/discountedProducts')
    .then(response => response.json())
    .then(data => {
        const discountedProducts = data.filter(product => product.discount && product.discount < product.price && product.discount !== 0);
        const favorite = JSON.parse(localStorage.getItem("favorites")) || [];

        discountedProducts.forEach(product => {
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
            if (product.discount && product.discount < product.price && product.discount !== 0) {
                priceHTML = `
                    <div class="price">
                        <p class="discounted_price">₪${product.discount}</p>
                        <p class="old_price"><s>₪${product.price}</s></p>
                    </div>           
                `;
            }

            let discountBadge = "";
            if (product.discount && product.discount < product.price && product.discount !== 0) {
                const discountPercentage = Math.round(((product.price - product.discount) / product.price) * 100);
                discountBadge = `<div class="discount-badge">${discountPercentage}% OFF</div>`;
            }

            const isSoldOut = !product.quantity || product.quantity <= 0;
            const isFavorited = favorite.some(item => item.id === product.id);

            other_product_swiper.innerHTML += `
                <div class="product swiper-slide">
                    ${discountBadge}

                    <div class="icons">
                        ${isSoldOut ? '' : `
                            <span>
                                <i onclick="addToCart('${product.id}', this); event.stopPropagation();" class="fa-solid fa-cart-plus"></i>
                            </span>
                        `}

                        <span class="favItemm">
                            <i class="${isFavorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"
                            style="${isFavorited ? 'color: red;' : ''}"
                            data-product-id="${product.id}">
                            </i>
                        </span> 
                        
                        <span><i class="fa-solid fa-share"></i></span>
                    </div>

                    <div class="img_product">
                        <img src="${img1}" alt="">
                        <img class="img_hover" src="${img2}" alt="">
                    </div>

                    <h3 class="name_product">
                        <a>${product.name}</a>
                    </h3>

                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <span>0 Review(s)</span>
                    </div>

                    ${priceHTML}
                    ${isSoldOut ? `
                        <div class="sold_out">
                            <p>Sold Out</p>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        // Initialize Swiper after products are added
        var swiper = new Swiper(".product_swip", {
            slidesPerView: 4,
            spaceBetween: 30,
            autoplay: {
                delay: 3500,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                1600: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 3,
                },
                900: {
                    slidesPerView: 2,
                },
                700: {
                    slidesPerView: 3,
                },
                300: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
            }
        });
    });


// Use event delegation for dynamically added elements
other_product_swiper.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-heart')) {
        console.log("Favorite icon clicked!"); // Debugging log
        event.preventDefault();
        event.stopPropagation();

        const heartIcon = event.target;

        // Toggle favorite styles
        heartIcon.classList.toggle('fa-solid');
        heartIcon.classList.toggle('fa-regular');
        heartIcon.style.color = heartIcon.classList.contains('fa-solid') ? 'red' : '';

        const productId = heartIcon.getAttribute('data-product-id').trim();
        addToFav(productId, heartIcon);

        return false; // ✅ Prevents any further bubbling
    }
});

other_product_swiper.addEventListener('click', function (event) {
    const productDiv = event.target.closest('.product');

    if (event.target.classList.contains('fa-heart')) {
        return; // ✅ Stop here if the click is on the favorite icon
    }

    if (productDiv) {
        const productId = productDiv.querySelector('.fa-heart').getAttribute('data-product-id').trim();
        window.location.href = `item.html?id=${productId}`;
    }
});



//other_product_swiper2
const other_product_swiper2 = document.getElementById("other_product_swiper2");
fetch('/getRandomProducts')
    .then(response => response.json())
    .then(data => {

        // Filter products that have a discount
        const favorite = JSON.parse(localStorage.getItem("favorites")) || [];

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

            let discountBadge = "";
            if (product.discount && product.discount < product.price && product.discount !== 0) {
                const discountPercentage = Math.round(((product.price - product.discount) / product.price) * 100);
                discountBadge = `<div class="discount-badge">${discountPercentage}% OFF</div>`;
            }

            // Check if the product is sold out
            const isSoldOut = !product.quantity || product.quantity <= 0;

            const isFavorited = favorite.some(item => item.id === product.id);

            other_product_swiper2.innerHTML += `
    <div class="product swiper-slide">
    ${discountBadge}
            
        <div class="icons">

             ${isSoldOut ? '' : `
                        <span>
                            <i onclick="addToCart('${product.id}', this); event.stopPropagation();" class="fa-solid fa-cart-plus"></i>
                        </span>
                    `}

            <span class="favItemm">
                <i class="${isFavorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"
                style="${isFavorited ? 'color: red;' : ''}"
                data-product-id="${product.id}">
                </i>
            </span> 
            
            <span><i class="fa-solid fa-share"></i></span>
        </div>
        
        <div class="img_product">
            <img src="${img1}" alt="">
            <img class="img_hover" src="${img2}" alt="">
        </div>

        <h3 class="name_product">
            <a>${product.name}</a>  <!-- Pass key instead of id -->
        </h3>

        <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <span>0 Review(s)</span>
        </div>

        ${priceHTML}
             ${isSoldOut ? `
              <div class="sold_out">
                    <p>Sold Out</p>
                 </div>
             ` : ''}
    </div>
`;

        });

        var swiper = new Swiper(".product_swip", {
            slidesPerView: 4,
            spaceBetween: 30,
            autoplay: {
                delay: 3500,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                1600: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 3,
                },
                900: {
                    slidesPerView: 2,
                },
                700: {
                    slidesPerView: 3,
                },
                300: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
            }
        });
    });

// Use event delegation for dynamically added elements
other_product_swiper2.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-heart')) {
        console.log("Favorite icon clicked!"); // Debugging log
        event.preventDefault();
        event.stopPropagation();

        const heartIcon = event.target;

        // Toggle favorite styles
        heartIcon.classList.toggle('fa-solid');
        heartIcon.classList.toggle('fa-regular');
        heartIcon.style.color = heartIcon.classList.contains('fa-solid') ? 'red' : '';

        const productId = heartIcon.getAttribute('data-product-id').trim();
        addToFav(productId, heartIcon);

        return false; // ✅ Prevents any further bubbling
    }
});

other_product_swiper2.addEventListener('click', function (event) {
    const productDiv = event.target.closest('.product');

    if (event.target.classList.contains('fa-heart')) {
        return; // ✅ Stop here if the click is on the favorite icon
    }

    if (productDiv) {
        const productId = productDiv.querySelector('.fa-heart').getAttribute('data-product-id').trim();
        window.location.href = `item.html?id=${productId}`;
    }
});




