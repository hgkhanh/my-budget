import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Year from "./components/Year";
import Month from "./components/Month";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="list">
          <ul>
            <li><Link to="/">Month</Link></li>
            <li><Link to="year">Year</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Month/>}/>
          <Route path="/year" element={<Year/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
