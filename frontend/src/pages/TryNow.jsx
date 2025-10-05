import React from 'react'
import { Link } from 'react-router-dom'

const TryNow = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '80vh', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>HandwritingBot</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
          Transform your digital text into beautiful, natural-looking handwriting
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/generator" className="btn" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
            Start Writing Now
          </Link>
          <Link to="/gallery" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
            View Samples
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TryNow