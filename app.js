
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

const weatherBot = require('./api/middleware/weatherBot.js');
const home = require('./api/routes/home.js');
const forecast = require('./api/routes/forecast.js');

app.use(express.static(path.join(__dirname, "public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, result) => result.redirect("/home"));

home.openHome(app, path);
forecast.openForecast(app, path);
weatherBot.fetchWeather(app, fetch);

app.listen(process.env.PORT || 3000, () => console.log("linnel is now running!"));
