import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon: Icon = null,
  ariaLabel,
  type = 'button',
  className = ''
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    borderRadius: '0.875rem',
    border: '2px solid transparent',
    transition: 'all 0.15s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none'
  };

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '1rem', minHeight: '44px' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1.125rem', minHeight: '48px' },
    lg: { padding: '1rem 2rem', fontSize: '1.25rem', minHeight: '56px' }
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--blue-600)',
      color: '#FFFFFF',
      borderColor: 'var(--blue-700)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
    },
    secondary: {
      backgroundColor: 'var(--blue-50)',
      color: 'var(--blue-700)',
      borderColor: 'var(--blue-100)'
    },
    success: {
      backgroundColor: 'var(--green-600)',
      color: '#FFFFFF',
      borderColor: 'var(--green-700)',
      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
    },
    amber: {
      backgroundColor: 'var(--amber-500)',
      color: '#FFFFFF',
      borderColor: 'var(--amber-600)',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)'
    },
    outline: {
      backgroundColor: '#FFFFFF',
      color: 'var(--text-heading)',
      borderColor: 'var(--border-color)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-main)',
      borderColor: 'transparent'
    }
  };

  const style = {
    ...baseStyles,
    ...(sizes[size] || sizes.md),
    ...(variants[variant] || variants.primary)
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={style}
      className={`btn-accessible ${className}`}
    >
      {Icon && <Icon size={size === 'lg' ? 24 : 20} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}
