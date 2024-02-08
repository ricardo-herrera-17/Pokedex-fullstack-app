import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { Favorites } from "../pages/favorites";
import LogIn from "../pages/login";

export const ProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};
