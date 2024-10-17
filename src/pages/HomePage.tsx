import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BudgetCalculator from '../components/calculator/BudgetCalculator';
import CanIAfford from '../components/CanIAfford';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { routes } from '../routes';

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header showUserIcon showMenuItems/>
      <div className="flex-grow flex">
        <Navbar/>
        <main className="flex-grow p-6 overflow-y-auto">
          <Routes>
            <Route path={routes.home} element={<Navigate to={routes.calculator}/>}/>
            <Route path={routes.calculator} element={<BudgetCalculator/>}/>
            <Route path={routes.affordability} element={<CanIAfford/>}/>
          </Routes>
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
