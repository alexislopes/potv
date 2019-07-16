const faker = require('faker');
const { factory } = require("factory-girl");

const Item = require('../models/Item');

factory.define("Item", Item, {
    name: faker.commerce.productName(),
    price: faker.commerce.price()
})

module.exports = factory;