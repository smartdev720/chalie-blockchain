import {Routes, Route} from "react-router-dom";
import Staking from "../pages/Staking";
import Marketplace from "../pages/Marketplace";

const RouterComponent = () => {
    return (
        <Routes>
            <Route path='/staking' element={<Staking />} />
            <Route path='/marketplace' element={<Marketplace />} />
      </Routes>
    );
}

export default RouterComponent;