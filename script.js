const apiKey = "8e9b03cd95e640ca80720084f794f10c";

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city-name").innerText =
            data.name;

        document.querySelector(".temperature").innerText =
            `${Math.round(data.main.temp)}°C`;

        document.querySelector(".condition").innerText =
            data.weather[0].main;

        document.getElementById("humidity").innerText =
            `${data.main.humidity}%`;

        document.getElementById("feelsLike").innerText =
            `${Math.round(data.main.feels_like)}°C`;

        updateWeatherIcon(data.weather[0].main);

    }

    catch(error){

        alert(error.message);

    }

    finally{

        loading.style.display = "none";

    }

}

function updateWeatherIcon(condition){

    const icon = document.querySelector(".weather-icon");

    switch(condition.toLowerCase()){

        case "clear":
            icon.innerHTML =
            '<i class="fas fa-sun"></i>';
            break;

        case "clouds":
            icon.innerHTML =
            '<i class="fas fa-cloud"></i>';
            break;

        case "rain":
            icon.innerHTML =
            '<i class="fas fa-cloud-rain"></i>';
            break;

        case "drizzle":
            icon.innerHTML =
            '<i class="fas fa-cloud-showers-heavy"></i>';
            break;

        case "snow":
            icon.innerHTML =
            '<i class="fas fa-snowflake"></i>';
            break;

        case "thunderstorm":
            icon.innerHTML =
            '<i class="fas fa-bolt"></i>';
            break;

        default:
            icon.innerHTML =
            '<i class="fas fa-cloud-sun"></i>';

    }

}