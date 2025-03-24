'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FinancialData } from '../../types/finance';
import { loadFinancialData, isLocalStorageAvailable } from '../../services/localStorage';
import { generateInsights, calculateTotalExpenses } from '../../services/financeAnalysis';
import ExpenseChart from '../../components/charts/ExpenseChart';
import InsightCard from '../../components/insights/InsightCard';

export default function Dashboard() {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const available = isLocalStorageAvailable();
      setStorageAvailable(available);
      
      if (available) {
        const data = loadFinancialData();
        setFinancialData(data);
      }
      
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
          <p className="text-gray-600">Retrieving your financial data</p>
        </div>
      </div>
    );
  }

  if (!storageAvailable) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">SmartFinanceLite</h1>
            <p className="text-xl text-gray-600">Dashboard</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Local Storage Not Available</h2>
            <p className="text-gray-700 mb-4">
              Your browser does not support or has disabled local storage, which is required for this application to function.
            </p>
            <Link 
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!financialData || calculateTotalExpenses(financialData) === 0 && financialData.income === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">SmartFinanceLite</h1>
            <p className="text-xl text-gray-600">Dashboard</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Financial Data</h2>
            <p className="text-gray-700 mb-4">
              You haven't entered any financial information yet. Please go to the home page to input your income, expenses, and savings goal.
            </p>
            <Link 
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Enter Financial Data
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const insights = generateInsights(financialData);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
            <p className="text-xl text-gray-600">Your personal finance overview</p>
          </div>
          <Link 
            href="/"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Update Data
          </Link>
        </div>
        
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Income vs. Expenses</h2>
          <div className="h-80">
            <ExpenseChart financialData={financialData} />
          </div>
        </div>
        
        {/* Insights Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>
        
        {/* Reset Data Button */}
        <div className="mt-8 text-center">
          <Link 
            href="/reset"
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset Data
          </Link>
        </div>
      </div>
    </div>
  );
}
