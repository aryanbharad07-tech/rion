// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
            this.setAttribute('aria-expanded', expanded);
            nav.classList.toggle('open');
        });
    }
});