import React, { useState } from 'react';
import { 
  MemoryStick, 
  ShieldCheck, 
  Sun, 
  Zap, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  HelpCircle
} from 'lucide-react';

export default function CompareView() {
  const [activeTab, setActiveTab] = useState('compare'); // 'compare' or 'timeline'
  const [uvExposure, setUvExposure] = useState(0); // 0 to 100% UV erase simulation

  return (
    <div className="compare-view-wrapper">
      <div className="compare-header-bar">
        <div>
          <span className="panel-kicker">ARCHITECTURAL SHOWDOWN & EVOLUTION</span>
          <h3>RAM vs ROM: Two Fundamental Pillars</h3>
          <p className="compare-subtitle">
            One provides high-speed scratch space for your active thoughts; the other preserves permanent foundational rules forever.
          </p>
        </div>

        <div className="segmented-control">
          <button 
            className={activeTab === 'compare' ? 'active-op read' : ''}
            onClick={() => setActiveTab('compare')}
          >
            Side-by-Side Comparison
          </button>
          <button 
            className={activeTab === 'timeline' ? 'active-op write' : ''}
            onClick={() => setActiveTab('timeline')}
          >
            Evolution of ROM (Mask → Flash)
          </button>
        </div>
      </div>

      {activeTab === 'compare' ? (
        <div className="compare-content-section">
          {/* Side-by-Side Hero Cards */}
          <div className="compare-cards-duo">
            <div className="compare-pillar-card ram-pillar">
              <div className="pillar-top-badge">
                <MemoryStick size={20} />
                <span>RANDOM ACCESS MEMORY</span>
              </div>
              <h4>RAM (The Working Space)</h4>
              <p className="pillar-desc">
                High-speed read/write memory where programs and data wait for immediate CPU processing.
              </p>

              <div className="pillar-traits-list">
                <div className="trait-row">
                  <span className="trait-lbl">Volatility:</span>
                  <strong className="badge-volatile">Volatile (Zeroed on power loss)</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Access Speed:</span>
                  <strong>Ultra-Fast (10 – 60 nanoseconds)</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Read / Write:</span>
                  <strong>Continuous high-frequency Read & Write</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Typical Size:</span>
                  <strong>16 GB – 64 GB on modern PCs</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Analogy:</span>
                  <em>The Chef's prep board or student's desk</em>
                </div>
              </div>
            </div>

            <div className="compare-pillar-card rom-pillar">
              <div className="pillar-top-badge">
                <ShieldCheck size={20} />
                <span>READ-ONLY MEMORY</span>
              </div>
              <h4>ROM (The Permanent Guide)</h4>
              <p className="pillar-desc">
                Non-volatile storage holding essential bootstrap instructions, motherboard firmware, and device microcode.
              </p>

              <div className="pillar-traits-list">
                <div className="trait-row">
                  <span className="trait-lbl">Volatility:</span>
                  <strong className="badge-nonvolatile">Non-Volatile (Retains data forever)</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Access Speed:</span>
                  <strong>Moderate (50 – 150 nanoseconds)</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Read / Write:</span>
                  <strong>Read-mostly; special write procedures</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Typical Size:</span>
                  <strong>8 MB – 64 MB (Small firmware payload)</strong>
                </div>
                <div className="trait-row">
                  <span className="trait-lbl">Analogy:</span>
                  <em>The engraved stone rules on the wall</em>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Architectural Feature Matrix */}
          <div className="feature-matrix-card">
            <h4>Detailed Head-to-Head Specification Matrix</h4>
            <div className="matrix-table-wrap">
              <table className="comparison-table-atelier">
                <thead>
                  <tr>
                    <th>Architectural Property</th>
                    <th>RAM (DRAM & SRAM)</th>
                    <th>ROM (EEPROM & Flash)</th>
                    <th>Why This Matters to Beginners</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Data Persistence</strong></td>
                    <td><span className="tag-red">Volatile</span></td>
                    <td><span className="tag-green">Non-Volatile</span></td>
                    <td>Without ROM, a computer wouldn't know how to turn on when powered!</td>
                  </tr>
                  <tr>
                    <td><strong>Write Speed</strong></td>
                    <td>Gigabytes per second (Nanoseconds)</td>
                    <td>Milliseconds (Thousands of times slower)</td>
                    <td>You cannot use ROM as system RAM because writes would stall the CPU.</td>
                  </tr>
                  <tr>
                    <td><strong>Endurance</strong></td>
                    <td>Virtually Infinite writes</td>
                    <td>100,000 to 1,000,000 erase cycles</td>
                    <td>RAM can be written millions of times every single second without wearing out.</td>
                  </tr>
                  <tr>
                    <td><strong>Role at Startup</strong></td>
                    <td>Empty until OS is copied into it</td>
                    <td>Executes immediately at Power-On (POST)</td>
                    <td>ROM hands control over to RAM once Windows or Linux is initialized.</td>
                  </tr>
                  <tr>
                    <td><strong>Cost per Byte</strong></td>
                    <td>Moderate (DRAM) to Expensive (SRAM)</td>
                    <td>Very cheap per chip for tiny capacities</td>
                    <td>Computers use small 32MB ROM chips just for BIOS, saving cost.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Timeline of ROM Evolution */
        <div className="rom-timeline-section">
          <div className="timeline-lead-card">
            <h4>The Quest for Reprogrammable Memory</h4>
            <p>
              Originally, once a ROM chip left the silicon factory, you could never change a single byte. 
              Here is how engineers spent 50 years inventing the technology that led to your smartphone storage!
            </p>
          </div>

          <div className="timeline-cards-row">
            <div className="timeline-node-card">
              <span className="timeline-year">1960s</span>
              <h5>Mask ROM</h5>
              <div className="timeline-badge">Factory Etched</div>
              <p>
                Bits were physically burned onto the silicon mask during wafer fabrication. 
                If a programmer found a software bug, millions of physical chips had to be thrown into the trash!
              </p>
            </div>

            <div className="timeline-node-card">
              <span className="timeline-year">1970s</span>
              <h5>PROM</h5>
              <div className="timeline-badge">One-Time Programmable</div>
              <p>
                Chips came with all bits set to 1. Engineers used a high-voltage burner to blast microscopic nichrome fuses open to 0. 
                You could program it in your own lab, but only once!
              </p>
            </div>

            <div className="timeline-node-card active-timeline-node">
              <span className="timeline-year">1971</span>
              <h5>EPROM (UV Erasable)</h5>
              <div className="timeline-badge">Ultraviolet Quartz Window</div>
              <p>
                Features a famous transparent quartz glass window on top of the ceramic chip. 
                Shining intense ultraviolet (UV) lamp light for 20 minutes neutralized trapped electrons so you could reuse the chip!
              </p>

              {/* Interactive UV Erase Simulator */}
              <div className="uv-sim-box">
                <div className="uv-sim-head">
                  <Sun size={14} />
                  <span>Interactive UV Erase Lamp:</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={uvExposure}
                  onChange={(e) => setUvExposure(Number(e.target.value))}
                />
                <div className="uv-status">
                  <span>UV Exposure: {uvExposure}%</span>
                  <strong>{uvExposure > 80 ? '✨ Memory Erased to 0xFF!' : (uvExposure > 20 ? 'Draining trapped charge...' : 'Data intact')}</strong>
                </div>
              </div>
            </div>

            <div className="timeline-node-card">
              <span className="timeline-year">1983</span>
              <h5>EEPROM</h5>
              <div className="timeline-badge">100% Electrical</div>
              <p>
                No more UV lamps! Electrical voltages could erase and write single bytes in-circuit. 
                This gave birth to the modern Motherboard Flash BIOS and SPD chip on RAM sticks!
              </p>
            </div>

            <div className="timeline-node-card">
              <span className="timeline-year">Today</span>
              <h5>NAND Flash & NVMe</h5>
              <div className="timeline-badge">Modern Storage</div>
              <p>
                Block-level erasable EEPROM evolution with 3D stacked silicon layers (up to 200+ layers), 
                providing Terabytes of storage in every smartphone and SSD!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
