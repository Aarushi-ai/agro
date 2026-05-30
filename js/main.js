// js/main.js

function initNavigation() {
    const langBtn = document.getElementById('lang-switcher-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawerClose = document.getElementById('mobile-drawer-close');
    const mobileDrawer = document.getElementById('mobile-drawer');

    // Toggle Desktop Language Dropdown
    if(langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('hidden');
        });
        
        // Clicking outside drops the switcher menu safely
        document.addEventListener('click', () => langDropdown.classList.add('hidden'));
    }

    // Handle Responsive Drawer Smooth Action
    if(mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('translate-x-full');
        });
    }

    if(mobileDrawerClose && mobileDrawer) {
        mobileDrawerClose.addEventListener('click', () => {
            mobileDrawer.classList.add('translate-x-full');
        });
    }
    
    // Set dynamic current legal year matching the header footer system context
    const yearEl = document.getElementById('current-year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
}