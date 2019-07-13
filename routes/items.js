const { salva } = require("../services/itemServices");

module.exports = app => {
    app.get("/", (req, res) => {
        res.send("oies");
    });

    app.post("/save", (req, res) => {
        salva(req.body);
    });
}