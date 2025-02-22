import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login/Login';
import InvoiceForm from './components/Invoice/InvoiceForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('session', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('session');
    localStorage.removeItem('userSession');
  };

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route
            path='/login'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <div className='login-screen'>
                  <Login onLogin={handleLogin} />
                </div>
              )
            }
          />

          <Route
            path='/'
            element={
              isLoggedIn ? (
                <InvoiceForm onLogout={handleLogout} />
              ) : (
                <Navigate to='/login' replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
