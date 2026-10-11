import React from 'react';

export default function FullBodyAnimals() {
  return (
    <div className="fullbody-animals-container" aria-hidden="true">
      
      {/* 🐮 1. FULL-BODY COW */}
      <div className="fullbody-animal anim-cow">
        <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
          {/* Tail */}
          <path d="M25 50 C 15 65 10 75 18 85" stroke="#475569" strokeWidth="4" strokeLinecap="round" className="svg-tail" />
          <circle cx="18" cy="85" r="5" fill="#1E293B" />
          {/* Back Legs */}
          <rect x="35" y="65" width="12" height="38" rx="6" fill="#CBD5E1" className="svg-leg leg-back-left" />
          <rect x="75" y="65" width="12" height="38" rx="6" fill="#CBD5E1" className="svg-leg leg-back-right" />
          {/* Body */}
          <ellipse cx="60" cy="55" rx="40" ry="25" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          {/* Spots */}
          <path d="M40 40 Q 50 35 48 50 Q 38 55 40 40 Z" fill="#1E293B" />
          <path d="M70 50 Q 80 45 78 60 Q 68 65 70 50 Z" fill="#1E293B" />
          {/* Udder */}
          <ellipse cx="55" cy="72" rx="10" ry="6" fill="#F472B6" />
          {/* Front Legs */}
          <rect x="42" y="68" width="12" height="36" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" className="svg-leg leg-front-left" />
          <rect x="82" y="68" width="12" height="36" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" className="svg-leg leg-front-right" />
          {/* Head */}
          <ellipse cx="95" cy="40" rx="18" ry="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          {/* Horns */}
          <path d="M85 28 C 82 20 88 16 90 24" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <path d="M102 28 C 105 20 99 16 97 24" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          {/* Snout */}
          <ellipse cx="102" cy="45" rx="11" ry="8" fill="#F472B6" stroke="#0F172A" strokeWidth="2" />
          <circle cx="98" cy="44" r="1.5" fill="#831843" />
          <circle cx="104" cy="44" r="1.5" fill="#831843" />
          {/* Eyes */}
          <circle cx="92" cy="35" r="3" fill="#0F172A" />
          <circle cx="93" cy="34" r="1" fill="#FFFFFF" />
          {/* Ears */}
          <ellipse cx="80" cy="38" rx="8" ry="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" transform="rotate(-20 80 38)" className="svg-ear" />
        </svg>
      </div>

      {/* 🫏 2. FULL-BODY DONKEY */}
      <div className="fullbody-animal anim-donkey">
        <svg width="130" height="115" viewBox="0 0 130 115" fill="none">
          {/* Tail */}
          <path d="M20 55 C 10 70 8 80 12 90" stroke="#64748B" strokeWidth="4" strokeLinecap="round" className="svg-tail" />
          <circle cx="12" cy="90" r="4" fill="#334155" />
          {/* Back Legs */}
          <rect x="30" y="65" width="11" height="40" rx="5" fill="#64748B" className="svg-leg leg-back-left" />
          <rect x="70" y="65" width="11" height="40" rx="5" fill="#64748B" className="svg-leg leg-back-right" />
          {/* Body */}
          <ellipse cx="55" cy="58" rx="36" ry="22" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          {/* Front Legs */}
          <rect x="38" y="68" width="11" height="38" rx="5" fill="#94A3B8" stroke="#334155" strokeWidth="3" className="svg-leg leg-front-left" />
          <rect x="78" y="68" width="11" height="38" rx="5" fill="#94A3B8" stroke="#334155" strokeWidth="3" className="svg-leg leg-front-right" />
          {/* Hooves */}
          <rect x="38" y="98" width="11" height="8" fill="#334155" />
          <rect x="78" y="98" width="11" height="8" fill="#334155" />
          {/* Neck & Head */}
          <path d="M80 50 L95 30 L112 38 L92 62 Z" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          <ellipse cx="108" cy="35" rx="14" ry="11" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          {/* Muzzle */}
          <ellipse cx="118" cy="38" rx="7" ry="6" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
          {/* Long Ears */}
          <ellipse cx="98" cy="18" rx="5" ry="16" fill="#94A3B8" stroke="#334155" strokeWidth="2" transform="rotate(-15 98 18)" className="svg-ear" />
          <ellipse cx="104" cy="16" rx="4" ry="14" fill="#94A3B8" stroke="#334155" strokeWidth="2" transform="rotate(10 104 16)" className="svg-ear" />
          {/* Mane */}
          <path d="M82 45 C 80 32 90 25 94 28" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="105" cy="32" r="3" fill="#0F172A" />
        </svg>
      </div>

      {/* 🐘 3. FULL-BODY ELEPHANT */}
      <div className="fullbody-animal anim-elephant">
        <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
          {/* Tail */}
          <path d="M25 60 C 15 75 18 85 15 95" stroke="#475569" strokeWidth="3" className="svg-tail" />
          {/* Legs */}
          <rect x="35" y="70" width="18" height="42" rx="8" fill="#64748B" stroke="#1E293B" strokeWidth="3" className="svg-leg leg-front-left" />
          <rect x="85" y="70" width="18" height="42" rx="8" fill="#64748B" stroke="#1E293B" strokeWidth="3" className="svg-leg leg-front-right" />
          {/* Body */}
          <ellipse cx="65" cy="60" rx="45" ry="32" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
          {/* Head */}
          <circle cx="108" cy="50" r="24" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
          {/* Large Ear */}
          <ellipse cx="95" cy="48" rx="16" ry="22" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3" className="svg-ear" />
          {/* Trunk */}
          <path d="M125 58 C 140 65 145 80 135 90 C 128 95 125 85 132 80" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" fill="none" className="svg-trunk" />
          <path d="M125 58 C 140 65 145 80 135 90 C 128 95 125 85 132 80" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" className="svg-trunk" />
          {/* Eye */}
          <circle cx="112" cy="42" r="3.5" fill="#0F172A" />
          <circle cx="113" cy="41" r="1" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 🐶 4. FULL-BODY DOG */}
      <div className="fullbody-animal anim-dog">
        <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
          {/* Wagging Tail */}
          <path d="M20 40 Q 8 25 15 15" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" className="svg-tail-wag" />
          {/* Legs */}
          <rect x="28" y="52" width="10" height="32" rx="5" fill="#D97706" className="svg-leg leg-front-left" />
          <rect x="62" y="52" width="10" height="32" rx="5" fill="#D97706" className="svg-leg leg-front-right" />
          {/* Body */}
          <ellipse cx="48" cy="46" rx="28" ry="18" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          {/* Head */}
          <circle cx="78" cy="32" r="16" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          {/* Floppy Ear */}
          <ellipse cx="72" cy="32" rx="6" ry="12" fill="#78350F" transform="rotate(20 72 32)" className="svg-ear" />
          {/* Snout */}
          <ellipse cx="88" cy="36" rx="7" ry="5" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
          <circle cx="92" cy="34" r="3" fill="#0F172A" />
          {/* Eye */}
          <circle cx="78" cy="28" r="3" fill="#0F172A" />
        </svg>
      </div>

      {/* 🐰 5. FULL-BODY BUNNY */}
      <div className="fullbody-animal anim-bunny">
        <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
          {/* Fluffy Tail */}
          <circle cx="15" cy="72" r="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          {/* Body */}
          <ellipse cx="40" cy="68" rx="24" ry="20" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
          {/* Back Paws */}
          <ellipse cx="32" cy="85" rx="14" ry="7" fill="#FFFFFF" stroke="#475569" strokeWidth="3" className="svg-leg leg-front-left" />
          <ellipse cx="52" cy="85" rx="14" ry="7" fill="#FFFFFF" stroke="#475569" strokeWidth="3" className="svg-leg leg-front-right" />
          {/* Head */}
          <circle cx="58" cy="45" r="16" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
          {/* Long Ears */}
          <ellipse cx="52" cy="20" rx="5" ry="18" fill="#FFFFFF" stroke="#475569" strokeWidth="2" className="svg-ear" />
          <ellipse cx="52" cy="20" rx="3" ry="14" fill="#F472B6" />
          <ellipse cx="62" cy="18" rx="5" ry="18" fill="#FFFFFF" stroke="#475569" strokeWidth="2" transform="rotate(15 62 18)" className="svg-ear" />
          <ellipse cx="62" cy="18" rx="3" ry="14" fill="#F472B6" transform="rotate(15 62 18)" />
          {/* Eye & Nose */}
          <circle cx="64" cy="42" r="3" fill="#0F172A" />
          <polygon points="72,46 76,46 74,49" fill="#F472B6" />
        </svg>
      </div>

      {/* 🐱 6. FULL-BODY CAT */}
      <div className="fullbody-animal anim-cat">
        <svg width="100" height="85" viewBox="0 0 100 85" fill="none">
          {/* Curved Tail */}
          <path d="M15 45 Q 0 30 10 15" stroke="#FB923C" strokeWidth="5" strokeLinecap="round" className="svg-tail-wag" />
          {/* Legs */}
          <rect x="25" y="48" width="8" height="30" rx="4" fill="#F97316" className="svg-leg leg-front-left" />
          <rect x="55" y="48" width="8" height="30" rx="4" fill="#F97316" className="svg-leg leg-front-right" />
          {/* Body */}
          <ellipse cx="42" cy="44" rx="24" ry="16" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          {/* Head */}
          <circle cx="68" cy="30" r="14" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          {/* Ears */}
          <polygon points="58,20 64,8 68,18" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          <polygon points="72,18 78,8 82,20" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          {/* Eye & Whiskers */}
          <circle cx="72" cy="28" r="2.5" fill="#0F172A" />
          <line x1="78" y1="32" x2="90" y2="30" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="78" y1="34" x2="88" y2="36" stroke="#0F172A" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 🐻 7. FULL-BODY BEAR */}
      <div className="fullbody-animal anim-bear">
        <svg width="110" height="120" viewBox="0 0 110 120" fill="none">
          {/* Legs */}
          <rect x="30" y="75" width="16" height="35" rx="8" fill="#78350F" stroke="#451A03" strokeWidth="3" className="svg-leg leg-front-left" />
          <rect x="64" y="75" width="16" height="35" rx="8" fill="#78350F" stroke="#451A03" strokeWidth="3" className="svg-leg leg-front-right" />
          {/* Body */}
          <ellipse cx="55" cy="65" rx="30" ry="26" fill="#B45309" stroke="#451A03" strokeWidth="3" />
          <ellipse cx="55" cy="65" rx="18" ry="15" fill="#FDE68A" />
          {/* Head */}
          <circle cx="55" cy="32" r="20" fill="#B45309" stroke="#451A03" strokeWidth="3" />
          {/* Ears */}
          <circle cx="38" cy="18" r="8" fill="#B45309" stroke="#451A03" strokeWidth="2" />
          <circle cx="72" cy="18" r="8" fill="#B45309" stroke="#451A03" strokeWidth="2" />
          {/* Snout */}
          <ellipse cx="55" cy="36" rx="9" ry="7" fill="#FDE68A" />
          <circle cx="55" cy="33" r="3.5" fill="#451A03" />
          {/* Eyes */}
          <circle cx="48" cy="27" r="2.5" fill="#0F172A" />
          <circle cx="62" cy="27" r="2.5" fill="#0F172A" />
        </svg>
      </div>

      {/* 🦙 8. FULL-BODY LLAMA */}
      <div className="fullbody-animal anim-llama">
        <svg width="100" height="130" viewBox="0 0 100 130" fill="none">
          {/* Legs */}
          <rect x="28" y="75" width="10" height="48" rx="5" fill="#F59E0B" className="svg-leg leg-front-left" />
          <rect x="58" y="75" width="10" height="48" rx="5" fill="#F59E0B" className="svg-leg leg-front-right" />
          {/* Body */}
          <ellipse cx="45" cy="68" rx="26" ry="20" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          {/* Long Neck */}
          <rect x="52" y="25" width="16" height="45" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          {/* Head */}
          <ellipse cx="60" cy="22" rx="14" ry="11" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          {/* Tall Ears */}
          <ellipse cx="54" cy="8" rx="4" ry="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" className="svg-ear" />
          <ellipse cx="64" cy="8" rx="4" ry="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" className="svg-ear" />
          {/* Eye */}
          <circle cx="64" cy="20" r="3" fill="#0F172A" />
        </svg>
      </div>

    </div>
  );
}
