const item = require("./item");
const tag = require("./tag");
const user = require("./user");
const dashboard = require("./dashboard");
const nota = require("./nota");
const priceData = require("./priceData");
const carteira = require("./carteira");

module.exports = app => {
  item(app);
  tag(app);
  user(app);
  dashboard(app);
  nota(app);
  priceData(app);
  carteira(app);
};
