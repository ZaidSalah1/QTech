// menu.js

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

function openDashBoardMenu() {
    const openDashBoardMenu = document.querySelector('.openDashBoardMenu');
    const menu = document.querySelector('.menu');
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

// Export initializeMenu if you want to use it as a module in some environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMenu };
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeMenu();
    });
}
