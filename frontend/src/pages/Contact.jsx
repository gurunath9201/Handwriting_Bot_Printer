import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    agreeToPrivacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeToPrivacy) {
      setSubmitMessage('Please agree to the Privacy Policy');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post('/api/contact/send', formData);
      if (response.data.success) {
        setSubmitMessage(response.data.message);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: '',
          agreeToPrivacy: false
        });
      }
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header Section */}
      <section style={{ 
        padding: '3rem 2rem 2rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Get in Touch
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'white',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Have questions, feedback, or need support? We'd love to hear from you. Reach out and let's start a conversation.
          </p>
        </div>
      </section>

      <div style={{ padding: '3rem 2rem' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr', 
            gap: '4rem',
            alignItems: 'start'
          }}>
            {/* Contact Form Section */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '2.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '600', 
                marginBottom: '2rem',
                color: '#333'
              }}>
                Send us a message
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div className="form-group">
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#333'
                    }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease'
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#333'
                    }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>

                {/* Subject Field */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    Subject
                  </label>
                  <select 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.4'
                  }}>
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleChange}
                      style={{ 
                        marginTop: '0.2rem',
                        cursor: 'pointer'
                      }}
                    />
                    I agree to the Privacy Policy and consent to having this website store my submitted information.
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: '#000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Submit Message */}
                {submitMessage && (
                  <div style={{ 
                    marginTop: '1rem',
                    padding: '12px 16px',
                    backgroundColor: submitMessage.includes('Thank you') ? '#d1fae5' : '#fee2e2',
                    border: `1px solid ${submitMessage.includes('Thank you') ? '#10b981' : '#ef4444'}`,
                    borderRadius: '8px',
                    color: submitMessage.includes('Thank you') ? '#065f46' : '#991b1b',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information Section */}
            <div>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '600', 
                marginBottom: '2rem',
                color: '#333'
              }}>
                Contact Information
              </h2>

              {/* Contact Methods */}
              <div style={{ marginBottom: '3rem' }}>
                {/* Email */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ 
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#667eea',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ color: 'white', fontSize: '18px' }}>✉️</span>
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      color: '#333'
                    }}>
                      Email Us
                    </h3>
                    <p style={{ 
                      marginBottom: '0.25rem',
                      color: '#667eea',
                      fontWeight: '500'
                    }}>
                      support@handwritten.com
                    </p>
                    <p style={{ 
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ 
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ color: 'white', fontSize: '18px' }}>📞</span>
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      color: '#333'
                    }}>
                      Call Us
                    </h3>
                    <p style={{ 
                      marginBottom: '0.25rem',
                      color: '#10b981',
                      fontWeight: '500'
                    }}>
                      +91-7028858147
                    </p>
                    <p style={{ 
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      Mon-Fri 8AM-6PM EST
                    </p>
                  </div>
                </div>

              
               
              </div>

              {/* Quick Help Section */}
              <div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem',
                  color: '#333'
                }}>
                  Quick Help
                </h3>
                
                <div style={{ 
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  {/* Supported Languages */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <a 
                      href="#supported-languages" 
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        color: '#333',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        fontSize: '1rem'
                      }}
                    >
                      Supported Languages
                    </a>
                    <p style={{ 
                      fontSize: '14px',
                      color: '#666',
                      margin: 0
                    }}>
                      Learn about our multi-language support
                    </p>
                  </div>


                  {/* API Documentation */}
                  <div>
                    <a 
                      href="#api-documentation" 
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        color: '#333',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        fontSize: '1rem'
                      }}
                    >
                      API Documentation
                    </a>
                    <p style={{ 
                      fontSize: '14px',
                      color: '#666',
                      margin: 0
                    }}>
                      Integrate our AI into your apps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;