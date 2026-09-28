import React, { useState } from 'react';
import { 
  MemoryStick, 
  ShieldCheck, 
  Sun, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import ModuleBottomNav from './ModuleBottomNav';

export default function CompareView({ onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('compare'); // 'compare' or 'timeline'
  const [uvExposure, setUvExposure] = useState(0); // 0 to 100% UV erase simulation

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <ShieldCheck size={14} /> MODULE 05 • ARCHITECTURAL SHOWDOWN & EVOLUTION
        </div>
        <h1 className="hero-headline">RAM vs ROM & <span>Silicon Evolution</span></h1>
        <p className="hero-lead">
          One provides high-speed scratchpad space for running programs; the other preserves permanent foundational instructions forever. 
          Discover the crucial differences and trace the history from Mask ROM to modern Flash memory.
        </p>

        {/* View Switcher Tabs */}
        <div className="quick-nav-pills">
          <button 
            className={`quick-pill ${activeTab === 'compare' ? 'highlight' : ''}`}
            onClick={() => setActiveTab('compare')}
          >
            Side-by-Side Comparison
          </button>
          <button 
            className={`quick-pill ${activeTab === 'timeline' ? 'highlight' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            Evolution of ROM (Mask → Flash)
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      {activeTab === 'compare' ? (
        <section className="clean-workspace-grid">
          {/* RAM Column */}
          <div className="workspace-card compare-pillar-card ram-card">
            <div className="card-header-bar">
              <div>
                <span className="card-kicker" style={{ color: '#0284c7' }}>RANDOM ACCESS MEMORY</span>
                <h3>RAM (The Working Desk)</h3>
              </div>
              <span className="comp-tag-badge" style={{ backgroundColor: '#f0f9ff', color: '#0284c7' }}>
                Volatile • Read/Write
              </span>
            </div>

            <p className="compare-lead-text">
              High-speed working memory where the operating system, open browser tabs, and game data reside for immediate CPU processing.
            </p>

            <div className="compare-specs-list">
              <div className="comp-spec-row">
                <span className="c-lbl">Primary Role:</span>
                <strong>Active program working space</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Read/Write Ability:</span>
                <strong className="text-emerald">Fast Read & Fast Write</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Power Cut Effect:</span>
                <strong className="text-rose">100% Data Loss (Volatile)</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Typical Latency:</span>
                <strong className="mono">10 – 80 nanoseconds</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Typical Capacity:</span>
                <strong className="mono">8 GB – 64 GB</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Cost per Gigabyte:</span>
                <strong className="mono">~$3.00 – $5.00 / GB</strong>
              </div>
            </div>
          </div>

          {/* ROM Column */}
          <div className="workspace-card compare-pillar-card rom-card">
            <div className="card-header-bar">
              <div>
                <span className="card-kicker" style={{ color: '#059669' }}>READ-ONLY MEMORY</span>
                <h3>ROM (The Stone Tablet)</h3>
              </div>
              <span className="comp-tag-badge" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                Non-Volatile • Permanent
              </span>
            </div>

            <p className="compare-lead-text">
              Permanent memory holding foundational firmware instructions (UEFI/BIOS) that the computer needs to boot up even after a total power outage.
            </p>

            <div className="compare-specs-list">
              <div className="comp-spec-row">
                <span className="c-lbl">Primary Role:</span>
                <strong>Motherboard BIOS/UEFI Bootstrapping</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Read/Write Ability:</span>
                <strong>Read-only (or slow block write)</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Power Cut Effect:</span>
                <strong className="text-emerald">Zero Data Loss (Non-Volatile)</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Typical Latency:</span>
                <strong className="mono">50 – 150 nanoseconds</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Typical Capacity:</span>
                <strong className="mono">16 MB – 64 MB (Firmware SPI chip)</strong>
              </div>
              <div className="comp-spec-row">
                <span className="c-lbl">Write Cycles:</span>
                <strong className="mono">Limited (10,000 – 100,000 writes)</strong>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Timeline View */
        <section className="rom-timeline-wrapper">
          <div className="timeline-cards-grid">
            <div className="timeline-card">
              <span className="timeline-step">1960s • STEP 01</span>
              <h3>Mask ROM</h3>
              <p>Permanently hard-wired during silicon wafer fabrication with physical photomasks. Cannot be modified under any circumstances.</p>
              <div className="timeline-tag">Factory Programmed Only</div>
            </div>

            <div className="timeline-card">
              <span className="timeline-step">1970s • STEP 02</span>
              <h3>PROM (Programmable ROM)</h3>
              <p>Contains microscopic fusible links. Engineers programmed it in the field using a high-voltage PROM programmer to permanently blow fuses (OTP - One Time Programmable).</p>
              <div className="timeline-tag">Write Once Only</div>
            </div>

            <div className="timeline-card highlight">
              <span className="timeline-step">1980s • STEP 03</span>
              <h3>EPROM (Erasable PROM)</h3>
              <p>Features a transparent quartz crystal window on top of the ceramic chip. Blasting the quartz window with intense Ultraviolet (UV) light discharges all floating gates in 20 minutes.</p>
              <div className="timeline-tag">UV Light Erasable</div>
            </div>

            <div className="timeline-card">
              <span className="timeline-step">1990s • STEP 04</span>
              <h3>EEPROM (Electrically Erasable)</h3>
              <p>Eliminated the UV light requirement! Uses Fowler-Nordheim electrical tunneling to erase and rewrite data byte-by-byte in circuit without removing the chip.</p>
              <div className="timeline-tag">In-Circuit Byte Erasure</div>
            </div>

            <div className="timeline-card">
              <span className="timeline-step">Modern • STEP 05</span>
              <h3>Flash Memory (NOR / NAND)</h3>
              <p>The modern evolution of EEPROM. Erases large blocks of memory at once for high density, forming modern motherboard UEFI BIOS chips, SSDs, and USB drives.</p>
              <div className="timeline-tag">Block Erase • Foundation of SSDs</div>
            </div>
          </div>

          {/* Interactive EPROM UV Eraser Chamber */}
          <div className="workspace-card uv-chamber-card">
            <div className="card-header-bar">
              <div>
                <span className="card-kicker">INTERACTIVE HISTORICAL LAB</span>
                <h3>EPROM Quartz Window Ultraviolet Eraser</h3>
              </div>
              <span className="uv-exposure-stat">
                UV Chamber Intensity: {uvExposure}%
              </span>
            </div>

            <p>
              Drag the ultraviolet light slider to blast the quartz window. Watch the trapped electrons escape from the floating gate until the memory is completely erased back to <code>0xFF</code>:
            </p>

            <div 
              className="uv-chamber-visual" 
              style={{ 
                backgroundColor: uvExposure > 0 ? `rgba(124, 58, 237, ${0.2 + (uvExposure / 100) * 0.7})` : '#0f172a',
                boxShadow: uvExposure > 30 ? `0 0 ${uvExposure / 3}px rgba(139, 92, 246, 0.8)` : 'none'
              }}
            >
              <div className="eprom-ceramic-package">
                <div className="quartz-glass-window">
                  <div 
                    className="floating-gate-charge" 
                    style={{ opacity: Math.max(0, 1 - (uvExposure / 80)) }} 
                  />
                  <Sun size={24} className="uv-sun-icon" style={{ opacity: uvExposure / 100 }} />
                </div>
                <span className="package-label">EPROM 27C256</span>
              </div>
            </div>

            <div className="uv-slider-controls">
              <span>UV Light Off (0%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={uvExposure}
                className="calc-range-slider"
                onChange={(e) => setUvExposure(parseInt(e.target.value, 10))}
              />
              <span>Full Blast UV Light (100%)</span>
            </div>

            <div className="uv-status-readout">
              {uvExposure < 30 && 'Quartz window dark: Trapped electrons remain stable in floating gates. Data intact.'}
              {uvExposure >= 30 && uvExposure < 80 && 'UV photons energizing electrons: Charge beginning to tunnel out through the silicon oxide insulator.'}
              {uvExposure >= 80 && 'Full UV erasure achieved! All floating gate charges neutralized. All bits reset to 0xFF (11111111).'}
            </div>
          </div>
        </section>
      )}

      {/* Module Bottom Navigation */}
      <ModuleBottomNav currentTab="compare" setCurrentTab={onNavigateTab} />
    </div>
  );
}
