
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

app.get("/", (request, result) => {
    result.send("Hola mundo!");
});

app.listen(process.env.PORT || 3000, () => console.log("linnel is now running!"));
