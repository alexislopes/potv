const mongoose = require("mongoose");

const Item = mongoose.model("Item");

async function getCurrentMonthExpense() {
  let currentExpense = 0;
  let currentDate = new Date();

  const items = await Item.find().populate("priceData");

  items.forEach(e => {
    e.priceData.forEach(el => {
      if (new Date(el.timestamp).getMonth() === currentDate.getMonth()) {
        currentExpense += Number(el.price);
      }
    });
  });

  return currentExpense;
}

async function getTodayExpense() {
  let todayExpense = 0;
  let currentDate = new Date();

  const items = await Item.find().populate("priceData");

  items.forEach(e => {
    e.priceData.forEach(el => {
      let itemDate = new Date(el.timestamp);
      if (
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getDate() === currentDate.getDate() &&
        itemDate.getFullYear() === currentDate.getFullYear()
      ) {
        todayExpense += Number(el.price);
      }
    });
  });

  return todayExpense;
}

async function getCurrentYearExpense() {
  let currentYearExpense = 0;
  let currentDate = new Date();

  const items = await Item.find().populate("priceData");

  items.forEach(e => {
    e.priceData.forEach(el => {
      let itemDate = new Date(el.timestamp);
      if (itemDate.getFullYear() === currentDate.getFullYear()) {
        currentYearExpense += Number(el.price);
      }
    });
  });

  return currentYearExpense;
}

module.exports = {
  getCurrentMonthExpense,
  getTodayExpense,
  getCurrentYearExpense
};
