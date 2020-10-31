
"use strict";

import { calcDayPhase, isoTimeStamp, isoDateStamp } from './time.js';

const user = "";

window.onload = () => {
    let homeLogos = document.getElementsByClassName("homeLogo");
    for (let index in homeLogos.length) {
        homeLogos[index].onclick = () => {
            window.location.href = "http:\/\/localhost:3000";
        };
    }

    document.getElementById("lightMode").onclick = switchLightMode;
    document.getElementById("nightMode").onclick = switchLightMode;

    welcomeUser();
    checkTime();
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
