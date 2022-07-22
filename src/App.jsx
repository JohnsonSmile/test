import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { useActivatingConnector, useEagerConnect, useInactiveListener } from './clients';
import BuildPage from './pages/build';
import HomePage from './pages/home';
import InvitePage from './pages/invite';
import LoginPage from './pages/login';
import LPMarketPage from './pages/lpmarket';
import MarketPage from './pages/market';
import MyAssetsPage from './pages/myassets';
import MyNFTPage from './pages/mynft';
import MyNFTListPage from './pages/mynftlist';
import ProfilePage from './pages/profile';
import PromotionDetailPage from './pages/promotion';
import SettingPage from './pages/setting';
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
          <Route index path="/invite" element={<InvitePage />}/>
          <Route index path="/profile" element={<ProfilePage />}/>
          <Route index path="/setting" element={<SettingPage />}/>
          <Route index path="/myassets" element={<MyAssetsPage />}/>
          <Route index path="/promotionDetail" element={<PromotionDetailPage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
