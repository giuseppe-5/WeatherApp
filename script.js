let api_key = "";

function getWeather() {
    let cityInput = document.getElementById("cityInput");
    let city = cityInput.value.trim();

    if (!city) {
        alert("Bitte gib eine Stadt ein.");
        return;
    }

    const xhttpr = new XMLHttpRequest();
    xhttpr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`, true);

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = JSON.parse(xhttpr.response);

            if (response.cod !== 200) {
                alert('Stadt nicht gefunden!');
                return;
            }

            const temperature = response.main.temp;
            const weatherDescription = response.weather[0].description;
            const windSpeed = response.wind.speed;
            const iconCode = response.weather[0].icon;

            const roundedTemperature = Math.round(temperature * 10) / 10;

            let tempDiv = document.getElementById("temp-div");
            tempDiv.innerHTML = `<p class="temp">${roundedTemperature}°C</p>`;

            let weatherInfo = document.getElementById("weather-info");
            weatherInfo.innerHTML = `
                <p class="description">${city}</p>
                <p class="description">${weatherDescription}</p>`;

            let iconImg = document.getElementById("weather-icon");
            iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            iconImg.alt = weatherDescription;
            iconImg.style.display = "block";
        } else {
            console.error(`Fehler: ${xhttpr.statusText}`);
            alert('Es gab ein Problem beim Abrufen der Wetterdaten.');
        }
    };

    xhttpr.send();
}

document.getElementById("cityInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Wenn Enter gedrückt wird, den Click-Event des Buttons auslösen
        document.querySelector("button").click();
    }
});