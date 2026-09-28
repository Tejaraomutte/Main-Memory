import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  History, 
  Layers, 
  Network, 
  Grid, 
  BarChart3, 
  Search, 
  HelpCircle, 
  Power,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MEMORY_COMPONENTS } from '../data/memoryData';
import ThreeMemoryModel from './ThreeMemoryModel';
import BusSimulator from './BusSimulator';
import MemoryMatrix from './MemoryMatrix';
import CellPhysics from './CellPhysics';

const ICON_MAP = {
  Cpu: Cpu,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  History: History,
  Layers: Layers,
  Network: Network,
  Grid: Grid,
  BarChart3: BarChart3
};

export default function ExplorerLayout({ 
  selectedCompId, 
  setSelectedCompId, 
  powerOn, 
  setPowerOn,
  onNavigateTab
}) {
  const [libraryFilter, setLibraryFilter] = useState('all'); // 'all', 'volatile', 'non-volatile', 'system'
  const [searchTerm, setSearchTerm] = useState('');
  const [viewerMode, setViewerMode] = useState('3d'); // '3d', 'bus', 'matrix', 'cell'

  const activeComp = MEMORY_COMPONENTS.find(c => c.id === selectedCompId) || MEMORY_COMPONENTS[0];

  const filteredComponents = MEMORY_COMPONENTS.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (libraryFilter === 'volatile') {
      return comp.badge.toLowerCase().includes('volatile') && !comp.badge.toLowerCase().includes('non-volatile');
    }
    if (libraryFilter === 'non-volatile') {
      return comp.badge.toLowerCase().includes('non-volatile');
    }
    if (libraryFilter === 'system') {
      return comp.id === 'buses' || comp.id === 'matrix' || comp.id === 'hierarchy';
    }
    return true;
  });

  return (
    <div className="explorer-layout">
      {/* ========================================================== */}
      {/* 1. LEFT PANEL: COMPONENT LIBRARY                           */}
      {/* ========================================================== */}
      <aside className="library-panel">
        <div className="panel-heading">
          <span className="panel-eyebrow">MEMORY ARCHITECTURES</span>
          <span className="library-count-pill">{filteredComponents.length} TYPES</span>
        </div>

        {/* Quick Search */}
        <div className="library-quick-search">
          <Search size={14} className="library-search-icon" />
          <input
            type="text"
            placeholder="Filter components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter Chips */}
        <div className="library-filter-chips">
          <button 
            className={`filter-chip ${libraryFilter === 'all' ? 'active-chip' : ''}`}
            onClick={() => setLibraryFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-chip ${libraryFilter === 'volatile' ? 'active-chip' : ''}`}
            onClick={() => setLibraryFilter('volatile')}
          >
            Volatile
          </button>
          <button 
            className={`filter-chip ${libraryFilter === 'non-volatile' ? 'active-chip' : ''}`}
            onClick={() => setLibraryFilter('non-volatile')}
          >
            Non-Volatile
          </button>
          <button 
            className={`filter-chip ${libraryFilter === 'system' ? 'active-chip' : ''}`}
            onClick={() => setLibraryFilter('system')}
          >
            Bus & Logic
          </button>
        </div>

        {/* Component List */}
        <div className="component-list">
          {filteredComponents.map((comp) => {
            const Icon = ICON_MAP[comp.iconName] || Cpu;
            const isSelected = comp.id === activeComp.id;
            return (
              <button
                key={comp.id}
                className={`library-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedCompId(comp.id);
                  // Automatically choose best viewer mode for this component if relevant
                  if (comp.id === 'buses') setViewerMode('bus');
                  else if (comp.id === 'matrix') setViewerMode('matrix');
                  else if (comp.id === 'dram' || comp.id === 'sram') setViewerMode('cell');
                }}
              >
                <div 
                  className="component-icon" 
                  style={{ color: isSelected ? comp.accentColor : undefined }}
                >
                  <Icon size={19} />
                </div>
                <div className="component-text">
                  <div className="item-title-row">
                    <strong>{comp.name}</strong>
                    <span className="item-category-tag">{comp.badge.split('•')[0].trim()}</span>
                  </div>
                  <small>{comp.fullName}</small>
                </div>
                {isSelected && <span className="selected-dot">●</span>}
              </button>
            );
          })}
        </div>

        {/* Bottom Quick Jump Action */}
        <div className="library-footer-card">
          <span className="footer-card-hint">Ready for a challenge?</span>
          <button className="view-all-button" onClick={() => onNavigateTab('quiz')}>
            <span>Test Your Knowledge in Quiz</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </aside>

      {/* ========================================================== */}
      {/* 2. CENTER PANEL: INTERACTIVE VISUALIZER CANVAS             */}
      {/* ========================================================== */}
      <section className="viewer-panel">
        {/* Mode Switcher Pill Bar */}
        <div className="viewer-mode-switch">
          <button 
            className={viewerMode === '3d' ? 'active' : ''}
            onClick={() => setViewerMode('3d')}
          >
            3D DIMM Inspector
          </button>
          <button 
            className={viewerMode === 'bus' ? 'active' : ''}
            onClick={() => setViewerMode('bus')}
          >
            Bus Simulator
          </button>
          <button 
            className={viewerMode === 'matrix' ? 'active' : ''}
            onClick={() => setViewerMode('matrix')}
          >
            2D Memory Matrix
          </button>
          <button 
            className={viewerMode === 'cell' ? 'active' : ''}
            onClick={() => setViewerMode('cell')}
          >
            1-Bit Silicon Cell
          </button>
        </div>

        {/* Dynamic Canvas Container depending on viewerMode */}
        <div className="viewer-canvas-outlet">
          {viewerMode === '3d' && (
            <ThreeMemoryModel powerOn={powerOn} />
          )}

          {viewerMode === 'bus' && (
            <div className="embedded-view-container">
              <BusSimulator powerOn={powerOn} />
            </div>
          )}

          {viewerMode === 'matrix' && (
            <div className="embedded-view-container">
              <MemoryMatrix powerOn={powerOn} />
            </div>
          )}

          {viewerMode === 'cell' && (
            <div className="embedded-view-container">
              <CellPhysics powerOn={powerOn} />
            </div>
          )}
        </div>
      </section>

      {/* ========================================================== */}
      {/* 3. RIGHT PANEL: DEEP-DIVE STUDIO & BEGINNER GUIDE          */}
      {/* ========================================================== */}
      <aside className="info-panel">
        <span className="info-category">{activeComp.category}</span>
        <h1>{activeComp.name}</h1>
        <div className="tagline">{activeComp.fullName}</div>
        <p className="description">{activeComp.tagline}</p>

        {/* Explain Like I'm 5 Analogy Card */}
        <div className="importance-card">
          <div className="analogy-head-row">
            <span className="analogy-emoji">{activeComp.analogy.icon}</span>
            <div>
              <strong>BEGINNER ANALOGY: {activeComp.analogy.title}</strong>
              <p>{activeComp.analogy.summary}</p>
            </div>
          </div>
        </div>

        {/* Volatile vs Non-Volatile Status Banner */}
        <div className={`volatility-status-banner ${activeComp.badge.includes('Non-Volatile') ? 'nv-banner' : 'v-banner'}`}>
          <div className="banner-text">
            <strong>{activeComp.badge}</strong>
            <small>
              {activeComp.badge.includes('Non-Volatile')
                ? 'Safe: Retains data even if electricity is completely unplugged.'
                : 'Volatile: Loses all contents the moment power turns off!'}
            </small>
          </div>
          <button 
            className="mini-power-test-btn"
            onClick={() => setPowerOn(!powerOn)}
            title="Toggle power to test retention"
          >
            <Power size={13} />
            <span>{powerOn ? 'Test Power Cut' : 'Restore Power'}</span>
          </button>
        </div>

        <div className="separator" />

        {/* Architecture Specs Table */}
        <div className="facts-title">ARCHITECTURAL SPECIFICATIONS</div>
        <div className="facts-grid-atelier">
          {activeComp.specs.map((s, idx) => (
            <div key={idx} className={`fact-row ${s.highlight ? 'fact-highlight' : ''}`}>
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          ))}
        </div>

        <div className="separator" />

        {/* Step-by-Step How it works */}
        <div className="facts-title">HOW IT WORKS IN 3 STEPS</div>
        <div className="steps-atelier-list">
          {activeComp.howItWorks.map((step) => (
            <div key={step.step} className="step-atelier-item">
              <span className="step-num-bubble">{step.step}</span>
              <div className="step-body">
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="separator" />

        {/* Real-World Context */}
        <div className="facts-title">INSIDE YOUR PHONE & PC</div>
        <div className="real-world-box">
          <p>{activeComp.realWorld}</p>
        </div>

        {/* Jump-to-Lab Actions */}
        <div className="action-grid">
          <button onClick={() => setViewerMode('bus')}>
            <Network size={14} />
            <span>Bus Simulation</span>
          </button>
          <button onClick={() => setViewerMode('matrix')}>
            <Grid size={14} />
            <span>Matrix Addressing</span>
          </button>
        </div>

        <button 
          className="lesson-button"
          onClick={() => onNavigateTab('speed-race')}
        >
          <span>Explore Memory Hierarchy Speed Race</span>
          <ChevronRight size={16} />
        </button>
      </aside>
    </div>
  );
}
