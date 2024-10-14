import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BudgetCalculator from './BudgetCalculator/BudgetCalculator';
import CanIAfford from './CanIAfford';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header showUserIcon/>
      <div className="flex-grow flex">
        <Navbar/>
        <main className="flex-grow p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="budget-calculator"/>}/>
            <Route path="budget-calculator" element={<BudgetCalculator/>}/>
            <Route path="can-i-afford" element={<CanIAfford/>}/>
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
