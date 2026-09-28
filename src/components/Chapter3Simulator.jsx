import React, { useState, useEffect } from 'react';
import { SIMULATION_SCENARIOS } from '../data/hierarchyData';
import ChapterBottomNav from './ChapterBottomNav';
import { 
  Sparkles, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Cpu, 
  ArrowDown, 
  Radio, 
  Database, 
  Info 
} from 'lucide-react';

export default function Chapter3Simulator({ activeChapter, setActiveChapter }) {
  const [selectedScId, setSelectedScId] = useState('sc1');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1); // 0.5, 1, 2

  const activeScenario = SIMULATION_SCENARIOS.find(s => s.id === selectedScId) || SIMULATION_SCENARIOS[0];
  const steps = activeScenario.steps;
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play interval
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const delay = Math.floor(1800 / simSpeed);
      timer = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          setCurrentStepIdx(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length, simSpeed]);

  const handleSelectScenario = (scId) => {
    setSelectedScId(scId);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  // Status mapping
  const isCpuActive = currentStep.activeHw === 'cpu';
  const isL1Active = currentStep.activeHw === 'l1';
  const isL2Active = currentStep.activeHw === 'l2';
  const isL3Active = currentStep.activeHw === 'l3';
  const isRamActive = currentStep.activeHw === 'ram';

  return (
    <div className="page-shell">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Sparkles size={14} /> CHAPTER 03 • VISUAL EXECUTION ENGINE
        </div>
        <h1 className="hero-headline">Live Memory <span>Lookup Simulator</span></h1>
        <p className="hero-lead">
          Learn by watching: see exactly how electrical signals, address tags, valid bits, and cache lines travel 
          through the hardware when a CPU executes an instruction.
        </p>

        {/* 5 Scenario Selector Cards */}
        <div className="scenario-selector-grid">
          {SIMULATION_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScId;
            return (
              <button
                key={sc.id}
                type="button"
                className={`scenario-card-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectScenario(sc.id)}
              >
                <div className="sc-header">
                  <span className="sc-pill">{sc.tag}</span>
                  <span className="sc-time">{sc.latencyText}</span>
                </div>
                <strong className="sc-title">{sc.title}</strong>
                <div className="sc-item">{sc.itemContext}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Visual Stage Section */}
      <section className="simulation-stage-section">
        {/* Controls Bar */}
        <div className="sim-control-panel">
          <div className="playback-buttons">
            <button 
              type="button" 
              className="ctrl-btn play-pause-btn"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Pause' : (currentStepIdx >= steps.length - 1 ? 'Replay' : 'Play Simulation')}</span>
            </button>
            <button 
              type="button" 
              className="ctrl-btn"
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              title="Previous Step"
            >
              <SkipBack size={16} /> Step
            </button>
            <button 
              type="button" 
              className="ctrl-btn"
              onClick={handleNextStep}
              disabled={currentStepIdx === steps.length - 1}
              title="Next Step"
            >
              Step <SkipForward size={16} />
            </button>
            <button 
              type="button" 
              className="ctrl-btn reset-btn"
              onClick={handleReset}
              title="Reset Simulation"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          <div className="speed-toggle-group">
            <span className="speed-label">Speed:</span>
            {[0.5, 1, 2].map((sp) => (
              <button
                key={sp}
                type="button"
                className={`speed-pill ${simSpeed === sp ? 'active' : ''}`}
                onClick={() => setSimSpeed(sp)}
              >
                {sp}x
              </button>
            ))}
          </div>

          <div className="sim-step-indicator">
            <span>STEP {currentStepIdx + 1} OF {steps.length}</span>
            <div className="step-dots">
              {steps.map((_, i) => (
                <span 
                  key={i} 
                  className={`dot-indicator ${i < currentStepIdx ? 'done' : (i === currentStepIdx ? 'active' : '')}`}
                  onClick={() => { setCurrentStepIdx(i); setIsPlaying(false); }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Visual Canvas */}
        <div className="visual-stage-canvas">
          {/* Active Packet Banner */}
          <div className="active-packet-banner">
            <div className="packet-item">
              <span className="packet-lbl">TARGET ADDRESS:</span>
              <code className="packet-code">{activeScenario.targetAddr}</code>
            </div>
            <div className="packet-item">
              <span className="packet-lbl">INSTRUCTION CONTEXT:</span>
              <strong className="packet-val">{activeScenario.itemContext}</strong>
            </div>
            <div className="packet-item">
              <span className="packet-lbl">CURRENT HARDWARE STATUS:</span>
              <span className={`status-pill ${currentStepIdx === steps.length - 1 ? 'hit' : 'pending'}`}>
                {currentStep.action.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Hardware Blocks Stack */}
          <div className="hardware-blocks-stack">
            {/* CPU Core Block */}
            <div className={`hw-block cpu-block ${isCpuActive ? 'active-pulse' : ''}`}>
              <div className="block-left">
                <Cpu size={24} className="block-icon text-cyan" />
                <div>
                  <strong>CPU Core 0 (Execution Pipeline & Registers)</strong>
                  <small>Register File • ALU • Instruction Decoder</small>
                </div>
              </div>
              <div className="block-status">
                {isCpuActive && (
                  <span className="active-badge">
                    <Radio size={14} className="pulse-icon" /> CPU Active
                  </span>
                )}
              </div>
            </div>

            {/* Bus Channel: CPU to L1 */}
            <div className={`bus-channel ${currentStep.busActive === 'l1-bus' ? 'bus-active' : ''}`}>
              <div className="bus-arrow-flow">
                <ArrowDown size={16} />
              </div>
              <span className="bus-label">L1 Core Dedicated Port (~1.0 ns)</span>
            </div>

            {/* L1 Cache Block */}
            <div className={`hw-block l1-block ${isL1Active ? 'active-pulse' : ''}`}>
              <div className="block-left">
                <span className="cache-icon-tag l1">L1</span>
                <div>
                  <strong>L1 Cache (64 KB Split I/D)</strong>
                  <small>8-Way Set Associative • 64-Byte Lines • SRAM</small>
                </div>
              </div>
              <div className="block-status">
                {isL1Active && activeScenario.targetTier === 'L1' && currentStepIdx >= 1 && (
                  <span className="hit-badge">✓ L1 HIT (0.9 ns)</span>
                )}
                {isL1Active && activeScenario.targetTier !== 'L1' && (
                  <span className="miss-badge">✗ L1 MISS</span>
                )}
              </div>
            </div>

            {/* Bus Channel: L1 to L2 */}
            <div className={`bus-channel ${currentStep.busActive === 'l2-bus' ? 'bus-active' : ''}`}>
              <div className="bus-arrow-flow">
                <ArrowDown size={16} />
              </div>
              <span className="bus-label">Per-Core L2 Link (~4.0 ns)</span>
            </div>

            {/* L2 Cache Block */}
            <div className={`hw-block l2-block ${isL2Active ? 'active-pulse' : ''}`}>
              <div className="block-left">
                <span className="cache-icon-tag l2">L2</span>
                <div>
                  <strong>L2 Cache (1 MB Dedicated Core Buffer)</strong>
                  <small>Unified Instruction & Data • 8-Way Associative</small>
                </div>
              </div>
              <div className="block-status">
                {isL2Active && activeScenario.targetTier === 'L2' && currentStepIdx >= 2 && (
                  <span className="hit-badge">✓ L2 HIT (4.2 ns)</span>
                )}
                {isL2Active && activeScenario.targetTier !== 'L1' && activeScenario.targetTier !== 'L2' && (
                  <span className="miss-badge">✗ L2 MISS</span>
                )}
              </div>
            </div>

            {/* Bus Channel: L2 to L3 */}
            <div className={`bus-channel ${currentStep.busActive === 'l3-bus' ? 'bus-active' : ''}`}>
              <div className="bus-arrow-flow">
                <ArrowDown size={16} />
              </div>
              <span className="bus-label">Cross-Core High-Speed Ring / Mesh Interconnect</span>
            </div>

            {/* L3 Cache Block */}
            <div className={`hw-block l3-block ${isL3Active ? 'active-pulse' : ''}`}>
              <div className="block-left">
                <span className="cache-icon-tag l3">L3</span>
                <div>
                  <strong>L3 Cache (32 MB Last Level LLC)</strong>
                  <small>Shared Across All Cores • Sliced Architecture</small>
                </div>
              </div>
              <div className="block-status">
                {isL3Active && activeScenario.targetTier === 'L3' && (
                  <span className="hit-badge">✓ L3 HIT (14.5 ns)</span>
                )}
                {isL3Active && activeScenario.targetTier === 'RAM' && (
                  <span className="miss-badge">✗ L3 MISS</span>
                )}
              </div>
            </div>

            {/* Bus Channel: L3 to RAM (Off-chip) */}
            <div className={`bus-channel ext-bus ${currentStep.busActive === 'ram-bus' ? 'bus-active' : ''}`}>
              <div className="bus-arrow-flow">
                <ArrowDown size={16} />
              </div>
              <span className="bus-label text-amber">
                Integrated Memory Controller (IMC) ⇄ Off-Chip Motherboard Bus (~80 ns)
              </span>
            </div>

            {/* RAM Block */}
            <div className={`hw-block ram-block ${isRamActive ? 'active-pulse' : ''}`}>
              <div className="block-left">
                <Database size={24} className="block-icon text-emerald" />
                <div>
                  <strong>Main Memory (32 GB DDR5 DRAM)</strong>
                  <small>Row Buffer Activation • CAS Latency • 1T1C Capacitors</small>
                </div>
              </div>
              <div className="block-status">
                {isRamActive && (
                  <span className="fill-badge">DRAM Row Activated (82 ns)</span>
                )}
              </div>
            </div>
          </div>

          {/* Commentary Console */}
          <div className="sim-commentary-console">
            <div className="console-header">
              <div className="console-title">
                <Info size={16} /> HARDWARE STEP INSPECTION
              </div>
              <span className="console-action-tag">ACTION: {currentStep.action}</span>
            </div>
            <p className="console-message">{currentStep.message}</p>
            <div className="console-footer">
              <span>Current Latency Accumulated: <strong>{currentStep.accumulatedLatency}</strong></span>
              <span>Outcome: <strong style={{ color: '#059669' }}>{activeScenario.hitOutcome}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Golden Rules */}
      <section className="simulation-learnings-section">
        <div className="section-header">
          <div>
            <span className="section-label">WHAT TO REMEMBER</span>
            <h2>Three Golden Rules of Memory Lookups</h2>
          </div>
          <p>Key architectural takeaways demonstrated by this visual simulator:</p>
        </div>

        <div className="learnings-grid">
          <div className="learning-card">
            <div className="learning-num">01</div>
            <h3>Hardware Checks in Parallel, Not in Software</h3>
            <p>
              Cache tag checking is executed by dedicated physical hardware comparator circuits in fractions of a nanosecond. 
              It does not run any CPU software code or instructions.
            </p>
          </div>

          <div className="learning-card">
            <div className="learning-num">02</div>
            <h3>Data is Transferred in 64-Byte Lines, Not Single Bytes</h3>
            <p>
              Even if your code only requested a single 4-byte integer (e.g. <code>int x</code>), the hardware fetches a complete 
              <strong> 64-byte cache block</strong> containing 16 integers. This is the foundation of <em>spatial locality</em>.
            </p>
          </div>

          <div className="learning-card">
            <div className="learning-num">03</div>
            <h3>Inclusive Promotion Keeps Upper Tiers Fresh</h3>
            <p>
              When data is found in RAM or L3, it is automatically written into both L2 and L1 on its way to the CPU. 
              If the program accesses that address again soon, it will hit instantly in L1 (temporal locality)!
            </p>
          </div>
        </div>
      </section>

      {/* Chapter Pagination */}
      <ChapterBottomNav activeChapter={activeChapter} setActiveChapter={setActiveChapter} />
    </div>
  );
}
