import React from 'react';
import PageHeader from '../components/PageHeader';
import { PRACTICAL_SUGGESTIONS } from '../data/parentsTeachersData';
import { 
  Users, 
  ShieldAlert, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Image as ImageIcon, 
  MessageSquare, 
  Home, 
  Heart, 
  Sparkles 
} from 'lucide-react';

const ICON_MAP = {
  Calendar,
  CheckCircle,
  Clock,
  Image: ImageIcon,
  MessageSquare,
  Home,
  Heart,
  Sparkles,
  Users
};

export default function ParentsTeachers() {
  return (
    <div>
      <PageHeader
        title="Parents & Teachers Guide"
        subtitle="Practical suggestions, routines, and environmental support strategies for educators and caregivers."
        icon={Users}
        color="blue"
      />

      {/* Prominent Educational Notice */}
      <div style={{
        backgroundColor: 'var(--amber-50)',
        border: '2px solid var(--amber-500)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <ShieldAlert size={28} color="var(--amber-600)" style={{ flexShrink: 0 }} aria-hidden="true" />
        <div>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--amber-900)', margin: '0 0 0.25rem 0' }}>
            Important Educational Disclaimer
          </h2>
          <p style={{ color: 'var(--amber-900)', fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>
            This website provides general educational information only. It is a college project and is not a substitute for professional medical, psychological, behavioral, educational, or therapeutic advice.
          </p>
        </div>
      </div>

      {/* Intro Overview */}
      <section style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid var(--border-color)',
        borderRadius: '1.5rem',
        padding: '2rem 1.5rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
          Supporting Autistic Children in Learning & Daily Life
        </h2>
        <p style={{ color: 'var(--text-main)', fontSize: '1.125rem', lineHeight: '1.7', margin: 0 }}>
          Children with autism have unique strengths, preferences, communication styles, and support needs. Creating a respectful, structured, and low-stimulus environment allows children to feel safe, understood, and confident to explore learning activities.
        </p>
      </section>

      {/* Practical Suggestions Grid */}
      <section aria-labelledby="suggestions-title">
        <h2 id="suggestions-title" style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '1.5rem' }}>
          Practical Support Strategies
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {PRACTICAL_SUGGESTIONS.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || Users;
            return (
              <article
                key={item.id}
                className="card-base"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--blue-600)'
                }}>
                  <div style={{
                    backgroundColor: 'var(--blue-50)',
                    padding: '0.6rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--blue-100)'
                  }}>
                    <IconComponent size={24} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', margin: 0 }}>
                    {item.title}
                  </h3>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
