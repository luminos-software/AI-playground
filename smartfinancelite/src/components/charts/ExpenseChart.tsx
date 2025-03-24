'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FinancialData, ExpenseCategory } from '../../types/finance';
import { calculateTotalExpenses } from '../../services/financeAnalysis';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ExpenseChartProps {
  financialData: FinancialData;
}

export default function ExpenseChart({ financialData }: ExpenseChartProps) {
  const totalExpenses = calculateTotalExpenses(financialData);
  
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Income vs. Expenses',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      }
    },
  };

  // Prepare data for the chart
  const labels = ['Income', 'Total Expenses', ...Object.values(ExpenseCategory)];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Amount ($)',
        data: [
          financialData.income, 
          totalExpenses,
          ...Object.values(ExpenseCategory).map(category => financialData.expenses[category])
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Income - blue
          'rgba(255, 99, 132, 0.6)', // Total Expenses - red
          'rgba(255, 159, 64, 0.6)', // Housing - orange
          'rgba(75, 192, 192, 0.6)', // Food - teal
          'rgba(153, 102, 255, 0.6)', // Transportation - purple
          'rgba(255, 205, 86, 0.6)', // Entertainment - yellow
          'rgba(201, 203, 207, 0.6)', // Utilities - gray
          'rgba(54, 162, 235, 0.6)', // Healthcare - blue
          'rgba(255, 99, 132, 0.6)', // Other - red
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
