import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="topnav">
        <Link to="/">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
        </Routes>
      </div>
        <style jsx>{`
        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f5f5;
        }
        .topnav {
          display: flex;
          gap: 20px;
          padding: 15px 30px;
          background-color: #007bff;
          color: white;
        }
        .topnav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 5px;
          transition: background 0.2s;
        }
        .topnav a:hover {
          background-color: #0056b3;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </BrowserRouter>
    
  );
}
