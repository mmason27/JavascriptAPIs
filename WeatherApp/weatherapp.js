const cityTextBox = document.getElementById("cityTextBox");
const enterCityStateButton = document.getElementById("enterCityStateButton");
const infoDisplay = document.getElementById("infoDisplay");
const stateTextBox = document.getElementById("stateTextBox");

//getting the city and state from the user
enterCityStateButton.addEventListener('click', () => {
    const city = cityTextBox.value;
    const state = stateTextBox.value;

    fetchWeather(city, state)
    cityTextBox.value = "";
    stateTextBox.value = "";
})

//function for fetching the weather from the api
function fetchWeather(city, state) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=19609be724a8df10c209346015e71fe9&units=imperial`)
    .then((response) => { 
        return response.json();
    }) .then((posts) => {
        console.log(posts.main);
        displayWeather(city, state, posts);
    })
}

//function for displaying the weather to the user
function displayWeather(city, state, posts) {
    let post = posts.main;
    const weatherItem = `<h1 id="cityName">Forecast for ${city}, ${state}</h1>
                    <div id="weatherDetails">
                    <p id="weather">${posts.weather[0].main}</p>
                    <p id="minTemp">Today's Low: ${Math.round(post.temp_min)}<span>&#176;</span> F</p>
                    <p id="maxTemp">Today's High: ${Math.round(post.temp_max)}<span>&#176;</span> F</p>
                    <p id="pressure">Pressure: ${post.pressure}</p></div>`
    infoDisplay.innerHTML = weatherItem; 
}
