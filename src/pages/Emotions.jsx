import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { EMOTIONS_DATA } from '../data/emotionsData';
import { Smile, Heart, RefreshCw, Info } from 'lucide-react';

export default function Emotions() {
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  return (
    <div>
      <PageHeader
        title="How Are You Feeling?"
        subtitle="Explore different feelings, understand emotions, and express how you feel today."
        icon={Smile}
        color="green"
      />

      {/* Interactive Check-In Section */}
      <section style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid var(--border-color)',
        borderRadius: '1.5rem',
        padding: '2rem 1.5rem',
        marginBottom: '2.5rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-md)'
      }} aria-labelledby="feeling-check-in">
        <h2 id="feeling-check-in" style={{ fontSize: '2rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
          How are you feeling today?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          Tap an emotion card below to share your feeling.
        </p>

        {selectedFeeling ? (
          <div style={{
            backgroundColor: selectedFeeling.color,
            border: `3px solid ${selectedFeeling.borderColor}`,
            borderRadius: '1.5rem',
            padding: '2rem',
            maxWidth: '500px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>
              {selectedFeeling.emoji}
            </div>
            <h3 style={{ fontSize: '2.25rem', color: selectedFeeling.textColor, marginBottom: '0.5rem' }}>
              You selected {selectedFeeling.name}
            </h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              “{selectedFeeling.sentence}”
            </p>
            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={() => setSelectedFeeling(null)}
            >
              Choose another feeling
            </Button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            {EMOTIONS_DATA.map((emo) => (
              <button
                key={emo.id}
                onClick={() => setSelectedFeeling(emo)}
                style={{
                  backgroundColor: emo.color,
                  border: `3px solid ${emo.borderColor}`,
                  borderRadius: '1.25rem',
                  padding: '1.25rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span style={{ fontSize: '3.5rem' }}>{emo.emoji}</span>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: emo.textColor }}>
                  {emo.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Educational Emotions Overview */}
      <section aria-labelledby="learning-emotions">
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 id="learning-emotions" style={{ fontSize: '1.8rem', color: 'var(--text-heading)' }}>
            Learn About Feelings
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Every feeling is valid and important. Here is what different emotions feel like:
          </p>
        </div>

        <div className="grid-cards">
          {EMOTIONS_DATA.map((emo) => (
            <article
              key={emo.id}
              className="card-base"
              style={{
                backgroundColor: emo.color,
                borderColor: emo.borderColor,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {emo.emoji}
                </div>
                <h3 style={{ fontSize: '1.5rem', color: emo.textColor, marginBottom: '0.5rem', textAlign: 'center' }}>
                  {emo.name}
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', marginBottom: '1rem' }}>
                  {emo.description}
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.975rem',
                fontWeight: '600',
                color: emo.textColor
              }}>
                💬 “{emo.sentence}”
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Educational Notice */}
      <div style={{
        marginTop: '2.5rem',
        backgroundColor: 'var(--blue-50)',
        border: '2px solid var(--blue-100)',
        borderRadius: '1rem',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        color: 'var(--blue-900)'
      }}>
        <Info size={22} style={{ flexShrink: 0 }} aria-hidden="true" />
        <span>
          Note: Identifying emotions helps children build emotional awareness and communication skills. Selection of feelings does not imply medical evaluation or diagnosis.
        </span>
      </div>
    </div>
  );
}
