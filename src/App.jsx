import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* 其他路由将在后续添加 */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App; 