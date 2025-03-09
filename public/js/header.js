

// This script hides the navigation bar (navbar) when scrolling down and shows it when scrolling up.
// The idea is to keep the navbar hidden while the user is scrolling through content, 
// but reveal it again when they start scrolling up for easier navigation.

// Variable to track the last scroll position
let lastScrollTop = 0;

// Event listener to detect scroll events
window.addEventListener("scroll", function () {
    // Get the current scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const navs = document.querySelectorAll("header nav"); 

    // Loop through each nav (in case there are multiple headers with nav)
    navs.forEach((nav) => {
        if (scrollTop > lastScrollTop) {
            nav.style.opacity = "0";
            nav.style.transform = "translateY(-100%)";
            nav.style.pointerEvents = "none";
        } else {
            nav.style.opacity = "1";
            nav.style.transform = "translateY(0)";
            nav.style.pointerEvents = "auto";
        }
    });

    // Update last scroll position for next scroll event comparison
    lastScrollTop = scrollTop;
});


document.addEventListener("DOMContentLoaded", function () {
    function openLanguageModal() {
        document.getElementById("languageModal").classList.add("show");
    }

    function closeLanguageModal() {
        document.getElementById("languageModal").classList.remove("show");
    }

    // Wait for the header to load before adding event listeners
    setTimeout(() => {
        const languageBtn = document.querySelector(".icon_language");
        const closeModalBtn = document.querySelector(".close-btn");
        const closeButton = document.querySelector(".btn-close");

        if (languageBtn) languageBtn.addEventListener("click", openLanguageModal);
        if (closeModalBtn) closeModalBtn.addEventListener("click", closeLanguageModal);
        if (closeButton) closeButton.addEventListener("click", closeLanguageModal);
    }, 500);
});


document.addEventListener("DOMContentLoaded", function () {
    function openMobileLanguageModal() {
        document.getElementById("mobileLanguageModal").classList.add("show");
    }

    function closeMobileLanguageModal() {
        document.getElementById("mobileLanguageModal").classList.remove("show");
    }

    // Wait for the header to load before adding event listeners
    setTimeout(() => {
        const arabicOption = document.querySelector(".dropdown-menu a[data-lang='fr']");
        const closeModalBtn = document.querySelector(".mobile-close-btn");
        const closeButton = document.querySelector(".mobile-btn-close");

        if (arabicOption) arabicOption.addEventListener("click", openMobileLanguageModal);
        if (closeModalBtn) closeModalBtn.addEventListener("click", closeMobileLanguageModal);
        if (closeButton) closeButton.addEventListener("click", closeMobileLanguageModal);
    }, 500);
});
