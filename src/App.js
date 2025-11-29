import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import './App.css';
import MainContainer from "./container/MainContainer/MainContainer";

import CollegeSaleForm from "./container/CollegeSaleForm/CollegeSaleForm";
import CollegeFastSale from "./container/CollegeFastSaleForm/CollegeFastSale";
import SchoolSale from "./container/SchoolSaleForm/SchoolSale";
import CollegeSaleConfirmationContainer from "./container/ConfirmationForms/COLLEGE-SALE_CONFIRMATION-CONTAINER/college-saleAndConf-Container/CollegeSaleConfirmationContainer";
import SchoolSaleConfirmationContainer from "./container/ConfirmationForms/SCHOOL-SALE_CONFIRMATION-CONTAINERS/school-sale&confirmation-container/SchoolSaleConfirmationContainer";
import DamagedForm from "./container/DamagedForms/DamagedForm";

function App() {
  return (
    <div className="whole_container">
      <Header />
      <aside>
        {/* Add your sidebar content here */}
      </aside>
      <div className="main_content">
        <Routes>
          <Route path="/college-application-sale" element={<CollegeSaleForm />} />
          <Route path="/college-application-fast-sale" element={<CollegeFastSale />} />
          <Route path="/college-application-confirmation" element={<CollegeSaleConfirmationContainer />} />
          <Route path="/school-application-sale" element={<SchoolSale />} />
          <Route path="/school-application-confirmation" element={<SchoolSaleConfirmationContainer />} />
          <Route path="/damaged-form" element={<DamagedForm />} />
          <Route path="*" element={<MainContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
