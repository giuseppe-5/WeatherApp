let api_key = "fbe6994aefc3b1f3ffbff6b0bc1d75e7"

function getWeather() {
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${api_key}&units=metric`, true);

    xhttpr.send();

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = JSON.parse(xhttpr.response);
            // Process the response data here
            // Wetterdaten extrahieren
            const temperature = response.main.temp;  // Temperatur
            const weatherDescription = response.weather[0].description;  // Wetterbeschreibung
            const humidity = response.main.humidity;  // Luftfeuchtigkeit
            const windSpeed = response.wind.speed;  // Windgeschwindigkeit

            // Ausgabe der Daten
            console.log(`Temperatur: ${temperature}°C`);
            console.log(`Wetter: ${weatherDescription}`);
            console.log(`Luftfeuchtigkeit: ${humidity}%`);
            console.log(`Windgeschwindigkeit: ${windSpeed} m/s`);
        } else {
            // Handle error
            console.error(`Fehler: ${xhttpr.statusText}`);
            alert('Es gab ein Problem beim Abrufen der Wetterdaten.');
        }
    };

}

getWeather();