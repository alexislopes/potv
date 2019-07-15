const { salva, buscaPorNome } = require("../services/itemServices");

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

    app.get("/busca", (req, res) => {
        const resp = buscaPorNome("oi");
        res.json({ message: "OK", name: resp }).status(200);
    })
}