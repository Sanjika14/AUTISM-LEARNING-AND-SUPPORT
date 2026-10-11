import React from 'react';
import { Sparkles, RefreshCw, CheckCircle, Info } from 'lucide-react';

export default function FeedbackMessage({ message, type = 'success', onReset = null }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  const styles = {
    container: {
      padding: '1.25rem 1.5rem',
      borderRadius: '1rem',
      backgroundColor: isSuccess ? 'var(--green-50)' : 'var(--blue-50)',
      border: `2px solid ${isSuccess ? 'var(--green-500)' : 'var(--blue-500)'}`,
      color: isSuccess ? 'var(--green-700)' : 'var(--blue-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      marginTop: '1.25rem',
      fontSize: '1.25rem',
      fontWeight: '700',
      boxShadow: 'var(--shadow-sm)'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }
  };

  return (
    <div style={styles.container} role="status" aria-live="polite">
      <div style={styles.content}>
        {isSuccess ? (
          <Sparkles size={28} color="var(--green-600)" aria-hidden="true" />
        ) : (
          <Info size={28} color="var(--blue-600)" aria-hidden="true" />
        )}
        <span>{message}</span>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#FFFFFF',
            border: '2px solid currentColor',
            borderRadius: '0.75rem',
            color: 'inherit',
            fontWeight: '700',
            fontSize: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          aria-label="Try again or next question"
        >
          <RefreshCw size={18} aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
}
