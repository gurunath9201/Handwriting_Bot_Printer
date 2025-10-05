import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Generator from './pages/Generator'
import './App.css'

function App() {
  const [generatedImage, setGeneratedImage] = useState(null)

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/gallery" element={<Gallery generatedImage={generatedImage} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/generator" 
              element={<Generator setGeneratedImage={setGeneratedImage} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App