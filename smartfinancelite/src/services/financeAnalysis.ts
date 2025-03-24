import { FinancialData, ExpenseCategory, Insight, InsightType } from '../types/finance';

/**
 * Calculate total expenses from all categories
 */
export const calculateTotalExpenses = (data: FinancialData): number => {
  return Object.values(data.expenses).reduce((total, amount) => total + amount, 0);
};

/**
 * Calculate percentage of income spent per category
 */
export const calculateCategoryPercentages = (data: FinancialData): Record<ExpenseCategory, number> => {
  const percentages: Record<ExpenseCategory, number> = {} as Record<ExpenseCategory, number>;
  
  if (data.income <= 0) return Object.keys(data.expenses).reduce((acc, category) => {
    acc[category as ExpenseCategory] = 0;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  Object.entries(data.expenses).forEach(([category, amount]) => {
    percentages[category as ExpenseCategory] = (amount / data.income) * 100;
  });

  return percentages;
};

/**
 * Calculate savings amount (income - total expenses)
 */
export const calculateSavings = (data: FinancialData): number => {
  const totalExpenses = calculateTotalExpenses(data);
  return Math.max(0, data.income - totalExpenses);
};

/**
 * Calculate savings rate (savings / income)
 */
export const calculateSavingsRate = (data: FinancialData): number => {
  if (data.income <= 0) return 0;
  
  const savings = calculateSavings(data);
  return (savings / data.income) * 100;
};

/**
 * Calculate months to reach savings goal
 */
export const calculateMonthsToGoal = (data: FinancialData): number => {
  const monthlySavings = calculateSavings(data);
  
  if (monthlySavings <= 0 || data.savingsGoal <= 0) return Infinity;
  
  return Math.ceil(data.savingsGoal / monthlySavings);
};

/**
 * Find the largest expense category
 */
export const findLargestExpenseCategory = (data: FinancialData): ExpenseCategory | null => {
  const entries = Object.entries(data.expenses);
  if (entries.length === 0) return null;
  
  const [largestCategory] = entries.reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  });
  
  return largestCategory as ExpenseCategory;
};

/**
 * Generate insights from financial data
 */
export const generateInsights = (data: FinancialData): Insight[] => {
  const insights: Insight[] = [];
  const totalExpenses = calculateTotalExpenses(data);
  const savingsRate = calculateSavingsRate(data);
  const monthsToGoal = calculateMonthsToGoal(data);
  const largestCategory = findLargestExpenseCategory(data);
  
  // Savings timeline insight
  if (monthsToGoal === Infinity) {
    insights.push({
      type: InsightType.SavingsTimeline,
      title: 'Savings Timeline',
      description: 'At your current rate, you won\'t reach your savings goal. Try increasing income or reducing expenses.'
    });
  } else {
    insights.push({
      type: InsightType.SavingsTimeline,
      title: 'Savings Timeline',
      description: `At your current rate, you'll reach your savings goal in ${monthsToGoal} months.`,
      value: monthsToGoal
    });
  }
  
  // Savings rate insight
  insights.push({
    type: InsightType.SavingsRate,
    title: 'Savings Rate',
    description: `You're saving ${savingsRate.toFixed(1)}% of your income.`,
    value: savingsRate
  });
  
  // Total expenses insight
  insights.push({
    type: InsightType.TotalExpenses,
    title: 'Total Expenses',
    description: `Your total monthly expenses are $${totalExpenses.toFixed(2)}.`,
    value: totalExpenses
  });
  
  // Largest expense category insight
  if (largestCategory) {
    const categoryAmount = data.expenses[largestCategory];
    const categoryPercentage = (categoryAmount / data.income) * 100;
    
    insights.push({
      type: InsightType.LargestExpense,
      title: 'Largest Expense',
      description: `Your largest expense is ${largestCategory} at $${categoryAmount.toFixed(2)} (${categoryPercentage.toFixed(1)}% of income).`,
      value: categoryAmount
    });
  }
  
  return insights;
};
