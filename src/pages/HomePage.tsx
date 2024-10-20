import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CostsCalculator from '../components/calculator/CostsCalculator';
import CanIAfford from '../components/CanIAfford';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import { routes } from '../routes';

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header showUserIcon showMenuItems/>
      <div className="flex-grow flex">
        <Navbar/>
        <main className="flex-grow p-6 overflow-y-auto">
          <Routes>
            <Route path={'/'} element={<Navigate to={routes.home + routes.calculator}/>}/>
            <Route path={routes.calculator} element={<CostsCalculator/>}/>
            <Route path={routes.affordability} element={<CanIAfford/>}/>
          </Routes>
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
