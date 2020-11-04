
"use strict";

import { checkTime, calcDayPhase } from './module/time.js';
import { checkWeather } from './weather.js';

window.onload = () => {
    document.getElementById("themeBtn").onclick = switchLightMode;

    welcomeUser();
    reloadHome();

    document.getElementById("preLoader").style.animationDuration = "2.5s";
    document.getElementById("loaderBar").style.animationDuration = "2.5s";
    document.body.style.animationDuration = "2.5s";
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
    document.title = `Good ${phaseOfDay} - Linnel`;
    if (document.getElementById("dateStamp")) {
        document.getElementById("dateStamp").innerHTML = `Good ${phaseOfDay}! `;
        checkTime();
        checkWeather("current");
    } else checkWeather("forecast");

    let components = document.getElementsByClassName("component");
    for (let component of components) component.style.display = "block";
}

function switchLightMode() {
    if (document.getElementById("lightIcon")) {
        document.getElementById("menuBar").style.backgroundColor = "var(--theme)";
        document.body.style.backgroundColor = "var(--light-theme)";
        document.body.style.background = "var(--light-theme-grad)";
        document.getElementById("lightIcon").src = "../image/icons/night.png";
        document.getElementById("lightIcon").id = "nightIcon";
    } else {
        document.getElementById("menuBar").style.backgroundColor = "var(--dark-theme)";
        document.body.style.backgroundColor = "var(--theme)";
        document.body.style.background = "var(--theme-grad)";
        document.getElementById("nightIcon").src = "../image/icons/light.png";
        document.getElementById("nightIcon").id = "lightIcon";
    }
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
}

export { welcomeUser };
