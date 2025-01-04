"use client";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SidebarDemo from "@/app/components/Sidebar";
ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for expenses and chart data
interface Expense {
  name: string;
  amount: number;
}

const FinanceTracker: React.FC = () => {
  // State to store income and expenses
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([
    { name: "Accomodation", amount: 0 },
    { name: "Dining", amount: 0 },
    { name: "Transportation", amount: 0 },
    { name: "Entertainment", amount: 0 },
    { name: "Miscellaneous", amount: 0 },
  ]);

  // Handle updating expense amounts
  const updateExpense = (index: number, amount: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense, i) =>
        i === index ? { ...expense, amount: parseFloat(amount) || 0 } : expense
      )
    );
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    if (e.target.value === "") {
      // Reset to 0 if input is left empty
      updateExpense(index, "0");
    }
  };

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const balance = income - totalExpenses;

  // Data for the Pie chart
  const data = {
    labels: expenses.map((e) => e.name),
    datasets: [
      {
        data: expenses.map((e) => e.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8E44AD",
          "#1ABC9C",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8E44AD",
          "#1ABC9C",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-500 to-blue-200 p-8 text-white">
      <SidebarDemo/>
      <h1 className="text-4xl font-bold mb-6">Finance Tracker</h1>
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg text-gray-800">
        {/* Income Input */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">
            Enter Monthly Income:
          </label>
          <input
            type="number"
            value={income || ""}
            onFocus={(e) => e.target.value === "0" && setIncome(0)}
            onBlur={(e) => e.target.value === "" && setIncome(0)}
            onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
            className="w-full p-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            placeholder="Enter your income"
          />
        </div>

        {/* Expenses Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {expenses.map((expense, index) => (
            <div key={index}>
              <label className="block text-lg font-medium mb-2">
                {expense.name}:
              </label>
              <input
                type="number"
                value={expense.amount || ""}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, index)}
                onChange={(e) => updateExpense(index, e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder={`Enter amount for ${expense.name}`}
              />
            </div>
          ))}
        </div>

        {/* Balance and Total */}
        <div className="flex justify-between text-xl font-bold mb-8">
          <div>Total Expenses: ${totalExpenses.toFixed(2)}</div>
          <div>Balance: ${balance.toFixed(2)}</div>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Expense Breakdown
          </h2>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default FinanceTracker;
