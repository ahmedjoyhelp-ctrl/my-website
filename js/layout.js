(function () {
  const script = document.currentScript;
  const src = script ? script.getAttribute('src') || '' : '';
  const basePath = script?.dataset.base || src.replace(/js\/layout\.js.*$/, '');
  const path = (filePath) => `${basePath}${filePath}`;

  const homeItem = { label: 'HOME', href: 'index.html' };
  const serviceItems = [
    { label: 'CLIPPING PATH', href: 'clipping-path-service.html' },
    { label: 'JEWELRY RETOUCH', href: 'jewelry-retouch.html' },
    { label: 'IMAGE MASKING', href: 'image-masking.html' },
  ];

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLink = ({ label, href }) => {
    const isActive = currentFile === href;
    return `<li><a${isActive ? ' class="active-link" aria-current="page"' : ''} href="${path(href)}">${label}</a></li>`;
  };

  const header = `
    <header class="site-header">
      <button id="open-sidebar-button" type="button" onclick="openSidebar()" aria-label="Open menu" aria-expanded="false" aria-controls="navbar">
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#c9c9c9"><path d="M153.33-240q-14.16 0-23.75-9.62-9.58-9.61-9.58-23.83 0-14.22 9.58-23.72 9.59-9.5 23.75-9.5h653.34q14.16 0 23.75 9.62 9.58 9.62 9.58 23.83 0 14.22-9.58 23.72-9.59 9.5-23.75 9.5H153.33Zm0-206.67q-14.16 0-23.75-9.61-9.58-9.62-9.58-23.84 0-14.21 9.58-23.71 9.59-9.5 23.75-9.5h653.34q14.16 0 23.75 9.61 9.58 9.62 9.58 23.84 0 14.21-9.58 23.71-9.59 9.5-23.75 9.5H153.33Zm0-206.66q-14.16 0-23.75-9.62-9.58-9.62-9.58-23.83 0-14.22 9.58-23.72 9.59-9.5 23.75-9.5h653.34q14.16 0 23.75 9.62 9.58 9.61 9.58 23.83 0 14.22-9.58 23.72-9.59 9.5-23.75 9.5H153.33Z"/></svg>
      </button>

      <div id="mobile-logo">
        <a href="${path('index.html')}">
          <img src="${path('images/logo_house.svg')}" alt="Logo">
        </a>
      </div>

      <nav id="navbar" aria-label="Primary navigation">
        <div class="nav-left-right" id="logo">
          <a href="${path('index.html')}" class="logo">
            <img src="${path('images/logo_house.svg')}" alt="Logo">
          </a>
        </div>

        <ul class="master">
          <li>
            <button id="close-sidebar-button" type="button" onclick="closeSidebar()" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#c9c9c9"><path d="M480-433.33 274.67-228q-9.67 9.67-23.34 9.67-13.66 0-23.33-9.67-9.67-9.67-9.67-23.33 0-13.67 9.67-23.34L433.33-480 228-685.33q-9.67-9.67-9.67-23.34 0-13.66 9.67-23.33 9.67-9.67 23.33-9.67 13.67 0 23.34 9.67L480-526.67 685.33-732q9.67-9.67 23.34-9.67 13.66 0 23.33 9.67 9.67 9.67 9.67 23.33 0 13.67-9.67 23.34L526.67-480 732-274.67q9.67 9.67 9.67 23.34 0 13.66-9.67 23.33-9.67 9.67-23.33 9.67-13.67 0-23.34-9.67L480-433.33Z"/></svg>
            </button>
          </li>

          <li id="humberg-logo"><a href="${path('index.html')}" class="humberg-logo"><img src="${path('images/logo_house.svg')}" alt="Logo"></a></li>
          ${navLink(homeItem)}

          <li class="menu">
            <a href="#" class="menu-title nav-text-hover photoeditinglala finalnavemargin" aria-haspopup="true">
              PHOTO EDITING
              <span class="mobile-arrow"><i class="fa-solid fa-angle-down"></i></span>
            </a>

            <ul class="submenu">
              <li class="item-for-sub nav-text-hover has-child">
                <a href="${path('ecommerce-edit.html')}">ECommerce Edit <span class="mobile-arrow"><i class="fa-solid fa-angle-down"></i></span></a>
                <ul class="sub-submenu">
                  <li><a href="${path('eyeglass-photo-edit.html')}">Eyeglass Photo Edit</a></li>
                  <li><a href="${path('hat-and-bag-photo-edit.html')}">Hat And Bag Photo Edit</a></li>
                  <li><a href="${path('shoes-photo-edit.html')}">Shoes Photo Edit</a></li>
                </ul>
              </li>
              <li class="item-for-sub nav-text-hover"><a href="${path('neck-join.html')}">Neck Join</a></li>
              <li class="item-for-sub nav-text-hover has-child">
                <a href="${path('fashion-retouch.html')}">Fashion Retouch <span class="mobile-arrow"><i class="fa-solid fa-angle-down"></i></span></a>
                <ul class="sub-submenu">
                  <li><a href="${path('portrait-retouch.html')}">Portrait Retouch</a></li>
                  <li><a href="${path('headshot-retouch.html')}">Headshot Retouch</a></li>
                  <li><a href="${path('maternity-retouch.html')}">Maternity Retouch</a></li>
                  <li><a href="${path('wedding-retouch.html')}">Wedding Retouch</a></li>
                  <li><a href="${path('newborn-retouch.html')}">Newborn Retouch</a></li>
                </ul>
              </li>
              <li class="item-for-sub nav-text-hover"><a href="${path('furniture-edit.html')}">Furniture Edit</a></li>
              <li class="item-for-sub nav-text-hover has-child">
                <a href="${path('shadow-making.html')}">Shadow Making <span class="mobile-arrow"><i class="fa-solid fa-angle-down"></i></span></a>
                <ul class="sub-submenu">
                  <li><a href="${path('drop-shadow.html')}">Drop Shadow</a></li>
                  <li><a href="${path('original-shadow.html')}">Original Shadow</a></li>
                  <li><a href="${path('reflection-shadow.html')}">Reflection Shadow</a></li>
                </ul>
              </li>
              <li class="item-for-sub nav-text-hover"><a href="${path('real-estate-retouch.html')}">Real Estate Retouch</a></li>
              <li class="item-for-sub nav-text-hover"><a href="${path('car-photo-edit.html')}">Car Photo Edit</a></li>
            </ul>
          </li>

          ${serviceItems.map(navLink).join('')}
          <li><a class="accent-link nav-left-right" href="${path('free-trial.html')}">FREE TRIAL</a></li>
        </ul>
      </nav>

      <div id="overlay" onclick="closeSidebar()" aria-hidden="true"></div>

      <aside class="secondary-nav" aria-label="Service highlights">
        <ul class="bottom-bar">
          <li class="item"><span><i class="fa-solid fa-dollar-sign"></i></span><p>From $0.25 per image</p></li>
          <li class="item vertical-line remove-support" aria-hidden="true"></li>
          <li class="item remove-support"><span><i class="fa-solid fa-heart"></i></span><p>24/7 support</p></li>
          <li class="item vertical-line remove-turnaround" aria-hidden="true"></li>
          <li class="item remove-turnaround"><span><i class="fa-solid fa-stopwatch"></i></span><p>Turnaround from 6 hours</p></li>
          <li class="item vertical-line remove-trustpolot" aria-hidden="true"></li>
          <li class="item remove-trustpolot"><p>Excellent 4.8 out of 5 <span class="star"><i class="fa-solid fa-star"></i></span> Trustpilot</p></li>
          <li class="item vertical-line remove-qualityguaranteed" aria-hidden="true"></li>
          <li class="item remove-qualityguaranteed"><span class="verify-button"><img src="${path('assets/verify.svg')}" alt=""></span><p>Quality guaranteed</p></li>
        </ul>
      </aside>
    </header>`;

  const footer = `
    <footer class="footer">
      <ul class="footer-top">
        <li class="footer-top-item"><i class="fa-solid fa-star"></i><span>Experienced Team</span></li>
        <li class="footer-top-item"><i class="fa-solid fa-star"></i><span>Quality Assurance</span></li>
        <li class="footer-top-item"><i class="fa-solid fa-star"></i><span>Fast Turnaround</span></li>
        <li class="footer-top-item"><i class="fa-solid fa-star"></i><span>Lower Pricing</span></li>
        <li class="footer-top-item"><i class="fa-solid fa-star"></i><span>Hire Virtual Assistants</span></li>
      </ul>

      <div class="footer-container">
        <div class="footer-box footer-about">
          <a href="${path('index.html')}" class="footer-logo"><img src="${path('images/logo_house.svg')}" alt="Logo House Logo"></a>
          <address><strong class="address">Address:</strong><br>20227, Saticoy Street, Winnetka,<br>California 91306</address>
        </div>

        <div class="footer-box footer-text">
          <p><strong>Logo House</strong> is for quick delivery time, dedicated support team and more. The first 3 images are free.</p>
          <p>You can send us your images through WeTransfer or Dropbox.</p>
        </div>

        <div class="footer-box upload-box">
          <h3>Easy Upload</h3>
          <div class="upload-icons">
            <a href="#" aria-label="WeTransfer"><img src="${path('images/original/WeTransfer_logo.svg')}" alt="WeTransfer"></a>
            <a href="#" aria-label="Google Drive"><img src="${path('images/original/Google_Drive_icon_(2026).svg')}" alt="Google Drive"></a>
            <a href="#" aria-label="Dropbox"><img src="${path('images/original/Dropbox_logo_2017.svg')}" alt="Dropbox"></a>
            <a href="#" aria-label="FTP"><img src="${path('images/original/filezilla-icon.webp')}" alt="FTP"></a>
          </div>
        </div>

        <div class="footer-box footer-links">
          <h3>Services</h3>
          <ul>
            <li><a href="${path('clipping-path-service.html')}">Clipping Path</a></li>
            <li><a href="${path('image-masking.html')}">Image Masking</a></li>
            <li><a href="${path('shadow-making.html')}">Shadows & Highlights</a></li>
            <li><a href="${path('jewelry-retouch.html')}">Jewelry Retouch</a></li>
            <li><a href="${path('portrait-retouch.html')}">Portrait Retouching</a></li>
            <li><a href="${path('color-correction.html')}">Color Correction Service</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-social">
        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
        <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
        <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        <a href="#" aria-label="RSS"><i class="fa-solid fa-rss"></i></a>
        <a href="#" aria-label="Tumblr"><i class="fa-brands fa-tumblr"></i></a>
      </div>
    </footer>`;

  const headerMount = document.querySelector('[data-site-header]');
  const footerMount = document.querySelector('[data-site-footer]');

  if (headerMount) headerMount.outerHTML = header;
  if (footerMount) footerMount.outerHTML = footer;
})();

