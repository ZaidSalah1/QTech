var products_cart = [];
var favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Initialize with stored favorites or an empty array


var cart = document.querySelector('.cart');

function open_cart() {
    cart.classList.add("active");
}

function close_cart() {
    cart.classList.remove("active");
}

function addToCart(id, btn) {
    const productId = Number(id);
    const product = all_products_json.find(item => item.id === productId);

    if (product) {
        let existingProduct = products_cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.count += 1;
        } else {
            product.count = 1;
            products_cart.push(product);
        }
        localStorage.setItem("cartItems", JSON.stringify(products_cart));
        getCartItems();

        // Add animation class
        btn.classList.add("animate");

        // Remove the animation class after the animation ends
        btn.addEventListener("animationend", () => {
            btn.classList.remove("animate");
        }, { once: true });
    } else {
        console.error("Product not found with ID:", productId);
    }
}


// Function to get cart items and update the cart display
function getCartItems() {
    const items_in_cart = document.querySelector(".items_in_cart");
    const price_cart_head = document.querySelector(".price_cart_head");
    const price_cart_total = document.querySelector(".price_cart_total");
    const count_item = document.querySelector(".count_item");
    const count_item_mobile = document.querySelector('.count_item_mobile');
    const top_items_count = document.querySelector(".top_items_count");

    if (!items_in_cart || !price_cart_head || !price_cart_total || !count_item || !count_item_mobile || !top_items_count) {
        console.error("One or more cart elements are missing in the DOM.");
        return;
    }

    let items_c = "";
    let total_price = 0;
    let count = 0;

    // Loop through products in cart
    products_cart.forEach((item, index) => {
        if (!item || typeof item !== 'object' || !item.hasOwnProperty('id')) {
            console.error(`Invalid item at index ${index}:`, item);
            return; // Skip this item if it's invalid
        }

        if (!item.hasOwnProperty('count')) {
            item.count = 1;  // Initialize count to 1 if it doesn't exist
        }

        const itemTotalPrice = item.price * item.count;
        items_c += `
            <div class="item_cart">
                <img src="${item.images[0]}" alt="">  <!-- Access first image -->
                <div class="content">
                    <h4>${item.name}</h4>
                    <div class="counter_Price">
                        <p class="price">₪${itemTotalPrice}</p>
                        <div class="counter">
                            <div class="pluse" onclick="changeQuantity(${index}, 1)"> + </div>
                            <div class="counter_value">${item.count}</div>
                            <div class="minus" onclick="changeQuantity(${index}, -1)"> - </div>
                        </div>
                    </div>
                </div>
                <button onclick="remove_from_cart(${index})" class="delete_item">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;

        count += item.count;  // Update item count
        total_price += itemTotalPrice;  // Update total price
    });

    // Update the cart display
    items_in_cart.innerHTML = items_c;
    price_cart_head.innerHTML = "₪" + total_price;
    price_cart_total.innerHTML = "₪" + total_price;
    count_item.innerHTML = count;
    count_item_mobile.innerHTML = count;
    top_items_count.innerHTML = `(${count} Items in Cart)`;
}


function getCartCount() {
    let count = 0;

    products_cart.forEach((item) => {
        count += item.count;  // Add up the count of each item in the cart
    });

    return count;
}

// Function to change item quantity
function changeQuantity(index, change) {
    const item = products_cart[index];
    item.count += change;

    if (item.count < 1) {
        remove_from_cart(index);  // Remove item if quantity is zero
    } else {
        localStorage.setItem("cartItems", JSON.stringify(products_cart));
        getCartItems();
    }
}


// Function to remove an item from the cart
function remove_from_cart(index) {
    products_cart.splice(index, 1);  // Remove item from cart array
    localStorage.setItem("cartItems", JSON.stringify(products_cart));  // Update localStorage
    getCartItems();  // Update the cart display
}


function remove_from_cart_checkout(index) {
    products_cart.splice(index, 1);  // Remove item from cart array
    localStorage.setItem("cartItems", JSON.stringify(products_cart));  // Update localStorage
    location.reload(); // Reload the page to reflect the changes
}


document.addEventListener("DOMContentLoaded", function () {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart) {
        products_cart = storedCart;  // Just assign to the variable, no need to declare it again
        getCartItems();
    }
});




// Add/remove product from favorites
function addToFav(id, icon) {
    const product = all_products_json.find(item => item.id === Number(id)); // Convert id to number
    if (!product) {
        console.error("Product not found with ID:", id);
        return;
    }

    const index = favorites.findIndex(item => item.id === Number(id));
    if (index === -1) {
        favorites.push(product);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavCount();
    toggleFavIcon(id, icon);

    // Add animation class
    icon.classList.add("animate");

    // Remove the animation class after the animation ends
    icon.addEventListener("animationend", () => {
        icon.classList.remove("animate");
    }, { once: true });
}

function toggleFavIcon(id, icon) {
    const isFavorited = favorites.some(item => item.id === Number(id));

    if (isFavorited) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "red"; // Solid red color for active state
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.style.color = ""; // Remove the color when not active
    }
}

// Update favorites count in the UI
// const favCountElement = document.querySelector(".count_fav");
function updateFavCount() {
    const favCountElement = document.querySelector(".count_fav");
    const count_fav_mobile = document.querySelector(".count_fav_mobile");
    // console.log("favCountElement------------------>", favCountElement)
    if (favCountElement) {
        favCountElement.textContent = favorites.length;
        count_fav_mobile.textContent = favorites.length;
    }
}

// Open favorites page
function openFavPage() {
    // console.log("Favorites:", favorites);
    // Example: Redirect to a favorites page
    window.location.href = "/fav.html";
}


function loadFavorites() {
    const favItems = JSON.parse(localStorage.getItem("favorites")) || [];
    const products_dev = document.getElementById("products_dev");

    if (favItems.length === 0) {
        products_dev.innerHTML = "<p>No favorite items found.</p>";
        return;
    }

    console.log(favItems);
    let favHTML = "";
    favItems.forEach((product, index) => {
        const images = product.images || [];
        let img1 = images[0] || 'default.jpg';
        let img2 = images[1] || img1;

        img1 = img1.startsWith("http") ? img1 : `${img1}`;
        img2 = img2.startsWith("http") ? img2 : `${img2}`;

        let priceHTML = `<div class="price"><p><span>₪${product.price}</span></p></div>`;
        if (product.discount && product.discount < product.price && product.discount != 0) {
            priceHTML = `
                <div class="price">
                    <p class="discounted_price">₪${product.discount}</p>
                    <p class="old_price"><s>₪${product.price}</s></p>
                </div>`;
        }

        favHTML += `
            <div class="product">
                <div class="icons">     
                    <span>
                        <i onclick="addToCart('${product.id}', this); event.stopPropagation();" class="fa-solid fa-cart-plus"></i>
                    </span>
                    <span onclick="removeFromFav('${index}')" style="color: red">
                        <i class="fa-solid fa-heart"></i>
                    </span>
                    <span><i class="fa-solid fa-share"></i></span>
                </div>
                <div class="img_product">
                    <img src="${img1}" alt="">
                    <img class="img_hover" src="${img2}" alt="">
                </div>
                <h3 class="name_product">
                    <a href="item.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                ${priceHTML}
            </div>`;
    });

    products_dev.innerHTML = favHTML; // Set all HTML at once
}


function removeFromFav(index) {
    let favItem = JSON.parse(localStorage.getItem("favorites")) || [];

    favItem.splice(index, 1); // Remove the selected item
    localStorage.setItem("favorites", JSON.stringify(favItem)); // Update localStorage

    loadFavorites(); // Reload the favorites list
}



document.addEventListener("DOMContentLoaded", function () {
    // Check if the current page is fav.html
    if (window.location.pathname.includes("fav.html")) {
        loadFavorites();
    }
});



document.addEventListener("DOMContentLoaded", function () {
    // Fetches the header content dynamically and loads it into the DOM.
    // After the header is loaded, we initialize the cart and favorite counts
    // because the elements (like `.count_item` and `.count_fav`) aren't available
    // until the header is fully rendered.


    // في مشكلة ما برعف ليش مرات الهيدر ما بيظهر بطلع يرور can't get
    function loadHeader(id, file, callback, retries = 6) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => {
                if (retries > 0) {
                    console.log(`Retrying... ${retries} attempts left.`);
                    loadHeader(id, file, callback, retries - 1);
                } else {
                    console.error("Error loading header after retries:", error);
                }
            });
    }


    // Load the header and then initialize cart & favorite count
    loadHeader("desktopHeader", "components/desktop-header.html?version=" + new Date().getTime(), function () {
        initializeCart();
        initializeFavorites(); // Call this after the header has been loaded
        updateFavCount(); // Update favorite count after header load
        attachSearchListeners();

    });

    // Load the mobile header and then initialize cart & favorite count
    loadHeader("mobileHeader", "components/mobile-header.html", function () {
        initializeCart();
        initializeFavorites(); // Call this after the header has been loaded
        updateFavCount(); // Update favorite count after header load
        initializeMenu();
        attachSearchListeners();
        languageList();
    });

    function attachSearchListeners() {
        const searchForm = document.getElementById("searchForm");
        const searchFormMobile = document.getElementById("searchFormMobile");

        if (searchForm) {
            searchForm.addEventListener("submit", handleSearch);
        } else {
            console.error("searchForm is null");
        }

        if (searchFormMobile) {
            searchFormMobile.addEventListener("submit", handleSearch);
        } else {
            console.error("searchFormMobile is null");
        }

        searchForm.addEventListener("click", () => {
            const searchDropdown = document.querySelector('.searchDropdown');
            console.log("searchDropdown", searchDropdown);
            getRandomSearchItem();
            searchItem();
        })

    }

    function handleSearch(event) {
        event.preventDefault();
        const searchInput = event.target.querySelector("input").value;
        if (searchInput.trim()) {
            localStorage.setItem("searchInput", searchInput);
            window.location.href = "search_results.html";
        }
    }


    function languageList() {
        const dropdownBtn = document.querySelector(".dropdown-btn");
        const dropdownMenu = document.querySelector(".dropdown-menu");

        // Toggle dropdown on button click
        dropdownBtn.addEventListener("click", function (event) {
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
            event.stopPropagation(); // Prevents the event from closing immediately
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) {
            if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    }

    function initializeCart() {
        const storedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCart) {
            products_cart = storedCart;
            getCartItems();
        }
    }

    function initializeFavorites() {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
            favorites = storedFavorites;

            // Define the favCountElement here
            const favCountElement = document.querySelector(".count_fav");

            if (favCountElement) {
                favCountElement.textContent = favorites.length;
            }

            updateFavCount(); // This will update any other UI related to favorites
        }
    }


    // Menu Initialization function
    // this for responisve mobile menu open
    function initializeMenu() {
        const menuButton = document.querySelector('.menuMobile');
        const menu = document.querySelector('.menuItems');
        const overlay = document.querySelector('.overlay');

        if (menuButton && menu && overlay) {
            menuButton.addEventListener('click', function () {
                menu.classList.toggle("menu-active");
                overlay.classList.toggle("overlay-active");
            });

            // Close sidebar when clicking overlay
            overlay.addEventListener('click', function () {
                menu.classList.remove("menu-active");
                overlay.classList.remove("overlay-active");
            });
        }
    }


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
    
        console.log("searchInput:", searchInput);  // Debugging the input element
        console.log("searchDropdown:", searchDropdown);  // Debugging the dropdown element
    
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            console.log("Search query:", query);  // Debugging the input query
    
            searchDropdown.innerHTML = ''; // Clear previous search results
    
            const filteredProducts = Object.keys(all_products_json)
                .map(key => all_products_json[key])
                .filter(product => {
                    return product.name.toLowerCase().includes(query);
                });
    
            console.log("Filtered products:", filteredProducts);  // Debugging filtered products
    
            if (filteredProducts.length === 0) {
                searchDropdown.innerHTML = `
                    <div class="noResult">
                        <i class="fas fa-search"></i>
                        <p>No Result Found</p>
                    </div>
                `;
            } else {
                localStorage.setItem('searchInput', query);
    
                filteredProducts.forEach(product => {
                    console.log("Product:", product);  // Debugging each product
                    const images = product.images || [];
                    let img1 = images[0] || 'default.jpg';
    
                    img1 = img1.startsWith("https") ? img1 : `${img1}`;
    
                    const searchItem = document.createElement('a');
                    searchItem.href = `item.html?id=${product.id}`;
                    searchItem.className = 'searchItem';
    
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
    
                    searchDropdown.appendChild(searchItem);
    
                    const imgElement = searchItem.querySelector('img');
                    const actualImage = new Image();
                    actualImage.src = imgElement.dataset.src;
                    actualImage.onload = () => {
                        imgElement.src = actualImage.src;
                    };
                });
            }
    
            searchDropdown.style.display = "block";
        });
    }
    

});


