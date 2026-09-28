import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import ExplorerLayout from './components/ExplorerLayout';
import BusSimulator from './components/BusSimulator';
import MemoryMatrix from './components/MemoryMatrix';
import CellPhysics from './components/CellPhysics';
import CompareView from './components/CompareView';
import SpeedRace from './components/SpeedRace';
import BeginnerAcademy from './components/BeginnerAcademy';
import Quiz from './components/Quiz';
import { 
  Layers, 
  Activity, 
  Cpu, 
  Zap, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  ShieldCheck,
  MemoryStick
} from 'lucide-react';
import './styles.css';

function App() {
  const [currentTab, setCurrentTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['explorer', 'bus-lab', 'matrix-lab', 'cell-lab', 'compare', 'speed-race', 'academy', 'quiz'];
    return validTabs.includes(hash) ? hash : 'explorer';
  });

  const [selectedCompId, setSelectedCompId] = useState('dram');
  const [powerOn, setPowerOn] = useState(true);

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['explorer', 'bus-lab', 'matrix-lab', 'cell-lab', 'compare', 'speed-race', 'academy', 'quiz'];
      if (validTabs.includes(hash) && hash !== currentTab) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentTab]);

  return (
    <div className="atelier-app-root">
      {/* Top Header with live Power switch and Search */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        powerOn={powerOn}
        setPowerOn={setPowerOn}
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
            powerOn={powerOn}
            setPowerOn={setPowerOn}
            onNavigateTab={handleTabChange}
          />
        )}

        {currentTab === 'bus-lab' && (
          <div className="tab-fullscreen-container">
            <BusSimulator powerOn={powerOn} />
          </div>
        )}

        {currentTab === 'matrix-lab' && (
          <div className="tab-fullscreen-container">
            <MemoryMatrix powerOn={powerOn} />
          </div>
        )}

        {currentTab === 'cell-lab' && (
          <div className="tab-fullscreen-container">
            <CellPhysics powerOn={powerOn} />
          </div>
        )}

        {currentTab === 'compare' && (
          <div className="tab-fullscreen-container">
            <CompareView />
          </div>
        )}

        {currentTab === 'speed-race' && (
          <div className="tab-fullscreen-container">
            <SpeedRace />
          </div>
        )}

        {currentTab === 'academy' && (
          <div className="tab-fullscreen-container">
            <BeginnerAcademy powerOn={powerOn} setPowerOn={setPowerOn} />
          </div>
        )}

        {currentTab === 'quiz' && (
          <div className="tab-fullscreen-container">
            <Quiz />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${currentTab === 'explorer' ? 'active' : ''}`}
          onClick={() => handleTabChange('explorer')}
        >
          <div className="bottom-nav-icon-wrap"><Layers size={17} /></div>
          <span className="bottom-nav-label">Explorer</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'bus-lab' ? 'active' : ''}`}
          onClick={() => handleTabChange('bus-lab')}
        >
          <div className="bottom-nav-icon-wrap"><Activity size={17} /></div>
          <span className="bottom-nav-label">Bus Lab</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'matrix-lab' ? 'active' : ''}`}
          onClick={() => handleTabChange('matrix-lab')}
        >
          <div className="bottom-nav-icon-wrap"><Cpu size={17} /></div>
          <span className="bottom-nav-label">Matrix</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'cell-lab' ? 'active' : ''}`}
          onClick={() => handleTabChange('cell-lab')}
        >
          <div className="bottom-nav-icon-wrap"><Zap size={17} /></div>
          <span className="bottom-nav-label">Silicon</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'compare' ? 'active' : ''}`}
          onClick={() => handleTabChange('compare')}
        >
          <div className="bottom-nav-icon-wrap"><ShieldCheck size={17} /></div>
          <span className="bottom-nav-label">RAM/ROM</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'academy' ? 'active' : ''}`}
          onClick={() => handleTabChange('academy')}
        >
          <div className="bottom-nav-icon-wrap"><BookOpen size={17} /></div>
          <span className="bottom-nav-label">Academy</span>
        </button>
        <button
          className={`bottom-nav-item ${currentTab === 'quiz' ? 'active' : ''}`}
          onClick={() => handleTabChange('quiz')}
        >
          <div className="bottom-nav-icon-wrap"><HelpCircle size={17} /></div>
          <span className="bottom-nav-label">Quiz</span>
        </button>
      </nav>

      {/* Modern Light Theme Footer */}
      <footer className="atelier-footer">
        <div className="footer-left">
          <div className="footer-logo">
            <MemoryStick size={20} />
          </div>
          <div>
            <strong>Main Memory Atelier</strong>
            <small>Interactive Computer Architecture Studio • Focused Exclusively on Primary Storage</small>
          </div>
        </div>

        <div className="footer-links">
          <button onClick={() => handleTabChange('explorer')}>3D Explorer</button>
          <button onClick={() => handleTabChange('bus-lab')}>Bus Simulator</button>
          <button onClick={() => handleTabChange('matrix-lab')}>Memory Matrix</button>
          <button onClick={() => handleTabChange('cell-lab')}>1-Bit Silicon Cell</button>
          <button onClick={() => handleTabChange('compare')}>RAM vs ROM</button>
          <button onClick={() => handleTabChange('speed-race')}>Speed Hierarchy</button>
          <button onClick={() => handleTabChange('academy')}>Beginner Academy</button>
          <button onClick={() => handleTabChange('quiz')}>Mastery Quiz</button>
        </div>

        <div className="footer-right">
          <span>Complete Visualizations • Clean Light Theme Studio</span>
        </div>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
