'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import values from './datavalues.json';
import teamMembers from './teamMembers.json';
import stats from './stats.json';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fefae0',
    color: '#333',
    fontFamily: "'CustomFont', Arial, sans-serif",
    margin: 0,
  },
  header: {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '80px 20px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '20px',
    '@media (max-width: 768px)': {
      padding: '60px 15px',
    },
    '@media (max-width: 480px)': {
      padding: '40px 15px',
    },
  },
  headerTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    marginBottom: '10px',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },
  headerSubtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
    marginBottom: '40px',
    maxWidth: '800px',
    margin: '0 auto 40px auto',
    lineHeight: '1.5',
    padding: '0 10px',
  },
  section: {
    padding: 'clamp(40px, 8vw, 60px) clamp(15px, 5vw, 20px)',
    maxWidth: '1000px',
    margin: 'auto',
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#bc6c25',
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
    marginBottom: 'clamp(20px, 4vw, 30px)',
    lineHeight: '1.2',
  },
  description: {
    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
    lineHeight: '1.6',
    textAlign: 'center',
    marginBottom: '40px',
    padding: '0 10px',
  },
  storySection: {
    background: '#fff',
    padding: 'clamp(25px, 5vw, 40px)',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(15px, 3vw, 20px)',
    marginTop: '30px',
  },
  valueCard: {
    background: '#fff',
    padding: 'clamp(20px, 4vw, 30px)',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'center',
    cursor: 'pointer',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  valueCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },
  valueIcon: {
    fontSize: 'clamp(2.5rem, 5vw, 3rem)',
    marginBottom: '20px',
    display: 'block',
    color: '#bc6c25',
  },
  valueTitle: {
    fontWeight: 'bold',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
    marginBottom: '15px',
    color: '#333',
  },
  valueDescription: {
    color: '#666',
    lineHeight: '1.6',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'clamp(20px, 4vw, 30px)',
    marginTop: '40px',
  },
  teamMember: {
    background: '#fff',
    padding: 'clamp(20px, 4vw, 30px)',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  teamMemberHover: {
    transform: 'translateY(-5px)',
  },
  memberImage: {
    width: 'clamp(100px, 20vw, 120px)',
    height: 'clamp(100px, 20vw, 120px)',
    borderRadius: '50%',
    margin: '0 auto 20px',
    background: 'linear-gradient(45deg, #bc6c25, #dda15e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
    color: 'white',
  },
  memberName: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  memberRole: {
    color: '#bc6c25',
    fontWeight: '500',
    marginBottom: '15px',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  },
  memberBio: {
    color: '#666',
    lineHeight: '1.5',
    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
  },
  statsSection: {
    background: 'linear-gradient(135deg, #bc6c25, #dda15e)',
    color: 'white',
    padding: 'clamp(40px, 8vw, 60px) clamp(15px, 5vw, 20px)',
    textAlign: 'center',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'clamp(20px, 5vw, 40px)',
    maxWidth: '800px',
    margin: '40px auto 0',
  },
  statItem: {
    textAlign: 'center',
    padding: '10px',
  },
  statNumber: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 'bold',
    marginBottom: '10px',
    lineHeight: '1',
  },
  statLabel: {
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    opacity: 0.9,
    lineHeight: '1.3',
  },
  ctaSection: {
    padding: 'clamp(40px, 8vw, 60px) clamp(15px, 5vw, 20px)',
    textAlign: 'center',
    backgroundColor: '#f4f3ee',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  ctaPrimary: {
    padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px)',
    fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#bc6c25',
    color: 'white',
    transition: 'all 0.3s ease',
    minWidth: '140px',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
  },
  ctaSecondary: {
    padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px)',
    fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
    border: '2px solid #bc6c25',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#bc6c25',
    transition: 'all 0.3s ease',
    minWidth: '140px',
  },
  footer: {
    background: '#283618',
    color: '#fff',
    textAlign: 'center',
    padding: 'clamp(30px, 6vw, 40px) clamp(15px, 5vw, 20px)',
  },
  footerTitle: {
    fontWeight: 'bold',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.2rem)',
    marginBottom: '10px',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(15px, 3vw, 20px)',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#dda15e',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  },
  // Remove unused styles
  mobileHidden: {
    display: 'block',
  },
};

