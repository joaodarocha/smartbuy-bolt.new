import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ConfirmEmail from './components/ConfirmEmail';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserProfile from './components/UserProfile';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login"/>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/confirm-email/:token" element={<ConfirmEmail/>}/>
          <Route path="/home/*" element={<PrivateRoute element={<HomePage/>}/>}/>
          <Route path="/profile" element={<PrivateRoute element={<UserProfile/>}/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
