import React, { useState } from 'react';
import { GLOSSARY_TERMS, SPEED_LEVELS } from '../data/memoryData';
import { BookOpen, Search, ArrowRight, Lightbulb, Zap, Laptop, HardDrive, Cpu, Play, RotateCcw, Clock, Sparkles } from 'lucide-react';
import ModuleBottomNav from './ModuleBottomNav';

export default function BeginnerAcademy({ onNavigateTab }) {
  const [activeStep, setActiveStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Speed Race State
  const [racing, setRacing] = useState(false);
  const [raceProgress, setRaceProgress] = useState({
    'CPU Registers': 0,
    'L1 CPU Cache': 0,
    'L2 CPU Cache': 0,
    'L3 CPU Cache': 0,
    'Main Memory (DDR5 RAM)': 0,
    'NVMe Gen4 SSD': 0,
    'Hard Disk Drive (HDD)': 0
  });

  const startRace = () => {
    if (racing) return;
    setRacing(true);
    setRaceProgress({
      'CPU Registers': 0,
      'L1 CPU Cache': 0,
      'L2 CPU Cache': 0,
      'L3 CPU Cache': 0,
      'Main Memory (DDR5 RAM)': 0,
      'NVMe Gen4 SSD': 0,
      'Hard Disk Drive (HDD)': 0
    });

    setTimeout(() => setRaceProgress(p => ({ ...p, 'CPU Registers': 100 })), 150);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'L1 CPU Cache': 100 })), 350);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'L2 CPU Cache': 100 })), 700);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'L3 CPU Cache': 100 })), 1200);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'Main Memory (DDR5 RAM)': 100 })), 1900);
    
    let ssdProg = 0;
    const ssdInt = setInterval(() => {
      ssdProg += 3;
      if (ssdProg >= 45) clearInterval(ssdInt);
      setRaceProgress(p => ({ ...p, 'NVMe Gen4 SSD': ssdProg }));
    }, 100);

    setTimeout(() => setRacing(false), 2600);
  };

  const resetRace = () => {
    setRacing(false);
    setRaceProgress({
      'CPU Registers': 0,
      'L1 CPU Cache': 0,
      'L2 CPU Cache': 0,
      'L3 CPU Cache': 0,
      'Main Memory (DDR5 RAM)': 0,
      'NVMe Gen4 SSD': 0,
      'Hard Disk Drive (HDD)': 0
    });
  };

  const filteredGlossary = GLOSSARY_TERMS.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.def.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <BookOpen size={14} /> MODULE 06 • BEGINNER INTUITION ACADEMY
        </div>
        <h1 className="hero-headline">How Memory <span>Actually Works</span></h1>
        <p className="hero-lead">
          No engineering degree required. Everything in computer memory revolves around one simple problem: 
          <strong> the CPU thinks in nanoseconds, but permanent files live in slow storage.</strong>
        </p>
      </section>

      {/* Interactive 4-Step Lifecycle Journey */}
      <section className="workspace-card lifecycle-card">
        <div className="card-header-bar">
          <div>
            <span className="card-kicker">STEP-BY-STEP PIPELINE</span>
            <h3>What Happens When You Open an App or Game?</h3>
          </div>
          <div className="step-pills-row">
            {[1, 2, 3, 4].map(s => (
              <button 
                key={s} 
                className={`step-btn-pill ${activeStep === s ? 'active' : ''}`}
                onClick={() => setActiveStep(s)}
              >
                Step 0{s}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Pipeline Nodes */}
        <div className="lifecycle-pipeline-row">
          <div className={`pipeline-node ${activeStep === 1 ? 'active-node' : ''}`}>
            <div className="node-icon-box storage-color"><HardDrive size={22} /></div>
            <strong>01. SSD Storage</strong>
            <small>Game files saved on disk</small>
            <span className="node-tag">Slow • Permanent</span>
          </div>

          <div className="pipeline-arrow"><ArrowRight size={20} /></div>

          <div className={`pipeline-node ${activeStep === 2 ? 'active-node' : ''}`}>
            <div className="node-icon-box bus-color"><Zap size={22} /></div>
            <strong>02. System Bus</strong>
            <small>Data travels across motherboard</small>
            <span className="node-tag">Copper Traces</span>
          </div>

          <div className="pipeline-arrow"><ArrowRight size={20} /></div>

          <div className={`pipeline-node ${activeStep === 3 ? 'active-node' : ''}`}>
            <div className="node-icon-box ram-color"><Laptop size={22} /></div>
            <strong>03. System RAM</strong>
            <small>Loaded into working space</small>
            <span className="node-tag">Fast • 10–20ns</span>
          </div>

          <div className="pipeline-arrow"><ArrowRight size={20} /></div>

          <div className={`pipeline-node ${activeStep === 4 ? 'active-node' : ''}`}>
            <div className="node-icon-box cpu-color"><Cpu size={22} /></div>
            <strong>04. CPU Core</strong>
            <small>Executes 4 billion ops/sec</small>
            <span className="node-tag">Instant • 0.25ns</span>
          </div>
        </div>

        {/* Dynamic Step Detail Card */}
        <div className="step-explanation-box">
          {activeStep === 1 && (
            <div>
              <h4 className="text-amber">Step 1: The App Lives on Permanent Storage (SSD / Hard Drive)</h4>
              <p>When your computer is turned off, all your photos, games, and applications reside on your SSD. SSD storage is permanent (non-volatile), but it is physically located inches away across cables and PCIe buses, making it thousands of times too slow for the CPU to run code directly from it.</p>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <h4 className="text-cyan">Step 2: Operating System Copies Code Across the System Bus</h4>
              <p>When you double-click an icon, the OS kernel instructs the storage controller to read the compiled machine code instructions and stream them across the motherboard bus wires directly into RAM.</p>
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <h4 className="text-emerald">Step 3: Main Memory (RAM) Becomes the Active Working Desk</h4>
              <p>Now the entire game code, 3D textures, and player variables are sitting directly inside RAM's 2D silicon matrix. The CPU can now read or write any random byte in just 10 to 20 nanoseconds!</p>
            </div>
          )}
          {activeStep === 4 && (
            <div>
              <h4 className="text-purple">Step 4: The CPU ALU Crunches Instructions at Light Speed</h4>
              <p>Because the instructions are in RAM (and cached in SRAM), the CPU core pipeline can execute billions of instructions per second without starving. When you close the app or turn off your PC, RAM clears itself for the next program.</p>
            </div>
          )}
        </div>
      </section>

      {/* Speed Race Visualizer */}
      <section className="workspace-card race-card">
        <div className="card-header-bar">
          <div>
            <span className="card-kicker">ACCESS LATENCY COMPARISON</span>
            <h3>The Hardware Speed Race: Why Storage Needs RAM</h3>
          </div>
          <div className="race-btn-group">
            <button className="btn-bus-run" onClick={startRace} disabled={racing}>
              <Play size={15} /> {racing ? 'Racing...' : 'Start Speed Race'}
            </button>
            <button className="btn-bus-reset" onClick={resetRace}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        <div className="race-lanes-list">
          {SPEED_LEVELS.map((tier) => {
            const progress = raceProgress[tier.name] ?? 0;
            return (
              <div key={tier.name} className="race-lane-row">
                <div className="race-tier-info">
                  <strong>{tier.name}</strong>
                  <small>{tier.actual}</small>
                </div>
                <div className="race-track-slot">
                  <div 
                    className="race-runner-bar" 
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: tier.color 
                    }} 
                  />
                </div>
                <div className="race-finish-badge">
                  {progress === 100 ? (
                    <span className="badge-finish">✓ Arrived ({tier.humanScale})</span>
                  ) : (
                    <span className="badge-waiting">{progress > 0 ? 'Travelling...' : 'Waiting'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Searchable Glossary */}
      <section className="workspace-card glossary-card">
        <div className="card-header-bar">
          <div>
            <span className="card-kicker">REFERENCE ENCYCLOPEDIA</span>
            <h3>Main Memory Jargon Buster</h3>
          </div>
          <div className="glossary-search-box">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search terms (e.g. RAS, CAS, Volatile, Refresh)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="glossary-grid-clean">
          {filteredGlossary.map((item) => (
            <div key={item.term} className="glossary-term-card">
              <strong className="term-name">{item.term}</strong>
              <p className="term-def">{item.def}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Module Bottom Navigation */}
      <ModuleBottomNav currentTab="academy" setCurrentTab={onNavigateTab} />
    </div>
  );
}
