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

// production settings
if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/dist'))

    // Express will serve up the index.html file
    // if it does not recognize the route
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })

}

module.exports = app;