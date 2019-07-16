// const { salva, buscaTodos } = require("../services/itemServices");
const Item = require('../models/Item'); 

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send();
    })

    app.post("/item", async (req, res) => {
        const item = await Item.create(req.body)
        res.status(201).json({
            message: "Created",
            item: item
        });
    });

    app.get("/item", async (req, res) => {
        const item = await Item.find({});
        res.status(200).json({message: "OK", item: item});
    })
}