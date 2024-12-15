// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu HTML to the page
    const mobileMenuHTML = `
        <div class="sm:hidden" id="mobile-menu">
            <div class="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 hidden" id="mobile-menu-backdrop"></div>
            <div class="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out" id="mobile-menu-container">
                <div class="pt-5 pb-6 px-5">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-auto" src="assets/logo.png" alt="SnapCity">
                        </div>
                        <button type="button" id="mobile-menu-close" class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-6">
                        <nav class="grid gap-y-4">
                            <a href="index.html" class="mobile-nav-link">Home</a>
                            <a href="dashboard.html" class="mobile-nav-link">Dashboard</a>
                            <a href="missions.html" class="mobile-nav-link">Missions</a>
                            <a href="rewards.html" class="mobile-nav-link">Rewards</a>
                            <a href="social.html" class="mobile-nav-link">Social</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add mobile menu button HTML
    const mobileMenuButtonHTML = `
        <div class="absolute right-0 top-0 h-16 flex items-center pr-2 sm:hidden">
            <button type="button" id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span class="sr-only">Open main menu</span>
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    `;

    // Insert mobile menu into the page
    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);

    // Insert mobile menu button
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.insertAdjacentHTML('beforeend', mobileMenuButtonHTML);
    }

    // Set up mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');

    function openMobileMenu() {
        mobileMenuContainer.classList.add('open');
        mobileMenuBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenuContainer.classList.remove('open');
        mobileMenuBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    mobileMenuButton.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Set active menu item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelector(`.mobile-nav-link[href="${currentPage}"]`)?.classList.add('active');
});