const AboutUs = () => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredTeamMember, setHoveredTeamMember] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const getStatsGridStyle = () => ({
    ...styles.statsGrid,
    gridTemplateColumns:
      windowWidth <= 480
        ? '1fr'
        : windowWidth <= 768
        ? 'repeat(2, 1fr)'
        : 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: windowWidth <= 480 ? '30px' : 'clamp(20px, 5vw, 40px)',
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to get responsive grid styles
  const getValuesGridStyle = () => ({
    ...styles.valuesGrid,
    gridTemplateColumns:
      windowWidth <= 320 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
  });

  const getTeamGridStyle = () => ({
    ...styles.teamGrid,
    gridTemplateColumns:
      windowWidth <= 320 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
  });

  const getButtonContainerStyle = () => ({
    ...styles.buttonContainer,
    flexDirection: windowWidth <= 480 ? 'column' : 'row',
    gap: windowWidth <= 480 ? '15px' : '10px',
  });

  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      if (e.target.style.backgroundColor === 'rgb(188, 108, 37)') {
        e.target.style.backgroundColor = '#a05a1f';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 5px 15px rgba(188, 108, 37, 0.3)';
      } else {
        e.target.style.backgroundColor = '#bc6c25';
        e.target.style.color = 'white';
        e.target.style.transform = 'translateY(-2px)';
      }
    } else {
      if (e.target.innerHTML === 'Search Hotels') {
        e.target.style.backgroundColor = '#bc6c25';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      } else {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#bc6c25';
        e.target.style.transform = 'translateY(0)';
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>About Us</h1>
        <p style={styles.headerSubtitle}>
          Discover the story behind our passion for creating unforgettable
          travel experiences and connecting travelers with their perfect
          accommodations worldwide.
        </p>
      </div>

      {/* Our Story Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Story</h2>
        <div style={styles.storySection}>
          <p style={styles.description}>
            Founded in 2018 with a simple yet powerful vision, we set out to
            revolutionize the way people discover and book their perfect
            accommodations. What started as a small team of travel enthusiasts
            has grown into a trusted platform serving millions of travelers
            worldwide.
          </p>
          <p style={styles.description}>
            Our journey began when our founders, avid travelers themselves,
            experienced the frustration of complicated booking processes and
            limited options. They envisioned a platform that would not only
            simplify hotel booking but also curate exceptional experiences
            tailored to each traveler's unique preferences and budget.
          </p>
          <p style={styles.description}>
            Today, we proudly partner with over 10,000 hotels, resorts, and
            unique accommodations across 150+ destinations, ensuring that
            whether you're seeking a luxury resort, a cozy boutique hotel, or an
            authentic local experience, we have the perfect match for your
            journey.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Values</h2>
        <div style={getValuesGridStyle()}>
          {values.map((value, index) => (
            <div
              key={index}
              style={{
                ...styles.valueCard,
                ...(hoveredValue === index ? styles.valueCardHover : {}),
              }}
              onMouseEnter={() => setHoveredValue(index)}
              onMouseLeave={() => setHoveredValue(null)}
            >
              <span style={styles.valueIcon}>{value.icon}</span>
              <h3 style={styles.valueTitle}>{value.title}</h3>
              <p style={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Meet Our Team</h2>
        <p style={styles.description}>
          Behind every great platform is a passionate team dedicated to making
          your travel dreams a reality.
        </p>
        <div style={getTeamGridStyle()}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={{
                ...styles.teamMember,
                ...(hoveredTeamMember === index ? styles.teamMemberHover : {}),
              }}
              onMouseEnter={() => setHoveredTeamMember(index)}
              onMouseLeave={() => setHoveredTeamMember(null)}
            >
              <div style={styles.memberImage}>{member.icon}</div>
              <h3 style={styles.memberName}>{member.name}</h3>
              <p style={styles.memberRole}>{member.role}</p>
              <p style={styles.memberBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <h2 style={{ ...styles.sectionTitle, color: 'white' }}>Our Impact</h2>
        <p
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.5',
            padding: '0 15px',
          }}
        >
          Numbers that reflect our commitment to connecting travelers with
          exceptional accommodations
        </p>
        <div style={getStatsGridStyle()}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <div style={styles.storySection}>
          <p style={styles.description}>
            To democratize travel by making exceptional accommodations
            accessible, affordable, and easy to discover for every traveler,
            regardless of their budget or destination. We believe that everyone
            deserves a comfortable, memorable place to stay that enhances their
            journey and creates lasting memories.
          </p>
          <p style={styles.description}>
            We're not just a booking platform – we're your travel companions,
            committed to ensuring that every trip you take is better than the
            last. Through innovative technology, trusted partnerships, and
            unwavering focus on customer satisfaction, we're building the future
            of travel, one booking at a time.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.sectionTitle}>Ready to Start Your Journey?</h2>
        <p style={styles.description}>
          Join millions of satisfied travelers who trust us with their
          accommodation needs. Discover your next perfect stay today.
        </p>
        <div style={getButtonContainerStyle()}>
          <Link
            href="/"
            style={styles.ctaPrimary}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Search Hotels
          </Link>
          <button
            style={styles.ctaSecondary}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={(e) => {
              window.location.href =
                'mailto:support@atlix.travel.com?subject=Inquiry&body=Hi, I would like to get in touch regarding...';
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
