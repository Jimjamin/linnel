
"use strict";

import { checkTime, calcDayPhase } from './module/time.js';
import { checkWeather } from './module/weather.js';

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
