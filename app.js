
const cards = [...document.querySelectorAll(".tool-card")];
const searchInput = document.getElementById("toolSearch");
const filterButtons = [...document.querySelectorAll(".filter-pill")];
const noResults = document.getElementById("noResults");
let activeFilter = "all";

function filterTools() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const matchesSearch = !query || card.dataset.search.includes(query);
    const categories = card.dataset.category.split(" ");
    const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
    const show = matchesSearch && matchesFilter;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });

  noResults.hidden = visible !== 0;
}

searchInput.addEventListener("input", filterTools);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
    filterTools();
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".tool-card, .about-card, .leader-card").forEach(el => observer.observe(el));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
}
