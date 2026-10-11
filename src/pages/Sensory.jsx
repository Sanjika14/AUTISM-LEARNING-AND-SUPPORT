import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { 
  Sparkles, 
  Wind, 
  Clock, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Activity,
  Heart,
  Volume1
} from 'lucide-react';

export default function Sensory() {
  const [activeTab, setActiveTab] = useState('breathing');

  // Breathing state
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [breathScale, setBreathScale] = useState(1);
  const [isBreathingActive, setIsBreathingActive] = useState(true);

  // Counting state
  const [countIndex, setCountIndex] = useState(1);

  // Quiet timer state
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [initialTimerSeconds, setInitialTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Audio player state
  const [activeSound, setActiveSound] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.7);
  const [audioError, setAudioError] = useState(null);

  // HTML5 Audio Ref & Web Audio Ref
  const audioInstanceRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioNodesRef = useRef(null);

  // Sound definitions with high quality public ambient audio streams (Google Actions Sound Library)
  const soundTracks = [
    { 
      id: 'birds', 
      label: 'Birds Chirping 🐦', 
      desc: 'Sweet morning bird chirps & forest singing',
      url: 'https://actions.google.com/sounds/v1/ambiences/outdoor_park.ogg'
    },
    { 
      id: 'rain', 
      label: 'Gentle Rain 🌧️', 
      desc: 'Real soothing falling raindrops',
      url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg'
    },
    { 
      id: 'waves', 
      label: 'Ocean Waves 🌊', 
      desc: 'Relaxing ocean tides and gentle waves',
      url: 'https://actions.google.com/sounds/v1/water/waves_crashing.ogg'
    },
    { 
      id: 'piano', 
      label: 'Calm Drizzle 🌧️', 
      desc: 'Soft light rain and peaceful ambience',
      url: 'https://actions.google.com/sounds/v1/weather/rain_drizzle.ogg'
    }
  ];

  // Breathing interval effect
  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Pause';
        if (prev === 'Pause') return 'Exhale';
        return 'Inhale';
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  useEffect(() => {
    if (breathPhase === 'Inhale') setBreathScale(1.3);
    else if (breathPhase === 'Pause') setBreathScale(1.3);
    else setBreathScale(1.0);
  }, [breathPhase]);

  // Quiet Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = (sec) => {
    setInitialTimerSeconds(sec);
    setTimerSeconds(sec);
    setIsTimerRunning(true);
  };

  // Stop any currently playing audio (HTML5 or Web Audio synth)
  const stopAllAudio = () => {
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current.currentTime = 0;
      audioInstanceRef.current = null;
    }
    if (audioNodesRef.current) {
      try {
        audioNodesRef.current.forEach((node) => {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        });
      } catch (e) {
        // ignore disconnect errors
      }
      audioNodesRef.current = null;
    }
  };

  // Web Audio Synth Fallback if audio URL stream fails or is blocked
  const playSynthFallback = (soundType) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = soundType === 'rain' ? 1200 : soundType === 'waves' ? 600 : 800;

      const gain = ctx.createGain();
      gain.gain.value = audioVolume * 0.6;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      audioNodesRef.current = [source, filter, gain];
    } catch (e) {
      console.warn('Web Audio synth fallback error:', e);
    }
  };

  // Toggle audio track play/pause
  const toggleAudioSound = (soundObj) => {
    setAudioError(null);

    // If already playing this track, pause it
    if (activeSound === soundObj.id && isPlayingAudio) {
      stopAllAudio();
      setIsPlayingAudio(false);
      setActiveSound(null);
      return;
    }

    // Stop previous track
    stopAllAudio();

    try {
      const audio = new Audio(soundObj.url);
      audio.loop = true;
      audio.volume = audioVolume;
      audioInstanceRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setActiveSound(soundObj.id);
            setIsPlayingAudio(true);
          })
          .catch((err) => {
            console.warn('HTML5 Audio play error, launching synth fallback:', err);
            // Use synth fallback
            playSynthFallback(soundObj.id);
            setActiveSound(soundObj.id);
            setIsPlayingAudio(true);
          });
      }
    } catch (err) {
      console.warn('HTML5 Audio initialization error:', err);
      playSynthFallback(soundObj.id);
      setActiveSound(soundObj.id);
      setIsPlayingAudio(true);
    }
  };

  const handleStopSound = () => {
    stopAllAudio();
    setIsPlayingAudio(false);
    setActiveSound(null);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setAudioVolume(newVol);
    if (audioInstanceRef.current) {
      audioInstanceRef.current.volume = newVol;
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  const tabs = [
    { id: 'breathing', label: 'Deep Breathing', icon: Wind },
    { id: 'counting', label: 'Slow Counting', icon: Activity },
    { id: 'quiet', label: 'Quiet Time Timer', icon: Clock },
    { id: 'audio', label: 'Calming Sounds', icon: Volume2 },
    { id: 'stretching', label: 'Simple Stretching', icon: Heart }
  ];

  return (
    <div>
      <PageHeader
        title="Calm & Relax"
        subtitle="Simple activities that may help create a quiet and comfortable learning moment."
        icon={Sparkles}
        color="amber"
      />

      {/* Tabs Navigation */}
      <nav aria-label="Sensory Sub-Activities" style={{ marginBottom: '2rem' }}>
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
                  border: `2px solid ${isActive ? 'var(--amber-600)' : 'var(--border-color)'}`,
                  backgroundColor: isActive ? 'var(--amber-500)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 12px rgba(245, 158, 11, 0.2)' : 'none',
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

      {/* 1. DEEP BREATHING */}
      {activeTab === 'breathing' && (
        <section className="card-base" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--amber-900)', marginBottom: '0.5rem' }}>
            Visual Breathing Guide
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Follow the circle as it expands and shrinks softly.
          </p>

          <div style={{
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: breathPhase === 'Inhale' ? 'var(--blue-100)' : breathPhase === 'Pause' ? 'var(--green-100)' : 'var(--amber-100)',
              border: `4px solid ${breathPhase === 'Inhale' ? 'var(--blue-500)' : breathPhase === 'Pause' ? 'var(--green-500)' : 'var(--amber-500)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${breathScale})`,
              transition: 'transform 3s ease-in-out, background-color 0.5s ease',
              boxShadow: 'var(--shadow-md)'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '900',
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-heading)'
              }}>
                {breathPhase === 'Inhale' ? 'Breathe In 🌬️' : breathPhase === 'Pause' ? 'Pause 🌿' : 'Breathe Out 😌'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button
              variant={isBreathingActive ? 'outline' : 'primary'}
              onClick={() => setIsBreathingActive(!isBreathingActive)}
            >
              {isBreathingActive ? 'Pause Animation' : 'Start Animation'}
            </Button>
          </div>
        </section>
      )}

      {/* 2. SLOW COUNTING */}
      {activeTab === 'counting' && (
        <section className="card-base" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--amber-900)', marginBottom: '0.5rem' }}>
            Let’s Count Slowly
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Tap the numbers one by one at your own peaceful pace.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3, 4, 5].map((num) => {
              const isActiveNum = countIndex >= num;
              return (
                <button
                  key={num}
                  onClick={() => setCountIndex(num)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '1.25rem',
                    border: `3px solid ${isActiveNum ? 'var(--green-500)' : 'var(--border-color)'}`,
                    backgroundColor: isActiveNum ? 'var(--green-50)' : '#FFFFFF',
                    color: isActiveNum ? 'var(--green-700)' : 'var(--text-muted)',
                    fontSize: '2.25rem',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: isActiveNum ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
                  }}
                  aria-label={`Count number ${num}`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--green-700)',
            backgroundColor: 'var(--green-50)',
            padding: '1rem',
            borderRadius: '1rem',
            maxWidth: '400px',
            margin: '0 auto 1.5rem auto'
          }}>
            Counting: {Array.from({ length: countIndex }).map((_, i) => `${i + 1}`).join(' • ')}
          </div>

          <Button variant="secondary" icon={RotateCcw} onClick={() => setCountIndex(1)}>
            Reset Count
          </Button>
        </section>
      )}

      {/* 3. QUIET TIME TIMER */}
      {activeTab === 'quiet' && (
        <section className="card-base" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--amber-900)', marginBottom: '0.5rem' }}>
            Take a Quiet Moment
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Choose a calm duration for a quiet break.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <Button variant="outline" onClick={() => handleStartTimer(30)}>30 Seconds</Button>
            <Button variant="outline" onClick={() => handleStartTimer(60)}>1 Minute</Button>
            <Button variant="outline" onClick={() => handleStartTimer(120)}>2 Minutes</Button>
          </div>

          <div style={{
            backgroundColor: 'var(--amber-50)',
            border: '3px solid var(--amber-100)',
            borderRadius: '1.5rem',
            padding: '2rem',
            maxWidth: '350px',
            margin: '0 auto 2rem auto'
          }}>
            <span style={{
              fontSize: '4.5rem',
              fontWeight: '900',
              fontFamily: 'monospace',
              color: 'var(--amber-900)',
              display: 'block'
            }}>
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
            </span>
            <span style={{ color: 'var(--amber-700)', fontWeight: '700', fontSize: '1.1rem' }}>
              {timerSeconds === 0 ? 'Quiet moment complete! 🌿' : isTimerRunning ? 'Quiet time in progress...' : 'Ready'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button
              variant={isTimerRunning ? 'amber' : 'success'}
              icon={isTimerRunning ? Pause : Play}
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              disabled={timerSeconds === 0}
            >
              {isTimerRunning ? 'Pause' : 'Start Timer'}
            </Button>
            <Button
              variant="outline"
              icon={RotateCcw}
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(initialTimerSeconds);
              }}
            >
              Reset
            </Button>
          </div>
        </section>
      )}

      {/* 4. CALMING SOUNDS */}
      {activeTab === 'audio' && (
        <section className="card-base" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--amber-900)', marginBottom: '0.5rem' }}>
            Optional Calming Sounds
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Select soothing ambient sound toggles. Audio is completely optional and never autoplays.
          </p>

          {/* Volume Control Bar */}
          <div style={{
            backgroundColor: 'var(--amber-50)',
            border: '2px solid var(--amber-100)',
            borderRadius: '1rem',
            padding: '1rem 1.5rem',
            maxWidth: '450px',
            margin: '0 auto 2rem auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Volume1 size={24} color="var(--amber-700)" />
            <span style={{ fontWeight: '700', color: 'var(--amber-900)', whiteSpace: 'nowrap' }}>
              Volume: {Math.round(audioVolume * 100)}%
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioVolume}
              onChange={handleVolumeChange}
              style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--amber-600)' }}
              aria-label="Audio Volume Control"
            />
          </div>

          {/* Sound Card Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            maxWidth: '700px',
            margin: '0 auto 2rem auto'
          }}>
            {soundTracks.map((snd) => {
              const isThisActive = activeSound === snd.id && isPlayingAudio;
              return (
                <div
                  key={snd.id}
                  style={{
                    backgroundColor: isThisActive ? 'var(--green-50)' : '#FFFFFF',
                    border: `3px solid ${isThisActive ? 'var(--green-500)' : 'var(--border-color)'}`,
                    borderRadius: '1.25rem',
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    boxShadow: isThisActive ? '0 4px 14px rgba(16, 185, 129, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{snd.label}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{snd.desc}</p>
                  <Button
                    variant={isThisActive ? 'success' : 'outline'}
                    icon={isThisActive ? Pause : Play}
                    onClick={() => toggleAudioSound(snd)}
                    fullWidth
                  >
                    {isThisActive ? 'Playing ♪' : 'Play Sound'}
                  </Button>
                </div>
              );
            })}
          </div>

          {isPlayingAudio && (
            <div style={{
              backgroundColor: 'var(--green-50)',
              border: '2px solid var(--green-100)',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              maxWidth: '450px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <span style={{ fontWeight: '700', color: 'var(--green-700)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Volume2 size={20} className="pulse-icon" />
                Playing Calming Audio
              </span>
              <Button
                size="sm"
                variant="outline"
                icon={VolumeX}
                onClick={handleStopSound}
              >
                Stop Sound
              </Button>
            </div>
          )}
        </section>
      )}

      {/* 5. SIMPLE STRETCHING */}
      {activeTab === 'stretching' && (
        <section className="card-base" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--amber-900)', marginBottom: '0.5rem' }}>
              Gentle Stretching
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Follow these simple, comfortable body movements. Move gently and stop if something feels uncomfortable.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { title: 'Reach Up High', emoji: '🙆', desc: 'Reach arms straight up slowly. Hold for 3 seconds.' },
              { title: 'Gentle Shoulder Roll', emoji: '🤷', desc: 'Roll shoulders backwards slowly 3 times.' },
              { title: 'Side to Side Stretch', emoji: '🙋', desc: 'Gently lean your body left, then right.' }
            ].map((stretch, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--amber-50)',
                  border: '2px solid var(--amber-100)',
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                  {stretch.emoji}
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--amber-900)', marginBottom: '0.5rem' }}>
                  {stretch.title}
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1rem', margin: 0 }}>
                  {stretch.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
