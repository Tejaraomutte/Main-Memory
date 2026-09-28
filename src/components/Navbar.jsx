import React, { useState } from 'react';
import { CHAPTERS } from '../data/hierarchyData';
import { 
  Layers, 
  Cpu, 
  CirclePlay, 
  Grid3X3, 
  Gauge, 
  Trophy, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  '01': Layers,
  '02': Cpu,
  '03': CirclePlay,
  '04': Grid3X3,
  '05': Gauge,
  '06': Trophy
};

export default function Navbar({ activeChapter, setActiveChapter }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentIdx = CHAPTERS.findIndex(c => c.id === activeChapter);
  const currentChapter = CHAPTERS[currentIdx] || CHAPTERS[0];
  const progressPercent = ((currentIdx + 1) / CHAPTERS.length) * 100;

  return (
    <header className="global-navbar">
      <div className="nav-container">
        {/* Brand Group */}
        <div className="brand-group" onClick={() => setActiveChapter('pyramid')} style={{ cursor: 'pointer' }}>
          <div className="brand-mark">CA</div>
          <div className="brand-text">
            <span className="brand-title">Computer Architecture <b>Atelier</b></span>
            <span className="brand-subtitle">Interactive Learning Series</span>
          </div>
        </div>

        {/* Chapter Pill Badge */}
        <div className="chapter-pill-badge">
          <span className="live-dot" />
          <span className="pill-chapter">CH {currentChapter.num}:</span>
          <span className="pill-name">{currentChapter.pill}</span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="desktop-nav">
          {CHAPTERS.map((chap) => {
            const Icon = ICON_MAP[chap.num] || Layers;
            const isActive = activeChapter === chap.id;
            return (
              <button
                key={chap.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={chap.title}
                onClick={() => setActiveChapter(chap.id)}
              >
                <span className="nav-item-num">{chap.num}</span>
                <Icon size={14} className="nav-item-icon" />
                <span className="nav-item-text">{chap.name}</span>
                {isActive && <span className="active-glow-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Progress Track at bottom of header */}
      <div className="navbar-progress-track">
        <div className="navbar-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-header">
            <div className="drawer-title">
              <Sparkles size={14} />
              <span>CHAPTER SELECTION</span>
            </div>
            <span>Progress: {Math.round(progressPercent)}%</span>
          </div>
          <div className="mobile-drawer-list">
            {CHAPTERS.map((chap) => {
              const Icon = ICON_MAP[chap.num] || Layers;
              const isActive = activeChapter === chap.id;
              return (
                <button
                  key={chap.id}
                  className={`mobile-nav-card ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveChapter(chap.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="mobile-card-badge">CH {chap.num}</span>
                  <div className="mobile-card-content">
                    <div className="mobile-card-title">
                      <Icon size={14} />
                      <strong>{chap.name}</strong>
                    </div>
                    <p className="mobile-card-desc">{chap.title}</p>
                  </div>
                  <ChevronRight size={16} className="mobile-card-arrow" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
