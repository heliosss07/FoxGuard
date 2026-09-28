document.addEventListener("DOMContentLoaded", () => {
    setupHeaderScroll();
    setupModuleFilters();
    setupCourse();
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

function setupCourse() {
    const lessons = document.querySelectorAll(".lesson");
    if (lessons.length === 0) return;

    const lessonButtons = document.querySelectorAll(".lesson-btn");

    function showLesson(number) {
        lessons.forEach((lesson) => {
            lesson.hidden = lesson.dataset.lesson !== number;
        });

        lessonButtons.forEach((button) => {
            button.setAttribute("aria-current", button.dataset.lesson === number);
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    lessonButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showLesson(button.dataset.lesson);
        });
    });

    document.querySelectorAll(".next-lesson").forEach((button) => {
        button.addEventListener("click", () => {
            showLesson(button.dataset.next);
        });
    });

    document.querySelectorAll(".prev-lesson").forEach((button) => {
        button.addEventListener("click", () => {
            showLesson(button.dataset.prev);
        });
    });

    showLesson("1");
}