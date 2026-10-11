import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { comicBooksData } from '../data/comicsData';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Grid, 
  Layout, 
  X, 
  Sparkles,
  CheckCircle2,
  Play
} from 'lucide-react';

export default function ComicBooks() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeComic, setActiveComic] = useState(null);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [viewMode, setViewMode] = useState('step'); // 'step' or 'grid'
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Categories list
  const categories = ['All', 'Social Skills', 'Routine & Places', 'Emotions'];

  // Filter comics by category
  const filteredComics = selectedCategory === 'All'
    ? comicBooksData
    : comicBooksData.filter((c) => c.category === selectedCategory);

  // Text-to-Speech handler
  const speakPanelText = (panel) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${panel.characterName} says: ${panel.speechBubble}. ${panel.captionText}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Friendly, slightly slower pace
    utterance.pitch = 1.05;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech when closing modal or changing panels
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleOpenComic = (comic) => {
    stopSpeech();
    setActiveComic(comic);
    setCurrentPanelIndex(0);
    setViewMode('step');
  };

  const handleCloseComic = () => {
    stopSpeech();
    setActiveComic(null);
  };

  const handleNextPanel = () => {
    stopSpeech();
    if (activeComic && currentPanelIndex < activeComic.panels.length - 1) {
      setCurrentPanelIndex((prev) => prev + 1);
    }
  };

  const handlePrevPanel = () => {
    stopSpeech();
    if (currentPanelIndex > 0) {
      setCurrentPanelIndex((prev) => prev - 1);
    }
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Visual Comic Books"
        subtitle="Fun, panel-by-panel visual social stories to help understand school routines and making friends."
        icon={BookOpen}
        color="purple"
      />

      {/* Category Filter Bar */}
      <nav aria-label="Comic Book Categories" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '1rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  border: `2px solid ${isActive ? 'var(--purple-600)' : 'var(--border-color)'}`,
                  backgroundColor: isActive ? 'var(--purple-600)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Comic Books Library Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {filteredComics.map((comic) => (
          <div
            key={comic.id}
            className="card-base"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: `6px solid var(--purple-500)`
            }}
          >
            <div>
              {/* Cover & Badges */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '3.5rem',
                  backgroundColor: 'var(--purple-50)',
                  padding: '0.75rem',
                  borderRadius: '1.25rem',
                  lineHeight: 1
                }}>
                  {comic.coverEmoji}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                  <span style={{
                    backgroundColor: 'var(--purple-100)',
                    color: 'var(--purple-800)',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    {comic.category}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    📖 {comic.panels.length} Panels
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                {comic.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                {comic.description}
              </p>
            </div>

            {/* Read Button */}
            <Button
              variant="primary"
              icon={BookOpen}
              onClick={() => handleOpenComic(comic)}
              fullWidth
            >
              Read Comic Book
            </Button>
          </div>
        ))}
      </div>

      {/* FULL-SCREEN COMIC READER MODAL */}
      {activeComic && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }} role="dialog" aria-modal="true" aria-label={`Reading ${activeComic.title}`}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1.5rem',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '3px solid var(--purple-500)'
          }}>
            {/* Modal Top Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--purple-600)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>
                  {activeComic.title}
                </h2>
                <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  {viewMode === 'step' 
                    ? `Panel ${currentPanelIndex + 1} of ${activeComic.panels.length}` 
                    : `Full Grid View (${activeComic.panels.length} Panels)`
                  }
                </span>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* View Mode Toggle */}
                <button
                  onClick={() => setViewMode(viewMode === 'step' ? 'grid' : 'step')}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#FFFFFF',
                    borderRadius: '0.75rem',
                    padding: '0.5rem 0.875rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                  title={viewMode === 'step' ? 'Switch to Full Grid View' : 'Switch to Step-by-Step Reader'}
                >
                  {viewMode === 'step' ? <Grid size={18} /> : <Layout size={18} />}
                  <span>{viewMode === 'step' ? 'Grid' : 'Step View'}</span>
                </button>

                {/* Close Modal Button */}
                <button
                  onClick={handleCloseComic}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Close Comic Reader"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content Body */}
            <div style={{
              padding: '1.75rem',
              overflowY: 'auto',
              flex: 1,
              backgroundColor: '#F8FAFC'
            }}>
              {/* VIEW MODE 1: STEP BY STEP PANEL VIEWER */}
              {viewMode === 'step' && (
                <div>
                  {/* Current Panel Showcase */}
                  {(() => {
                    const currentPanel = activeComic.panels[currentPanelIndex];
                    return (
                      <div>
                        {/* Audio Narrator Bar */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '1rem',
                          backgroundColor: '#FFFFFF',
                          padding: '0.75rem 1.25rem',
                          borderRadius: '1rem',
                          border: '2px solid var(--border-color)'
                        }}>
                          <span style={{ fontWeight: '700', color: 'var(--purple-900)' }}>
                            🔊 Panel Audio Narration
                          </span>
                          <Button
                            size="sm"
                            variant={isSpeaking ? 'amber' : 'purple'}
                            icon={isSpeaking ? VolumeX : Volume2}
                            onClick={() => speakPanelText(currentPanel)}
                          >
                            {isSpeaking ? 'Stop Reading' : 'Read Panel Out Loud'}
                          </Button>
                        </div>

                        {/* Comic Panel Canvas */}
                        <div style={{
                          background: currentPanel.bgGradient,
                          borderRadius: '1.5rem',
                          padding: '2rem 1.5rem',
                          border: '4px solid #1E293B',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          position: 'relative',
                          minHeight: '340px',
                          justifyContent: 'space-between'
                        }}>
                          {/* Panel Number Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            backgroundColor: '#1E293B',
                            color: '#FFFFFF',
                            fontWeight: '900',
                            fontSize: '1rem',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '0.75rem'
                          }}>
                            Panel #{currentPanel.panelNumber}
                          </div>

                          {/* Character Name Badge */}
                          <div style={{
                            backgroundColor: '#FFFFFF',
                            color: 'var(--text-heading)',
                            fontWeight: '800',
                            fontSize: '1.05rem',
                            padding: '0.35rem 1rem',
                            borderRadius: '1rem',
                            boxShadow: 'var(--shadow-sm)',
                            marginTop: '0.5rem'
                          }}>
                            {currentPanel.characterName}
                          </div>

                          {/* Speech Bubble */}
                          <div style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '1.5rem',
                            padding: '1.25rem 1.75rem',
                            marginTop: '1.25rem',
                            marginBottom: '1.25rem',
                            maxWidth: '520px',
                            border: '3px solid #1E293B',
                            boxShadow: 'var(--shadow-md)',
                            position: 'relative'
                          }}>
                            <p style={{
                              fontSize: '1.35rem',
                              fontWeight: '800',
                              color: 'var(--text-heading)',
                              lineHeight: 1.4,
                              margin: 0,
                              fontFamily: 'var(--font-heading)'
                            }}>
                              “{currentPanel.speechBubble}”
                            </p>
                          </div>

                          {/* Illustration Emoji */}
                          <div style={{
                            fontSize: '5.5rem',
                            lineHeight: 1,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                            margin: '0.5rem 0'
                          }}>
                            {currentPanel.illustrationEmoji}
                          </div>

                          {/* Caption Box at Panel Bottom */}
                          <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '2px solid #1E293B',
                            borderRadius: '1rem',
                            padding: '0.875rem 1.25rem',
                            color: '#1E293B',
                            fontWeight: '700',
                            fontSize: '1.05rem',
                            width: '100%',
                            marginTop: '1rem'
                          }}>
                            {currentPanel.captionText}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Panel Navigation Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1.5rem',
                    gap: '1rem'
                  }}>
                    <Button
                      variant="outline"
                      icon={ChevronLeft}
                      onClick={handlePrevPanel}
                      disabled={currentPanelIndex === 0}
                    >
                      Previous Panel
                    </Button>

                    {/* Progress Dots */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {activeComic.panels.map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            stopSpeech();
                            setCurrentPanelIndex(idx);
                          }}
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: idx === currentPanelIndex ? 'var(--purple-600)' : '#CBD5E1',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          title={`Go to Panel ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <Button
                      variant={currentPanelIndex === activeComic.panels.length - 1 ? 'success' : 'purple'}
                      icon={currentPanelIndex === activeComic.panels.length - 1 ? CheckCircle2 : ChevronRight}
                      onClick={
                        currentPanelIndex === activeComic.panels.length - 1
                          ? handleCloseComic
                          : handleNextPanel
                      }
                    >
                      {currentPanelIndex === activeComic.panels.length - 1 ? 'Finish Comic' : 'Next Panel'}
                    </Button>
                  </div>
                </div>
              )}

              {/* VIEW MODE 2: FULL GRID VIEW */}
              {viewMode === 'grid' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem'
                }}>
                  {activeComic.panels.map((panel, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: panel.bgGradient,
                        borderRadius: '1.25rem',
                        padding: '1.25rem',
                        border: '3px solid #1E293B',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        position: 'relative',
                        minHeight: '260px'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        backgroundColor: '#1E293B',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '0.5rem'
                      }}>
                        #{panel.panelNumber}
                      </div>

                      <div style={{ fontSize: '3rem', margin: '0.5rem 0' }}>
                        {panel.illustrationEmoji}
                      </div>

                      <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '1rem',
                        padding: '0.75rem 1rem',
                        border: '2px solid #1E293B',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        color: 'var(--text-heading)',
                        marginBottom: '0.5rem'
                      }}>
                        “{panel.speechBubble}”
                      </div>

                      <div style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '0.75rem',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: '#1E293B'
                      }}>
                        {panel.captionText}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
