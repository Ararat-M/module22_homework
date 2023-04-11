const severUrl = "wss://echo-ws-service.herokuapp.com/";
const inputMessage = document.querySelector(".input-message");
const btnSendMessage = document.querySelector(".btn-send-message");
const btnSendGeo = document.querySelector(".btn-send-geo");
const chat = document.querySelector(".chat");

let myWebSocket = new WebSocket(severUrl);

function sendMessage(message) {
    message = message.trim();

    if (!message.length <= 0) {
        const p = document.createElement("p");
        p.classList.add("chat__message", "chat__client-message");
        p.textContent = message;   
        chat.appendChild(p);

        myWebSocket.send(message);
    }
}

function sendGeo() {
    function success(position) {
        const coords = position.coords;
        const mapHreh = `https://www.openstreetmap.org/#map=19/${coords.latitude}/${coords.longitude}`;
        
        const a = document.createElement("a");
        a.classList.add("chat__message", "chat__client-message", "chat__link-message");
        a.textContent = "Моя геолокация";
        a.href = mapHreh;
        a.target = "_blank";
        chat.appendChild(a);
    }

    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
    }

    if (!navigator.geolocation) {
        console.error("Geolocation не поддерживается вашим браузером");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

myWebSocket.onmessage = function(evt) {
    const p = document.createElement("p");
    p.classList.add("chat__message", "chat__server-message");
    p.textContent = evt.data;
    chat.appendChild(p);
}

btnSendMessage.addEventListener("click", () => {
    sendMessage(inputMessage.value);
    inputMessage.value = null;
})

btnSendGeo.addEventListener("click", () => {
    sendGeo();
})