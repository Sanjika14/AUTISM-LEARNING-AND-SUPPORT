import React from 'react';

export default function PageHeader({ title, subtitle, icon: Icon = null, badge = null, color = 'blue' }) {
  const colorMap = {
    blue: { bg: 'var(--blue-50)', border: 'var(--blue-100)', iconBg: 'var(--blue-500)', text: 'var(--blue-900)' },
    green: { bg: 'var(--green-50)', border: 'var(--green-100)', iconBg: 'var(--green-500)', text: 'var(--green-700)' },
    purple: { bg: 'var(--purple-50)', border: 'var(--purple-100)', iconBg: 'var(--purple-500)', text: 'var(--purple-700)' },
    amber: { bg: 'var(--amber-50)', border: 'var(--amber-100)', iconBg: 'var(--amber-500)', text: 'var(--amber-700)' }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <header style={{
      backgroundColor: scheme.bg,
      border: `2px solid ${scheme.border}`,
      borderRadius: '1.25rem',
      padding: '2rem 1.5rem',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {Icon && (
        <div style={{
          backgroundColor: scheme.iconBg,
          color: '#FFFFFF',
          padding: '1rem',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Icon size={36} aria-hidden="true" />
        </div>
      )}
      <div>
        {badge && (
          <span style={{
            display: 'inline-block',
            backgroundColor: scheme.border,
            color: scheme.text,
            fontWeight: '700',
            fontSize: '0.875rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            marginBottom: '0.5rem'
          }}>
            {badge}
          </span>
        )}
        <h1 style={{ color: scheme.text, fontSize: '2.25rem', margin: 0, lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)', fontSize: '1.125rem' }}>
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
