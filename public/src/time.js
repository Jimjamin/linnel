
"use strict";

export function calcDayPhase(currentHour) {
    if (currentHour > 18) return "evening";
    if (currentHour > 12) return "afternoon";
    return "morning";
}

export function isoTimeStamp(currentHour, currentMinute) {
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

export function isoDateStamp(currentDay, currentMonth, currentYear) {
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
