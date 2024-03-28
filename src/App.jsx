import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import UserList from "./components/UserList";
import ProductCategory from "./components/ProductCategory";
import ListCategory from "./components/ListCategory";
import AddToCart from "./components/AddToCart";
import OrderSuccessPage from "./components/OrderSuccessPage";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/listcategory" element={<ListCategory />} />
          <Route path="/success" element={<OrderSuccessPage />} />
          <Route path="/addtocart" element={<AddToCart />} />
          <Route path="/productcategory" element={<ProductCategory />} />
          <Route path="/productdetails" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}
