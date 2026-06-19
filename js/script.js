// TOPBAR

const openButton = document.getElementById('open-sidebar-button');
const navbar = document.getElementById('navbar');
const media = window.matchMedia('(width < 768px)');

function updateNavbar(e) {
    if (!navbar) return;

    if (e.matches) {
        navbar.setAttribute('inert', '');
        return;
    }

    navbar.classList.remove('show');
    navbar.removeAttribute('inert');
    openButton?.setAttribute('aria-expanded', 'false');
}

function openSidebar() {
    if (!navbar || !openButton) return;

    navbar.classList.add('show');
    openButton.setAttribute('aria-expanded', 'true');
    navbar.removeAttribute('inert');
}

function closeSidebar() {
    if (!navbar || !openButton) return;

    navbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');

    if (media.matches) {
        navbar.setAttribute('inert', '');
    }
}

media.addEventListener('change', updateNavbar);
updateNavbar(media);

// TOPBAR END



//drop down

document.addEventListener("DOMContentLoaded", () => {

    // Main dropdown
    document.querySelectorAll(".menu-title").forEach(item => {

        item.addEventListener("click", function(e) {

            if(!media.matches) return;

            e.preventDefault();
            e.stopPropagation();

            this.closest(".menu").classList.toggle("mobile-open");

        });

    });

    // Second level dropdowns
    document.querySelectorAll(".has-child > a").forEach(item => {

        item.addEventListener("click", function(e) {

            if(!media.matches) return;

            e.preventDefault();
            e.stopPropagation();

            this.closest(".has-child").classList.toggle("mobile-open");

        });

    });

});









//CARDS
const cards = document.querySelectorAll('.card');

if ('IntersectionObserver' in window) {
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
} else {
    cards.forEach((card) => {
        card.classList.add('show');
    });
}

//CARDS END

// FREE TRIAL UPLOAD
const trialUpload = document.getElementById('trial-upload');
const fileCount = document.getElementById('file-count');
const formMessage = document.getElementById('form-message');

if (trialUpload) {
    trialUpload.addEventListener('change', () => {
        if (trialUpload.files.length > 2) {
            trialUpload.value = '';
            if (fileCount) fileCount.textContent = 'No files selected';
            if (formMessage) formMessage.textContent = 'Please upload a maximum of 2 files for the free trial.';
            return;
        }

        if (fileCount) {
            const count = trialUpload.files.length;
            fileCount.textContent = count === 1 ? '1 file selected' : `${count} files selected`;
        }

        if (formMessage) {
            formMessage.textContent = '';
        }
    });
}

// CLIPPING PATH CAROUSEL
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const images = Array.from(carousel.querySelectorAll('.clipping-carousel-image'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const frame = carousel.querySelector('.clipping-carousel-frame');
    const previousButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    let activeIndex = 0;
    let timerId;

    if (!images.length) return;

    function showSlide(index) {
        activeIndex = (index + images.length) % images.length;

        images.forEach((image, imageIndex) => {
            image.classList.toggle('is-active', imageIndex === activeIndex);
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    function startCarousel() {
        timerId = window.setInterval(() => {
            showSlide(activeIndex + 1);
        }, 3000);
    }

    function restartCarousel() {
        window.clearInterval(timerId);
        startCarousel();
    }

    frame?.addEventListener('mousemove', (event) => {
        const activeImage = images[activeIndex];
        const frameRect = frame.getBoundingClientRect();
        const x = ((event.clientX - frameRect.left) / frameRect.width) * 100;
        const y = ((event.clientY - frameRect.top) / frameRect.height) * 100;

        activeImage.style.setProperty('--zoom-x', `${x}%`);
        activeImage.style.setProperty('--zoom-y', `${y}%`);
    });

    frame?.addEventListener('mouseleave', () => {
        images[activeIndex].style.setProperty('--zoom-x', '50%');
        images[activeIndex].style.setProperty('--zoom-y', '50%');
    });

    previousButton?.addEventListener('click', () => {
        showSlide(activeIndex - 1);
        restartCarousel();
    });

    nextButton?.addEventListener('click', () => {
        showSlide(activeIndex + 1);
        restartCarousel();
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            showSlide(Number(dot.dataset.carouselDot));
            restartCarousel();
        });
    });

    showSlide(0);
    startCarousel();
});
