import React, { useState, useRef, useEffect } from 'react';
import './Generator.css';

const Generator = ({ setGeneratedImage }) => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('english');
  const [style, setStyle] = useState('casual');
  const [size, setSize] = useState('medium');
  const [inkColor, setInkColor] = useState('#000000'); // Default black ink
  const [previewUrl, setPreviewUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [availableStyles, setAvailableStyles] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);

  const previewRef = useRef(null);

  // Style descriptions
  const styleDescriptions = {
    'casual': 'Natural, flowing everyday handwriting',
    'formal': 'Elegant and professional script',
    'print': 'Clear, readable printed letters',
    'cursive': 'Beautiful connected cursive writing',
    'school': 'Friendly, rounded school-style writing',
    'traditional': 'Classic traditional script',
    'elegant': 'Sophisticated and graceful writing'
  };

  const sizes = [
    { value: 'small', label: 'Small (20px)' },
    { value: 'medium', label: 'Medium (24px)' },
    { value: 'large', label: 'Large (28px)' }
  ];

  // Load available languages and styles
  useEffect(() => {
    loadLanguages();
  }, []);

  useEffect(() => {
    if (language) {
      loadStyles(language);
    }
  }, [language]);

  const loadLanguages = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/languages');
      const data = await response.json();
      if (data.success) {
        setAvailableLanguages(data.languages);
      }
    } catch (err) {
      console.error('Error loading languages:', err);
    }
  };

  const loadStyles = async (lang) => {
    try {
      const response = await fetch(`http://localhost:8000/api/styles/${lang}`);
      const data = await response.json();
      if (data.success) {
        setAvailableStyles(data.styles);
        // Set default style if current style not available
        if (!data.styles.includes(style)) {
          setStyle(data.styles[0]);
        }
      }
    } catch (err) {
      console.error('Error loading styles:', err);
    }
  };

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const generateHandwriting = async () => {
    if (!text.trim() && !uploadedFile) {
      setError('Please enter text or upload a file to generate handwriting.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');
    setPreviewUrl('');

    try {
      const formData = new FormData();
      formData.append('language', language);
      formData.append('style', style);
      formData.append('size', size);
      formData.append('ink_color', inkColor);
      if (text.trim()) formData.append('text', text);
      if (uploadedFile) formData.append('file', uploadedFile);

      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const absolutePreviewUrl = `http://localhost:8000${data.preview_url}`;
        setPreviewUrl(absolutePreviewUrl);
        setSuccess('Realistic handwriting generated successfully!');
        localStorage.setItem('currentSampleId', data.sample_id);
        
        if (setGeneratedImage) {
          setGeneratedImage({
            previewUrl: absolutePreviewUrl,
            sampleId: data.sample_id,
            text: text,
            language: language,
            style: style,
            size: size,
            inkColor: inkColor
          });
        }

        // Force image reload
        setTimeout(() => {
          if (previewRef.current) {
            previewRef.current.src = `${absolutePreviewUrl}?t=${new Date().getTime()}`;
          }
        }, 100);
      } else {
        setError(data.error || 'Failed to generate handwriting.');
      }
    } catch (err) {
      setError('Connection error. Please make sure the backend server is running.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadHandwriting = async () => {
    const sampleId = localStorage.getItem('currentSampleId');
    if (!sampleId) {
      setError('Please generate handwriting first before downloading.');
      return;
    }

    try {
      window.open(`http://localhost:8000/api/download/${sampleId}`, '_blank');
      setSuccess('Download started! Check your downloads folder.');
    } catch (err) {
      setError('Download failed. Please try again.');
      console.error('Download error:', err);
    }
  };

  const clearAll = () => {
    setText('');
    setPreviewUrl('');
    setUploadedFile(null);
    setError('');
    setSuccess('');
    setInkColor('#000000');
    localStorage.removeItem('currentSampleId');
    
    if (setGeneratedImage) {
      setGeneratedImage(null);
    }
  };

  return (
    <div className="generator-container">
      <header className="generator-header">
        <h1 className="main-title">HandwritingBot</h1>
        <p className="subtitle">
          Transform your text into beautiful, realistic human-like handwriting
        </p>
      </header>

      <div className="generator-main">
        <div className="generator-grid">
          {/* Left Panel - Controls */}
          <div className="control-panel">
            <h2 className="section-title">Create Your Handwriting</h2>

            <div className="control-group">
              <label className="control-label">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Handwriting Style</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                {availableStyles.map((st) => (
                  <option key={st} value={st}>
                    {st.charAt(0).toUpperCase() + st.slice(1)} Style
                  </option>
                ))}
              </select>
              {styleDescriptions[style] && (
                <p className="style-description">{styleDescriptions[style]}</p>
              )}
            </div>

            <div className="control-group">
              <label className="control-label">Text Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                {sizes.map((sz) => (
                  <option key={sz.value} value={sz.value}>{sz.label}</option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Ink Color</label>
              <div className="color-picker-container">
                <input 
                  type="color" 
                  value={inkColor}
                  onChange={(e) => setInkColor(e.target.value)}
                  className="color-picker"
                />
                <span className="color-value">{inkColor}</span>
              </div>
              <p className="style-description">
                Choose any color for your handwriting ink
              </p>
            </div>

            <div className="control-group">
              <label className="control-label">Enter Your Text</label>
              <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here to transform it into beautiful handwriting..."
                rows="6"
              />
              <span className="char-count">{text.length}/3000 characters</span>
            </div>

            <div className="control-group">
              <label className="control-label">Or Upload a File</label>
              <div className="file-upload">
                <input 
                  type="file" 
                  accept=".txt,.pdf" 
                  onChange={handleFileUpload} 
                  className="file-input"
                />
                <div className="file-info">
                  <span>Supported: TXT, PDF</span>
                </div>
              </div>
              {uploadedFile && (
                <p className="file-selected">Selected: {uploadedFile.name}</p>
              )}
            </div>

            <div className="buttons-group">
              <button 
                className="generate-btn" 
                onClick={generateHandwriting} 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="spinner"></span>
                    Generating Realistic Handwriting...
                  </>
                ) : (
                  <>
                    <span className="sparkle">✨</span>
                    Generate Realistic Handwriting
                  </>
                )}
              </button>
              <button className="clear-btn" onClick={clearAll}>
                <span className="icon">🗑️</span>
                Clear All
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="preview-panel">
            <h2 className="section-title">Generated Handwriting Preview</h2>
            
            {previewUrl ? (
              <div className="preview-content">
                <div className="image-container">
                  <img 
                    ref={previewRef}
                    src={previewUrl} 
                    alt="Generated Realistic Handwriting" 
                    className="handwriting-image"
                    onError={() => {
                      console.error('Image failed to load');
                      setError('Failed to load generated image. Please try again.');
                    }}
                    onLoad={() => {
                      console.log('Realistic handwriting image loaded successfully');
                      setError('');
                    }}
                  />
                </div>
                <div className="preview-actions">
                  <button className="action-btn download-btn" onClick={downloadHandwriting}>
                    <span className="icon">📥</span>
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="preview-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">✍️</div>
                  <h3>Your Handwriting Preview</h3>
                  <p>Your beautifully generated handwriting will appear here</p>
                  <p>Click "Generate Realistic Handwriting" to see the magic!</p>
                </div>
              </div>
            )}

            {error && (
              <div className="status-message error">
                <span className="icon">⚠️</span>
                {error}
              </div>
            )}
            {success && (
              <div className="status-message success">
                <span className="icon">✅</span>
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;