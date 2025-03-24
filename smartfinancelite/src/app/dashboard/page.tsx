'use client';

import React, { useEffect, useState } from 'react';
import { FinancialData, ExpenseCategory } from '../../types/finance';
import { loadFinancialData, isLocalStorageAvailable } from '../../services/localStorage';
import { generateInsights } from '../../services/financeAnalysis';
import ExpenseChart from '../../components/charts/ExpenseChart';
import InsightCard from '../../components/insights/InsightCard';

export default function Dashboard() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    income: 0,
    expenses: {
      [ExpenseCategory.Housing]: 0,
      [ExpenseCategory.Food]: 0,
      [ExpenseCategory.Transportation]: 0,
      [ExpenseCategory.Entertainment]: 0,
      [ExpenseCategory.Utilities]: 0,
      [ExpenseCategory.Healthcare]: 0,
      [ExpenseCategory.Other]: 0
    },
    savingsGoal: 0
  });
  
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const available = isLocalStorageAvailable();
      setStorageAvailable(available);
      
      if (available) {
        const savedData = loadFinancialData();
        setFinancialData(savedData);
      }
      
      setIsLoading(false);
    }
  }, []);

  const insights = generateInsights(financialData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="mt-2 text-gray-600">
              View and analyze your financial data
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Update Data
            </a>
            <a
              href="/reset"
              className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Reset Data
            </a>
          </div>
        </div>

        {!storageAvailable && (
          <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded">
            Warning: Local storage is not available. Your data may not be saved between sessions.
          </div>
        )}

        {financialData.income === 0 && (
          <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded">
            You haven't entered any financial data yet. Go to the home page to input your income and expenses.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Income vs. Expenses</h2>
            <div className="h-80">
              <ExpenseChart financialData={financialData} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Financial Summary</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Monthly Income</p>
                  <p className="text-2xl font-bold text-gray-800">${financialData.income.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-500">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${Object.values(financialData.expenses).reduce((sum, expense) => sum + expense, 0).toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Monthly Savings</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${Math.max(0, financialData.income - Object.values(financialData.expenses).reduce((sum, expense) => sum + expense, 0)).toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-500">Savings Goal</p>
                  <p className="text-2xl font-bold text-gray-800">${financialData.savingsGoal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
