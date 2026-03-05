import { useEffect, useState } from "react";
import { getAllCategories, createCategory } from "./services/category.service";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
