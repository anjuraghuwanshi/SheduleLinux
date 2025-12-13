import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scheduler from "./pages/Scheduler";
import About from "./pages/About"; 

function App() {
  return (
    <BrowserRouter basename="/SheduleLinux/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/about" element={<About />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
