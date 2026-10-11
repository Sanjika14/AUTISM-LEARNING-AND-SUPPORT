import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Smile, 
  MessageSquare, 
  Sparkles, 
  Gamepad2, 
  Users, 
  Info 
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Learning', path: '/learning', icon: BookOpen },
    { name: 'Emotions', path: '/emotions', icon: Smile },
    { name: 'Communication', path: '/communication', icon: MessageSquare },
    { name: 'Sensory', path: '/sensory', icon: Sparkles },
    { name: 'Games', path: '/games', icon: Gamepad2 },
    { name: 'Comic Books', path: '/comics', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav 
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '2px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}
      aria-label="Main Navigation"
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.875rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo & Brand Name */}
        <Link 
          to="/" 
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'var(--blue-700)',
            fontWeight: '800',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem'
          }}
          aria-label="Autism Learning & Support Home"
        >
          <div style={{
            backgroundColor: 'var(--blue-100)',
            padding: '0.5rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--blue-600)'
          }}>
            <HeartHandshake size={28} aria-hidden="true" />
          </div>
          <span>Autism Learning & Support</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.5rem'
        }} className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.875rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  color: isActive ? 'var(--blue-700)' : 'var(--text-main)',
                  backgroundColor: isActive ? 'var(--blue-50)' : 'transparent',
                  border: `2px solid ${isActive ? 'var(--blue-100)' : 'transparent'}`,
                  transition: 'all 0.15s ease'
                })}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            borderRadius: '0.75rem',
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--bg-app)',
            color: 'var(--text-heading)'
          }}
          className="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid var(--border-color)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }} className="mobile-nav-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  borderRadius: '0.875rem',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  color: isActive ? 'var(--blue-700)' : 'var(--text-main)',
                  backgroundColor: isActive ? 'var(--blue-50)' : 'transparent',
                  border: `2px solid ${isActive ? 'var(--blue-100)' : 'transparent'}`
                })}
              >
                <Icon size={22} aria-hidden="true" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}

      {/* Responsive Inline CSS helper for Navbar */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-toggle { display: none !important; }
          .mobile-nav-drawer { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
