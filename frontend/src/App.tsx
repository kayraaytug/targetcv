import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from './pages/Hero'
import Create from './pages/Create'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
