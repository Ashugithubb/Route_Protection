import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Component/login';
import Home from "./Component/Home";
import Signup from "./Component/signup";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Profile from "./Component/Profile";
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
      
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App