import { useState } from 'react'
import './App.css'
import './globals.css'
import Header from './Components/Header/Header.jsx'
import Form from './Components/Form/Form.jsx'

function App() {
  return (
    <>
      <Header className="Header" />
      <Form />
    </>
  )
}

export default App
