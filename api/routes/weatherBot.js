
exports.fetchWeather = (app, fetch) => {
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
}
