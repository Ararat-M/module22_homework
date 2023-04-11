document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".btn").addEventListener("click", () => {
        document.querySelector(".svg-icon").classList.toggle("svg-icon_active");
    })
})