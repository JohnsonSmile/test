import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { useActivatingConnector, useEagerConnect, useInactiveListener } from './clients';
import HomePage from './pages/home';
import LoginPage from './pages/login';

const App = () => {
  const activatingConnector = useActivatingConnector();
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || activatingConnector);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
