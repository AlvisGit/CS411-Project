import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Recipe from "./pages/Recipe";
import Favorites from './pages/Favorites';



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route element={<Home/>} path="/" exact/>
          <Route element={<Recipe/>} path="/recipe/:rid" />
          <Route element={<Favorites/>} path="/favorites" />
        </Route>
        <Route element={<Login/>} path="/login" />
      </Routes>
    </Router>

  );
}
  

export default App;