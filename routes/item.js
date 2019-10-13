const {
  create,
  find,
  findByName,
  findById,
  update,
  updatePriceData,
  deleteItem
} = require("../services/itemServices");

var feature = "Item";

module.exports = app => {
  app.post("/item", async (req, res) => {
    const item = await create(req.body);
    res.status(201).json({
      item: item
    });
  });

  app.get("/item", async (req, res) => {
    const items = await find();
    res.status(200).json({
      items: items
    });
  });

  app.get("/itemById", async (req, res) => {
    const id = req.query.id;
    const item = await findById(id);
    console.log(req.query);
    res.status(200).json({
      item: item
    });
  });

  app.get("/itemByName", async (req, res) => {
    const name = req.query.name_lower;
    console.log(name);
    const item = await findByName(name);
    res.status(200).json({
      item: item
    });
  });

  app.put("/item", async (req, res) => {
    const id = req.body.id;
    const newitem = req.body.item;
    const item = await update(id, newitem);
    res.status(204).json({
      item: item
    });
  });

  app.patch("/item", async (req, res) => {
    const id = req.body.id;
    const value = req.body.priceData;
    const item = await updatePriceData(id, value);
    res.status(204).json({
      item: item
    });
  });

  app.delete("/item", async (req, res) => {
    const id = req.query.id;
    const item = await deleteItem(id);

    res.status(204).send({
      item: item
    });
  });
};
