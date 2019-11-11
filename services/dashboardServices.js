const mongoose = require("mongoose");

const { find } = require("../services/notaServices");

async function getCurrentMonthExpense() {
  let currentDate = new Date();
  let nicenotas = [];

  const notas = await find();

  notas.forEach(e => {
    if (new Date(e.timestamp).getMonth() === currentDate.getMonth()) {
      nicenotas.push(e);
    }
  });

  return nicenotas;
}

async function getTodayExpense() {
  let currentDate = new Date();
  let nicenotas = [];

  const notas = await find();

  notas.forEach(e => {
    let notaDate = new Date(e.timestamp);
    if (
      notaDate.getMonth() === currentDate.getMonth() &&
      notaDate.getDate() === currentDate.getDate() &&
      notaDate.getFullYear() === currentDate.getFullYear()
    ) {
      nicenotas.push(e);
    }
  });

  return nicenotas;
}

async function getCurrentYearExpense() {
  let currentDate = new Date();
  let nicenotas = [];

  const notas = await find();

  notas.forEach(e => {
    let notaDate = new Date(e.timestamp);
    if (notaDate.getFullYear() === currentDate.getFullYear()) {
      nicenotas.push(e);
    }
  });

  return nicenotas;
}

module.exports = {
  getCurrentMonthExpense,
  getTodayExpense,
  getCurrentYearExpense
};
