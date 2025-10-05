import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Handwriting Bot Printer</h1>
          <p>Transform your digital text into beautiful, natural-looking handwriting using advanced Generative AI. Support for multiple languages with customizable styles.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/generator" className="btn btn-primary">Start Writing Now</Link>
            <Link to="/gallery" className="btn btn-secondary">View Samples</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section section-light">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem' }}>
            Why Choose Our AI Handwriting System?
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '50px', fontSize: '1.1rem' }}>
            Our advanced Generative AI creates authentic, personalized handwriting that's indistinguishable from human writing.
          </p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Natural Handwriting</h3>
              <p>AI-generated handwriting that perfectly mimics human writing patterns, variations, and natural flow.</p>
            </div>
            
            <div className="feature-card">
              <h3>Multi-Language Support</h3>
              <p>Full support for English, Hindi, and other languages with authentic script generation.</p>
            </div>
            
            <div className="feature-card">
              <h3>Customizable Styles</h3>
              <p>Choose from multiple handwriting styles or train the AI to match your specific writing style.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home