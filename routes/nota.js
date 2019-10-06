const { create, find, findById } = require("../services/notaServices");

module.exports = app => {
  app.post("/nota", async (req, res) => {
    const nota = await create(req.body);
    res.status(201).json({
      status: { code: 201, message: "CREATED" },
      nota: nota,
      error: false
    });
  });

  app.get("/nota", async (req, res) => {
    const notas = await find(req.body);
    res.status(200).json({
      status: { code: 200, message: "OK" },
      notas: notas,
      error: false
    });
  });

  app.get("/notaById", async (req, res) => {
    const id = req.query.id;
    const nota = await findById(id);
    console.log(req.query);
    res.status(200).json({
      nota: nota
    });
  });
};
