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

// CLIPPING PATH PROJECT GALLERY
document.querySelectorAll('[data-project-gallery]').forEach((gallery) => {
    const projectImage = gallery.querySelector('[data-project-image]');
    const stage = gallery.querySelector('[data-project-stage]');
    const pane = gallery.querySelector('.clipping-project-pane');
    const thumbs = Array.from(gallery.querySelectorAll('[data-project-thumb]'));
    const previousButton = gallery.querySelector('[data-project-prev]');
    const nextButton = gallery.querySelector('[data-project-next]');
    const projects = [
        {
            image: 'images/original/basic-clipping-path.webp',
            alt: 'Basic clipping path product project'
        },
        {
            image: 'images/original/Cutout-On-White.webp',
            alt: 'Cutout product on white background project'
        },
        {
            image: 'images/original/furniture-photo-editing-service.webp',
            alt: 'Furniture clipping path project'
        },
        {
            image: 'images/original/clothing-photo-editing-service.webp',
            alt: 'Clothing clipping path project'
        },
        {
            image: 'images/original/Jewelry-Photo-Enhance-300x169.webp',
            alt: 'Jewelry clipping path project'
        },
        {
            image: 'images/original/service-red copy.png',
            alt: 'Red product clipping path project'
        },
        {
            image: 'images/original/Vehicles-Clipping-Path-shadowing-300x169.webp',
            alt: 'Vehicle clipping path project'
        }
    ];
    let activeProject = 0;
    let projectTimerId;
    let isProjectHovering = false;
    let zoomResetId;

    if (!projectImage || !stage || !pane || !projects.length) return;

    function setProject(index) {
        activeProject = (index + projects.length) % projects.length;
        const project = projects[activeProject];

        pane.classList.add('is-changing');

        window.setTimeout(() => {
            projectImage.src = project.image;
            projectImage.alt = project.alt;

            pane.classList.remove('is-changing');
        }, 160);

        thumbs.forEach((thumb, thumbIndex) => {
            const isActive = thumbIndex === activeProject;
            thumb.classList.toggle('is-active', isActive);
            thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    function startProjectLoop() {
        projectTimerId = window.setInterval(() => {
            setProject(activeProject + 1);
        }, 3000);
    }

    function restartProjectLoop() {
        window.clearInterval(projectTimerId);
        if (isProjectHovering) return;
        startProjectLoop();
    }

    stage.addEventListener('mouseenter', () => {
        isProjectHovering = true;
        window.clearInterval(projectTimerId);
        window.clearTimeout(zoomResetId);
        stage.classList.add('is-zooming');
    });

    stage.addEventListener('mousemove', (event) => {
        const stageRect = stage.getBoundingClientRect();
        const x = ((event.clientX - stageRect.left) / stageRect.width) * 100;
        const y = ((event.clientY - stageRect.top) / stageRect.height) * 100;

        stage.style.setProperty('--project-zoom-x', `${x}%`);
        stage.style.setProperty('--project-zoom-y', `${y}%`);
    });

    stage.addEventListener('mouseleave', () => {
        isProjectHovering = false;
        stage.classList.remove('is-zooming');
        window.clearTimeout(zoomResetId);
        zoomResetId = window.setTimeout(() => {
            stage.style.setProperty('--project-zoom-x', '50%');
            stage.style.setProperty('--project-zoom-y', '50%');
        }, 520);
        restartProjectLoop();
    });

    previousButton?.addEventListener('click', () => {
        setProject(activeProject - 1);
        restartProjectLoop();
    });

    nextButton?.addEventListener('click', () => {
        setProject(activeProject + 1);
        restartProjectLoop();
    });

    thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            setProject(Number(thumb.dataset.projectThumb));
            restartProjectLoop();
        });
    });

    setProject(0);
    startProjectLoop();
});

// CLIPPING PATH CAROUSEL
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const images = Array.from(carousel.querySelectorAll('.clipping-carousel-image'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const frame = carousel.querySelector('.clipping-carousel-frame');
    const previousButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    let activeIndex = 0;
    let timerId;
    let zoomResetId;

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

    frame?.addEventListener('mouseenter', () => {
        window.clearInterval(timerId);
        window.clearTimeout(zoomResetId);
    });

    frame?.addEventListener('mousemove', (event) => {
        const activeImage = images[activeIndex];
        const frameRect = frame.getBoundingClientRect();
        const x = ((event.clientX - frameRect.left) / frameRect.width) * 100;
        const y = ((event.clientY - frameRect.top) / frameRect.height) * 100;

        activeImage.style.setProperty('--zoom-x', `${x}%`);
        activeImage.style.setProperty('--zoom-y', `${y}%`);
    });

    frame?.addEventListener('mouseleave', () => {
        const activeImage = images[activeIndex];

        window.clearTimeout(zoomResetId);
        zoomResetId = window.setTimeout(() => {
            activeImage.style.setProperty('--zoom-x', '50%');
            activeImage.style.setProperty('--zoom-y', '50%');
        }, 300);

        restartCarousel();
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
