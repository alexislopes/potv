const { create, find } = require("../services/priceDataServices");

module.exports = app => {
  app.post("/price", async (req, res) => {
    const price = await create(req.body);
    res.status(201).json({
      price: price
    });
  });

  app.get("/price", async (req, res) => {
    const prices = await find(req.body);
    res.status(200).json({
      prices: prices
    });
  });
};
