import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SyllabusEditor from "./Pages/SyllabusEditor";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit" element={<SyllabusEditor/>} /> {}
        <Route path="/login" element={<LoginPage />} /> {}
      </Routes>
    </Router>
  )
}

export default App
