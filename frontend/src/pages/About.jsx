import React from 'react';

const About = () => {
  const teamMembers = [
    {
      name: "Chinmay Dayanand Sanadi.",
      position: "Final Year B.Tech CSE",
    },
    {
      name: "Gurunath Someshwar Mule.",
      position: "Final Year B.Tech CSE",
    },
    {
      name: "Pawan Suresh Chormule.",
      position: "Final Year B.Tech CSE",
    },
    {
      name: "Shreyas Uttam Patil",
      position: "Final Year B.Tech CSE",
    }
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with AI and handwriting technology."
    },
    {
      title: "Accessibility",
      description: "Beautiful handwriting should be available to everyone, regardless of their physical abilities or background."
    },
    {
      title: "Quality",
      description: "We're committed to delivering the highest quality handwriting generation with meticulous attention to detail."
    },
    {
      title: "Privacy",
      description: "Your data and documents are secure with us. We maintain the highest standards of privacy protection."
    },
    {
      title: "Cultural Diversity",
      description: "We celebrate and support handwriting traditions from cultures and languages around the world."
    },
    {
      title: "Sustainability",
      description: "Our digital approach to handwriting helps reduce paper waste while preserving the art of writing."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="container">
          <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>About HandwritingBot</h1>
          <p style={{ textAlign: 'center', fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            Pioneering the future of digital handwriting through advanced AI technology. Our mission is to make handwriting accessible, beautiful, and authentic for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Our Mission</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666', marginBottom: '3rem' }}>
              We believe that handwriting is more than just text on paper—it's a personal expression, a connection to our humanity in an increasingly digital world. Our mission is to preserve and enhance this beautiful art form through cutting-edge artificial intelligence.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666' }}>
              By making handwriting generation accessible across multiple languages and styles, we're empowering individuals, educators, and businesses to create authentic, personalized written communications that stand out in today's digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Our Core Values</h2>
          <p style={{ textAlign: 'center', marginBottom: '4rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            The principles that guide everything we do
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {coreValues.map((value, index) => (
              <div key={index} style={{ 
                background: 'cyan', 
                padding: '2rem', 
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#333' }}>{value.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Meet Our Team</h2>
          <p style={{ textAlign: 'center', marginBottom: '4rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            The brilliant minds behind HandwritingBot AI
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{ 
                background: '#f8f9fa', 
                padding: '2rem', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: '#333' }}>{member.name}</h3>
                <p style={{ 
                  marginBottom: '1rem', 
                  color: '#667eea', 
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;