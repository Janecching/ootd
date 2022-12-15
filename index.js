// const myElement = document.getElementById("demo");

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     myElement.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   myElement.innerHTML = "Latitude: " + position.coords.latitude +
//   "<br>Longitude: " + position.coords.longitude;
// }

// 25° 18′ N, 91° 35′ E

const app = document.getElementById('weather')
var request = new XMLHttpRequest()
request.open('GET', 'https://api.open-meteo.com/v1/forecast?latitude=37.5779&longitude=-122.3481&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=America%2FLos_Angeles', true)
request.onload = function() {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        console.log(data.daily.weathercode[0], data.daily.temperature_2m_max[0], data.daily.temperature_2m_min[0])
        if (!(data.daily.weathercode[0] in [0, 1, 2, 3])) {
            document.getElementById("top").src = "images/raincoat.jpg";
        } else {
            document.getElementById("top").src = "images/top.jpg";
        }
        const p = document.createElement('p')
        p.textContent = 'code:'.concat(data.daily.weathercode[0], ", max: ", data.daily.temperature_2m_max[0], ", min: ", data.daily.temperature_2m_min[0])
        app.appendChild(p)
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}
request.send()