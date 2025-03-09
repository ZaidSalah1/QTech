document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        fetch('/ads').then(response => {
            if (!response.ok) {
                throw new Error('Failed to load ads');
            }
            return response.json();
        }),
        fetch('/discountedProducts').then(response => {
            if (!response.ok) {
                throw new Error('Failed to load discounted products');
            }
            return response.json();
        })
    ])
    .then(([adsData, productsData]) => {
        console.log('Fetched ads data:', adsData);
        console.log('Fetched products data:', productsData);

        // Process the ads data
        if (Array.isArray(adsData)) {
            // Update swiper with ads data
            const swiperContainer = document.querySelector('.swiper-wrapper');
            swiperContainer.innerHTML = '';
            adsData.forEach(ad => {
                swiperContainer.innerHTML += `
                    <div class="swiper-slide ads-swiper-slide">
                        <a href="${ad.url_link || '#'}" target="_blank">
                            <img src="${ad.image_url}" alt="Ad Image">
                        </a>
                    </div>
                `;
            });
        } else {
            console.error('Ads data is not an array:', adsData);
        }

        // Process discounted products data
        if (Array.isArray(productsData)) {
            // Process products
            console.log('Products data:', productsData);
        } else {
            console.error('Products data is not an array:', productsData);
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error.message);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Fetch category images from the DB
    fetch('/ads/category-images')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched category images:", data);  // Check if data is fetched correctly
            if (data.length >= 2) {
                const discountedImgContainer = document.querySelector('#section1 .categ_img');
                const specialImgContainer = document.querySelector('#section2 .categ_img');

                console.log("Discounted Image Container:", discountedImgContainer);  // Check if container is selected
                console.log("Special Image Container:", specialImgContainer);  // Check if container is selected

                // Check if elements exist before modifying them
                if (discountedImgContainer && specialImgContainer) {
                    // Insert images into the respective containers
                    discountedImgContainer.innerHTML = `
                <a href="${data[0].url_link}">
                    <img src="${data[0].image_url}" alt="Discounted Products">
                </a>
            `;
                    specialImgContainer.innerHTML = `
                <a href="${data[1].url_link}">
                    <img src="${data[1].image_url}" alt="Special Products">
                </a>
            `;
                } else {
                    console.error("Container elements not found.");
                }
            }
        })
        .catch(error => console.error("Error fetching category images:", error));
});
