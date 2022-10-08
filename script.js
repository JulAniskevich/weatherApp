let weather = {
    "apiKey": "94ded1175de48d492221a3694c45565c",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.main)
            this.displayWeather(data)
        })
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".card__weather-city").innerHTML = `Weather in ${name}`;
        document.querySelector(".card__weather-icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".card__weather-description").innerHTML = `${description}`;
        document.querySelector(".card__weather-temp").innerHTML = `${temp} °C`;
        document.querySelector(".card__weather-humidity").innerHTML = `Humidity: ${humidity}%`;
        document.querySelector(".card__weather-wind").innerHTML = `Wind speed: ${speed}km/h`;

        document.querySelector(".card__weather").classList.remove("loading");
        
        document.body.style.backgroundImage = `url("https://source.unsplash.com/random?${name}")`
    },

    search: function () {
        this.fetchWeather(document.querySelector(".card__search-bar").value);
    }
};

const searchButton = document.querySelector(".card__search-button");
const searchBar = document.querySelector(".card__search-bar");

searchButton.addEventListener("click", event => {
    weather.search();
    searchBar.value = "";
});

document.querySelector(".card__search-bar").addEventListener("keyup", event => {
    if (event.key == "Enter") {
        weather.search();
        searchBar.value = "";
    }
});

weather.fetchWeather("Minsk")