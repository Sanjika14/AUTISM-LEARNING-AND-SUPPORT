import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import FeedbackMessage from '../components/FeedbackMessage';
import { 
  COLORS_DATA, 
  SHAPES_DATA, 
  NUMBERS_DATA, 
  ALPHABET_DATA, 
  MATCHING_DATA, 
  IDENTIFY_PICTURE_DATA 
} from '../data/learningData';
import { 
  BookOpen, 
  Palette, 
  Shapes, 
  Hash, 
  CaseUpper, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function Learning() {
  const [activeTab, setActiveTab] = useState('colors');

  // Sub-activity states
  const [colorIndex, setColorIndex] = useState(0);
  const [colorFeedback, setColorFeedback] = useState(null);

  const [shapeIndex, setShapeIndex] = useState(0);
  const [shapeFeedback, setShapeFeedback] = useState(null);

  const [numberIndex, setNumberIndex] = useState(0);
  const [numberFeedback, setNumberFeedback] = useState(null);

  const [alphabetIndex, setAlphabetIndex] = useState(0);

  // Matching state
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [matchingFeedback, setMatchingFeedback] = useState(null);

  // Picture ID state
  const [pictureIdIndex, setPictureIdIndex] = useState(0);
  const [pictureIdFeedback, setPictureIdFeedback] = useState(null);

  // Colors logic
  const currentColor = COLORS_DATA[colorIndex];
  const handleColorChoice = (choice) => {
    if (choice === currentColor.name) {
      setColorFeedback({ message: 'Great job! ⭐ You found the right color!', type: 'success' });
    } else {
      setColorFeedback({ message: `Good try! That was ${choice}. Let's try again!`, type: 'info' });
    }
  };

  const nextColor = () => {
    setColorFeedback(null);
    setColorIndex((prev) => (prev + 1) % COLORS_DATA.length);
  };

  // Shapes logic
  const currentShape = SHAPES_DATA[shapeIndex];
  const handleShapeChoice = (choice) => {
    if (choice === currentShape.name) {
      setShapeFeedback({ message: 'Awesome! ⭐ That is the correct shape!', type: 'success' });
    } else {
      setShapeFeedback({ message: `Good try! Let's give it another go!`, type: 'info' });
    }
  };

  const nextShape = () => {
    setShapeFeedback(null);
    setShapeIndex((prev) => (prev + 1) % SHAPES_DATA.length);
  };

  // Numbers logic
  const currentNum = NUMBERS_DATA[numberIndex];
  const handleNumberChoice = (choice) => {
    if (choice === currentNum.number) {
      setNumberFeedback({ message: `Great counting! ⭐ Exactly ${currentNum.number} ${currentNum.label}!`, type: 'success' });
    } else {
      setNumberFeedback({ message: `Nice try! Let's count them together and try again!`, type: 'info' });
    }
  };

  const nextNumber = () => {
    setNumberFeedback(null);
    setNumberIndex((prev) => (prev + 1) % NUMBERS_DATA.length);
  };

  // Alphabet logic
  const currentLetter = ALPHABET_DATA[alphabetIndex];

  // Matching logic
  const handleMatchSelect = (item, side) => {
    if (matchedPairs.includes(item.matchKey)) return;

    if (side === 'left') {
      setSelectedLeft(item);
    } else if (side === 'right' && selectedLeft) {
      if (selectedLeft.matchKey === item.matchKey) {
        const updated = [...matchedPairs, item.matchKey];
        setMatchedPairs(updated);
        setSelectedLeft(null);
        if (updated.length === MATCHING_DATA.length) {
          setMatchingFeedback({ message: 'Hooray! ⭐ You matched all the objects correctly!', type: 'success' });
        } else {
          setMatchingFeedback({ message: 'Great match! ⭐ Keep going!', type: 'success' });
        }
      } else {
        setMatchingFeedback({ message: 'Good try! Try picking the matching picture.', type: 'info' });
        setSelectedLeft(null);
      }
    }
  };

  const resetMatching = () => {
    setMatchedPairs([]);
    setSelectedLeft(null);
    setMatchingFeedback(null);
  };

  // Picture ID logic
  const currentPicQuestion = IDENTIFY_PICTURE_DATA[pictureIdIndex];
  const handlePictureIdChoice = (optionId) => {
    if (optionId === currentPicQuestion.targetId) {
      setPictureIdFeedback({ message: 'Wonderful! ⭐ You identified the correct picture!', type: 'success' });
    } else {
      setPictureIdFeedback({ message: `Good try! Look closely at the pictures and try again.`, type: 'info' });
    }
  };

  const nextPictureQuestion = () => {
    setPictureIdFeedback(null);
    setPictureIdIndex((prev) => (prev + 1) % IDENTIFY_PICTURE_DATA.length);
  };

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette, color: 'blue' },
    { id: 'shapes', label: 'Shapes', icon: Shapes, color: 'green' },
    { id: 'numbers', label: 'Numbers', icon: Hash, color: 'amber' },
    { id: 'alphabet', label: 'Alphabet', icon: CaseUpper, color: 'purple' },
    { id: 'matching', label: 'Matching', icon: Sparkles, color: 'rose' },
    { id: 'identify', label: 'Identify Picture', icon: HelpCircle, color: 'blue' }
  ];

  return (
    <div>
      <PageHeader
        title="Learning Activities"
        subtitle="Interactive activities to explore colors, shapes, numbers, letters, and picture recognition."
        icon={BookOpen}
        color="blue"
      />

      {/* Activity Tabs */}
      <nav aria-label="Learning Sub-Activities" style={{ marginBottom: '2rem' }}>
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
                  border: `2px solid ${isActive ? 'var(--blue-600)' : 'var(--border-color)'}`,
                  backgroundColor: isActive ? 'var(--blue-600)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none',
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

      {/* 1. COLORS ACTIVITY */}
      {activeTab === 'colors' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            What color is this?
          </h2>

          <div style={{
            width: '180px',
            height: '180px',
            backgroundColor: currentColor.hex,
            borderRadius: '1.5rem',
            margin: '0 auto 1.5rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4.5rem',
            boxShadow: 'var(--shadow-md)',
            border: '4px solid #FFFFFF'
          }} aria-label={`Object with color ${currentColor.name}`}>
            {currentColor.emoji}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto 1.5rem auto'
          }}>
            {currentColor.choices.map((choice) => (
              <Button
                key={choice}
                size="lg"
                variant="outline"
                onClick={() => handleColorChoice(choice)}
              >
                {choice}
              </Button>
            ))}
          </div>

          {colorFeedback && (
            <FeedbackMessage
              message={colorFeedback.message}
              type={colorFeedback.type}
            />
          )}

          <div style={{ marginTop: '2rem' }}>
            <Button variant="secondary" icon={ArrowRight} onClick={nextColor}>
              Next Color
            </Button>
          </div>
        </section>
      )}

      {/* 2. SHAPES ACTIVITY */}
      {activeTab === 'shapes' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            What shape is this?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {currentShape.description}
          </p>

          <div style={{
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            {currentShape.svgType === 'circle' && (
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', backgroundColor: 'var(--blue-500)' }} />
            )}
            {currentShape.svgType === 'square' && (
              <div style={{ width: '130px', height: '130px', backgroundColor: 'var(--green-500)', borderRadius: '1rem' }} />
            )}
            {currentShape.svgType === 'triangle' && (
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '75px solid transparent',
                borderRight: '75px solid transparent',
                borderBottom: '130px solid var(--amber-500)'
              }} />
            )}
            {currentShape.svgType === 'rectangle' && (
              <div style={{ width: '180px', height: '100px', backgroundColor: 'var(--purple-500)', borderRadius: '1rem' }} />
            )}
            {currentShape.svgType === 'star' && (
              <span style={{ fontSize: '6rem' }}>⭐</span>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto 1.5rem auto'
          }}>
            {currentShape.choices.map((choice) => (
              <Button
                key={choice}
                size="lg"
                variant="outline"
                onClick={() => handleShapeChoice(choice)}
              >
                {choice}
              </Button>
            ))}
          </div>

          {shapeFeedback && (
            <FeedbackMessage message={shapeFeedback.message} type={shapeFeedback.type} />
          )}

          <div style={{ marginTop: '2rem' }}>
            <Button variant="secondary" icon={ArrowRight} onClick={nextShape}>
              Next Shape
            </Button>
          </div>
        </section>
      )}

      {/* 3. NUMBERS ACTIVITY */}
      {activeTab === 'numbers' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            How many {currentNum.label}?
          </h2>

          <div style={{
            backgroundColor: 'var(--amber-50)',
            border: '2px solid var(--amber-100)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            margin: '1.5rem auto',
            maxWidth: '500px'
          }}>
            <span style={{
              display: 'block',
              fontSize: '4rem',
              fontWeight: '900',
              color: 'var(--amber-700)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '0.5rem'
            }}>
              {currentNum.number}
            </span>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '2.5rem'
            }}>
              {Array.from({ length: currentNum.number }).map((_, i) => (
                <span key={i} role="img" aria-label={currentNum.label}>
                  {currentNum.countItem}
                </span>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Select the correct number:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            maxWidth: '400px',
            margin: '0 auto 1.5rem auto'
          }}>
            {currentNum.choices.map((num) => (
              <Button
                key={num}
                size="lg"
                variant="outline"
                onClick={() => handleNumberChoice(num)}
              >
                {num}
              </Button>
            ))}
          </div>

          {numberFeedback && (
            <FeedbackMessage message={numberFeedback.message} type={numberFeedback.type} />
          )}

          <div style={{ marginTop: '2rem' }}>
            <Button variant="secondary" icon={ArrowRight} onClick={nextNumber}>
              Next Number
            </Button>
          </div>
        </section>
      )}

      {/* 4. ALPHABET ACTIVITY */}
      {activeTab === 'alphabet' && (
        <section className="card-base" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{
            backgroundColor: 'var(--purple-50)',
            border: '3px solid var(--purple-100)',
            borderRadius: '1.5rem',
            padding: '2.5rem 1.5rem',
            maxWidth: '450px',
            margin: '0 auto 2rem auto',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span style={{
              fontSize: '6rem',
              fontWeight: '900',
              color: 'var(--purple-700)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1,
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              {currentLetter.letter}
            </span>
            <div style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>
              {currentLetter.emoji}
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--purple-900)', margin: '0 0 0.5rem 0' }}>
              {currentLetter.word}
            </h3>
            <p style={{ fontSize: '1.25rem', color: 'var(--purple-700)', fontWeight: '600', margin: 0 }}>
              “{currentLetter.sentence}”
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Button
              variant="outline"
              icon={ArrowLeft}
              disabled={alphabetIndex === 0}
              onClick={() => setAlphabetIndex(prev => Math.max(0, prev - 1))}
              ariaLabel="Previous Letter"
            >
              Previous
            </Button>

            <span style={{ fontWeight: '700', fontSize: '1.125rem', color: 'var(--text-muted)' }}>
              {alphabetIndex + 1} of {ALPHABET_DATA.length}
            </span>

            <Button
              variant="primary"
              icon={ArrowRight}
              disabled={alphabetIndex === ALPHABET_DATA.length - 1}
              onClick={() => setAlphabetIndex(prev => Math.min(ALPHABET_DATA.length - 1, prev + 1))}
              ariaLabel="Next Letter"
            >
              Next
            </Button>
          </div>
        </section>
      )}

      {/* 5. MATCHING OBJECTS ACTIVITY */}
      {activeTab === 'matching' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Match Related Objects
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Tap a word on the left, then tap its matching picture on the right!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            maxWidth: '650px',
            margin: '0 auto 1.5rem auto'
          }}>
            {/* Left column (Words) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>Word</h3>
              {MATCHING_DATA.map((item) => {
                const isMatched = matchedPairs.includes(item.matchKey);
                const isSelected = selectedLeft?.id === item.id;
                return (
                  <button
                    key={`left-${item.id}`}
                    onClick={() => handleMatchSelect(item, 'left')}
                    disabled={isMatched}
                    style={{
                      padding: '1rem',
                      borderRadius: '1rem',
                      border: `3px solid ${isMatched ? 'var(--green-500)' : isSelected ? 'var(--blue-600)' : 'var(--border-color)'}`,
                      backgroundColor: isMatched ? 'var(--green-50)' : isSelected ? 'var(--blue-50)' : '#FFFFFF',
                      color: isMatched ? 'var(--green-700)' : 'var(--text-heading)',
                      fontWeight: '700',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: isMatched ? 0.7 : 1,
                      cursor: isMatched ? 'default' : 'pointer'
                    }}
                  >
                    <span>{item.leftWord}</span>
                    {isMatched && <CheckCircle size={20} color="var(--green-600)" />}
                  </button>
                );
              })}
            </div>

            {/* Right column (Emojis/Pictures - shuffled order) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>Picture</h3>
              {[...MATCHING_DATA].reverse().map((item) => {
                const isMatched = matchedPairs.includes(item.matchKey);
                return (
                  <button
                    key={`right-${item.id}`}
                    onClick={() => handleMatchSelect(item, 'right')}
                    disabled={isMatched}
                    style={{
                      padding: '1rem',
                      borderRadius: '1rem',
                      border: `3px solid ${isMatched ? 'var(--green-500)' : 'var(--border-color)'}`,
                      backgroundColor: isMatched ? 'var(--green-50)' : '#FFFFFF',
                      fontSize: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isMatched ? 0.7 : 1,
                      cursor: isMatched ? 'default' : 'pointer'
                    }}
                  >
                    <span>{item.rightEmoji}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {matchingFeedback && (
            <FeedbackMessage message={matchingFeedback.message} type={matchingFeedback.type} />
          )}

          <div style={{ marginTop: '2rem' }}>
            <Button variant="secondary" onClick={resetMatching}>
              Reset Matching Game
            </Button>
          </div>
        </section>
      )}

      {/* 6. IDENTIFY CORRECT PICTURE ACTIVITY */}
      {activeTab === 'identify' && (
        <section className="card-base" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--blue-900)' }}>
            {currentPicQuestion.question}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.25rem',
            maxWidth: '650px',
            margin: '0 auto 1.5rem auto'
          }}>
            {currentPicQuestion.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handlePictureIdChoice(opt.id)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--border-color)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span style={{ fontSize: '3.5rem' }}>{opt.emoji}</span>
                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-heading)' }}>
                  {opt.name}
                </span>
              </button>
            ))}
          </div>

          {pictureIdFeedback && (
            <FeedbackMessage message={pictureIdFeedback.message} type={pictureIdFeedback.type} />
          )}

          <div style={{ marginTop: '2rem' }}>
            <Button variant="secondary" icon={ArrowRight} onClick={nextPictureQuestion}>
              Next Question
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
