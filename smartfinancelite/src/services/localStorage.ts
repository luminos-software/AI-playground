import { FinancialData, ExpenseCategory } from '../types/finance';

const STORAGE_KEY = 'smartfinancelite_data';

// Default empty financial data
const defaultFinancialData: FinancialData = {
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
};

/**
 * Save financial data to localStorage
 */
export const saveFinancialData = (data: FinancialData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

/**
 * Load financial data from localStorage
 */
export const loadFinancialData = (): FinancialData => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return defaultFinancialData;
    
    return JSON.parse(storedData) as FinancialData;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return defaultFinancialData;
  }
};

/**
 * Clear financial data from localStorage
 */
export const clearFinancialData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
  }
};

/**
 * Check if localStorage is available in the browser
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};
