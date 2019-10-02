const {
  getCurrentMonthExpense,
  getTodayExpense,
  getCurrentYearExpense
} = require("../services/dashboardServices");

module.exports = app => {
  app.get("/currentMonthExpense", async (req, res) => {
    const currentMontExpense = await getCurrentMonthExpense();

    res.status(200).json({
      status: { code: 200, message: "OK" },
      value: currentMontExpense,
      error: false
    });
  });

  app.get("/getTodayExpense", async (req, res) => {
    const todayExpense = await getTodayExpense();

    res.status(200).json({
      status: { code: 200, message: "OK" },
      value: todayExpense,
      error: false
    });
  });

  app.get("/getCurrentYearExpense", async (req, res) => {
    const currentYearExpense = await getCurrentYearExpense();

    res.status(200).json({
      status: { code: 200, message: "OK" },
      value: currentYearExpense,
      error: false
    });
  });
};
