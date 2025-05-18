import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard'
import Hero from './pages/Hero'
import Create from './pages/Create'
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
function App() {
  return (
    <BrowserRouter basename="/targetcv">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
