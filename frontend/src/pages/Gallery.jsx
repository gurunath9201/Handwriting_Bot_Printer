import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadedCount, setLoadedCount] = useState(9);

  // Sample gallery data based on your PDF content
  const galleryItems = [
    {
      id: 1,
      category: 'english',
      style: 'casual',
      title: 'Life is beautiful.',
      content: 'Life is beautiful.',
      type: 'artistic'
    },
    {
      id: 2,
      category: 'english',
      style: 'formal',
      title: 'Dreams come true.',
      content: 'Dreams come true.',
      type: 'artistic'
    },
    {
      id: 3,
      category: 'english',
      style: 'print',
      title: 'Love conquers all.',
      content: 'Love conquers all.',
      type: 'artistic'
    },
    {
      id: 4,
      category: 'hindi',
      style: 'formal',
      title: 'Hindi Sample',
      content: 'हमारे एआई हैंडराइटिंग सिस्टम में आपका स्वागत है',
      type: 'language'
    },
    {
      id: 5,
      category: 'english',
      style: 'casual',
      title: 'Business Letter',
      content: `It's our pleasure to inform you that your proposal has been accepted. Please find the contract details attached.\n\nSincerely,\nCraig Davis`,
      type: 'business'
    },
    {
      id: 6,
      category: 'english',
      style: 'formal',
      title: 'Formal Cursive',
      content: 'This is formal cursive style handwriting with elegant connections between letters.',
      type: 'style'
    },
    {
      id: 7,
      category: 'english',
      style: 'print',
      title: 'Print Style',
      content: 'This is print handwriting style with clear, separated letters for maximum readability.',
      type: 'style'
    },
    {
      id: 8,
      category: 'hindi',
      style: 'casual',
      title: 'Hindi Casual',
      content: 'प्राकृतिक हैंडराइटिंग जनरेशन के साथ अपने डिजिटल टेक्स्ट को सुंदर हस्तलेखन में बदलें',
      type: 'language'
    },
    {
      id: 9,
      category: 'english',
      style: 'artistic',
      title: 'Artistic Quote',
      content: 'Creativity is intelligence having fun.',
      type: 'artistic'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Samples' },
    { key: 'english', label: 'English' },
    { key: 'hindi', label: 'Hindi' },
    { key: 'casual', label: 'Casual Style' },
    { key: 'formal', label: 'Formal Style' },
    { key: 'print', label: 'Print Style' }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' || 
    item.category === activeFilter || 
    item.style === activeFilter
  ).slice(0, loadedCount);

  const loadMore = () => {
    setLoadedCount(prev => prev + 6);
  };



  return (
    <div className="gallery-page">
      {/* Header Section */}
      <section className="gallery-hero">
        <div className="container">
          <h1 className="gallery-title">Handwriting Gallery</h1>
          <p className="gallery-subtitle">
            Explore beautiful samples of AI-generated handwriting across different languages, 
            styles, and use cases. See the quality and authenticity of our system.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filters">
        <div className="container">
          <div className="filter-buttons">
            {filters.map(filter => (
              <button
                key={filter.key}
                className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item.id} className={`gallery-card ${item.style}-style`}>
                <div className="card-header">
                  <span className="category-badge">{item.category}</span>
                  <span className="style-badge">{item.style}</span>
                </div>
                <div className="handwriting-preview">
                  <div className="handwriting-content">
                    {item.content.split('\n').map((line, index) => (
                      <p key={index} className="handwriting-line">{line}</p>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <h3 className="sample-title">{item.title}</h3>
                  <div className="card-actions">
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {loadedCount < galleryItems.length && (
            <div className="load-more-section">
              <button className="load-more-btn" onClick={loadMore}>
                + Load More Samples
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;