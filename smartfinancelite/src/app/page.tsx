'use client';

import React from 'react';
import FinanceForm from '../components/forms/FinanceForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SmartFinanceLite</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, self-contained personal finance dashboard to help you track your income, expenses, and savings goals.
          </p>
        </div>
        
        <FinanceForm />
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Your data is stored locally in your browser and never sent to any server.
          </p>
          <div className="mt-4">
            <a 
              href="/reset" 
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Reset All Data
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
