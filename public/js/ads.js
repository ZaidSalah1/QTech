document.addEventListener("DOMContentLoaded", function () {
    fetch('/ads')  // Fetch ads from DB
        .then(response => response.json())
        .then(data => {
            const swiperContainer = document.querySelector('.swiper-wrapper');
            swiperContainer.innerHTML = ''; // Clear existing slides if any
            data.forEach(ad => {
                // Add image to Swiper and Display Area
                swiperContainer.innerHTML += `
            <div class="swiper-slide ads-swiper-slide">
                <a href="${ad.url_link || '#'}" target="_blank">
                    <img src="${ad.image_url}" alt="Ad Image">
                </a>
            </div>
            `;
            });

            // Reinitialize Swiper after the slides have been added
            var swiper = new Swiper(".slide-swp", {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1, // Adjust this value to control the size difference
                    slideShadows: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullests: true,
                    clickable: true
                },
                autoplay: {
                    delay: 2500,
                }, loop: true
            });
        })
        .catch(error => console.error("Error fetching ads:", error));
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