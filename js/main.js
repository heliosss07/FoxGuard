document.addEventListener("DOMContentLoaded", () => {
    setupHeaderScroll();
});


function setupHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}