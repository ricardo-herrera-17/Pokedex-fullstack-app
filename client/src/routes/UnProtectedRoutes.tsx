import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/home";
import LogIn from "../pages/login";

export const UnProtectedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};
