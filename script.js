document.addEventListener('DOMContentLoaded', (event) => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        body.classList.toggle('nav-open');
    });

    // Close the menu when a link is clicked
    const navLinks = mainNav.getElementsByTagName('a');
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', () => {
            mainNav.classList.remove('open');
            body.classList.remove('nav-open');
        });
    }

    // Highlight the current page in the navigation
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});