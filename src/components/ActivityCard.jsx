import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

export default function ActivityCard({
  title,
  description,
  icon: Icon = null,
  emoji = null,
  buttonText = 'Explore',
  onClick,
  badge = null,
  colorScheme = 'blue'
}) {
  const schemeStyles = {
    blue: { bg: '#EFF6FF', border: '#DBEAFE', iconColor: '#2563EB' },
    green: { bg: '#ECFDF5', border: '#D1FAE5', iconColor: '#059669' },
    purple: { bg: '#F5F3FF', border: '#DDD6FE', iconColor: '#7C3AED' },
    amber: { bg: '#FFFBEB', border: '#FEF3C7', iconColor: '#D97706' },
    rose: { bg: '#FFF1F2', border: '#FFE4E6', iconColor: '#E11D48' }
  };

  const scheme = schemeStyles[colorScheme] || schemeStyles.blue;

  return (
    <article className="card-base" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      position: 'relative'
    }}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div style={{
            backgroundColor: scheme.bg,
            border: `2px solid ${scheme.border}`,
            padding: '0.875rem',
            borderRadius: '1rem',
            fontSize: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '56px',
            minHeight: '56px'
          }}>
            {emoji ? emoji : Icon && <Icon size={32} color={scheme.iconColor} aria-hidden="true" />}
          </div>

          {badge && (
            <span style={{
              backgroundColor: scheme.bg,
              color: scheme.iconColor,
              fontWeight: '700',
              fontSize: '0.85rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: `1px solid ${scheme.border}`
            }}>
              {badge}
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          {description}
        </p>
      </div>

      <div>
        <Button
          onClick={onClick}
          fullWidth
          variant={colorScheme === 'green' ? 'success' : colorScheme === 'amber' ? 'amber' : 'primary'}
          icon={ArrowRight}
          ariaLabel={`${buttonText} - ${title}`}
        >
          {buttonText}
        </Button>
      </div>
    </article>
  );
}
