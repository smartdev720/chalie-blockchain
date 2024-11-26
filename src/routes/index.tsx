import {Routes, Route} from "react-router-dom";
import Staking from "../pages/Staking";
import Marketplace from "../pages/Marketplace";
import NFTCardInfo from "../pages/Marketplace/NFTCardInfo";
import MarketplaceHistory from "../pages/Marketplace/History";

const RouterComponent = () => {
    return (
        <Routes>
            <Route path='/staking' element={<Staking />} />
            <Route path='/marketplace' element={<Marketplace />} />
            <Route path='/marketplace-card-info' element={<NFTCardInfo />} />
            <Route path='/marketplace-history' element={<MarketplaceHistory />} />
      </Routes>
    );
}

export default RouterComponent;