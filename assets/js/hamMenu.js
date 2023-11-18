const hamBtn = document.querySelector(".ham");
const mobileMenu = document.querySelector(".mobile-menu .menu");
const hamCloseBtn = document.querySelector(".closedHam");
const body = document.body;

function toggleMenu() {
    mobileMenu.classList.toggle('open');
    body.classList.toggle('hidden-y');
};

hamBtn.addEventListener('click', toggleMenu);
hamCloseBtn.addEventListener("click", toggleMenu);