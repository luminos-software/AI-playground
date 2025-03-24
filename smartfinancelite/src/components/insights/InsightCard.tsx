'use client';

import React from 'react';
import { Insight, InsightType } from '../../types/finance';

interface InsightCardProps {
  insight: Insight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  // Determine background color based on insight type
  const getBgColor = () => {
    switch (insight.type) {
      case InsightType.SavingsTimeline:
        return 'bg-blue-50 border-blue-200';
      case InsightType.CategoryPercentage:
        return 'bg-green-50 border-green-200';
      case InsightType.TotalExpenses:
        return 'bg-red-50 border-red-200';
      case InsightType.SavingsRate:
        return 'bg-purple-50 border-purple-200';
      case InsightType.LargestExpense:
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // Determine icon based on insight type
  const getIcon = () => {
    switch (insight.type) {
      case InsightType.SavingsTimeline:
        return (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case InsightType.CategoryPercentage:
        return (
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        );
      case InsightType.TotalExpenses:
        return (
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case InsightType.SavingsRate:
        return (
          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case InsightType.LargestExpense:
        return (
          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBgColor()} transition-all hover:shadow-md`}>
      <div className="flex items-start">
        <div className="mr-4 flex-shrink-0">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{insight.title}</h3>
          <p className="text-gray-600">{insight.description}</p>
          {insight.value !== undefined && (
            <div className="mt-2 text-sm font-medium">
              {typeof insight.value === 'number' ? (
                <span className="text-gray-700">
                  {insight.type === InsightType.SavingsRate || insight.type === InsightType.CategoryPercentage
                    ? `${insight.value.toFixed(1)}%`
                    : insight.type === InsightType.SavingsTimeline
                    ? `${insight.value} months`
                    : `$${insight.value.toFixed(2)}`}
                </span>
              ) : (
                <span className="text-gray-700">{insight.value}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
