const { create, find } = require("../services/tagServices");
const { getDate } = require("../computed/formatDate");

var frature = "Tag";

module.exports = app => {
    app.post("/tag", async (req, res) => {
        const tag = await create(req.body);
        res.status(201).json({
            status: { code: 201, message: "Created" },
            tag: tag,
            error: false,
            time: getDate()
        })
    })

    app.get("/tag", async (req ,res) => {
        const tags = await find()
        res.status(200).json({
            status: {code: 200, message: "OK" }, 
            tags: tags,
            error: false,
            time: getDate()
        });
    })
}