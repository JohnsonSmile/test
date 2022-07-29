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
import NFTDetailPage from './pages/nftdetail';
import NFTListingPage from './pages/nftlisting';
import ProfilePage from './pages/profile';
import PromotionDetailPage from './pages/promotion';
import PromotionRecordPage from './pages/promotionrecord';
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
          <Route path="/home" element={<HomePage />}/>
          <Route path="/build" element={<BuildPage />}/>
          <Route path="/mynft" element={<MyNFTPage />}/>
          <Route path="/mynft/list" element={<MyNFTListPage />}/>
          <Route path="/stake" element={<StakePage />}/>
          <Route path="/market" element={<MarketPage />}/>
          <Route path="/sign" element={<SignPage />}/>
          <Route path="/lpmarket" element={<LPMarketPage />}/>
          <Route path="/invite" element={<InvitePage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/setting" element={<SettingPage />}/>
          <Route path="/myassets" element={<MyAssetsPage />}/>
          <Route path="/promotion/detail" element={<PromotionDetailPage />}/>
          <Route path="/promotion/record" element={<PromotionRecordPage />}/>
          <Route path="/nft/detail" element={<NFTDetailPage />} />
          <Route path="/nft/listing" element={<NFTListingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
