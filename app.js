
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "public/")));

app.get("/", (request, result) => {
    result.sendFile(path.join(__dirname, "public/view/", "index.html"), error => {
        if (error) console.log("linnel is not able to open...");
        else console.log("linnel has opened!");
    });
});

app.listen(process.env.PORT || 3000, () => console.log("linnel is now running!"));
