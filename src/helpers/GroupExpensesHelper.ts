import { IGroupExpense } from "../interfaces/IGroupExpenses";
import { IMoneyDictionary } from "../interfaces/IMoneyDicionary";
import { IPayment } from "../interfaces/IPayment";

export const clean = (amount: string) => {
  return parseFloat(amount.replace(/,/g, "").substring(1));
};

export const groupMoneyCalculator = (
  jsonData: { Group_expenses: IGroupExpense[] },
  name: string
) => {
  console.log(jsonData, name);
  let moneyByGroup: IMoneyDictionary = { spent: {}, recieved: {} };
  let totalReceived: number = 0;
  let totalSpent: number = 0;
  jsonData.Group_expenses.forEach((item: IGroupExpense) => {
    item.items.forEach((individualPayment: IPayment) => {
      if (individualPayment.payer.toLowerCase() === name) {
        let cleanedAmount = clean(individualPayment.amount);
        totalSpent += cleanedAmount;
        if (moneyByGroup.spent[item.group_name])
          moneyByGroup.spent[item.group_name] += cleanedAmount;
        else moneyByGroup.spent[item.group_name] = cleanedAmount;
      }
    });
    if (item.creator.toLowerCase() === name) {
      let cleanedAmount: number = clean(item.total_amount);
      totalReceived += cleanedAmount;
      if (moneyByGroup.recieved[item.group_name])
        moneyByGroup.recieved[item.group_name] += cleanedAmount;
      else moneyByGroup.recieved[item.group_name] = cleanedAmount;
    }
  });
  return { totalSpent, totalReceived, moneyByGroup };
};
export const upDatePieChart = (moneyByGroupElement: {
  [key: string]: number;
}) => {
  let pieChartData: Array<Array<string | number>> = [
    ["GroupName", "MoneySpent"],
  ];
  if (moneyByGroupElement != null)
    Object.keys(moneyByGroupElement).map((key) => {
      pieChartData.push([key, moneyByGroupElement[key]]);
    });
  return pieChartData;
};