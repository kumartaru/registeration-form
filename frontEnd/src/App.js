import React from "react";
import SignUp from "./component/SignUp";
import Table from "./component/Table";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <div className="row">
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />}/>
            <Route path="/user-table" element={<Table />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
