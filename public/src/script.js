
"use strict";

const user = "";

function bootUp() {
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

function calcDayPhase(currentHour) {
    if (currentHour > 18) return "evening";
    if (currentHour > 12) return "afternoon";
    return "morning";
}

function checkTime() {
    let currentTime = new Date();
    let isoTime = isoTimeStamp(currentTime.getHours(), currentTime.getMinutes());
    let isoDate = isoDateStamp(currentTime.getDate(), currentTime.getMonth(), currentTime.getFullYear());

    document.getElementById("dateStamp").innerHTML = `${isoTime} on the ${isoDate}.`
    setTimeout(checkTime, 6000);
}

function isoTimeStamp(currentHour, currentMinute) {
    let meridianPhase = calcMeridianPhase(currentHour);
    currentHour = isoHour(currentHour);
    currentMinute = isoMinute(currentMinute);

    return `${currentHour}:${currentMinute}${meridianPhase}`
}

function isoHour(currentHour) {
    if (currentHour > 12) currentHour -= 12;
    if (currentHour === 0) currentHour += 12;
    if (currentHour < 10) return `0${currentHour}`;

    return `${currentHour}`
}

function isoMinute(currentMinute) {
    if (currentMinute < 10) return `0${currentMinute}`;
    return `${currentMinute}`;
}

function calcMeridianPhase(currentHour) {
    if (currentHour > 12) return "PM";
    return "AM";
}

function isoDateStamp(currentDay, currentMonth, currentYear) {
    currentDay = isoDay(currentDay);
    currentMonth = isoMonth(currentMonth);
    
    return `${currentDay} of ${currentMonth}, ${currentYear}`;
}

function isoDay(currentDay) {
    if (currentDay === 1 || currentDay === 21 || currentDay === 31) {
        return `${currentDay}st`;
    } else if (currentDay === 2 || currentDay === 22) {
        return `${currentDay}nd`;
    } else if (currentDay === 3 || currentDay === 23) {
        return `${currentDay}rd`;
    } else return `${currentDay}th`;
}

function isoMonth(currentMonth) {
    let listOfMonths = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return `${listOfMonths[currentMonth]}`;
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
