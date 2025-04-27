import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SyllabusEditor from "./Pages/SyllabusEditor";
import LoginPage from "./Pages/LoginPage";
import CreateSyllabus from "./Pages/CreateSyllabus";
import CreateAccountPage from "./Pages/CreateAccountPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit" element={<SyllabusEditor/>} /> {}
        <Route path="/create-account" element={<CreateAccountPage/>} /> {}
        <Route path="/login" element={<LoginPage />} /> {}
        <Route path="/" element={<LoginPage />} /> {}
        <Route path="/create-syllabus" element={<CreateSyllabus />} /> {}
      </Routes>
    </Router>
  )
}

export default App
