const { create, find, update, deleteTag } = require("../services/tagServices");
const { getDate } = require("../computed/formatDate");

var frature = "Tag";

module.exports = app => {
    app.post("/tag", async (req, res) => {
        const tag = await create(req.body);
        res.status(201).json({
            status: { code: 201, message: "CREATED" },
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

    app.put("/tag", async (req, res) => {
        const id = req.body.id;
        const newtag = req.body.tag;
        const tag = await update(id, newtag);
        res.status(204).json({
            status: { code: 204, message: "UPDATED" },
            tag: tag,
            error: false,
            time: getDate()
            
        })
    })

    app.delete("/tag", async (req, res) => {
        const id = req.body.id;
        const tag = await deleteTag(id);
        res.status(204).json({
            status: { code: 204, message: "DELETED" },
            tag: tag,
            error: false,
            time: getDate()
        })
    })
}