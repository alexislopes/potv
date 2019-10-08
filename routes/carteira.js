const { create, find, update } = require("../services/carteiraServices");

module.exports = app => {
  app.post("/carteira", async (req, res) => {
    const carteira = await create(req.body);
    res.status(201).json({
      carteira: carteira
    });
  });

  app.get("/carteira", async (req, res) => {
    const carteiras = await find(req.body);
    res.status(200).json({
      carteiras: carteiras
    });
  });

  app.put("/carteira", async (req, res) => {
    // const id = req.query.id;
    // const carteira = await update(id);
    const id = req.body.id;
    const nova = req.body.nova;
    const resx = await update(id, nova);
    res.status(204).json({});
  });
};
