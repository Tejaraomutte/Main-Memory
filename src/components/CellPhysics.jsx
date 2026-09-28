import React, { useState, useEffect } from 'react';
import { BatteryCharging, Zap, RefreshCw, AlertTriangle, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import ModuleBottomNav from './ModuleBottomNav';

export default function CellPhysics({ onNavigateTab }) {
  // DRAM State
  const [dramCharge, setDramCharge] = useState(100);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dramBit, setDramBit] = useState(1);
  const [refreshCount, setRefreshCount] = useState(0);

  // SRAM State
  const [sramQ, setSramQ] = useState(1);

  // DRAM Natural Discharge simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDramCharge((prev) => {
        if (prev <= 5) {
          setDramBit(0);
          return 0;
        }
        const nextCharge = prev - 4;
        if (nextCharge < 40) {
          setDramBit(0); // Bit corruption due to capacitor discharge
        }
        return nextCharge;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  // Auto Refresh cycle effect for DRAM
  useEffect(() => {
    if (!autoRefresh) return;

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
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setDramCharge(100);
    setDramBit(1);
    setRefreshCount((c) => c + 1);
  };

  const handleToggleSram = () => {
    setSramQ((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Zap size={14} /> MODULE 04 • MICROSCOPIC SILICON CELL PHYSICS
        </div>
        <h1 className="hero-headline">1-Bit DRAM Cell vs <span>1-Bit SRAM Cell</span></h1>
        <p className="hero-lead">
          Explore why DRAM is called <strong>Dynamic</strong> (requires continuous electrical refreshing), 
          while SRAM is called <strong>Static</strong> (holds data indefinitely without leaking).
        </p>
      </section>

      {/* 2-Column Split Stage */}
      <section className="clean-workspace-grid">
        {/* Left: DRAM 1T-1C Box */}
        <div className="workspace-card cell-card-clean dram-card">
          <div className="card-header-bar">
            <div>
              <span className="card-kicker" style={{ color: '#0284c7' }}>DYNAMIC RAM CELL (1T-1C)</span>
              <h3>1 Transistor + 1 Trench Capacitor</h3>
            </div>
            <span className="cell-badge-pill dram">High Density • Leaky</span>
          </div>

          <p className="cell-intro-text">
            Stores each bit as an electrical charge in a microscopic capacitor. Because silicon naturally leaks electrons, 
            the voltage drains away like water from a punctured bucket.
          </p>

          {/* Interactive Capacitor Tank */}
          <div className="capacitor-visual-tank">
            <div className="tank-shell">
              <div 
                className="tank-fluid" 
                style={{ 
                  height: `${dramCharge}%`,
                  backgroundColor: dramCharge > 50 ? '#0284c7' : (dramCharge > 20 ? '#d97706' : '#e11d48')
                }} 
              />
            </div>

            <div className="tank-metrics">
              <div className="metric-line">
                <span>Capacitor Voltage:</span>
                <strong className="metric-val mono">{((dramCharge / 100) * 1.2).toFixed(2)} Volts</strong>
              </div>
              <div className="metric-line">
                <span>Stored Bit Value:</span>
                <strong className={`metric-bit ${dramBit === 1 ? 'one' : 'zero'}`}>
                  Bit {dramBit}
                </strong>
              </div>
              <div className="metric-line">
                <span>Auto-Refresh Pulses:</span>
                <strong className="metric-val mono">{refreshCount} cycles executed</strong>
              </div>
            </div>
          </div>

          {/* Refresh Controls */}
          <div className="cell-controls-box">
            <div className="toggle-row">
              <label className="toggle-switch-lbl">
                <input 
                  type="checkbox" 
                  checked={autoRefresh} 
                  onChange={(e) => setAutoRefresh(e.target.checked)} 
                />
                <span className="toggle-slider" />
                <strong>Auto-Refresh Circuit (t<sub>RFC</sub> Controller): {autoRefresh ? 'ENABLED' : 'DISABLED'}</strong>
              </label>
            </div>

            {!autoRefresh && (
              <div className="leakage-warning-box">
                <AlertTriangle size={16} />
                <span>Auto-refresh disabled! Watch the charge leak until the bit flips to 0.</span>
              </div>
            )}

            <button className="btn-cell-action dram-recharge" onClick={handleManualRefresh}>
              <RefreshCw size={14} /> Manually Recharge Capacitor to 100%
            </button>
          </div>

          <div className="cell-verdict-note">
            <strong>Key Architectural Takeaway:</strong>
            <p>1T1C cells take up 6x less silicon than SRAM, enabling 32GB+ capacities at low cost, but require continuous background refreshing.</p>
          </div>
        </div>

        {/* Right: SRAM 6T Box */}
        <div className="workspace-card cell-card-clean sram-card">
          <div className="card-header-bar">
            <div>
              <span className="card-kicker" style={{ color: '#7c3aed' }}>STATIC RAM CELL (6T-SRAM)</span>
              <h3>6-Transistor Bistable Flip-Flop</h3>
            </div>
            <span className="cell-badge-pill sram">Zero Leakage • Instant</span>
          </div>

          <p className="cell-intro-text">
            Stores each bit using two cross-coupled CMOS inverters. The state locks indefinitely through positive feedback. 
            No capacitors, zero leakage, and zero refreshing required.
          </p>

          {/* Bistable Latch Graphic */}
          <div className="sram-latch-visual">
            <div className="latch-state-circle">
              <span className="latch-big-bit">{sramQ}</span>
              <span className="latch-sub-label">Locked State (Q = {sramQ}, Q̄ = {sramQ === 1 ? 0 : 1})</span>
            </div>

            <div className="latch-specs-list">
              <div className="spec-line">
                <span>Access Latency:</span>
                <strong className="mono">0.5 – 1.0 ns (Instantaneous)</strong>
              </div>
              <div className="spec-line">
                <span>Transistor Count:</span>
                <strong className="mono">6 Transistors per bit</strong>
              </div>
              <div className="spec-line">
                <span>Refresh Required:</span>
                <strong className="mono text-emerald">NO (Static hold)</strong>
              </div>
            </div>
          </div>

          {/* SRAM Controls */}
          <div className="cell-controls-box">
            <button className="btn-cell-action sram-toggle" onClick={handleToggleSram}>
              <Zap size={14} /> Flip Latch State (Now {sramQ} → Change to {sramQ === 1 ? 0 : 1})
            </button>
          </div>

          <div className="cell-verdict-note sram-note">
            <strong>Key Architectural Takeaway:</strong>
            <p>SRAM is 50x faster than DRAM because it never has to wait for capacitor recharge cycles. However, 6 transistors per bit make it too expensive for multi-gigabyte main memory.</p>
          </div>
        </div>
      </section>

      {/* Module Bottom Navigation */}
      <ModuleBottomNav currentTab="cell-lab" setCurrentTab={onNavigateTab} />
    </div>
  );
}
