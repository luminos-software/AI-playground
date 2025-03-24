'use client';

import React, { useState, useEffect } from 'react';
import { FinancialData, ExpenseCategory } from '../../types/finance';
import { saveFinancialData, loadFinancialData, isLocalStorageAvailable } from '../../services/localStorage';

export default function FinanceForm() {
  const [formData, setFormData] = useState<FinancialData>({
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
  const [isSaved, setIsSaved] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const available = isLocalStorageAvailable();
      setStorageAvailable(available);
      
      if (available) {
        const savedData = loadFinancialData();
        if (savedData) {
          setFormData(savedData);
        }
      }
    }
  }, []);

  // Handle income change
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData(prev => ({ ...prev, income: value }));
    setIsSaved(false);
  };

  // Handle expense change
  const handleExpenseChange = (category: ExpenseCategory, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: value
      }
    }));
    setIsSaved(false);
  };

  // Handle savings goal change
  const handleSavingsGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData(prev => ({ ...prev, savingsGoal: value }));
    setIsSaved(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (storageAvailable) {
      saveFinancialData(formData);
      setIsSaved(true);
      
      // Reset saved status after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Your Financial Information</h2>
      
      {!storageAvailable && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          Warning: Local storage is not available. Your data will not be saved between sessions.
        </div>
      )}
      
      {isSaved && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Your financial data has been saved successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Income Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Monthly Income</h3>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.income || ''}
              onChange={handleIncomeChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your monthly income"
            />
          </div>
        </div>
        
        {/* Expenses Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Monthly Expenses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(ExpenseCategory).map((category) => (
              <div key={category} className="flex flex-col">
                <label className="mb-1 text-gray-600">{category}</label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.expenses[category] || ''}
                    onChange={(e) => handleExpenseChange(category, e)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${category.toLowerCase()} expenses`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Savings Goal Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Savings Goal</h3>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.savingsGoal || ''}
              onChange={handleSavingsGoalChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your savings goal"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Financial Data
          </button>
          
          <a
            href="/dashboard"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            View Dashboard
          </a>
        </div>
      </form>
    </div>
  );
}
