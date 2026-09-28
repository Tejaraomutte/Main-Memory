import React, { useState, useRef, useEffect } from 'react';
import { 
  MemoryStick, 
  Search, 
  Power, 
  Sparkles, 
  ChevronRight, 
  X, 
  BookOpen, 
  Layers, 
  Cpu, 
  Zap, 
  HelpCircle,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { MEMORY_COMPONENTS, GLOSSARY_TERMS } from '../data/memoryData';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  powerOn, 
  setPowerOn, 
  onSelectComponent 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredComponents = searchQuery.trim() === '' ? [] : MEMORY_COMPONENTS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.deepDive.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGlossary = searchQuery.trim() === '' ? [] : GLOSSARY_TERMS.filter(g =>
    g.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.def.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { id: 'explorer', label: 'Explorer', icon: Layers },
    { id: 'bus-lab', label: 'Bus Lab', icon: Activity },
    { id: 'matrix-lab', label: 'Memory Matrix', icon: Cpu },
    { id: 'cell-lab', label: 'Silicon Cell', icon: Zap },
    { id: 'compare', label: 'RAM vs ROM', icon: ShieldCheck },
    { id: 'speed-race', label: 'Speed', icon: Sparkles },
    { id: 'academy', label: 'Academy', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle }
  ];

  return (
    <header className="header">
      <div className="brand-wrap" onClick={() => setCurrentTab('explorer')}>
        <div className="atelier-logo-icon">
          <MemoryStick size={22} />
        </div>
        <div className="brand-text">
          <span className="logo-main">Main Memory <span>Atelier</span></span>
          <small className="logo-sub">Computer Architecture Visualizer</small>
        </div>
      </div>

      <nav className="main-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentTab(item.id)}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="header-search-wrapper" ref={searchRef}>
        <div className="header-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search memory, SRAM, bus, refresh..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {isSearchOpen && (filteredComponents.length > 0 || filteredGlossary.length > 0) && (
          <div className="search-dropdown-menu">
            {filteredComponents.length > 0 && (
              <div className="search-results-section">
                <span className="search-section-label">Memory Architectures</span>
                {filteredComponents.map((comp) => (
                  <button
                    key={comp.id}
                    className="search-result-item"
                    onClick={() => {
                      onSelectComponent(comp.id);
                      setCurrentTab('explorer');
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="result-icon">
                      <Cpu size={16} />
                    </div>
                    <div className="result-details">
                      <span className="result-title">{comp.name} — {comp.fullName}</span>
                      <span className="result-desc">{comp.tagline}</span>
                    </div>
                    <ChevronRight size={14} className="result-arrow" />
                  </button>
                ))}
              </div>
            )}

            {filteredGlossary.length > 0 && (
              <div className="search-results-section">
                <span className="search-section-label">Glossary & Concepts</span>
                {filteredGlossary.map((item) => (
                  <div key={item.term} className="search-result-item" style={{ cursor: 'default' }}>
                    <div className="result-icon lesson-icon">
                      <BookOpen size={16} />
                    </div>
                    <div className="result-details">
                      <span className="result-title">{item.term}</span>
                      <span className="result-desc">{item.def}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-actions">
        <button 
          className={`power-toggle-btn ${powerOn ? 'power-active' : 'power-off'}`}
          onClick={() => setPowerOn(!powerOn)}
          title={powerOn ? 'Click to cut power (Demonstrates volatile memory loss)' : 'Click to restore system power'}
        >
          <Power size={15} />
          <span>{powerOn ? 'POWER: ON' : 'POWER: OFF'}</span>
          <span className={`power-dot ${powerOn ? 'pulse' : 'dead'}`} />
        </button>

        <div className="atelier-pill-badge">
          <span className="badge-light-indicator" />
          <span>LIGHT MODE</span>
        </div>
      </div>
    </header>
  );
}
