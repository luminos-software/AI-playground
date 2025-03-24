# SmartFinanceLite

SmartFinanceLite is a self-contained personal finance dashboard built with Next.js and TypeScript. It allows users to track their income, expenses, and savings goals without requiring any external paid integrations.

## Features

- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Financial Input Form**: Input monthly income, categorized expenses, and savings goals
- **Local Storage**: Data persists across sessions using browser localStorage
- **Interactive Dashboard**: Visualize income vs. expenses with Chart.js
- **Financial Insights**: Custom analysis of spending patterns and savings timeline
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Reset Functionality**: Clear all data and start fresh

## Tech Stack

- Next.js 15.2.3 with TypeScript
- Tailwind CSS for styling
- Chart.js for data visualization
- React Hooks for state management
- localStorage for data persistence
- Next.js API routes for backend logic

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/luminos-software/AI-playground.git
cd AI-playground/smartfinancelite
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Home Page**: Enter your monthly income, categorize your expenses, and set a savings goal.
2. **Dashboard**: View visualizations of your financial data and get insights about your spending habits and savings timeline.
3. **Reset**: Clear all your data and start fresh by clicking the "Reset Data" button.

## Project Structure

```
smartfinancelite/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Dashboard page
│   │   ├── reset/
│   │   │   └── page.tsx       # Reset data page
│   │   └── page.tsx           # Home page with input form
│   ├── components/
│   │   ├── charts/
│   │   │   └── ExpenseChart.tsx  # Chart.js visualization
│   │   ├── forms/
│   │   │   └── FinanceForm.tsx   # Financial data input form
│   │   └── insights/
│   │       └── InsightCard.tsx   # Financial insight display
│   ├── services/
│   │   ├── localStorage.ts     # Data persistence service
│   │   └── financeAnalysis.ts  # Financial calculations
│   └── types/
│       └── finance.ts          # TypeScript interfaces and types
└── README.md                   # Project documentation
```

## How It Works

1. **Data Input**: Users enter their financial information through the form on the home page.
2. **Data Storage**: Information is stored in the browser's localStorage.
3. **Data Analysis**: Custom JavaScript functions analyze the data to generate insights.
4. **Visualization**: Chart.js creates visual representations of the financial data.
5. **Insights**: The application provides actionable insights based on the user's financial situation.

## Created By

This project was created by Devin AI for Ayush Dhingra at Luminos Software.
