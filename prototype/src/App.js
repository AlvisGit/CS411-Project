import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Recipe from "./pages/Recipe";



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route element={<Home/>} path="/" exact/>
          <Route element={<Recipe/>} path="/recipe/:rid" />
        </Route>
        <Route element={<Login/>} path="/login" />
      </Routes>
    </Router>

  );
}
  

export default App;