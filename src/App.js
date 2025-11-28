import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import './App.css';
import MainContainer from "./container/MainContainer/MainContainer";

import CollegeSaleForm from "./container/CollegeSaleForm/CollegeSaleForm";
import CollegeFastSale from "./container/CollegeFastSaleForm/CollegeFastSale";
import SchoolSale from "./container/SchoolSaleForm/SchoolSale";

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
          <Route path="/school-application-sale" element={<SchoolSale />} />
          <Route path="*" element={<MainContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
