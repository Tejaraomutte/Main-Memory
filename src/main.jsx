import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header, { MAIN_MEMORY_MODULES } from './components/Header';
import ExplorerLayout from './components/ExplorerLayout';
import MemoryMatrix from './components/MemoryMatrix';
import BusSimulator from './components/BusSimulator';
import CellPhysics from './components/CellPhysics';
import CompareView from './components/CompareView';
import BeginnerAcademy from './components/BeginnerAcademy';
import Quiz from './components/Quiz';
import { MemoryStick, Sparkles, Layers } from 'lucide-react';
import './styles.css';

function App() {
  const [currentTab, setCurrentTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const valid = MAIN_MEMORY_MODULES.find(m => m.id === hash);
    return valid ? valid.id : 'explorer';
  });

  const [selectedCompId, setSelectedCompId] = useState('dram');

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const valid = MAIN_MEMORY_MODULES.find(m => m.id === hash);
      if (valid && valid.id !== currentTab) {
        setCurrentTab(valid.id);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentTab]);

  return (
    <div className="atelier-app-root">
      {/* Clean Global Navbar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onSelectComponent={(id) => {
          setSelectedCompId(id);
          handleTabChange('explorer');
        }}
      />

      {/* Main Content Studio */}
      <main className="atelier-main-content">
        {currentTab === 'explorer' && (
          <ExplorerLayout
            selectedCompId={selectedCompId}
            setSelectedCompId={setSelectedCompId}
            onNavigateTab={handleTabChange}
          />
        )}

        {currentTab === 'matrix-lab' && (
          <MemoryMatrix onNavigateTab={handleTabChange} />
        )}

        {currentTab === 'bus-lab' && (
          <BusSimulator onNavigateTab={handleTabChange} />
        )}

        {currentTab === 'cell-lab' && (
          <CellPhysics onNavigateTab={handleTabChange} />
        )}

        {currentTab === 'compare' && (
          <CompareView onNavigateTab={handleTabChange} />
        )}

        {currentTab === 'academy' && (
          <BeginnerAcademy onNavigateTab={handleTabChange} />
        )}

        {currentTab === 'quiz' && (
          <Quiz onNavigateTab={handleTabChange} />
        )}
      </main>

      {/* Modern Light Theme Footer */}
      <footer className="global-site-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="brand-mark-sm">
                <MemoryStick size={16} />
              </span>
              <strong>Main Memory Atelier</strong>
            </div>
            <p className="footer-tagline">
              An interactive, beginner-friendly exploration exclusively focused on Main Memory: DRAM, SRAM, ROM, 2D Silicon Matrix, and System Buses.
            </p>
          </div>

          <div className="footer-chapters-col">
            <span className="footer-col-title">Main Memory Modules</span>
            <div className="footer-links-grid">
              {MAIN_MEMORY_MODULES.map((m) => (
                <button 
                  key={m.id} 
                  className={`footer-link ${currentTab === m.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(m.id)}
                >
                  <span className="footer-ch-num">{m.num}</span> {m.pill}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-meta-col">
            <div className="footer-badge">
              <Sparkles size={14} /> Interactive Silicon Architecture Studio
            </div>
            <p className="footer-copy">
              Designed with precision alignment, clean typography, and zero clutter. Optimized for students and systems developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
