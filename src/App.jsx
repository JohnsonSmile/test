import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { useActivatingConnector, useEagerConnect, useInactiveListener } from './clients';
import BuildPage from './pages/build';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import MyNFTPage from './pages/mynft';
import MyNFTSortPage from './pages/mynftsort';
import Layout from './widgets/layout/Layout';

const App = () => {
  const activatingConnector = useActivatingConnector();
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || activatingConnector);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index path="/home" element={<HomePage />}/>
          <Route index path="/build" element={<BuildPage />}/>
          <Route index path="/mynft" element={<MyNFTPage />}/>
          <Route index path="/mynft/:type" element={<MyNFTSortPage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
