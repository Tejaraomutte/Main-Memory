import React, { useState } from 'react';
import ChapterBottomNav from './ChapterBottomNav';
import { 
  Sparkles, 
  Calculator, 
  Clock, 
  TrendingUp, 
  Cpu, 
  Gauge, 
  Zap, 
  Info, 
  OctagonAlert 
} from 'lucide-react';

export default function Chapter5Performance({ activeChapter, setActiveChapter }) {
  // AMAT Slider states
  const [l1HitRate, setL1HitRate] = useState(95); // 80 - 99
  const [l2HitRate, setL2HitRate] = useState(80); // 50 - 95
  const [l3HitRate, setL3HitRate] = useState(70); // 40 - 95
  const [dramLatency, setDramLatency] = useState(80); // 50 - 120

  const tL1 = 1.0;
  const tL2 = 4.0;
  const tL3 = 15.0;
  const tRAM = dramLatency;

  const mL1 = (100 - l1HitRate) / 100;
  const mL2 = (100 - l2HitRate) / 100;
  const mL3 = (100 - l3HitRate) / 100;

  // AMAT = T_L1 + M_L1 * (T_L2 + M_L2 * (T_L3 + M_L3 * T_RAM))
  const l3Penalty = tL3 + mL3 * tRAM;
  const l2Penalty = tL2 + mL2 * l3Penalty;
  const amat = tL1 + mL1 * l2Penalty;

  const speedupVsDram = (tRAM / amat).toFixed(1);

  // CPU utilization model:
  // Assuming ideal CPI = 1.0 at 0.25ns clock, memory stalls add (AMAT / 0.25 - 1) cycles
  const computeTime = 1.0; // Normalized compute
  const stallTime = Math.max(0, (amat - 0.25) / 0.25) * 0.4;
  const totalTime = computeTime + stallTime;
  const computePercent = ((computeTime / totalTime) * 100).toFixed(1);
  const stallPercent = (100 - Number(computePercent)).toFixed(1);

  return (
    <div className="page-shell">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Sparkles size={14} /> CHAPTER 05 • ARCHITECTURAL PERFORMANCE
        </div>
        <h1 className="hero-headline">AMAT & <span>The Memory Wall</span></h1>
        <p className="hero-lead">
          Calculate Average Memory Access Time (AMAT), see how a tiny 2% shift in cache hit rate doubles CPU execution speed, 
          and explore why the historical "Memory Wall" defines computer architecture.
        </p>

        <div className="quick-nav-pills">
          <a href="#amat-calculator" className="quick-pill">
            <Calculator size={14} /> Multi-Level AMAT Calculator
          </a>
          <a href="#stall-breakdown" className="quick-pill">
            <Clock size={14} /> CPU Stall Cycles Bar
          </a>
          <a href="#memory-wall" className="quick-pill">
            <TrendingUp size={14} /> The Historical Memory Wall
          </a>
          <a href="#real-world-case" className="quick-pill">
            <Cpu size={14} /> Modern Real-World Innovations
          </a>
        </div>
      </section>

      {/* AMAT Calculator Section */}
      <section id="amat-calculator" className="interactive-module-section">
        <div className="section-header">
          <div>
            <span className="section-label">INTERACTIVE FORMULA LAB</span>
            <h2>Multi-Level Average Memory Access Time (AMAT) Calculator</h2>
          </div>
          <p>
            Adjust the cache hit rates and latencies below to see how overall memory access time is calculated in real processor designs.
          </p>
        </div>

        <div className="amat-calculator-wrapper">
          {/* Controls Card */}
          <div className="amat-controls-card">
            {/* L1 Control */}
            <div className="amat-control-group">
              <div className="control-header">
                <span className="tier-tag l1">L1 DATA CACHE</span>
                <strong>Hit Rate: {l1HitRate}%</strong>
              </div>
              <input 
                type="range" 
                min={80} 
                max={99} 
                step={1} 
                value={l1HitRate}
                onChange={(e) => setL1HitRate(Number(e.target.value))}
              />
              <div className="control-sub">
                <span>Hit Latency: <strong>{tL1} ns</strong> (4 cycles)</span>
                <span>Miss Rate: <strong>{(mL1 * 100).toFixed(1)}%</strong></span>
              </div>
            </div>

            {/* L2 Control */}
            <div className="amat-control-group">
              <div className="control-header">
                <span className="tier-tag l2">L2 CORE BUFFER</span>
                <strong>Hit Rate: {l2HitRate}%</strong>
              </div>
              <input 
                type="range" 
                min={50} 
                max={95} 
                step={1} 
                value={l2HitRate}
                onChange={(e) => setL2HitRate(Number(e.target.value))}
              />
              <div className="control-sub">
                <span>Hit Latency: <strong>{tL2} ns</strong> (14 cycles)</span>
                <span>Miss Rate: <strong>{(mL2 * 100).toFixed(1)}%</strong></span>
              </div>
            </div>

            {/* L3 Control */}
            <div className="amat-control-group">
              <div className="control-header">
                <span className="tier-tag l3">L3 SHARED LLC</span>
                <strong>Hit Rate: {l3HitRate}%</strong>
              </div>
              <input 
                type="range" 
                min={40} 
                max={95} 
                step={1} 
                value={l3HitRate}
                onChange={(e) => setL3HitRate(Number(e.target.value))}
              />
              <div className="control-sub">
                <span>Hit Latency: <strong>{tL3} ns</strong> (50 cycles)</span>
                <span>Miss Rate: <strong>{(mL3 * 100).toFixed(1)}%</strong></span>
              </div>
            </div>

            {/* DRAM Control */}
            <div className="amat-control-group">
              <div className="control-header">
                <span className="tier-tag ram">MAIN MEMORY (DRAM)</span>
                <strong>DRAM Latency: {dramLatency} ns</strong>
              </div>
              <input 
                type="range" 
                min={50} 
                max={120} 
                step={5} 
                value={dramLatency}
                onChange={(e) => setDramLatency(Number(e.target.value))}
              />
              <div className="control-sub">
                <span>Typical DDR5 CAS Latency + Bus Roundtrip</span>
                <span>~200–300 CPU cycles</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="amat-results-card">
            <div className="results-header">
              <Gauge size={20} className="text-cyan" />
              <span>OVERALL MEMORY SYSTEM EFFICIENCY</span>
            </div>

            <div className="big-amat-metric">
              <div className="amat-value text-cyan">
                {amat.toFixed(2)} <span className="unit">ns</span>
              </div>
              <div className="amat-sub-text">Average Memory Access Time (AMAT)</div>
            </div>

            <div className="speedup-badge-box">
              <Zap size={20} className="text-emerald" />
              <div>
                <strong>{speedupVsDram}× FASTER</strong>
                <span>than a system relying directly on DRAM without cache hierarchy</span>
              </div>
            </div>

            <div className="formula-steps-box">
              <div className="formula-title">Mathematical Formula Evaluation:</div>
              <div className="formula-step">
                <span>AMAT = T_L1 + M_L1 × (T_L2 + M_L2 × (T_L3 + M_L3 × T_RAM))</span>
              </div>
              <div className="formula-step">
                <span>AMAT = {tL1} + ({mL1.toFixed(2)} × ({tL2} + {mL2.toFixed(2)} × ({tL3} + {mL3.toFixed(2)} × {tRAM})))</span>
              </div>
              <div className="formula-step highlight">
                <span>AMAT = <strong>{amat.toFixed(3)} ns</strong></span>
              </div>
            </div>

            <div className="amat-insight-card">
              <Info size={16} />
              <p>
                <strong>The Power of High L1 Hit Rates:</strong> Even though DRAM is a crushing {dramLatency} ns away, 
                because L1 hits {l1HitRate}% of the time, the effective perceived latency to the CPU is only <strong>{amat.toFixed(2)} ns</strong>!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Stall Breakdown */}
      <section id="stall-breakdown" className="interactive-module-section">
        <div className="section-header">
          <div>
            <span className="section-label">CPU PIPELINE UTILIZATION</span>
            <h2>Where Does the CPU Spend Its Time?</h2>
          </div>
          <p>
            Visualizing the percentage of clock cycles the CPU execution units spend crunching instructions vs. sitting frozen waiting for memory:
          </p>
        </div>

        <div className="stall-display-card">
          <div className="stall-bars-container">
            <div 
              className="stall-segment compute" 
              style={{ width: `${computePercent}%` }}
              title={`Executing Instructions: ${computePercent}%`}
            >
              <span>Computing: {computePercent}%</span>
            </div>
            <div 
              className="stall-segment stall" 
              style={{ width: `${stallPercent}%` }}
              title={`Stalled Waiting for Memory: ${stallPercent}%`}
            >
              <span>Memory Stall: {stallPercent}%</span>
            </div>
          </div>

          <div className="stall-legend-row">
            <div className="legend-entry">
              <span className="dot compute" />
              <div>
                <strong>Active ALU Computation ({computePercent}%)</strong>
                <small>Math, logic, register operations executing at full core speed</small>
              </div>
            </div>
            <div className="legend-entry">
              <span className="dot stall" />
              <div>
                <strong>Memory Stall Bubble ({stallPercent}%)</strong>
                <small>Execution pipeline stalled waiting for cache misses and bus fills</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Historical Memory Wall */}
      <section id="memory-wall" className="memory-wall-section">
        <div className="section-header">
          <div>
            <span className="section-label">ARCHITECTURAL HISTORY</span>
            <h2>The Memory Wall: The Widening Chasm</h2>
          </div>
          <p>
            Between 1980 and 2005, CPU processing frequencies skyrocketed by <strong>50% per year</strong> (Moore's Law + Dennard Scaling), 
            while DRAM access speeds improved by only <strong>7% per year</strong>.
          </p>
        </div>

        <div className="memory-wall-card">
          <div className="wall-chart-visual">
            <div className="wall-trend cpu-line">
              <div className="trend-label text-cyan">
                <strong>CPU Performance (+50% / yr)</strong>
                <span>4 GHz+ modern clock speeds, multi-issue pipelines, vector registers</span>
              </div>
              <div className="chart-bar cpu-bar" />
            </div>

            <div className="wall-gap-annotation">
              <OctagonAlert size={20} className="text-amber" />
              <span>THE MEMORY WALL (1,000× Latency Divergence)</span>
            </div>

            <div className="wall-trend ram-line">
              <div className="trend-label text-emerald">
                <strong>DRAM Latency Improvement (+7% / yr)</strong>
                <span>Physical capacitor RC delays and off-chip PCB traces remain stubbornly slow</span>
              </div>
              <div className="chart-bar ram-bar" />
            </div>
          </div>

          <div className="wall-explanation">
            <h4>Why This Forced Modern CPU Design to Change</h4>
            <p>
              In the early 1980s, microprocessors (like the Intel 8086) had <strong>no cache at all</strong> because RAM was nearly as fast as the CPU clock. 
              But by 2000, accessing RAM took hundreds of cycles.<br /><br />
              Chip designers had to devote <strong>more than 50% to 70% of the entire silicon die</strong> to SRAM caches (L1, L2, L3) 
              simply to prevent the CPU from idling 99% of the time!
            </p>
          </div>
        </div>
      </section>

      {/* Cutting-Edge Innovations */}
      <section id="real-world-case" className="innovations-section">
        <div className="section-header">
          <div>
            <span className="section-label">CUTTING-EDGE HARDWARE</span>
            <h2>How Modern Processors Conquer the Memory Wall</h2>
          </div>
          <p>Real-world innovations found in the laptops, desktops, and data centers of today:</p>
        </div>

        <div className="innovations-grid">
          <div className="innovate-card">
            <div className="innovate-badge amd">AMD 3D V-Cache</div>
            <h3>Vertical SRAM Die Stacking</h3>
            <p>
              Rather than cramming larger caches horizontally (which balloons die size and cost), 
              AMD stacks a <strong>64 MB 3D SRAM cache die directly on top</strong> of the compute cores using Through-Silicon Vias (TSVs).
            </p>
            <div className="innovate-impact">
              <strong>Impact:</strong> Triples L3 cache to 96 MB, reducing DRAM accesses by up to 50% in gaming and simulation workloads.
            </div>
          </div>

          <div className="innovate-card">
            <div className="innovate-badge apple">Apple Silicon UMA</div>
            <h3>Unified Memory Architecture</h3>
            <p>
              Instead of separate pools of CPU RAM and GPU VRAM connected across a slow PCIe bus, 
              Apple M-Series chips place high-bandwidth LPDDR5X directly next to the SoC package on a shared ultra-wide 128-bit/512-bit bus.
            </p>
            <div className="innovate-impact">
              <strong>Impact:</strong> CPU, GPU, and Neural Engine access the same data with zero-copy overhead at up to 800 GB/s bandwidth.
            </div>
          </div>

          <div className="innovate-card">
            <div className="innovate-badge intel">Intel Hybrid & Mesh</div>
            <h3>Heterogeneous Cores & Sliced LLC</h3>
            <p>
              Intel Core Ultra / Xeon processors divide L3 cache into independent slices connected by a 2D mesh network, 
              balancing latency between high-performance P-cores and energy-efficient E-cores.
            </p>
            <div className="innovate-impact">
              <strong>Impact:</strong> Eliminates bus contention across 24+ physical cores and provides predictable multi-threaded scaling.
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Pagination */}
      <ChapterBottomNav activeChapter={activeChapter} setActiveChapter={setActiveChapter} />
    </div>
  );
}
