document.addEventListener('DOMContentLoaded', (event) => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Close the menu when a link is clicked
    const navLinks = mainNav.getElementsByTagName('a');
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', () => {
            mainNav.classList.remove('show');
        });
    }

    // Highlight the current page in the navigation
    const currentPage = window.location.pathname.split("/").pop();
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});