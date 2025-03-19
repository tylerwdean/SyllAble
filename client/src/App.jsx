import { useState } from 'react'
import Header from './Components/Header/Header.jsx'
import Form from './Components/Form/Form.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import SyllabiList from "./components/SyllabiList";
import api from "./api";  



function App() {
  return (
    <>
      <Header />
      <Form />
      <SyllabiList /> {}
    </>
  )
}

export default App
