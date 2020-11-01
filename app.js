
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

app.use(express.static(path.join(__dirname, "public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, result) => result.redirect("/home"));

app.get("/home", (request, result) => {
    result.sendFile(path.join(__dirname, "public/view/", "index.html"), error => {
        if (error) console.log("linnel is not able to open...");
        else console.log("linnel has opened!");
    });
});

app.post("/api/weather", (request, result) => {
    const apiKey = process.env.WEATHER_API;

    let userLocation = request.body.userLocation;

    let weatherUrl = "http://api.weatherapi.com/v1/current.json";
    let weatherQuery = `?key=${apiKey}&q=${userLocation}`;

    fetch(`${weatherUrl}${weatherQuery}`)
        .then(response => response.json())
        .then(response => result.send(response.current))
        .catch(error => result.status(400).send({
            message: `Weather API is currently down: ${error.message}`
        }))
});

app.listen(process.env.PORT || 3000, () => console.log("linnel is now running!"));
