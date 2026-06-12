//TOPBAR

const openButton = document.getElementById('open-sidebar-button')
const navbar = document.getElementById('navbar')

const media = window.matchMedia("(width < 768px)")

media.addEventListener('change', (e) => updateNavbar(e))

function updateNavbar(e) {
    const isMobile = e.matches
    console.log(isMobile)
    if (isMobile) {
        navbar.setAttribute('inert', '')
    }
    else {
        //Desktop device
        navbar.removeAttribute('inert')
    }
}

function openSidebar() {
    navbar.classList.add('show')
    openButton.setAttribute('aria-expanded', 'true')
    navbar.removeAttribute('inert')
}

function closeSidebar() {
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expanded', 'false')
    navbar.setAttribute('inert', '')
}

updateNavbar(media)

//TOPBAR END



//drop down

document.addEventListener("DOMContentLoaded", () => {

    // Main dropdown
    document.querySelectorAll(".menu-title").forEach(item => {

        item.addEventListener("click", function(e) {

            if(window.innerWidth > 768) return;

            e.preventDefault();
            e.stopPropagation();

            this.closest(".menu").classList.toggle("mobile-open");

        });

    });

    // Second level dropdowns
    document.querySelectorAll(".has-child > a").forEach(item => {

        item.addEventListener("click", function(e) {

            if(window.innerWidth > 768) return;

            e.preventDefault();
            e.stopPropagation();

            this.closest(".has-child").classList.toggle("mobile-open");

        });

    });

});









//CARDS
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }

    });

}, {
    threshold:0.2
});

cards.forEach((card) => {
    observer.observe(card);
});

//CARDS END