
"use strict";

function printForecast(userForecast) {
    const forecastComponents = document.getElementsByClassName("forecastComponent");
    generalForecast(userForecast, forecastComponents);
    temperatureForecast(userForecast, forecastComponents);
    windRainForecast(userForecast, forecastComponents);
    sunMoonForecast(userForecast, forecastComponents);
}

function generalForecast(userForecast, forecastComponents) {
    const forecastHeadings = document.getElementsByClassName("weatherDesc")

    const generalForecastImg = document.getElementById("weatherStatus");
    generalForecastImg.src = userForecast.current.condition.icon;
    let generalForecastHeading = `${userForecast.current.condition.text} (${userForecast.location.name}, ${userForecast.location.country})`;
    forecastHeadings[0].innerHTML = generalForecastHeading;

    let generalForecastList = forecastComponents[0].querySelectorAll("span");
    generalForecastList[0].innerHTML = `${userForecast.current.temp_c}&#8451;`;
    generalForecastList[1].innerHTML = `${userForecast.forecast.forecastday[0].day.mintemp_c}&#8451;`;
    generalForecastList[2].innerHTML = `${userForecast.forecast.forecastday[0].day.maxtemp_c}&#8451;`;
    generalForecastList[3].innerHTML = `${userForecast.current.humidity}%`;
    generalForecastList[4].innerHTML = `${userForecast.current.wind_kph}kph`;
    generalForecastList[5].innerHTML = `${userForecast.current.wind_dir}`;
}

function temperatureForecast(userForecast, forecastComponents) {
    let generalForecastList = forecastComponents[1].querySelectorAll("span");
    generalForecastList[0].innerHTML = `${userForecast.forecast.forecastday[0].day.mintemp_c}&#8451;`;
    generalForecastList[1].innerHTML = `${userForecast.forecast.forecastday[0].day.maxtemp_c}&#8451;`;
    generalForecastList[2].innerHTML = `${userForecast.forecast.forecastday[0].day.avgtemp_c}&#8451;`;
    generalForecastList[3].innerHTML = `${userForecast.current.uv}`;
    generalForecastList[4].innerHTML = `${userForecast.current.humidity}%`;
    generalForecastList[5].innerHTML = `${userForecast.forecast.forecastday[0].day.avghumidity}%`;
}

function windRainForecast(userForecast, forecastComponents) {
    let generalForecastList = forecastComponents[2].querySelectorAll("span");
    generalForecastList[0].innerHTML = `${userForecast.current.wind_kph}kph`;
    generalForecastList[1].innerHTML = `${userForecast.current.wind_dir}`;
    generalForecastList[2].innerHTML = `${userForecast.current.gust_kph}kph`;
    generalForecastList[3].innerHTML = `${userForecast.forecast.forecastday[0].day.maxwind_kph}kph`;
    generalForecastList[4].innerHTML = `${userForecast.forecast.forecastday[0].day.totalprecip_mm}mm`;
    generalForecastList[5].innerHTML = `${userForecast.forecast.forecastday[0].day.daily_will_it_rain}%`;
    generalForecastList[6].innerHTML = `${userForecast.forecast.forecastday[0].day.daily_will_it_snow}%`;
}

function sunMoonForecast(userForecast, forecastComponents) {
    let generalForecastList = forecastComponents[3].querySelectorAll("span");
    generalForecastList[0].innerHTML = `${userForecast.forecast.forecastday[0].astro.sunrise}`;
    generalForecastList[1].innerHTML = `${userForecast.forecast.forecastday[0].astro.sunset}`;
    generalForecastList[2].innerHTML = `${userForecast.forecast.forecastday[0].astro.moonrise}`;
    generalForecastList[3].innerHTML = `${userForecast.forecast.forecastday[0].astro.moonset}`;
    generalForecastList[4].innerHTML = `${userForecast.forecast.forecastday[0].astro.moon_phase}`;
}

export { printForecast };
