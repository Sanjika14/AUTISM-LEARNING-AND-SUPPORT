import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { COMMUNICATION_CARDS } from '../data/communicationData';
import { MessageSquare, Volume2, XCircle, VolumeX, Sparkles } from 'lucide-react';

export default function Communication() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [speechStatus, setSpeechStatus] = useState(null);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setSpeechStatus(null);
  };

  const handleClearSelection = () => {
    setSelectedCard(null);
    setSpeechStatus(null);
  };

  const handleSpeak = () => {
    if (!selectedCard) return;

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Stop ongoing speech
        const utterance = new SpeechSynthesisUtterance(selectedCard.phrase);
        utterance.rate = 0.9; // Slightly slower, clearer pace
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setSpeechStatus('Spoken clearly! 🔊');
        };
        utterance.onerror = () => {
          setSpeechStatus('Speech complete.');
        };

        window.speechSynthesis.speak(utterance);
        setSpeechStatus('Speaking...');
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        setSpeechStatus('Speech audio is not available on this browser.');
      }
    } else {
      setSpeechStatus('Speech synthesis is not supported on this browser version.');
    }
  };

  return (
    <div>
      <PageHeader
        title="My Communication Cards"
        subtitle="Tap a card to communicate what you need. Use the speak button to hear it aloud."
        icon={MessageSquare}
        color="purple"
      />

      {/* Selected Card Phrase Banner */}
      <section style={{
        backgroundColor: selectedCard ? selectedCard.bg : '#FFFFFF',
        border: `3px solid ${selectedCard ? selectedCard.border : 'var(--border-color)'}`,
        borderRadius: '1.5rem',
        padding: '2rem 1.5rem',
        marginBottom: '2.5rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-md)',
        transition: 'all 0.2s ease'
      }} aria-labelledby="selected-phrase">
        <h2 id="selected-phrase" className="sr-only">Selected Phrase</h2>

        {selectedCard ? (
          <div>
            <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>
              {selectedCard.emoji}
            </div>
            <p style={{
              fontSize: '2.25rem',
              fontWeight: '800',
              color: 'var(--text-heading)',
              marginBottom: '1rem',
              fontFamily: 'var(--font-heading)'
            }}>
              “{selectedCard.phrase}”
            </p>

            {speechStatus && (
              <p style={{
                color: 'var(--blue-700)',
                fontWeight: '700',
                fontSize: '1.125rem',
                marginBottom: '1.25rem'
              }}>
                {speechStatus}
              </p>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Button
                variant="success"
                size="lg"
                icon={Volume2}
                onClick={handleSpeak}
                ariaLabel={`Speak out loud: ${selectedCard.phrase}`}
              >
                Speak
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={XCircle}
                onClick={handleClearSelection}
                ariaLabel="Clear selected card"
              >
                Clear Selection
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '1rem 0' }}>
            <div style={{ fontSize: '3rem', color: 'var(--blue-500)', marginBottom: '0.5rem' }}>
              💬
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-heading)', margin: 0 }}>
              No card selected yet.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', margin: '0.25rem 0 0 0' }}>
              Tap any card below to express your thoughts.
            </p>
          </div>
        )}
      </section>

      {/* Grid of Visual Communication Cards */}
      <section aria-labelledby="communication-cards-grid">
        <h2 id="communication-cards-grid" className="sr-only">Communication Cards List</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {COMMUNICATION_CARDS.map((card) => {
            const isSelected = selectedCard?.id === card.id;
            return (
              <button
                key={card.id}
                onClick={() => handleSelectCard(card)}
                style={{
                  backgroundColor: card.bg,
                  border: `3px solid ${isSelected ? 'var(--blue-600)' : card.border}`,
                  borderRadius: '1.5rem',
                  padding: '1.75rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-md)',
                  transform: isSelected ? 'scale(1.02)' : 'none',
                  transition: 'all 0.15s ease'
                }}
                aria-pressed={isSelected}
                aria-label={`Communication Card: ${card.title}`}
              >
                <span style={{ fontSize: '4.5rem', lineHeight: 1 }}>{card.emoji}</span>
                <div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    color: 'var(--text-heading)',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {card.title}
                  </h3>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--text-muted)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-color)'
                  }}>
                    {card.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
