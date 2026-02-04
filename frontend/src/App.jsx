import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./store/authSlice";
import Navbar from "./components/Nav";
import MainRoutes from "./routes/MainRoutes";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // Initialize auth state on app start
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Scroll to top on any route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <MainRoutes />
      <Footer />
    </div>
  );
}

export default App;
