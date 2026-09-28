import React, { useState } from 'react';
import { RAM_HOTSPOTS } from '../data/memoryData';
import { Cpu, Zap, ShieldCheck, Database, Layers, CheckCircle, Info } from 'lucide-react';

export default function HardwareSchematic({ activeComp }) {
  const [selectedHotspotId, setSelectedHotspotId] = useState('dram-chips');

  const currentHotspot = RAM_HOTSPOTS.find(h => h.id === selectedHotspotId) || RAM_HOTSPOTS[0];

  if (activeComp.id === 'dram') {
    return (
      <div className="hardware-schematic-wrapper">
        <div className="schematic-canvas-box">
          {/* Static, high-precision 2D architectural vector schematic */}
          <svg 
            className="dimm-vector-svg" 
            viewBox="0 0 680 230" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* PCB Base (DDR5 Form Factor) */}
            <rect x="25" y="35" width="630" height="150" rx="6" fill="#114232" stroke="#0a2a20" strokeWidth="2.5" />
            <path d="M25 45 L35 45 L35 35 Z" fill="#0a2a20" />
            <path d="M655 45 L645 45 L645 35 Z" fill="#0a2a20" />

            {/* Top Aluminum Thermal Stiffener Bar */}
            <rect x="20" y="27" width="640" height="14" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="40" y1="34" x2="640" y2="34" stroke="#475569" strokeWidth="1" strokeDasharray="6 4" />

            {/* PCB Silkscreen Traces & Ground Plane Grid */}
            <rect x="35" y="47" width="610" height="130" fill="none" stroke="#14532d" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <text x="45" y="60" fill="#166534" fontSize="9" fontFamily="monospace" fontWeight="bold">DDR5 UDIMM • 288-PIN • 1.1V JEDEC</text>
            <text x="540" y="60" fill="#166534" fontSize="9" fontFamily="monospace" fontWeight="bold">6400 MT/s</text>

            {/* Status LED */}
            <circle cx="45" cy="75" r="4.5" fill="#10b981" />
            <circle cx="45" cy="75" r="7" stroke="#10b981" strokeWidth="1" opacity="0.4" />

            {/* 8 BGA DRAM Silicon ICs */}
            {[
              { x: 65, num: 1 },
              { x: 125, num: 2 },
              { x: 185, num: 3 },
              { x: 245, num: 4 },
              { x: 375, num: 5 },
              { x: 435, num: 6 },
              { x: 495, num: 7 },
              { x: 555, num: 8 }
            ].map((chip) => {
              const isTarget = selectedHotspotId === 'dram-chips';
              return (
                <g 
                  key={chip.num} 
                  className="schematic-part-group"
                  onClick={() => setSelectedHotspotId('dram-chips')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect 
                    x={chip.x} 
                    y="75" 
                    width="48" 
                    height="78" 
                    rx="3" 
                    fill={isTarget ? "#1e293b" : "#0f172a"} 
                    stroke={isTarget ? "#38bdf8" : "#334155"} 
                    strokeWidth={isTarget ? "2.5" : "1.5"} 
                  />
                  {/* Chip Silkscreen label */}
                  <circle cx={chip.x + 8} cy="85" r="2.5" fill="#64748b" />
                  <rect x={chip.x + 8} y="96" width="32" height="3" rx="1" fill="#475569" />
                  <rect x={chip.x + 8} y="103" width="24" height="3" rx="1" fill="#475569" />
                  <text 
                    x={chip.x + 24} 
                    y="130" 
                    fill={isTarget ? "#38bdf8" : "#94a3b8"} 
                    fontSize="8" 
                    fontFamily="monospace" 
                    textAnchor="middle" 
                    fontWeight="bold"
                  >
                    DRAM
                  </text>
                  <text 
                    x={chip.x + 24} 
                    y="140" 
                    fill="#64748b" 
                    fontSize="7" 
                    fontFamily="monospace" 
                    textAnchor="middle"
                  >
                    IC #{chip.num}
                  </text>
                </g>
              );
            })}

            {/* PMIC (Power Management IC) in Center */}
            {(() => {
              const isTarget = selectedHotspotId === 'pmic-chip';
              return (
                <g 
                  className="schematic-part-group"
                  onClick={() => setSelectedHotspotId('pmic-chip')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect 
                    x="305" 
                    y="60" 
                    width="55" 
                    height="38" 
                    rx="3" 
                    fill={isTarget ? "#312e81" : "#1e1b4b"} 
                    stroke={isTarget ? "#818cf8" : "#4338ca"} 
                    strokeWidth={isTarget ? "2.5" : "1.5"} 
                  />
                  <text x="332" y="77" fill="#c7d2fe" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PMIC</text>
                  <text x="332" y="89" fill="#818cf8" fontSize="7" fontFamily="monospace" textAnchor="middle">1.1V REG</text>
                </g>
              );
            })()}

            {/* SPD EEPROM Hub */}
            {(() => {
              const isTarget = selectedHotspotId === 'spd-hub';
              return (
                <g 
                  className="schematic-part-group"
                  onClick={() => setSelectedHotspotId('spd-hub')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect 
                    x="312" 
                    y="112" 
                    width="42" 
                    height="32" 
                    rx="2" 
                    fill={isTarget ? "#064e3b" : "#022c22"} 
                    stroke={isTarget ? "#34d399" : "#059669"} 
                    strokeWidth={isTarget ? "2.5" : "1.5"} 
                  />
                  <text x="333" y="127" fill="#a7f3d0" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SPD</text>
                  <text x="333" y="137" fill="#34d399" fontSize="6.5" fontFamily="monospace" textAnchor="middle">EEPROM</text>
                </g>
              );
            })()}

            {/* Decoupling Capacitors */}
            {[
              { x: 116, y: 78 }, { x: 176, y: 78 }, { x: 236, y: 78 },
              { x: 426, y: 78 }, { x: 486, y: 78 }, { x: 546, y: 78 }
            ].map((cap, idx) => {
              const isTarget = selectedHotspotId === 'decoupling-caps';
              return (
                <g 
                  key={idx} 
                  className="schematic-part-group"
                  onClick={() => setSelectedHotspotId('decoupling-caps')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect 
                    x={cap.x} 
                    y={cap.y} 
                    width="6" 
                    height="12" 
                    rx="1" 
                    fill="#d97706" 
                    stroke={isTarget ? "#fbbf24" : "#92400e"} 
                    strokeWidth={isTarget ? "2" : "1"} 
                  />
                </g>
              );
            })}

            {/* Gold Edge Connector Fingers (288-Pin Interface) */}
            {/* Left Bank of Pins */}
            <g 
              onClick={() => setSelectedHotspotId('gold-contacts')} 
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="35" 
                y="185" 
                width="240" 
                height="22" 
                fill="#ca8a04" 
                stroke={selectedHotspotId === 'gold-contacts' ? "#fef08a" : "#a16207"} 
                strokeWidth={selectedHotspotId === 'gold-contacts' ? "2" : "1"} 
              />
              {/* Gold Finger vertical ridges */}
              {[...Array(30)].map((_, i) => (
                <line 
                  key={'lpin-' + i} 
                  x1={40 + i * 7.8} 
                  y1="185" 
                  x2={40 + i * 7.8} 
                  y2="207" 
                  stroke="#eab308" 
                  strokeWidth="2.5" 
                />
              ))}
            </g>

            {/* Mechanical Key Notch Cutout */}
            <g 
              onClick={() => setSelectedHotspotId('key-notch')} 
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="275" 
                y="180" 
                width="30" 
                height="32" 
                fill="#f8fafc" 
                stroke={selectedHotspotId === 'key-notch' ? "#ef4444" : "#cbd5e1"} 
                strokeWidth={selectedHotspotId === 'key-notch' ? "2" : "1"} 
                rx="2"
              />
              <text 
                x="290" 
                y="200" 
                fill="#dc2626" 
                fontSize="7.5" 
                fontFamily="monospace" 
                textAnchor="middle" 
                fontWeight="bold"
              >
                NOTCH
              </text>
            </g>

            {/* Right Bank of Pins */}
            <g 
              onClick={() => setSelectedHotspotId('gold-contacts')} 
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="305" 
                y="185" 
                width="340" 
                height="22" 
                fill="#ca8a04" 
                stroke={selectedHotspotId === 'gold-contacts' ? "#fef08a" : "#a16207"} 
                strokeWidth={selectedHotspotId === 'gold-contacts' ? "2" : "1"} 
              />
              {[...Array(42)].map((_, i) => (
                <line 
                  key={'rpin-' + i} 
                  x1={310 + i * 7.9} 
                  y1="185" 
                  x2={310 + i * 7.9} 
                  y2="207" 
                  stroke="#eab308" 
                  strokeWidth="2.5" 
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Clean, Non-Overlapping Component Selector Chips */}
        <div className="schematic-pin-chips">
          <span className="chips-lead-title">Select Hardware Component to Inspect:</span>
          <div className="pins-button-strip">
            {RAM_HOTSPOTS.map((spot) => {
              const isSelected = spot.id === selectedHotspotId;
              return (
                <button
                  key={spot.id}
                  className={`schematic-pin-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedHotspotId(spot.id)}
                >
                  <span className="pin-tag-badge">{spot.tag}</span>
                  <strong>{spot.title}</strong>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Component Explanation Card */}
        <div className="schematic-detail-card">
          <div className="detail-card-head">
            <span className="detail-tag-pill">{currentHotspot.tag}</span>
            <span className="detail-role">{currentHotspot.role}</span>
          </div>
          <h4 className="detail-title">{currentHotspot.title}</h4>
          <p className="detail-desc">{currentHotspot.desc}</p>
        </div>

        {/* 3-Step Functional Pipeline */}
        <div className="blueprint-pipeline-box">
          <div className="pipeline-header">
            <span className="pipeline-kicker">EXECUTION FLOW</span>
            <h4>How {activeComp.name} Operates in 3 Steps</h4>
          </div>
          <div className="pipeline-steps-grid">
            {activeComp.howItWorks.map((step) => (
              <div key={step.step} className="pipeline-step-item">
                <span className="step-num-circle">{step.step}</span>
                <div className="step-content">
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Non-DRAM Components: Clean Architectural Silicon Cell Breakdown
  return (
    <div className="hardware-schematic-wrapper">
      <div className="silicon-cell-card">
        <div className="cell-card-banner" style={{ borderLeftColor: activeComp.accentColor }}>
          <span className="cell-category-label">{activeComp.category} ARCHITECTURE</span>
          <h3>{activeComp.fullName} Silicon Blueprint</h3>
        </div>

        {/* Cell Architecture Specification Table */}
        <div className="cell-specs-table">
          <div className="cell-table-row">
            <span className="table-prop">Cell Design:</span>
            <strong className="table-val">{activeComp.specs.find(s => s.label === 'Cell Structure')?.value || 'Microscopic Silicon Gate'}</strong>
          </div>
          <div className="cell-table-row">
            <span className="table-prop">Data Volatility:</span>
            <strong className="table-val" style={{ color: activeComp.accentColor }}>{activeComp.badge}</strong>
          </div>
          <div className="cell-table-row">
            <span className="table-prop">Access Latency:</span>
            <strong className="table-val mono">{activeComp.specs.find(s => s.label === 'Access Time')?.value || 'Instantaneous'}</strong>
          </div>
          <div className="cell-table-row">
            <span className="table-prop">System Bus Interface:</span>
            <strong className="table-val">{activeComp.busRole}</strong>
          </div>
        </div>
      </div>

      {/* 3-Step Functional Pipeline */}
      <div className="blueprint-pipeline-box">
        <div className="pipeline-header">
          <span className="pipeline-kicker">EXECUTION FLOW</span>
          <h4>How {activeComp.name} Operates in 3 Steps</h4>
        </div>
        <div className="pipeline-steps-grid">
          {activeComp.howItWorks.map((step) => (
            <div key={step.step} className="pipeline-step-item">
              <span className="step-num-circle" style={{ backgroundColor: `${activeComp.accentColor}20`, color: activeComp.accentColor, borderColor: activeComp.accentColor }}>
                {step.step}
              </span>
              <div className="step-content">
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
