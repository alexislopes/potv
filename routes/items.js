const { salva } = require("../services/itemServices");

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send();
    })

    app.post("/save", (req, res) => {
        salva(req.body);
        res.status(201).json({
            message: "Created",
            item: req.body
        });
    });
}