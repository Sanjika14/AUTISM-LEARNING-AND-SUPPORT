import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#FFFFFF',
      borderTop: '2px solid var(--border-color)',
      marginTop: 'auto',
      padding: '3rem 1rem 2rem 1rem',
      color: 'var(--text-main)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem'
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '400px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--blue-700)',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              marginBottom: '0.75rem'
            }}>
              <HeartHandshake size={28} />
              <span>Autism Learning & Support</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.5' }}>
              A friendly, accessible, child-safe educational platform designed to support learning, communication, emotional exploration, and calming activities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
              Quick Navigation
            </h4>
            <ul style={{
              listStyle: 'none',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem 1.5rem',
              padding: 0
            }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/learning">Learning</Link></li>
              <li><Link to="/emotions">Emotions</Link></li>
              <li><Link to="/communication">Communication</Link></li>
              <li><Link to="/sensory">Sensory</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/comics">Comic Books</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div style={{
          backgroundColor: 'var(--amber-50)',
          border: '2px solid var(--amber-500)',
          borderRadius: '1rem',
          padding: '1.25rem 1.5rem',
          color: 'var(--amber-900)',
          fontSize: '0.975rem',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          <strong>Important Educational Notice:</strong><br />
          This website was created as a college educational project to support learning and awareness. It is not a substitute for professional medical, psychological, or therapeutic advice.
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.25rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.95rem'
        }}>
          © {currentYear} Autism Learning & Support. College Educational Project.
        </div>
      </div>
    </footer>
  );
}
