const {
  create,
  find,
  findByName,
  findById,
  update,
  updatePriceData,
  deleteItem
} = require("../services/itemServices");
const { getDate } = require("../computed/formatDate");

var feature = "Item";

module.exports = app => {
  app.post("/item", async (req, res) => {
    const item = await create(req.body);
    res.status(201).json({
      status: { code: 201, message: "CREATED" },
      item: item,
      error: false,
      time: getDate()
    });
  });

  app.get("/item", async (req, res) => {
    const items = await find();
    res.status(200).json({
      status: { code: 200, message: "OK" },
      items: items,
      error: false,
      time: getDate()
    });
  });

  app.get("/itemById", async (req, res) => {
    const id = req.query.id;
    const item = await findById(id);
    console.log(req.query);
    res.status(200).json({
      status: { code: 200, message: "OK" },
      item: item,
      error: false
      // time: getDate()
    });
  });

  app.get("/itemByName", async (req, res) => {
    const name = req.query.name;
    const item = await findByName(name);
    res.status(200).json({
      status: { code: 200, message: "OK" },
      item: item,
      error: false,
      time: getDate()
    });
  });

  app.put("/item", async (req, res) => {
    const id = req.body.id;
    const newitem = req.body.item;
    const item = await update(id, newitem);
    res.status(204).json({
      status: { code: 204, message: "UPDATED" },
      item: item,
      error: false,
      time: getDate()
    });
  });

  app.patch("/item", async (req, res) => {
    const id = req.body.id;
    const value = req.body.priceData;
    const item = await updatePriceData(id, value);
    res.status(204).json({
      status: { code: 204, message: "PRICEDATA UPDATED" },
      item: item,
      error: false,
      time: getDate()
    });
  });

  app.delete("/item", async (req, res) => {
    const id = req.query.id;
    const item = await deleteItem(id);

    res.status(204).send({
      status: { code: 204, message: "DELETED" },
      item: item,
      error: false,
      time: getDate()
    });
  });
};
