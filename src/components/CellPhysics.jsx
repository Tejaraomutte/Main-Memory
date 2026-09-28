import React, { useState, useEffect } from 'react';
import { BatteryCharging, Zap, RefreshCw, AlertTriangle, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';

export default function CellPhysics({ powerOn }) {
  // DRAM State
  const [dramCharge, setDramCharge] = useState(100);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dramBit, setDramBit] = useState(1);
  const [refreshCount, setRefreshCount] = useState(0);

  // SRAM State
  const [sramQ, setSramQ] = useState(1); // 1 or 0

  // DRAM Discharge simulation effect
  useEffect(() => {
    if (!powerOn) {
      setDramCharge(0);
      setDramBit(0);
      setSramQ(0);
      return;
    }

    const interval = setInterval(() => {
      setDramCharge((prev) => {
        if (prev <= 5) {
          setDramBit(0);
          return 0;
        }
        const nextCharge = prev - 4;
        if (nextCharge < 40) {
          setDramBit(0); // Bit flips due to loss of charge
        }
        return nextCharge;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [powerOn]);

  // Auto Refresh cycle effect for DRAM
  useEffect(() => {
    if (!powerOn || !autoRefresh) return;

    const refreshInterval = setInterval(() => {
      setDramCharge((prev) => {
        if (prev > 0) {
          setRefreshCount((c) => c + 1);
          setDramBit(1);
          return 100;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(refreshInterval);
  }, [powerOn, autoRefresh]);

  const handleManualRefresh = () => {
    if (!powerOn) return;
    setDramCharge(100);
    setDramBit(1);
    setRefreshCount((c) => c + 1);
  };

  const handleWriteDram = (newBit) => {
    if (!powerOn) return;
    setDramBit(newBit);
    setDramCharge(newBit === 1 ? 100 : 0);
  };

  const handleToggleSram = () => {
    if (!powerOn) return;
    setSramQ((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div className="cell-physics-wrapper">
      <div className="cell-header-bar">
        <div>
          <span className="panel-kicker">MICROSCOPIC SILICON COMPARISON</span>
          <h3>1-Bit DRAM Cell vs 1-Bit SRAM Cell</h3>
          <p className="cell-subtitle">
            See why DRAM needs constant electrical refreshing (Dynamic), while SRAM stays locked in place forever (Static).
          </p>
        </div>
      </div>

      <div className="cells-split-stage">
        {/* DRAM 1T-1C Interactive Box */}
        <div className="cell-card dram-physics-card">
          <div className="card-top-tag">
            <span className="cell-type-badge dram-badge">DRAM: 1 Transistor + 1 Capacitor (1T-1C)</span>
            <span className="silicon-density">Extremely High Density (Billions / chip)</span>
          </div>

          <h4>Dynamic RAM (Main Memory)</h4>
          <p className="cell-lead">
            Stores each bit as electrical charge inside a microscopic trench capacitor. 
            Because charge leaks away like water from a tiny hole, it must be continuously refreshed.
          </p>

          {/* Interactive Capacitor Gauge */}
          <div className="capacitor-visualizer">
            <div className="gauge-label-row">
              <span>Capacitor Charge Level:</span>
              <strong style={{ color: dramCharge > 45 ? '#059669' : '#e11d48' }}>
                {dramCharge}% {dramCharge < 40 && '(Corrupting!)'}
              </strong>
            </div>

            <div className="charge-bar-track">
              <div 
                className={`charge-bar-fill ${dramCharge < 40 ? 'danger-fill' : ''}`}
                style={{ width: `${dramCharge}%` }}
              />
              <div className="charge-threshold-line" title="40% Voltage Threshold" />
            </div>

            <div className="bit-detected-row">
              <span>Sense Amp Reads:</span>
              <span className={`bit-pill ${dramBit === 1 ? 'bit-one' : 'bit-zero'}`}>
                Bit: {dramBit}
              </span>
            </div>
          </div>

          {/* Controls for DRAM */}
          <div className="cell-action-bar">
            <button 
              className="atelier-primary-btn" 
              onClick={handleManualRefresh}
              disabled={!powerOn}
            >
              <RefreshCw size={14} />
              <span>Manual Refresh Pulse</span>
            </button>

            <button 
              className={`atelier-secondary-btn ${autoRefresh ? 'active-mode' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
              disabled={!powerOn}
            >
              <span>Auto-Refresh: {autoRefresh ? 'ENABLED (every 64ms)' : 'DISABLED (Watch it leak!)'}</span>
            </button>
          </div>

          <div className="write-bit-options">
            <span>Force Store:</span>
            <button className="pill-btn" onClick={() => handleWriteDram(1)}>Write Bit 1 (Charge)</button>
            <button className="pill-btn" onClick={() => handleWriteDram(0)}>Write Bit 0 (Discharge)</button>
            <small>Refreshes executed: {refreshCount}</small>
          </div>

          <div className="analogy-footer-note">
            <strong>💡 Leaky Bucket Analogy:</strong> DRAM is like a bucket with a pinhole. To keep the water level full, a garden hose must top it up hundreds of times a second.
          </div>
        </div>

        {/* SRAM 6T Bistable Latch Interactive Box */}
        <div className="cell-card sram-physics-card">
          <div className="card-top-tag">
            <span className="cell-type-badge sram-badge">SRAM: 6 Transistors (6T Latch)</span>
            <span className="silicon-density">Lower Density • Extremely Expensive</span>
          </div>

          <h4>Static RAM (CPU L1/L2/L3 Cache)</h4>
          <p className="cell-lead">
            Uses two cross-coupled CMOS inverters forming a bistable flip-flop. 
            As long as electrical power is provided, the bit never degrades and never requires refreshing.
          </p>

          {/* Inverter Latch Schematic Visual */}
          <div className="sram-latch-stage">
            <div className="inverter-pair">
              <div className={`latch-node ${sramQ === 1 ? 'node-high' : 'node-low'}`}>
                <span className="node-title">Node Q</span>
                <span className="node-val">{sramQ}</span>
                <small>{sramQ === 1 ? 'HIGH (1.1V)' : 'LOW (0.0V)'}</small>
              </div>

              <div className="latch-cross-arrows">
                <span>⇄</span>
                <small>Cross-Coupled Feedback</small>
              </div>

              <div className={`latch-node ${sramQ === 0 ? 'node-high' : 'node-low'}`}>
                <span className="node-title">Node Q (Inverse)</span>
                <span className="node-val">{sramQ === 1 ? 0 : 1}</span>
                <small>{sramQ === 1 ? 'LOW (0.0V)' : 'HIGH (1.1V)'}</small>
              </div>
            </div>

            <div className="sram-speed-stat">
              <Zap size={14} className="zap-icon" />
              <span>Response Time: <strong>~0.8 nanoseconds (Zero Refresh Latency)</strong></span>
            </div>
          </div>

          {/* Controls for SRAM */}
          <div className="cell-action-bar">
            <button 
              className="atelier-primary-btn sram-btn" 
              onClick={handleToggleSram}
              disabled={!powerOn}
            >
              <Zap size={14} />
              <span>Flip Latch State (Now {sramQ} → {sramQ === 1 ? 0 : 1})</span>
            </button>
          </div>

          <div className="sram-traits-list">
            <div className="trait-item">
              <ShieldCheck size={14} className="check-icon" />
              <span>No Refresh Pauses — Reads and writes at CPU clock speeds</span>
            </div>
            <div className="trait-item">
              <AlertTriangle size={14} className="warn-icon" />
              <span>6 Transistors take 6x more silicon area than DRAM</span>
            </div>
          </div>

          <div className="analogy-footer-note">
            <strong>💡 Light Switch Analogy:</strong> SRAM is like a mechanical toggle switch on your wall. Once flipped up, it stays up indefinitely without anyone having to touch it again!
          </div>
        </div>
      </div>
    </div>
  );
}
