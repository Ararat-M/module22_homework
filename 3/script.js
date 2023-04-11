document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".btn").addEventListener("click", () => {
        showSize();
        showLocation();
    })
    
    function showSize() {
        const windowSize = document.querySelector(".window-size");
    
        windowSize.textContent = `Ширина: ${window.screen.width}, Высота: ${window.screen.height}`;
    }
    
    function showLocation() {
        const mapCoords = document.querySelector(".map-coords");
    
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
    
            mapCoords.textContent = `Широта: ${latitude}, Долгота: ${longitude}`   
        }
    
        function error(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
            mapCoords.textContent = "Информация о местоположении недоступна";
        }
    
        if (!navigator.geolocation) {
            mapCoords.textContent = "Geolocation не поддерживается вашим браузером";
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
})
