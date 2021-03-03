const cityTextBox = document.getElementById("cityTextBox");
const enterCityButton = document.getElementById("enterCityButton");
const infoDisplay = document.getElementById("infoDisplay");

enterCityButton.addEventListener('click', () => {
    const city = cityTextBox.value;
    infoDisplay.innerHTML = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=19609be724a8df10c209346015e71fe9`)
    .then((response) => {
        return response.json()
    }) .then((posts) => {
        const post = posts.main;
        console.log(post)
        const weatherItem = `<h1 id="cityName">Forecast for ${city}</h1>
                    <div id="weatherDetails">
                    <p id="minTemp">Today's Low: ${kelvinToFarenh(post.temp_min)}<span>&#176;</span> F</p>
                    <p id="maxTemp">Today's High: ${kelvinToFarenh(post.temp_max)}<span>&#176;</span> F</p>
                    <p id="pressure">Pressure: ${post.pressure}</p></div>`
        infoDisplay.innerHTML = weatherItem;
        }) 
})

function kelvinToFarenh(kelvin) {
    let farenheit = ((kelvin-273.15)*1.8)+32;
    return Math.round(farenheit);
}


