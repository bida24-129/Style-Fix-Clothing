document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });
});

const images = document.querySelectorAll(".gallery img");
let currentIndex = 0;

function openModal(imgElement, index) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    currentIndex = index;
    modal.style.display = "flex";
    modalImage.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    const modalImage = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    modalImage.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
}
