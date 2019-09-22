const item = require("./item");
const tag = require("./tag");
const user = require("./user");

module.exports = app => {
  item(app);
  tag(app);
  user(app);
};
