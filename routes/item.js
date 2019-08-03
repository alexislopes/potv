const { create, find } = require("../services/itemServices");
const { getDate } = require("../computed/formatDate");

var feature = "Item"

module.exports = app => {
    app.post("/item", async (req, res) => {
        const item = await create(req.body);
        res.status(201).json({
            status: { code: 201, message: "Created" },
            item: item,
            error: false,
            time: getDate()
        });
    });

    app.get("/item", async (req, res) => {
        const date = new Date();
        const items = await find();
        res.status(200).json({
            status: {code: 200, message: "OK" }, 
            items: items,
            error: false,
            time: getDate()
        });
    })
}