import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ConfirmEmail from './components/ConfirmEmail';
import UserProfile from './components/UserProfile';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return isAuthenticated ? element : <Navigate to="/login"/>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home/*" element={<PrivateRoute element={<HomePage/>}/>}/>
          <Route path="/profile" element={<PrivateRoute element={<UserProfile/>}/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/confirm-email/:token" element={<ConfirmEmail/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
