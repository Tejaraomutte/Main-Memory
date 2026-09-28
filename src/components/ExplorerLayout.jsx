import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Clock, 
  Database, 
  Info, 
  ArrowRight,
  Search,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { MEMORY_COMPONENTS } from '../data/memoryData';
import HardwareSchematic from './HardwareSchematic';
import ModuleBottomNav from './ModuleBottomNav';

export default function ExplorerLayout({ 
  selectedCompId, 
  setSelectedCompId, 
  onNavigateTab 
}) {
  const activeComp = MEMORY_COMPONENTS.find(c => c.id === selectedCompId) || MEMORY_COMPONENTS[0];

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Sparkles size={14} /> MODULE 01 • PRIMARY SILICON ARCHITECTURE
        </div>
        <h1 className="hero-headline">Main Memory Explorer & <span>Silicon Family</span></h1>
        <p className="hero-lead">
          Main Memory is the CPU's primary workspace. Explore the physical anatomy of modern memory modules, 
          from high-speed volatile DRAM sticks down to permanent firmware ROM chips.
        </p>

        {/* Quick Nav Pills */}
        <div className="quick-nav-pills">
          <button 
            className="quick-pill highlight"
            onClick={() => onNavigateTab('matrix-lab')}
          >
            <Zap size={14} /> 2D Memory Matrix Simulator →
          </button>
          <button 
            className="quick-pill"
            onClick={() => onNavigateTab('bus-lab')}
          >
            <Activity size={14} /> System Bus Lab →
          </button>
          <button 
            className="quick-pill"
            onClick={() => onNavigateTab('compare')}
          >
            <ShieldCheck size={14} /> RAM vs ROM Showdown →
          </button>
        </div>
      </section>

      {/* Component Selector Bar */}
      <section className="module-selector-bar-section">
        <span className="selector-bar-label">SELECT SILICON COMPONENT:</span>
        <div className="component-chips-strip">
          {MEMORY_COMPONENTS.map((comp) => {
            const isSelected = comp.id === activeComp.id;
            return (
              <button
                key={comp.id}
                className={`comp-selector-chip ${isSelected ? 'active' : ''}`}
                style={isSelected ? { borderColor: comp.accentColor, color: comp.accentColor, backgroundColor: `${comp.accentColor}12` } : {}}
                onClick={() => setSelectedCompId(comp.id)}
              >
                <span className="chip-badge">{comp.badge.split('•')[0].trim()}</span>
                <strong>{comp.name}</strong>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main 2-Column Interactive Workspace */}
      <section className="clean-workspace-grid">
        {/* Left: Hardware Schematic Stage */}
        <div className="workspace-card dimm-stage-card">
          <div className="card-header-bar">
            <div>
              <span className="card-kicker">PHYSICAL HARDWARE ANATOMY</span>
              <h3>{activeComp.id === 'dram' ? 'DDR5 Memory Module Anatomy' : `${activeComp.name} Silicon Architecture`}</h3>
            </div>
            <span className="card-hint-badge">
              <CheckCircle2 size={13} /> 2D Vector Schematic
            </span>
          </div>

          <HardwareSchematic activeComp={activeComp} />
        </div>

        {/* Right: Component Inspector Details */}
        <div className="workspace-card component-inspector-card" style={{ borderTop: `4px solid ${activeComp.accentColor}` }}>
          <div className="card-header-bar">
            <div>
              <span className="card-kicker" style={{ color: activeComp.accentColor }}>{activeComp.category}</span>
              <h2 className="comp-full-title">{activeComp.fullName} ({activeComp.name})</h2>
            </div>
            <span className="comp-tag-badge" style={{ backgroundColor: `${activeComp.accentColor}18`, color: activeComp.accentColor }}>
              {activeComp.badge}
            </span>
          </div>

          <p className="comp-tagline-text">{activeComp.tagline}</p>

          {/* Analogy Box */}
          <div className="clean-analogy-box">
            <div className="analogy-icon-wrap">{activeComp.analogy.icon}</div>
            <div>
              <strong>Beginner Analogy: {activeComp.analogy.title}</strong>
              <p>{activeComp.analogy.summary}</p>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="clean-specs-grid">
            {activeComp.specs.map((spec, sIdx) => (
              <div key={sIdx} className="clean-spec-card">
                <span className="spec-card-lbl">{spec.label}</span>
                <strong className="spec-card-val" style={spec.highlight ? { color: activeComp.accentColor } : {}}>
                  {spec.value}
                </strong>
              </div>
            ))}
          </div>

          {/* Deep Dive Note */}
          <div className="clean-deep-dive-box">
            <strong>Micro-Architectural Function:</strong>
            <p>{activeComp.deepDive}</p>
          </div>

          {/* Real World Impact */}
          <div className="clean-real-world-box">
            <strong>Real-World Application:</strong>
            <p>{activeComp.realWorld}</p>
          </div>

          {/* Action Row */}
          <div className="inspector-action-buttons">
            <button 
              className="btn-deep-action"
              style={{ backgroundColor: activeComp.accentColor, color: '#ffffff' }}
              onClick={() => {
                if (activeComp.id === 'dram' || activeComp.id === 'sram') onNavigateTab('cell-lab');
                else onNavigateTab('compare');
              }}
            >
              <span>Explore {activeComp.name} Physics & Architecture</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 3 Foundational Pillars of Main Memory */}
      <section className="foundations-section">
        <div className="section-header">
          <div>
            <span className="section-label">CORE PRINCIPLES</span>
            <h2>The 3 Iron Rules of Main Memory</h2>
          </div>
          <p>Why modern computers are engineered around distinct primary storage technologies.</p>
        </div>

        <div className="laws-grid">
          <div className="law-card">
            <span className="law-badge">RULE 01</span>
            <h3>The Speed-Density Tradeoff</h3>
            <p className="law-implication">
              SRAM is 50x faster than DRAM because its 6-transistor bistable latch requires no recharging. 
              However, 6 transistors consume 6x more silicon area per bit, making full-system SRAM economically impossible. 
              DRAM solves this by packing 1 bit into a single microscopic capacitor (1T1C).
            </p>
          </div>

          <div className="law-card">
            <span className="law-badge">RULE 02</span>
            <h3>Volatility & Charge Refresh</h3>
            <p className="law-implication">
              DRAM stores bits as tiny pools of electrons (0.03 picofarads). Because silicon naturally leaks electrons, 
              the charge drains within milliseconds. The memory controller must periodically execute <strong>Auto-Refresh (t<sub>RFC</sub>)</strong> 
              every 64ms, reading and rewriting every single row before data corrupts.
            </p>
          </div>

          <div className="law-card">
            <span className="law-badge">RULE 03</span>
            <h3>Firmware Bootstrapping (ROM)</h3>
            <p className="law-implication">
              When a computer boots up, DRAM is completely empty (all capacitors uncharged). 
              The CPU requires permanent, non-volatile ROM containing the BIOS/UEFI firmware to initialize 
              hardware registers, train memory timings, and load the operating system kernel into RAM.
            </p>
          </div>
        </div>
      </section>

      {/* Module Bottom Navigation */}
      <ModuleBottomNav currentTab="explorer" setCurrentTab={onNavigateTab} />
    </div>
  );
}
