import React, { useState } from 'react';
import { 
  MemoryStick, 
  Layers, 
  Grid3X3, 
  Activity, 
  Zap, 
  ShieldCheck, 
  BookOpen, 
  HelpCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export const MAIN_MEMORY_MODULES = [
  { id: 'explorer', num: '01', name: 'Explorer', title: '3D Chip Explorer & Silicon Family', pill: '3D Silicon Explorer' },
  { id: 'matrix-lab', num: '02', name: 'Matrix', title: '2D Wordlines, Bitlines & Decoders', pill: '2D Silicon Matrix' },
  { id: 'bus-lab', num: '03', name: 'Bus Lab', title: 'Address, Data & Control Bus Signals', pill: 'System Bus Lab' },
  { id: 'cell-lab', num: '04', name: 'Physics', title: '1T1C DRAM Leakage vs 6T SRAM', pill: 'Silicon Cell Physics' },
  { id: 'compare', num: '05', name: 'RAM vs ROM', title: 'Showdown & EPROM UV Eraser', pill: 'RAM vs ROM Evolution' },
  { id: 'academy', num: '06', name: 'Academy', title: 'App Launch Pipeline & Speed Race', pill: 'Beginner Academy' },
  { id: 'quiz', num: '07', name: 'Quiz', title: 'Main Memory Mastery Challenge', pill: 'Mastery Quiz' }
];

const ICON_MAP = {
  '01': Layers,
  '02': Grid3X3,
  '03': Activity,
  '04': Zap,
  '05': ShieldCheck,
  '06': BookOpen,
  '07': HelpCircle
};

export default function Header({ currentTab, setCurrentTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentIdx = MAIN_MEMORY_MODULES.findIndex(m => m.id === currentTab);
  const activeModule = MAIN_MEMORY_MODULES[currentIdx] || MAIN_MEMORY_MODULES[0];
  const progressPercent = ((currentIdx + 1) / MAIN_MEMORY_MODULES.length) * 100;

  return (
    <header className="global-navbar">
      <div className="nav-container">
        {/* Brand */}
        <div className="brand-group" onClick={() => setCurrentTab('explorer')} style={{ cursor: 'pointer' }}>
          <div className="brand-mark">
            <MemoryStick size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Main Memory <b>Atelier</b></span>
            <span className="brand-subtitle">Interactive Computer Architecture Studio</span>
          </div>
        </div>

        {/* Current Active Module Pill */}
        <div className="chapter-pill-badge">
          <span className="live-dot" />
          <span className="pill-chapter">MOD {activeModule.num}:</span>
          <span className="pill-name">{activeModule.pill}</span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="desktop-nav">
          {MAIN_MEMORY_MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.num] || Layers;
            const isActive = currentTab === mod.id;
            return (
              <button
                key={mod.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={mod.title}
                onClick={() => setCurrentTab(mod.id)}
              >
                <span className="nav-item-num">{mod.num}</span>
                <Icon size={14} className="nav-item-icon" />
                <span className="nav-item-text">{mod.name}</span>
                {isActive && <span className="active-glow-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Progress Line */}
      <div className="navbar-progress-track">
        <div className="navbar-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-header">
            <div className="drawer-title">
              <Sparkles size={14} />
              <span>MAIN MEMORY MODULES</span>
            </div>
            <span>Module {currentIdx + 1} of {MAIN_MEMORY_MODULES.length}</span>
          </div>
          <div className="mobile-drawer-list">
            {MAIN_MEMORY_MODULES.map((mod) => {
              const Icon = ICON_MAP[mod.num] || Layers;
              const isActive = currentTab === mod.id;
              return (
                <button
                  key={mod.id}
                  className={`mobile-drawer-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentTab(mod.id);
                    setMobileOpen(false);
                  }}
                >
                  <div className="mobile-drawer-item-left">
                    <span className="drawer-num">{mod.num}</span>
                    <Icon size={16} />
                    <span>{mod.pill}</span>
                  </div>
                  {isActive && <span className="drawer-active-dot">●</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
