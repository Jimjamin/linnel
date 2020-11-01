
"use strict";

import { calcDayPhase, isoTimeStamp, isoDateStamp } from './time.js';

const user = "";

window.onload = () => {
    document.getElementById("lightMode").onclick = switchLightMode;
    document.getElementById("nightMode").onclick = switchLightMode;

    welcomeUser();

    reloadHome();
    setTimeout(() => {
        document.getElementById("preLoader").style.display = "none";
    }, 2500);
}

function reloadHome() {
    let homeLogos = document.getElementsByClassName("homeLogo");
    for (let index in homeLogos.length) {
        homeLogos[index].addEventListener("click", () => {
            window.location.href = "http://localhost:3000";
        });
    }
}

function welcomeUser() {
    let currentTime = new Date();
    let phaseOfDay = calcDayPhase(currentTime.getHours());
    if (user !== "") {
        document.title = `Good ${phaseOfDay}, ${user} - Linnel`;
        document.getElementsByTagName("h1")[0].innerHTML = `Good ${phaseOfDay}, ${user}!`;
    } else {
        document.title = `Good ${phaseOfDay} - Linnel`;
        document.getElementsByTagName("h1")[0].innerHTML = `Good ${phaseOfDay}!`;
    }

    document.getElementsByTagName("h1")[0].style.display = "block";
    document.getElementById("dateStamp").style.display = "inline-block";

    checkTime();
    checkWeather();
}

function checkTime() {
    let currentTime = new Date();
    let isoTime = isoTimeStamp(currentTime.getHours(), currentTime.getMinutes());
    let isoDate = isoDateStamp(currentTime.getDate(), currentTime.getMonth(), currentTime.getFullYear());

    document.getElementById("dateStamp").innerHTML = `It is currently ${isoTime} on the ${isoDate}.`
    setTimeout(checkTime, 6000);
}

function switchLightMode() {
    if (document.getElementById("nightMode").style.display === "none") {
        document.getElementById("menuBar").style.backgroundColor = "var(--theme)";
        document.body.style.backgroundColor = "var(--light-theme)";
        document.body.style.color = "black";
        document.getElementById("lightMode").style.display = "none";
        document.getElementById("nightMode").style.display = "inline-block";
    } else {
        document.getElementById("menuBar").style.backgroundColor = "var(--dark-theme)";
        document.body.style.backgroundColor = "var(--theme)";
        document.body.style.color = "white";
        document.getElementById("nightMode").style.display = "none";
        document.getElementById("lightMode").style.display = "inline-block";
    }
}

function checkWeather() {
    fetch("https://extreme-ip-lookup.com/json")
        .then(response => response.json())
        .then(response => {
            let weatherSearchUrl = `${window.location.protocol}//${window.location.host}/api/weather`;
            let userLocation = response.city;
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
        })
        .catch(error => {
            console.log(`Request for user location has failed: ${error.message}`)
        })
}

function printWeather(userWeather, userLocation) {
    let currentTemp = `In ${userLocation} the temperature is ${userWeather.temp_c}&#8451; `;
    let currentWinds = "";
    let currentHumidity = "";
    let currentUv = "";
    if (userWeather.gust_kph > 99) {
        currentWinds = "with cyclonic winds present, STAY INDOORS! ";
    } else if (userWeather.gust_kph > 59) {
        currentWinds = `with strong ${windDirection(userWeather)} winds coming through, beware potentially worsening conditions. `;
        if (userWeather.humidity > 60) {
            currentHumidity = `Current humidity is also high at ${userWeather.humidity}% meaning rain and storms are strong possibilities.`;
        }
    } else {
        currentWinds = `with a gentle to moderate ${windDirection(userWeather)} breeze coming through. `;
        if (userWeather.humidity > 60) {
            currentHumidity = `Current humidity is also high at ${userWeather.humidity}% meaning afternoon rain and storms are possibilities.`;
        } else if (userWeather.uv > 8) {
            currentUv = `UV is rated at ${userWeather.uv} (high), so stay out of the sun where possible!`;
        } else if (userWeather.uv > 3) {
            currentUv = `UV is rated at ${userWeather.uv} (medium); remember to apply your sun screen!`;
        }
    }
    document.getElementById("weatherStamp").innerHTML = ` ${currentTemp}${currentWinds}${currentHumidity}${currentUv}`;
    setTimeout(checkWeather, 60000);
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
