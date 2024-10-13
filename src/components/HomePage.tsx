import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BudgetCalculator from './BudgetCalculator/BudgetCalculator';
import CanIAfford from './CanIAfford';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

const HomePage: React.FC = () => {
  const { logout } = useAuth();

  const additionalMenuItems = [
    { label: 'Logout', onClick: logout },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header showUserIcon additionalMenuItems={additionalMenuItems}/>
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
