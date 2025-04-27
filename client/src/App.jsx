import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SyllabusEditor from "./Pages/SyllabusEditor";
import LoginPage from "./Pages/LoginPage";
import CreateSyllabus from "./Pages/CreateSyllabus";
import CreateAccountPage from "./Pages/CreateAccountPage";
import HomePage from "./Pages/HomePage";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/edit" element={<SyllabusEditor />} /> {}
          <Route path="/create-account" element={<CreateAccountPage />} /> {}
          <Route path="/login" element={<LoginPage />} /> {}
          <Route path="/" element={<LoginPage />} /> {}
          <Route path="/home" element={<HomePage />} /> {}
          <Route path="/create-syllabus" element={<CreateSyllabus />} /> {}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
