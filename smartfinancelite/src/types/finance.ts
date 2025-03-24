export interface FinancialData {
  income: number;
  expenses: Record<ExpenseCategory, number>;
  savingsGoal: number;
}

export enum ExpenseCategory {
  Housing = 'Housing',
  Food = 'Food',
  Transportation = 'Transportation',
  Entertainment = 'Entertainment',
  Utilities = 'Utilities',
  Healthcare = 'Healthcare',
  Other = 'Other'
}

export interface Insight {
  type: InsightType;
  title: string;
  description: string;
  value?: number | string;
}

export enum InsightType {
  SavingsTimeline = 'SavingsTimeline',
  CategoryPercentage = 'CategoryPercentage',
  TotalExpenses = 'TotalExpenses',
  SavingsRate = 'SavingsRate',
  LargestExpense = 'LargestExpense'
}
