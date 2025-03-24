'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearFinancialData } from '../../services/localStorage';

export default function ResetPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear data from localStorage
    if (typeof window !== 'undefined') {
      clearFinancialData();
      
      // Redirect to home page after a short delay
      const timeout = setTimeout(() => {
        router.push('/');
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <svg 
          className="w-16 h-16 text-green-500 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Reset Complete</h2>
        <p className="text-gray-600 mb-4">
          All your financial data has been cleared from local storage.
        </p>
        <p className="text-gray-500 text-sm">
          Redirecting to home page...
        </p>
      </div>
    </div>
  );
}
