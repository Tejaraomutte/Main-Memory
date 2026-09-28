import React, { useState } from 'react';
import { PYRAMID_TIERS, KITCHEN_ANALOGY } from '../data/hierarchyData';
import ChapterBottomNav from './ChapterBottomNav';
import { 
  Sparkles, 
  Layers, 
  UtensilsCrossed, 
  TrendingUp, 
  Zap, 
  Flame, 
  Database, 
  Clock, 
  DollarSign, 
  Info, 
  ArrowRight 
} from 'lucide-react';

export default function Chapter1Pyramid({ activeChapter, setActiveChapter, onSelectTier }) {
  const [selectedTierId, setSelectedTierId] = useState('l1');
  const [analogyMode, setAnalogyMode] = useState('both'); // 'both', 'human', 'nano'

  const activeTier = PYRAMID_TIERS.find(t => t.id === selectedTierId) || PYRAMID_TIERS[1];

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Sparkles size={14} /> CHAPTER 01 • ARCHITECTURAL FOUNDATION
        </div>
        <h1 className="hero-headline">The Memory <span>Hierarchy</span></h1>
        <p className="hero-lead">
          Why can't computers just use one massive, super-fast memory? Explore how modern computer architecture 
          bridges the colossal speed gap between ultra-fast processors and large storage.
        </p>

        <div className="quick-nav-pills">
          <a href="#pyramid-explorer" className="quick-pill">
            <Layers size={14} /> 3D Pyramid Explorer
          </a>
          <a href="#chef-analogy" className="quick-pill">
            <UtensilsCrossed size={14} /> The Kitchen Analogy
          </a>
          <a href="#tradeoff-matrix" className="quick-pill">
            <TrendingUp size={14} /> Detailed Specs Matrix
          </a>
          <button 
            className="quick-pill highlight"
            onClick={() => setActiveChapter('simulation')}
          >
            <Zap size={14} /> Try Live Lookup Simulator →
          </button>
        </div>
      </section>

      {/* Fundamental Problem Callout Banner */}
      <section className="concept-callout-banner">
        <div className="banner-icon-col">
          <Flame size={28} className="text-amber" />
        </div>
        <div className="banner-text-col">
          <h3>The Fundamental Problem: The Processor-Memory Speed Gap</h3>
          <p>
            A modern 4.0 GHz CPU executes an instruction every <strong>0.25 nanoseconds (250 picoseconds)</strong>. 
            However, fetching data from main system RAM takes around <strong>80 nanoseconds</strong>. 
            If the CPU had to wait for RAM on every memory access, it would spend <strong>over 99% of its life doing nothing</strong> (stalled waiting on the bus). 
            The Memory Hierarchy solves this dilemma.
          </p>
        </div>
      </section>

      {/* Interactive Visualizer: The Layered Memory Pyramid */}
      <section id="pyramid-explorer" className="interactive-module-section">
        <div className="section-header">
          <div>
            <span className="section-label">INTERACTIVE VISUALIZER</span>
            <h2>The Layered Memory Pyramid</h2>
          </div>
          <p>Click on any tier of the pyramid to inspect its physical technology, latency, capacity, and role in modern computing.</p>
        </div>

        <div className="pyramid-interactive-container">
          {/* Left: The Visual Pyramid Stack */}
          <div className="pyramid-stack-col">
            <div className="pyramid-apex-indicator">
              <Zap size={16} />
              <strong>CPU EXECUTION CORES (Fastest / Smallest / Highest Cost per Bit)</strong>
            </div>

            <div className="pyramid-layers-wrapper">
              {PYRAMID_TIERS.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    className={`pyramid-layer-button ${isSelected ? 'active' : ''}`}
                    style={{ 
                      width: `${tier.widthPercent}%`,
                      borderLeftColor: tier.color 
                    }}
                    onClick={() => setSelectedTierId(tier.id)}
                  >
                    <div className="layer-left">
                      <span className="layer-number">{tier.tierNum}</span>
                      <span className="layer-icon" style={{ color: tier.color }}>{tier.icon}</span>
                      <strong className="layer-title">{tier.name}</strong>
                    </div>
                    <div className="layer-right">
                      <span className="layer-stat-badge">{tier.latency}</span>
                      <span className="layer-capacity-pill">{tier.capacity}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pyramid-base-indicator">
              <Database size={16} />
              <strong>MASS ARCHIVAL STORAGE (Slowest / Largest / Lowest Cost per Bit)</strong>
            </div>

            {/* Gradient Trend Axes */}
            <div className="pyramid-axes-row">
              <div className="axis-box up">
                <span className="axis-arrow">▲</span>
                <div>
                  <strong>Speed & Cost / Bit</strong>
                  <small>Increases toward top</small>
                </div>
              </div>
              <div className="axis-box down">
                <span className="axis-arrow">▼</span>
                <div>
                  <strong>Capacity & Access Latency</strong>
                  <small>Increases toward bottom</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Tier Inspector */}
          <div className="pyramid-inspector-card" style={{ borderColor: `${activeTier.color}40` }}>
            <div className="inspector-header">
              <div 
                className="inspector-tier-badge"
                style={{ backgroundColor: `${activeTier.color}20`, color: activeTier.color }}
              >
                TIER {activeTier.tierNum} • {activeTier.location}
              </div>
              <span className="inspector-status">{activeTier.volatility}</span>
            </div>

            <h3 className="inspector-title" style={{ color: activeTier.color }}>
              {activeTier.name}
            </h3>
            <p className="inspector-role">{activeTier.role}</p>

            <div className="inspector-specs-grid">
              <div className="spec-card">
                <div className="spec-label">
                  <Clock size={12} /> Access Latency
                </div>
                <div className="spec-value" style={{ color: activeTier.color }}>
                  {activeTier.latency}
                </div>
                <div className="spec-sub">{activeTier.cycles}</div>
              </div>

              <div className="spec-card">
                <div className="spec-label">
                  <Database size={12} /> Typical Capacity
                </div>
                <div className="spec-value">{activeTier.capacity}</div>
                <div className="spec-sub">Per processor or system</div>
              </div>

              <div className="spec-card">
                <div className="spec-label">
                  <Zap size={12} /> Raw Bandwidth
                </div>
                <div className="spec-value">{activeTier.bandwidth}</div>
                <div className="spec-sub">Peak transfer throughput</div>
              </div>

              <div className="spec-card">
                <div className="spec-label">
                  <DollarSign size={12} /> Cost Scale
                </div>
                <div className="spec-value">{activeTier.cost}</div>
                <div className="spec-sub">Silicon & board density</div>
              </div>
            </div>

            <div className="inspector-tech-box">
              <strong>Underlying Physical Technology:</strong>
              <p>{activeTier.tech}</p>
            </div>

            <div className="inspector-key-box">
              <div className="key-box-title">
                <Info size={14} /> Architectural Takeaway
              </div>
              <p>{activeTier.takeaway}</p>
            </div>

            <div className="inspector-action-row">
              <button
                className="inspector-link-btn"
                style={{ 
                  backgroundColor: `${activeTier.color}20`,
                  borderColor: activeTier.color,
                  color: activeTier.color
                }}
                onClick={() => {
                  if (onSelectTier) onSelectTier(activeTier.id);
                  setActiveChapter('levels');
                }}
              >
                <span>Deep-Dive into {activeTier.name} Hardware</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Beginner Analogy: The Chef's Kitchen */}
      <section id="chef-analogy" className="analogy-section">
        <div className="section-header">
          <div>
            <span className="section-label">BEGINNER ANALOGY</span>
            <h2>The Chef's Kitchen: Computer Time vs. Human Time</h2>
          </div>
          <p>
            Because numbers like "1 nanosecond" and "100 nanoseconds" both sound microscopic to human ears, beginners often underestimate the delay. 
            Let's scale 1 CPU cycle (0.25 ns) up to <strong>1 human second</strong>.
          </p>
        </div>

        <div className="analogy-view-controls">
          <span>Display Mode:</span>
          <button 
            type="button" 
            className={`pill-toggle ${analogyMode === 'both' ? 'active' : ''}`}
            onClick={() => setAnalogyMode('both')}
          >
            Comparative View (Both)
          </button>
          <button 
            type="button" 
            className={`pill-toggle ${analogyMode === 'human' ? 'active' : ''}`}
            onClick={() => setAnalogyMode('human')}
          >
            Human Kitchen Scale
          </button>
          <button 
            type="button" 
            className={`pill-toggle ${analogyMode === 'nano' ? 'active' : ''}`}
            onClick={() => setAnalogyMode('nano')}
          >
            Real Nanosecond Scale
          </button>
        </div>

        <div className="analogy-cards-grid">
          {KITCHEN_ANALOGY.map((item) => {
            const isHighlighted = item.tierNum === activeTier.tierNum;
            return (
              <div 
                key={item.tierNum} 
                className={`analogy-card ${isHighlighted ? 'highlighted' : ''}`}
                onClick={() => setSelectedTierId(PYRAMID_TIERS.find(t => t.tierNum === item.tierNum)?.id || 'l1')}
              >
                <div className="analogy-card-header">
                  <span className="analogy-tier-pill">Tier {item.tierNum}</span>
                  <span className="analogy-comp-name">{item.name}</span>
                </div>

                {(analogyMode === 'both' || analogyMode === 'human') && (
                  <div className="human-time-box">
                    <div className="human-time-label">IF 1 CYCLE = 1 SECOND:</div>
                    <div className="human-time-val" style={{ color: item.color }}>
                      {item.humanTime}
                    </div>
                    <div className="human-analogy-title">
                      <UtensilsCrossed size={14} /> {item.iconTitle}
                    </div>
                    <p className="human-analogy-desc">{item.desc}</p>
                  </div>
                )}

                {(analogyMode === 'both' || analogyMode === 'nano') && (
                  <div className="comp-time-box">
                    <div className="comp-metric">
                      <span>Physical Latency:</span>
                      <strong>{item.latency}</strong>
                    </div>
                    <div className="comp-metric">
                      <span>CPU Clock Cycles:</span>
                      <strong>{item.cycles}</strong>
                    </div>
                    <div className="comp-metric">
                      <span>Capacity:</span>
                      <strong>{item.capacity}</strong>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="analogy-takeaway-card">
          <h4>💡 The Revelation for Beginners</h4>
          <p>
            Notice the colossal jump! Going from L1 cache (3 seconds) to RAM (5.5 minutes) is the difference between reaching for a knife on the cutting board and having to walk down the street to the market. 
            Going to a mechanical hard drive (1.2 years) is waiting for a cargo ship to sail around the world! That is why cache hits are everything.
          </p>
        </div>
      </section>

      {/* Complete Architectural Matrix Table */}
      <section id="tradeoff-matrix" className="matrix-table-section">
        <div className="section-header">
          <div>
            <span className="section-label">REFERENCE TABLE</span>
            <h2>Complete Architectural Comparison Matrix</h2>
          </div>
          <p>All core specifications across all seven layers of the modern memory hierarchy.</p>
        </div>

        <div className="table-responsive-wrapper">
          <table className="architectural-matrix-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Memory Level</th>
                <th>Typical Latency</th>
                <th>Clock Cycles</th>
                <th>Capacity</th>
                <th>Bandwidth</th>
                <th>Technology</th>
                <th>Volatility</th>
              </tr>
            </thead>
            <tbody>
              {PYRAMID_TIERS.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <tr 
                    key={tier.id}
                    className={isSelected ? 'row-selected' : ''}
                    onClick={() => setSelectedTierId(tier.id)}
                  >
                    <td><span className="tier-tag">{tier.tierNum}</span></td>
                    <td>
                      <div className="table-tier-name">
                        <span className="table-color-dot" style={{ background: tier.color }} />
                        <strong>{tier.name}</strong>
                      </div>
                    </td>
                    <td><code className="time-code">{tier.latency}</code></td>
                    <td>{tier.cycles}</td>
                    <td><b>{tier.capacity}</b></td>
                    <td>{tier.bandwidth}</td>
                    <td><small>{tier.tech}</small></td>
                    <td>
                      <span className={`volatility-badge ${tier.volatility.includes('Yes') ? 'vol-yes' : 'vol-no'}`}>
                        {tier.volatility.includes('Yes') ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Physics & Engineering FAQ Section */}
      <section className="faq-hardware-section">
        <div className="section-header">
          <div>
            <span className="section-label">PHYSICS & ENGINEERING</span>
            <h2>Why Can't We Just Build a 64 GB Register File?</h2>
          </div>
          <p>Three immutable laws of physics and semiconductor economics make a single uniform memory impossible:</p>
        </div>

        <div className="laws-grid">
          <div className="law-card">
            <div className="law-num">01</div>
            <h3>Propagation Delay & Speed of Light in Silicon</h3>
            <p>
              Electrical signals propagate through silicon interconnect wires at approximately 15 cm per nanosecond (~50% of the speed of light in vacuum). 
              A large memory array occupies physical square millimeters of silicon. The sheer distance an electron must travel across wires to reach distant bit cells takes multiple nanoseconds.
            </p>
          </div>

          <div className="law-card">
            <div className="law-num">02</div>
            <h3>Addressing Decoder Gate Fan-Out & RC Latency</h3>
            <p>
              To address a 64 GB memory, the decoder circuit must split and route 36 address lines across billions of multiplexers. 
              The capacitive wire load (RC constant) grows exponentially with array size, dramatically slowing down the wordline charging time compared to a compact 32-entry register file.
            </p>
          </div>

          <div className="law-card">
            <div className="law-num">03</div>
            <h3>Silicon Die Area, Thermal Density & Cost</h3>
            <p>
              An ultra-fast SRAM bit cell requires 6 to 8 transistors (6T-SRAM), whereas DRAM requires only 1 transistor and 1 capacitor (1T1C). 
              Building 64 GB out of 6T-SRAM would require a silicon die larger than a dinner plate, costing hundreds of thousands of dollars and generating thousands of watts of heat.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter Pagination */}
      <ChapterBottomNav activeChapter={activeChapter} setActiveChapter={setActiveChapter} />
    </div>
  );
}
