import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { useActivatingConnector, useEagerConnect, useInactiveListener } from './clients';
import BuildPage from './pages/build';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import LPMarketPage from './pages/lpmarket';
import MarketPage from './pages/market';
import MyNFTPage from './pages/mynft';
import MyNFTListPage from './pages/mynftlist';
import SignPage from './pages/sign';
import StakePage from './pages/stake';
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
          <Route index path="/mynft/list" element={<MyNFTListPage />}/>
          <Route index path="/stake" element={<StakePage />}/>
          <Route index path="/market" element={<MarketPage />}/>
          <Route index path="/sign" element={<SignPage />}/>
          <Route index path="/lpmarket" element={<LPMarketPage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
