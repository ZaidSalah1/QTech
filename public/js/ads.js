
document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        fetch('/ads').then(res => res.json()),  
        fetch('/ads/category-images').then(res => res.json())  
    ])
    .then(([adsData, categoryImagesData]) => {
        console.log("Ads Data:", adsData);
        console.log("Category Images Data:", categoryImagesData);

        // ✅ Update Ads Swiper
        updateAdsSwiper(adsData);

        // ✅ Update Category Images
        updateCategoryImages(categoryImagesData);
    })
    .catch(error => {
        console.error("Error fetching ads or category images:", error);
    });
});

function updateAdsSwiper(adsData) {
    const swiperContainer = document.querySelector('.swiper-wrapper');
    if (!swiperContainer) return;

    swiperContainer.innerHTML = ''; // Clear existing slides

    adsData.forEach(ad => {
        swiperContainer.innerHTML += `
            <div class="swiper-slide ads-swiper-slide">
                <a href="${ad.url_link || '#'}" target="_blank">
                    <img src="${ad.image_url}" alt="Ad Image">
                </a>
            </div>`;
    });

    // ✅ Reinitialize Swiper
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

}

function updateCategoryImages(categoryImagesData) {
    if (!Array.isArray(categoryImagesData) || categoryImagesData.length < 2) {
        console.error("Invalid category images data");
        return;
    }

    const discountedImgContainer = document.querySelector('#section1 .categ_img');
    const specialImgContainer = document.querySelector('#section2 .categ_img');

    if (discountedImgContainer && specialImgContainer) {
        discountedImgContainer.innerHTML = `
            <a href="${categoryImagesData[0].url_link}">
                <img src="${categoryImagesData[0].image_url}" alt="Discounted Products">
            </a>
        `;
        specialImgContainer.innerHTML = `
            <a href="${categoryImagesData[1].url_link}">
                <img src="${categoryImagesData[1].image_url}" alt="Special Products">
            </a>
        `;
    } else {
        console.error("Container elements not found.");
    }
}

function updateCategoryImages(categoryImagesData) {
    if (!Array.isArray(categoryImagesData) || categoryImagesData.length < 2) {
        console.error("Invalid category images data");
        return;
    }












// document.addEventListener("DOMContentLoaded", function () {
//     fetch('/ads')  // Fetch ads from DB
//         .then(response => response.json())
//         .then(data => {
//             const swiperContainer = document.querySelector('.swiper-wrapper');
//             swiperContainer.innerHTML = ''; // Clear existing slides if any
//             data.forEach(ad => {
//                 // Add image to Swiper and Display Area
//                 swiperContainer.innerHTML += `
//             <div class="swiper-slide ads-swiper-slide">
//                 <a href="${ad.url_link || '#'}" target="_blank">
//                     <img src="${ad.image_url}" alt="Ad Image">
//                 </a>
//             </div>
//             `;
//             });

//             // Reinitialize Swiper after the slides have been added
//             var swiper = new Swiper(".slide-swp", {
//                 effect: 'coverflow',
//                 grabCursor: true,
//                 centeredSlides: true,
//                 slidesPerView: 'auto',
//                 coverflowEffect: {
//                     rotate: 0,
//                     stretch: 0,
//                     depth: 100,
//                     modifier: 1, // Adjust this value to control the size difference
//                     slideShadows: false,
//                 },
//                 pagination: {
//                     el: ".swiper-pagination",
//                     dynamicBullests: true,
//                     clickable: true
//                 },
//                 autoplay: {
//                     delay: 2500,
//                 }, loop: true
//             });
//         })
//         .catch(error => console.error("Error fetching ads:", error));
// });


// document.addEventListener("DOMContentLoaded", function () {
//     // Fetch category images from the DB
//     fetch('/ads/category-images')
//         .then(response => response.json())
//         .then(data => {
//             console.log("Fetched category images:", data);  // Check if data is fetched correctly
//             if (data.length >= 2) {
//                 const discountedImgContainer = document.querySelector('#section1 .categ_img');
//                 const specialImgContainer = document.querySelector('#section2 .categ_img');

//                 console.log("Discounted Image Container:", discountedImgContainer);  // Check if container is selected
//                 console.log("Special Image Container:", specialImgContainer);  // Check if container is selected

//                 // Check if elements exist before modifying them
//                 if (discountedImgContainer && specialImgContainer) {
//                     // Insert images into the respective containers
//                     discountedImgContainer.innerHTML = `
//                 <a href="${data[0].url_link}">
//                     <img src="${data[0].image_url}" alt="Discounted Products">
//                 </a>
//             `;
//                     specialImgContainer.innerHTML = `
//                 <a href="${data[1].url_link}">
//                     <img src="${data[1].image_url}" alt="Special Products">
//                 </a>
//             `;
//                 } else {
//                     console.error("Container elements not found.");
//                 }
//             }
//         })
//         .catch(error => console.error("Error fetching category images:", error));
// });
    const discountedImgContainer = document.querySelector('#section1 .categ_img');
    const specialImgContainer = document.querySelector('#section2 .categ_img');

    if (discountedImgContainer && specialImgContainer) {
        discountedImgContainer.innerHTML = `
            <a href="${categoryImagesData[0].url_link}">
                <img src="${categoryImagesData[0].image_url}" alt="Discounted Products">
            </a>
        `;
        specialImgContainer.innerHTML = `
            <a href="${categoryImagesData[1].url_link}">
                <img src="${categoryImagesData[1].image_url}" alt="Special Products">
            </a>
        `;
    } else {
        console.error("Container elements not found.");
    }
}

