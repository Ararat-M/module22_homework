const apiUrl = "https://api.ipgeolocation.io/timezone";
const apiKey = "32bcd4a6e4b548968e7afcdb682ac679";
const userInfoTimezone = document.querySelector(".user-info-timezone");
const userInfoDate = document.querySelector(".user-info-date");

function createUrl(coords) { 
    const api = new URL(apiUrl);
    
    api.searchParams.set("apiKey", apiKey);
    api.searchParams.set("lat", coords.latitude);
    api.searchParams.set("long", coords.longitude);

    return api.href
}

async function success(position) {
    const coords = position.coords;

    const url = createUrl(coords);
    const result = await fetch(url).then((response) => { return response.json() });

    userInfoTimezone.textContent = `timezone: ${result.timezone}`;
    userInfoDate.textContent = `date: ${result.date_time_txt}`;
}

function error(err) { 
    console.error(`ERROR(${err.code}): ${err.message}`);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".btn").addEventListener("click", () => {
        if (!navigator.geolocation) {
            console.error("Geolocation не поддерживается вашим браузером");
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })
})
