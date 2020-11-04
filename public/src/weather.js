
"use strict";

import { printForecast } from './module/forecast.js';

async function checkWeather(whenToCheck) {
    await fetch("https://extreme-ip-lookup.com/json")
        .then(response => response.json())
        .then(response => fetchWithLocation(response.city, whenToCheck))
        .catch(error => {
            console.log(`Request for user location has failed: ${error.message}`)
        })
}

function fetchWithLocation(userLocation, whenToCheck) {
    let weatherSearchUrl = `${window.location.protocol}//${window.location.host}/weather?time=${whenToCheck}`;
    let weatherSearchMethod = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `userLocation=${userLocation}`
    }
    fetch(weatherSearchUrl, weatherSearchMethod)
        .then(response => response.json())
        .then(response => {
            if (whenToCheck === "current") printWeather(response, userLocation);
            else printForecast(response);
        })
        .catch(error => {
            console.log(`Request for user location has failed: ${error.message}`)
        })
}

function printWeather(userWeather, userLocation) {
    let weatherConditions = ["", "", "", ""];
    weatherConditions = weatherBot(userWeather.current, weatherConditions, userLocation);
    document.getElementById("weatherStamp").innerHTML = "";
    for (let condition in weatherConditions) {
        document.getElementById("weatherStamp").innerHTML += weatherConditions[condition];
    }
    document.getElementById("weatherStamp").innerHTML += " Find out <a id='forecastLink'>more</a> about the current forecast for you area.";
    document.getElementById("forecastLink").href = `${window.location.protocol}//${window.location.host}/weather/forecast`;
    setTimeout(checkWeather, 60000);
}

function weatherBot(userWeather, weatherConditions, userLocation) {
    weatherConditions[0] = `In ${userLocation} the temperature is ${userWeather.temp_c}&#8451; `;
    if (userWeather.gust_kph > 79) {
        weatherConditions[1] = "with cyclonic winds present, STAY INDOORS! ";
    } else if (userWeather.gust_kph > 49) {
        weatherConditions[1] = `with strong ${windDirection(userWeather)} winds coming through, beware potentially worsening conditions. `;
        if (userWeather.humidity > 60) {
            weatherConditions[2] = `Current humidity is also high at ${userWeather.humidity}% meaning rain and storms are strong possibilities.`;
        }
    } else {
        weatherConditions[1] = `with a gentle to moderate ${windDirection(userWeather)} gust coming through. `;
        if (userWeather.humidity > 60) {
            weatherConditions[2] = `Current humidity is also high at ${userWeather.humidity}% meaning afternoon rain and storms are possibilities.`;
        } else if (userWeather.uv > 8 ) {
            weatherConditions[3] = `UV is rated at ${userWeather.uv} (high), so stay out of the sun where possible!`;
        } else if (userWeather.uv > 3) {
            weatherConditions[3] = `UV is rated at ${userWeather.uv} (medium) - remember to apply your sun screen!`;
        }
    }

    return weatherConditions;
}

function windDirection(userWeather) {
    let windDir = userWeather.wind_dir;
    let windDirStr = "";

    for (let index in windDir) {
        if (windDir[index] === "E") {
            windDirStr += " east";
        } else if (windDir[index] === "W") {
            windDirStr += " west";
        } else if (windDir[index] === "S") {
            windDirStr += " south";
        } else {
            windDirStr += " north";
        }
    }

    windDirStr += "erly";
    return windDirStr;
}

export { checkWeather };
