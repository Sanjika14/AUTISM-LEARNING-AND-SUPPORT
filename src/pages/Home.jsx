import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';
import Button from '../components/Button';
import { 
  BookOpen, 
  Smile, 
  MessageSquare, 
  Sparkles, 
  Gamepad2, 
  ArrowRight,
  ShieldAlert,
  Heart
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const activities = [
    {
      title: 'Learning Activities',
      description: 'Learn colors, shapes, numbers, letters, and practice matching.',
      emoji: '🎨',
      colorScheme: 'blue',
      path: '/learning',
      badge: 'Core Learning'
    },
    {
      title: 'Emotions',
      description: 'Learn about feelings, recognize emotions, and express how you feel.',
      emoji: '😊',
      colorScheme: 'green',
      path: '/emotions',
      badge: 'Self Expression'
    },
    {
      title: 'Communication Cards',
      description: 'Use simple picture cards to express needs, choices, and requests.',
      emoji: '💬',
      colorScheme: 'purple',
      path: '/communication',
      badge: 'Speech & Cards'
    },
    {
      title: 'Sensory & Calming',
      description: 'Practice gentle breathing, slow counting, quiet time, and stretching.',
      emoji: '🌿',
      colorScheme: 'amber',
      path: '/sensory',
      badge: 'Relaxation'
    },
    {
      title: 'Fun & Educational Games',
      description: 'Play memory matching, picture finding, color games, and simple puzzles.',
      emoji: '🎮',
      colorScheme: 'rose',
      path: '/games',
      badge: 'Interactive'
    }
  ];

  return (
    <div className="home-container">
      {/* Educational Notice */}
      <div className="disclaimer-banner" role="region" aria-label="College project notice">
        <ShieldAlert size={24} style={{ flexShrink: 0 }} aria-hidden="true" />
        <div>
          <strong>College Educational Project Notice:</strong> This website is an educational project designed to support learning and awareness. It is not a substitute for professional medical, psychological, or therapeutic advice.
        </div>
      </div>

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid var(--border-color)',
        borderRadius: '1.5rem',
        padding: '2.5rem 1.5rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-md)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
        alignItems: 'center'
      }} className="hero-card">
        <div style={{ maxWidth: '650px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--blue-50)',
            color: 'var(--blue-700)',
            fontWeight: '700',
            fontSize: '0.95rem',
            padding: '0.35rem 0.875rem',
            borderRadius: '9999px',
            marginBottom: '1rem',
            border: '1px solid var(--blue-100)'
          }}>
            <Heart size={16} fill="currentColor" aria-hidden="true" />
            <span>Inclusive & Friendly Learning Environment</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            color: 'var(--text-heading)',
            marginBottom: '0.75rem',
            lineHeight: '1.15'
          }}>
            Autism Learning & Support
          </h1>

          <p style={{
            fontSize: '1.35rem',
            color: 'var(--blue-700)',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            “Learn, communicate, play, and feel comfortable.”
          </p>

          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Welcome! This is a simple and friendly learning space designed to help children explore learning activities, emotions, communication, calming activities, and fun educational games.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              size="lg"
              variant="primary"
              icon={ArrowRight}
              onClick={() => navigate('/learning')}
              ariaLabel="Start Learning Activities"
            >
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="secondary"
              icon={Sparkles}
              onClick={() => navigate('/sensory')}
              ariaLabel="Try Calming Activities"
            >
              Calming Space
            </Button>
          </div>
        </div>

        {/* Hero Graphic / Illustration */}
        <div style={{
          backgroundColor: 'var(--blue-50)',
          border: '2px dashed var(--blue-100)',
          borderRadius: '1.25rem',
          padding: '2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '4rem', display: 'flex', gap: '0.5rem' }}>
            <span>🎨</span>
            <span>🧩</span>
            <span>🌈</span>
            <span>⭐</span>
          </div>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            fontSize: '1.25rem',
            color: 'var(--blue-900)',
            margin: 0
          }}>
            Simple • Calm • Encouraging
          </p>
          <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Designed for children, parents, & teachers
          </span>
        </div>
      </section>

      {/* Main Feature Cards Section */}
      <section aria-labelledby="activities-heading" style={{ marginBottom: '2.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 id="activities-heading" style={{ fontSize: '2rem', color: 'var(--text-heading)' }}>
            Explore Learning & Support Areas
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', margin: '0.25rem 0 0 0' }}>
            Choose an activity below to start exploring at your own pace.
          </p>
        </div>

        <div className="grid-cards">
          {activities.map((act) => (
            <ActivityCard
              key={act.path}
              title={act.title}
              description={act.description}
              emoji={act.emoji}
              colorScheme={act.colorScheme}
              buttonText="Explore"
              badge={act.badge}
              onClick={() => navigate(act.path)}
            />
          ))}
        </div>
      </section>

      <style>{`
        @media (min-width: 850px) {
          .hero-card {
            grid-template-columns: 1.4fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
