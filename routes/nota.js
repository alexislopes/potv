const { create } = require("../services/notaServices");

module.exports = app => {
  app.post("/nota", async (req, res) => {
    const nota = await create(req.body);
    res.status(201).json({
      status: { code: 201, message: "CREATED" },
      nota: nota,
      error: false
    });
  });
};
