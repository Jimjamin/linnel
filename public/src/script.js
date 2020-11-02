
"use strict";

import { checkTime, calcDayPhase } from './module/time.js';
import { checkWeather } from './module/weather.js';

const user = "";

window.onload = () => {
    document.getElementById("themeBtn").onclick = switchLightMode;

    welcomeUser();

    reloadHome();
    setTimeout(() => {
        document.getElementById("preLoader").style.display = "none";
    }, 2500);
}

function reloadHome() {
    let homeLogos = document.getElementsByClassName("homeLogo");
    for (let index of homeLogos) {
        index.addEventListener("click", () => {
            window.location.href = `${window.location.protocol}//${window.location.host}/home`;
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

function switchLightMode() {
    if (document.getElementById("lightIcon")) {
        document.getElementById("menuBar").style.backgroundColor = "var(--theme)";
        document.body.style.backgroundColor = "var(--light-theme)";
        document.body.style.color = "black";
        document.getElementById("lightIcon").src = "../image/icons/night.png";
        document.getElementById("lightIcon").id = "nightIcon";
    } else {
        document.getElementById("menuBar").style.backgroundColor = "var(--dark-theme)";
        document.body.style.backgroundColor = "var(--theme)";
        document.body.style.color = "white";
        document.getElementById("nightIcon").src = "../image/icons/light.png";
        document.getElementById("nightIcon").id = "lightIcon";
    }
}
