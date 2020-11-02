
exports.openHome = (app, path) => {
    app.get("/home", (request, result) => {
        result.sendFile(path.join(__dirname, "../../public/view/", "index.html"), error => {
            if (error) console.log("linnel is not able to open...");
            else console.log("linnel has opened!");
        });
    });
}
