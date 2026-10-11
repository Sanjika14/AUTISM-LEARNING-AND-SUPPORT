import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1.5rem',
      backgroundColor: '#FFFFFF',
      borderRadius: '1.5rem',
      border: '2px solid var(--border-color)',
      boxShadow: 'var(--shadow-md)',
      maxWidth: '600px',
      margin: '2rem auto'
    }}>
      <div style={{
        backgroundColor: 'var(--blue-50)',
        border: '2px solid var(--blue-100)',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        color: 'var(--blue-600)'
      }}>
        <Compass size={64} aria-hidden="true" />
      </div>

      <h1 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
        Page Not Found
      </h1>

      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Oops! We couldn't find the page you were looking for. Let's get you back to learning!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="primary"
          size="lg"
          icon={Home}
          onClick={() => navigate('/')}
          ariaLabel="Return to Home page"
        >
          Back to Home Page
        </Button>
      </div>
    </div>
  );
}
