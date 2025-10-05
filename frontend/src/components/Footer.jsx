import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HandwritingBot</h3>
            <p>Revolutionary AI-powered handwriting generation system supporting multiple languages and customizable styles for natural, authentic handwritten text.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/features">Features</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <div className="footer-links">
              <a href="#">Documentation</a>
              <a href="#">API Reference</a>
              <a href="#">Help Center</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 HandwritingBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer