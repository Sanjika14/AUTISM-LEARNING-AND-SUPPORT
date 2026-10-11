import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FeedbackMessage from '../components/FeedbackMessage';
import { 
  MEMORY_CARDS, 
  PICTURE_MATCH_GAMES, 
  COLOR_GAME_QUESTIONS, 
  SHAPE_GAME_QUESTIONS, 
  PUZZLE_ITEMS 
} from '../data/gamesData';
import { 
  Gamepad2, 
  Grid, 
  Image as ImageIcon, 
  Palette, 
  Shapes, 
  Puzzle, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Games() {
  const [activeTab, setActiveTab] = useState('memory');

  // Memory Game State
  const [cards, setCards] = useState(() => 
    [...MEMORY_CARDS].sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [memoryFeedback, setMemoryFeedback] = useState(null);

  // Picture Match State
  const [picIndex, setPicIndex] = useState(0);
  const [picFeedback, setPicFeedback] = useState(null);

  // Color Game State
  const [colorIndex, setColorIndex] = useState(0);
  const [colorFeedback, setColorFeedback] = useState(null);

  // Shape Game State
  const [shapeIndex, setShapeIndex] = useState(0);
  const [shapeFeedback, setShapeFeedback] = useState(null);

  // Puzzle Game State
  const [puzzleMatched, setPuzzleMatched] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [puzzleFeedback, setPuzzleFeedback] = useState(null);

  // Memory Game Logic
  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].matchId === cards[secondIdx].matchId) {
        const newMatched = [...matched, firstIdx, secondIdx];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          setMemoryFeedback({ message: 'Awesome job! ⭐ You matched all the cards!', type: 'success' });
        } else {
          setMemoryFeedback({ message: 'Great match! ⭐', type: 'success' });
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const restartMemoryGame = () => {
    setCards([...MEMORY_CARDS].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setMemoryFeedback(null);
  };

  // Picture Match Logic
  const currentPicMatch = PICTURE_MATCH_GAMES[picIndex];
  const handlePicOption = (opt) => {
    if (opt.isCorrect) {
      setPicFeedback({ message: 'Great job! ⭐ You found the matching picture!', type: 'success' });
    } else {
      setPicFeedback({ message: 'Good try! Let’s try again!', type: 'info' });
    }
  };

  const nextPicMatch = () => {
    setPicFeedback(null);
    setPicIndex((prev) => (prev + 1) % PICTURE_MATCH_GAMES.length);
  };

  // Color Game Logic
  const currentColorQ = COLOR_GAME_QUESTIONS[colorIndex];
  const handleColorOption = (opt) => {
    if (opt.isCorrect) {
      setColorFeedback({ message: `Great job! ⭐ That is ${currentColorQ.targetColorName}!`, type: 'success' });
    } else {
      setColorFeedback({ message: `Good try! Let's try again.`, type: 'info' });
    }
  };

  const nextColorQ = () => {
    setColorFeedback(null);
    setColorIndex((prev) => (prev + 1) % COLOR_GAME_QUESTIONS.length);
  };

  // Shape Game Logic
  const currentShapeQ = SHAPE_GAME_QUESTIONS[shapeIndex];
  const handleShapeOption = (opt) => {
    if (opt.isCorrect) {
      setShapeFeedback({ message: `Awesome! ⭐ You found the ${currentShapeQ.targetShapeName}!`, type: 'success' });
    } else {
      setShapeFeedback({ message: `Good try! Try picking another shape.`, type: 'info' });
    }
  };

  const nextShapeQ = () => {
    setShapeFeedback(null);
    setShapeIndex((prev) => (prev + 1) % SHAPE_GAME_QUESTIONS.length);
  };

  // Puzzle Logic
  const currentPuzzle = PUZZLE_ITEMS[0];
  const handlePuzzleSelect = (piece, side) => {
    if (puzzleMatched.includes(piece.matchKey)) return;

    if (side === 'left') {
      setSelectedPiece(piece);
    } else if (side === 'right' && selectedPiece) {
      if (selectedPiece.matchKey === piece.matchKey) {
        const updated = [...puzzleMatched, piece.matchKey];
        setPuzzleMatched(updated);
        setSelectedPiece(null);
        if (updated.length === currentPuzzle.pieces.length) {
          setPuzzleFeedback({ message: 'Hooray! ⭐ You solved the puzzle!', type: 'success' });
        } else {
          setPuzzleFeedback({ message: 'Nice piece match! ⭐', type: 'success' });
        }
      } else {
        setPuzzleFeedback({ message: 'Good try! Try matching the right fruit half.', type: 'info' });
        setSelectedPiece(null);
      }
    }
  };

  const restartPuzzle = () => {
    setPuzzleMatched([]);
    setSelectedPiece(null);
    setPuzzleFeedback(null);
  };

  const tabs = [
    { id: 'memory', label: 'Memory Matching', icon: Grid },
    { id: 'picmatch', label: 'Find Same Picture', icon: ImageIcon },
    { id: 'colors', label: 'Identify Colors', icon: Palette },
    { id: 'shapes', label: 'Identify Shapes', icon: Shapes },
    { id: 'puzzle', label: 'Simple Puzzle', icon: Puzzle }
  ];

  return (
    <div>
      <PageHeader
        title="Fun & Educational Games"
        subtitle="Play simple, friendly educational games to practice matching, colors, and shapes."
        icon={Gamepad2}
        color="rose"
      />

      {/* Tabs */}
      <nav aria-label="Games Menu" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.25rem',
                  borderRadius: '1rem',
                  fontWeight: '700',
                  fontSize: '1.05rem',
                  border: `2px solid ${isActive ? 'var(--rose-600)' : 'var(--border-color)'}`,
                  backgroundColor: isActive ? 'var(--rose-600)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 12px rgba(225, 29, 72, 0.2)' : 'none',
                  transition: 'all 0.15s ease'
                }}
                aria-selected={isActive}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 1. MEMORY MATCHING */}
      {activeTab === 'memory' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Memory Matching Game</h2>
            <div style={{
              backgroundColor: 'var(--rose-50)',
              color: 'var(--rose-600)',
              fontWeight: '800',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--rose-100)',
              fontSize: '1.125rem'
            }}>
              Matches: {matched.length / 2} / {cards.length / 2}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            maxWidth: '450px',
            margin: '0 auto 1.5rem auto'
          }}>
            {cards.map((card, idx) => {
              const isFlipped = flipped.includes(idx) || matched.includes(idx);
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  disabled={matched.includes(idx)}
                  style={{
                    height: '110px',
                    borderRadius: '1.25rem',
                    border: `3px solid ${isFlipped ? 'var(--rose-600)' : 'var(--blue-500)'}`,
                    backgroundColor: isFlipped ? '#FFFFFF' : 'var(--blue-600)',
                    fontSize: isFlipped ? '3.5rem' : '2rem',
                    color: isFlipped ? 'var(--text-heading)' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: matched.includes(idx) ? 'default' : 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label={isFlipped ? card.label : `Card ${idx + 1}`}
                >
                  {isFlipped ? card.emoji : '❓'}
                </button>
              );
            })}
          </div>

          {memoryFeedback && (
            <FeedbackMessage message={memoryFeedback.message} type={memoryFeedback.type} />
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button variant="secondary" icon={RotateCcw} onClick={restartMemoryGame}>
              Restart Game
            </Button>
          </div>
        </section>
      )}

      {/* 2. FIND SAME PICTURE */}
      {activeTab === 'picmatch' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Find the Same Picture
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Target: <strong>{currentPicMatch.targetName}</strong> {currentPicMatch.targetEmoji}
          </p>

          <div style={{
            backgroundColor: 'var(--rose-50)',
            border: '2px solid var(--rose-100)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            maxWidth: '200px',
            margin: '0 auto 1.5rem auto',
            fontSize: '4.5rem'
          }}>
            {currentPicMatch.targetEmoji}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '1rem',
            maxWidth: '500px',
            margin: '0 auto 1.5rem auto'
          }}>
            {currentPicMatch.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handlePicOption(opt)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--border-color)',
                  borderRadius: '1.25rem',
                  padding: '1.25rem',
                  fontSize: '3.5rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {opt.emoji}
              </button>
            ))}
          </div>

          {picFeedback && (
            <FeedbackMessage message={picFeedback.message} type={picFeedback.type} />
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button variant="secondary" icon={ArrowRight} onClick={nextPicMatch}>
              Next Round
            </Button>
          </div>
        </section>
      )}

      {/* 3. IDENTIFY COLORS GAME */}
      {activeTab === 'colors' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            Find the <span style={{ color: 'var(--blue-600)' }}>{currentColorQ.targetColorName}</span> color!
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.25rem',
            maxWidth: '550px',
            margin: '0 auto 1.5rem auto'
          }}>
            {currentColorQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleColorOption(opt)}
                style={{
                  height: '120px',
                  backgroundColor: opt.hex,
                  borderRadius: '1.25rem',
                  border: '4px solid #FFFFFF',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'pointer'
                }}
                aria-label={`Color option ${opt.name}`}
              />
            ))}
          </div>

          {colorFeedback && (
            <FeedbackMessage message={colorFeedback.message} type={colorFeedback.type} />
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button variant="secondary" icon={ArrowRight} onClick={nextColorQ}>
              Next Round
            </Button>
          </div>
        </section>
      )}

      {/* 4. IDENTIFY SHAPES GAME */}
      {activeTab === 'shapes' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            Find the {currentShapeQ.targetShapeName}!
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.25rem',
            maxWidth: '550px',
            margin: '0 auto 1.5rem auto'
          }}>
            {currentShapeQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleShapeOption(opt)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--border-color)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '130px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
                aria-label={`Shape option ${opt.name}`}
              >
                {opt.shapeType === 'circle' && <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--blue-500)' }} />}
                {opt.shapeType === 'square' && <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--green-500)', borderRadius: '0.75rem' }} />}
                {opt.shapeType === 'triangle' && (
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '45px solid transparent',
                    borderRight: '45px solid transparent',
                    borderBottom: '80px solid var(--amber-500)'
                  }} />
                )}
                {opt.shapeType === 'star' && <span style={{ fontSize: '4rem' }}>⭐</span>}
              </button>
            ))}
          </div>

          {shapeFeedback && (
            <FeedbackMessage message={shapeFeedback.message} type={shapeFeedback.type} />
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button variant="secondary" icon={ArrowRight} onClick={nextShapeQ}>
              Next Round
            </Button>
          </div>
        </section>
      )}

      {/* 5. SIMPLE PUZZLE */}
      {activeTab === 'puzzle' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            {currentPuzzle.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {currentPuzzle.instructions}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto 1.5rem auto'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Left Half</h3>
              {currentPuzzle.pieces.map((piece) => {
                const isMatched = puzzleMatched.includes(piece.matchKey);
                const isSelected = selectedPiece?.id === piece.id;
                return (
                  <button
                    key={`p-left-${piece.id}`}
                    onClick={() => handlePuzzleSelect(piece, 'left')}
                    disabled={isMatched}
                    style={{
                      padding: '1rem',
                      borderRadius: '1rem',
                      border: `3px solid ${isMatched ? 'var(--green-500)' : isSelected ? 'var(--rose-600)' : 'var(--border-color)'}`,
                      backgroundColor: isMatched ? 'var(--green-50)' : isSelected ? 'var(--rose-50)' : '#FFFFFF',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      cursor: isMatched ? 'default' : 'pointer'
                    }}
                  >
                    {piece.left}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Right Half</h3>
              {[...currentPuzzle.pieces].reverse().map((piece) => {
                const isMatched = puzzleMatched.includes(piece.matchKey);
                return (
                  <button
                    key={`p-right-${piece.id}`}
                    onClick={() => handlePuzzleSelect(piece, 'right')}
                    disabled={isMatched}
                    style={{
                      padding: '1rem',
                      borderRadius: '1rem',
                      border: `3px solid ${isMatched ? 'var(--green-500)' : 'var(--border-color)'}`,
                      backgroundColor: isMatched ? 'var(--green-50)' : '#FFFFFF',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      cursor: isMatched ? 'default' : 'pointer'
                    }}
                  >
                    {piece.right}
                  </button>
                );
              })}
            </div>
          </div>

          {puzzleFeedback && (
            <FeedbackMessage message={puzzleFeedback.message} type={puzzleFeedback.type} />
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button variant="secondary" icon={RotateCcw} onClick={restartPuzzle}>
              Reset Puzzle
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
