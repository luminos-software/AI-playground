import FinanceForm from '../components/forms/FinanceForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SmartFinanceLite</h1>
          <p className="text-xl text-gray-600">Your personal finance dashboard</p>
        </div>
        
        <FinanceForm />
      </div>
    </main>
  );
}
