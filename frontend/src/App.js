import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from '/pages/Login';
import Register from './pages/Register';
import Articles from './pages/Articles';
import CreateArticle from './pages/CreateArticle';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    // Vérifier si un token existe dans le localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/articles" /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                <Navigate to="/articles" /> : 
                <Register onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/articles" 
              element={
                isAuthenticated ? 
                <Articles /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/create-article" 
              element={
                isAuthenticated ? 
                <CreateArticle /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/articles" /> : 
                <Navigate to="/login" />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;