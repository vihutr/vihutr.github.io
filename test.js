document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("animatedButton");
    const buttonImage = document.getElementById("buttonImage");

    button.addEventListener("mouseenter", () => {
        buttonImage.src = "hover.png"; // Change to hover image
    });

    button.addEventListener("mouseleave", () => {
        buttonImage.src = "normal.png"; // Back to normal image
    });

    button.addEventListener("mousedown", () => {
        buttonImage.src = "click.png"; // Change to clicked image
    });

    button.addEventListener("mouseup", () => {
        buttonImage.src = "hover.png"; // Back to hover image
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("animatedButton");
    const buttonImage = document.getElementById("buttonImage");

    button.addEventListener("mouseenter", () => {
        buttonImage.src = "hover.png"; // Change to hover image
    });

    button.addEventListener("mouseleave", () => {
        buttonImage.src = "normal.png"; // Back to normal image
    });

    button.addEventListener("mousedown", () => {
        buttonImage.src = "click.png"; // Change to clicked image
    });

    button.addEventListener("mouseup", () => {
        buttonImage.src = "hover.png"; // Back to hover image
    });
});
