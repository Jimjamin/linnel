
"use strict";

async function checkWeather() {
    await fetch("https://extreme-ip-lookup.com/json")
        .then(response => response.json())
        .then(response => fetchWithLocation(response.city))
        .catch(error => {
            console.log(`Request for user location has failed: ${error.message}`)
        })
}

function fetchWithLocation(userLocation) {
    let weatherSearchUrl = `${window.location.protocol}//${window.location.host}/api/weather`;
    let weatherSearchMethod = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `userLocation=${userLocation}`
    }
    fetch(weatherSearchUrl, weatherSearchMethod)
        .then(response => response.json())
        .then(response => printWeather(response, userLocation))
        .catch(error => {
            console.log(`Request for user location has failed: ${error.message}`)
        })
}

function printWeather(userWeather, userLocation) {
    let weatherConditions = ["", "", "", ""];
    weatherConditions = weatherBot(userWeather, weatherConditions, userLocation);
    document.getElementById("weatherStamp").innerHTML = "";
    for (let condition in weatherConditions) {
        document.getElementById("weatherStamp").innerHTML += weatherConditions[condition];
    }
    setTimeout(checkWeather, 60000);
}

function weatherBot(userWeather, weatherConditions, userLocation) {
    weatherConditions[0] = `In ${userLocation} the temperature is ${userWeather.temp_c}&#8451; `;
    if (userWeather.gust_kph > 99) {
        weatherConditions[1] = "with cyclonic winds present, STAY INDOORS! ";
    } else if (userWeather.gust_kph > 59) {
        weatherConditions[1] = `with strong ${windDirection(userWeather)} winds coming through, beware potentially worsening conditions. `;
        if (userWeather.humidity > 60) {
            weatherConditions[2] = `Current humidity is also high at ${userWeather.humidity}% meaning rain and storms are strong possibilities.`;
        }
    } else {
        weatherConditions[1] = `with a gentle to moderate ${windDirection(userWeather)} breeze coming through. `;
        if (userWeather.humidity > 60) {
            weatherConditions[2] = `Current humidity is also high at ${userWeather.humidity}% meaning afternoon rain and storms are possibilities.`;
        } else if (userWeather.uv > 8) {
            weatherConditions[3] = `UV is rated at ${userWeather.uv} (high), so stay out of the sun where possible!`;
        } else if (userWeather.uv > 3) {
            weatherConditions[3] = `UV is rated at ${userWeather.uv} (medium) - remember to apply your sun screen!`;
        }
    }

    return weatherConditions;
}

function windDirection(userWeather) {
    if (userWeather.wind_dir === "E") {
        return "easterly";
    } else if (userWeather.wind_dir === "W") {
        return "westerly";
    } else if (userWeather.wind_dir === "S") {
        return "southerly";
    }
    return "northerly";
}

export { checkWeather };
