document.addEventListener("DOMContentLoaded", () => {
    setupHeaderScroll();
    setupModuleFilters();
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

function setupModuleFilters() {
    const grid = document.getElementById("modules-grid");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".module-card"));
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("module-search");
    const noResults = document.getElementById("no-results");

    let activeFilter = "all";

    function applyFilters() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach((card) => {
            const level = card.dataset.level;
            const title = card.querySelector("h3").textContent.toLowerCase();

            const matchesFilter = activeFilter === "all" || level === activeFilter;
            const matchesSearch = query === "" || title.includes(query);
            const show = matchesFilter && matchesSearch;

            card.hidden = !show;
            if (show) visibleCount += 1;
        });

        if (noResults) {
            noResults.hidden = visibleCount > 0;
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            button.classList.add("active");
            activeFilter = button.dataset.filter;
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }
}