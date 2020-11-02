
exports.openForecast = (app, path) => {
    app.get("/weather/forecast", (request, result) => {
        result.sendFile(path.join(__dirname, "../../public/view/", "forecast.html"), error => {
            if (error) console.log("linnel is not able to open forecast...");
            else console.log("linnel has opened forecast!");
        });
    });
}