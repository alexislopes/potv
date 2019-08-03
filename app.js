const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require("./models/Item");
require("./models/Tag");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());

require("./routes")(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("app is listening on port ", PORT);
}); //http://localhost:5000

module.exports = app;