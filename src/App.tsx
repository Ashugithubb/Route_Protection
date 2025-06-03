import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from './Component/login';
import Home from "./Component/Home";
import Signup from "./Component/signup";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Cart from "./Component/Cart";
import ProductDetail from "./Component/Discription";
function App() {

  const [cart, setCart] = useState<any[]>([]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
      <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/home" element={<Home cart={cart} setCart={setCart} />} />
        <Route element={<ProtectedRoutes />}>
          
=======
       <Route path="/home" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
        
>>>>>>> 408393231c021b47877ab72a39aba1cf2b0e2e08
        </Route>
      </Routes>
    </div>
  );
}
export default App;