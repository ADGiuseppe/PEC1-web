document.addEventListener("DOMContentLoaded", () => {
    const relatedLinks = document.querySelectorAll(".related-links a");
    relatedLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            alert("Discover more about " + event.target.textContent + "!");
        });
    });
});
