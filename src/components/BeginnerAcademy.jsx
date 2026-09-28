import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/memoryData';
import { BookOpen, Search, ArrowRight, Lightbulb, Zap, HelpCircle, Laptop, HardDrive, Cpu, CheckCircle } from 'lucide-react';

export default function BeginnerAcademy({ powerOn, setPowerOn }) {
  const [activeStep, setActiveStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = GLOSSARY_TERMS.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.def.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="academy-wrapper">
      {/* Academy Banner */}
      <div className="academy-hero">
        <span className="panel-kicker">BEGINNER INTUITION ACADEMY</span>
        <h2>How Computer Memory Actually Works</h2>
        <p className="hero-lead">
          No engineering degree required. Everything in computer memory revolves around one simple problem: 
          <strong> the CPU thinks in nanoseconds, but files live in slow permanent storage.</strong>
        </p>
      </div>

      {/* Interactive 4-Step Lifecycle Journey */}
      <div className="lifecycle-journey-card">
        <div className="lifecycle-header">
          <div className="lifecycle-title">
            <Laptop size={18} />
            <span>Interactive Journey: What happens when you open an App or Game?</span>
          </div>
          <div className="step-selector-pills">
            {[1, 2, 3, 4].map(s => (
              <button 
                key={s} 
                className={`step-pill ${activeStep === s ? 'step-active' : ''}`}
                onClick={() => setActiveStep(s)}
              >
                Step {s}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Pipeline */}
        <div className="lifecycle-nodes-flow">
          <div className={`lifecycle-node ${activeStep === 1 ? 'node-highlight' : ''}`}>
            <div className="node-icon-box storage-color">
              <HardDrive size={20} />
            </div>
            <strong>01. SSD Storage</strong>
            <small>Game files saved on disk</small>
            <span className="speed-tag">Slow • Permanent</span>
          </div>

          <div className="flow-arrow-wire">
            <ArrowRight size={18} />
          </div>

          <div className={`lifecycle-node ${activeStep === 2 ? 'node-highlight' : ''}`}>
            <div className="node-icon-box ram-color">
              <BookOpen size={20} />
            </div>
            <strong>02. Main RAM</strong>
            <small>Active program loaded</small>
            <span className="speed-tag">Fast • Volatile</span>
          </div>

          <div className="flow-arrow-wire">
            <ArrowRight size={18} />
          </div>

          <div className={`lifecycle-node ${activeStep === 3 ? 'node-highlight' : ''}`}>
            <div className="node-icon-box cache-color">
              <Zap size={20} />
            </div>
            <strong>03. CPU Cache (SRAM)</strong>
            <small>Hot instructions buffered</small>
            <span className="speed-tag">Blazing • Microscopic</span>
          </div>

          <div className="flow-arrow-wire">
            <ArrowRight size={18} />
          </div>

          <div className={`lifecycle-node ${activeStep === 4 ? 'node-highlight' : ''}`}>
            <div className="node-icon-box cpu-color">
              <Cpu size={20} />
            </div>
            <strong>04. CPU Core</strong>
            <small>Executes logic at 5 GHz</small>
            <span className="speed-tag">Brain of Computer</span>
          </div>
        </div>

        {/* Active Step Detailed Explanation */}
        <div className="step-explainer-box">
          {activeStep === 1 && (
            <div>
              <h4>Step 1: Your App Lives Quietly on the SSD</h4>
              <p>
                When your computer is turned off or an application is closed, its code and textures are saved as magnetic or flash charges on your Solid State Drive (SSD). 
                The CPU cannot run code directly from the SSD because transferring data across the drive cable is hundreds of times too slow.
              </p>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <h4>Step 2: Windows / macOS Copies the App into Main RAM</h4>
              <p>
                When you double-click the app icon, the Operating System reads gigabytes of code from the SSD and copies it into <strong>RAM</strong>. 
                Now, the program is waiting in high-speed DRAM chips only inches away from the processor.
              </p>
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <h4>Step 3: The CPU Pulls Active Loops into L1/L2/L3 Cache</h4>
              <p>
                Inside the computer processor, high-speed <strong>SRAM Cache</strong> predicts what instructions the app will run next. 
                It prefetches the next loop so the CPU cores never have to pause for a single clock cycle.
              </p>
            </div>
          )}
          {activeStep === 4 && (
            <div>
              <h4>Step 4: The CPU ALU Calculates at 5 Billion Times a Second!</h4>
              <p>
                Your game graphics render, calculations finish, and physics compute! 
                If you suddenly pull the power cord, whatever unsaved work was sitting in RAM is lost, but the original saved files on the SSD remain safe.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3 Core Analogies Cards */}
      <div className="analogies-grid">
        <div className="analogy-card">
          <div className="analogy-badge">
            <span>ANALOGY 1</span>
          </div>
          <h3>The Chef's Kitchen</h3>
          <div className="analogy-subitems">
            <div className="subitem">
              <strong>Cutting Board (RAM):</strong> Where the chef chops onions and prepares meals right now. Fast and easy to reach, but limited space.
            </div>
            <div className="subitem">
              <strong>Pantry Shelf (SSD):</strong> Big boxes and ingredients stored in jars. Takes a minute to walk over, but holds weeks of groceries.
            </div>
          </div>
        </div>

        <div className="analogy-card">
          <div className="analogy-badge">
            <span>ANALOGY 2</span>
          </div>
          <h3>The Whiteboard vs Stone</h3>
          <div className="analogy-subitems">
            <div className="subitem">
              <strong>RAM = Whiteboard:</strong> You write math equations with dry-erase markers. Quick to erase and change, but wipes clean at the end of the day.
            </div>
            <div className="subitem">
              <strong>ROM = Carved Stone:</strong> The emergency exit sign carved in granite. You can't change it easily, but it stays forever without batteries.
            </div>
          </div>
        </div>

        <div className="analogy-card">
          <div className="analogy-badge">
            <span>ANALOGY 3</span>
          </div>
          <h3>Dual Channel = 2 Highway Lanes</h3>
          <div className="analogy-subitems">
            <div className="subitem">
              <strong>Single Stick (Single Channel):</strong> One 64-bit road. If many cars (data packets) want to travel, traffic queues up.
            </div>
            <div className="subitem">
              <strong>Two Sticks in Slots 2 & 4:</strong> Two parallel 64-bit roads (128-bit total). Data throughput literally doubles!
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Glossary */}
      <div className="glossary-section">
        <div className="glossary-header">
          <div className="glossary-title">
            <BookOpen size={18} />
            <span>Memory Architecture Glossary</span>
          </div>
          <div className="glossary-search">
            <Search size={14} />
            <input 
              type="text" 
              placeholder="Search any term (e.g. volatile, CL, SPD)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="glossary-grid">
          {filteredGlossary.map((g) => (
            <div key={g.term} className="glossary-card">
              <strong>{g.term}</strong>
              <p>{g.def}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
