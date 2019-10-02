import axios from 'axios';

export const DashboardServices = {
    async getCurrentMonthExpense() {
        const expense = await axios.get("/currentMontExpense");
        return expense.data.value;
    }
}