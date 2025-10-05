import React from 'react'

const Features = () => {
  return (
    <div className="section">
      
      <div className="container">
        
        <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Advanced AI Features</h1>
        
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Natural Handwriting Generation</h3>
            <p>Our advanced Generative AI analyzes thousands of handwriting samples to create authentic, human-like writing patterns with natural variations and imperfections.</p>
            <ul style={{ textAlign: 'left', marginTop: '15px' }}>
              <li>Dynamic letter spacing and sizing.</li>
              <li>Natural pen pressure variations.</li>
              <li>Authentic stroke patterns.</li>
              <li>Realistic writing flow and rhythm.</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>Multi-Language Support</h3>
            <p>Generate authentic handwriting in multiple languages with proper script recognition, character formation, and cultural writing conventions.</p>
            <ul style={{ textAlign: 'left', marginTop: '15px' }}>
              <li>English with multiple handwriting styles.</li>
              <li>Hindi Devanagari script support.</li>
              <li>Spanish and European languages.</li>
              <li>Automatic language detection.</li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>Customizable Writing Styles</h3>
            <p>Choose from various handwriting styles or train the AI to match your specific writing characteristics for personalized output.</p>
            <ul style={{ textAlign: 'left', marginTop: '15px' }}>
              <li>Casual script style.</li>
              <li>Formal cursive writing.</li>
              <li>Print-style handwriting.</li>
              <li>Artistic calligraphy styles.</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '80px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Technical Capabilities</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Neural Networks</h3>
              <p>Deep learning models trained on millions of handwriting samples to understand natural writing patterns and variations.</p>
            </div>
            <div className="feature-card">
              <h3>Real-time Processing</h3>
              <p>Fast, efficient processing that generates handwriting in real-time with optimized algorithms for instant results.</p>
            </div>
            <div className="feature-card">
              <h3>High Quality Output</h3>
              <p>Vector-based generation ensures crisp, scalable output suitable for both digital display and high-resolution printing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features