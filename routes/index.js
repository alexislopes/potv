const item = require("./item");
const tag = require("./tag");

module.exports = app => {
    item(app)
    tag(app)
}