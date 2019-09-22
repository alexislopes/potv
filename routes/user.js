const { create, findByEmail, update } = require("../services/userServices");

module.exports = app => {
  app.post("/user", async (req, res) => {
    const user = await create(req.body);
    res.status(201).json({
      status: { code: 201, message: "CREATED" },
      user: user,
      error: false
      // time: getDate()
    });
  });

  app.get("/userByEmail", async (req, res) => {
    const email = req.query.email;
    const user = await findByEmail(email);
    console.log(req.query);
    res.status(200).json({
      status: { code: 200, message: "OK" },
      user: user,
      error: false
      // time: getDate()
    });
  });

  app.put("/user", async (req, res) => {
    const id = req.body.id;
    const newuser = req.body.user;
    const user = await update(id, newuser);
    res.status(204).json({
      status: { code: 204, message: "UPDATED" },
      user: user,
      error: false
      // time: getDate()
    });
  });
};
