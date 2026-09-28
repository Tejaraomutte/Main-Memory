import React, { useState } from 'react';
import { PYRAMID_TIERS } from '../data/hierarchyData';
import ChapterBottomNav from './ChapterBottomNav';
import { 
  Sparkles, 
  Clock, 
  Cpu, 
  Play, 
  RotateCcw, 
  Info, 
  Database, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

const TIER_DETAILS = {
  registers: {
    banner: 'CPU General-Purpose Register File — The Zero-Latency Core',
    desc: 'Registers are multi-ported static flip-flops placed directly adjacent to the ALU execution units. They supply source operands and store results in a single clock edge without bus contention.',
    pillars: [
      { num: '01', title: 'Multi-Ported Access', text: 'Register files feature up to 4 to 8 read ports and 2 to 4 write ports, enabling multiple execution units to read operands and retire instructions simultaneously.' },
      { num: '02', title: 'Zero Wait Cycles', text: 'Unlike caches which require tag lookups, registers are directly addressed by 5-bit register IDs (e.g. RAX=0, RBX=3) with no tag match overhead.' },
      { num: '03', title: 'Register Renaming (ROB)', text: 'Modern Out-of-Order CPUs use Reorder Buffers (ROB) and 128+ physical registers to eliminate false WAW and WAR register dependencies.' }
    ],
    specs: [
      { label: 'Access Latency', val: '0.25 – 0.5 ns (0–1 cycle)' },
      { label: 'Physical Capacity', val: '128–256 physical registers' },
      { label: 'Read/Write Ports', val: 'Up to 8 Read, 4 Write' },
      { label: 'Addressing Scheme', val: '5-bit immediate index in opcode' }
    ],
    waitCycles: 1,
    simLatency: '0.25 ns (1 clock cycle)',
    simWhatDoing: 'Zero pipeline stall! Operands are latched into ALU input registers in the exact same clock pulse as instruction decode.'
  },
  l1: {
    banner: 'Level 1 (L1) Cache — The Ultra-Fast Split Harvard Shield',
    desc: 'L1 cache is the first place the CPU looks when an instruction needs to read or write memory. To prevent structural pipeline conflicts, modern CPUs strictly split L1 into two separate independent caches: L1-Instruction (L1i) and L1-Data (L1d).',
    pillars: [
      { num: '01', title: 'Split Harvard Architecture', text: 'If instruction fetching and data loads shared the same cache, an instruction fetch and a memory load (like MOV [RSP], RAX) would collide, stalling the pipeline. Splitting L1 allows simultaneous fetch and memory execution.' },
      { num: '02', title: '6T SRAM Cell Anatomy', text: 'Each bit is stored on two cross-coupled CMOS inverters with two access transistors connected to the wordline. Once written, the state remains stable forever as long as power is applied—no periodic refreshing required.' },
      { num: '03', title: 'VIPT (Virtually Indexed, Physically Tagged)', text: 'L1 caches use VIPT indexing so the cache lookup can proceed concurrently with the TLB virtual-to-physical address translation, shaving a full clock cycle off access latency.' }
    ],
    specs: [
      { label: 'Access Latency', val: '4 clock cycles (~1 ns)' },
      { label: 'Associativity', val: '8-way set associative typical' },
      { label: 'Line Size', val: '64 bytes standard' },
      { label: 'Typical Hit Rate', val: '94% – 97% for general programs' }
    ],
    waitCycles: 4,
    simLatency: '1.0 ns (4 clock cycles)',
    simWhatDoing: 'Tiny Pipeline Bubble: 4 clock cycles is brief enough that modern out-of-order execution engines (like Intel Raptor Lake or AMD Zen 4) can hide the delay by executing unrelated independent instructions.'
  },
  l2: {
    banner: 'Level 2 (L2) Cache — The Core-Dedicated Buffer',
    desc: 'L2 cache serves as a private, high-capacity intermediate buffer for each CPU core. It catches L1 misses and handles non-trivial data structures without leaving the core boundary.',
    pillars: [
      { num: '01', title: 'Unified Data & Code', text: 'Unlike L1, L2 combines instructions and data into one larger structure (typically 1MB to 2MB per core in modern Zen 4 / Raptor Lake).' },
      { num: '02', title: 'Non-Inclusive or Inclusive', text: 'Architectures choose between inclusive (L2 duplicates L1 lines) or non-inclusive (L2 only holds lines evicted from L1) to optimize cache density.' },
      { num: '03', title: 'Prefetch Filter', text: 'Hardware prefetchers monitor L2 miss patterns and stream sequential memory lines from L3 or RAM ahead of time.' }
    ],
    specs: [
      { label: 'Access Latency', val: '12 – 14 clock cycles (~3–4 ns)' },
      { label: 'Associativity', val: '8-way to 16-way associative' },
      { label: 'Per-Core Capacity', val: '1 MB – 2 MB per core' },
      { label: 'Bandwidth', val: '~1,000 GB/s per core' }
    ],
    waitCycles: 14,
    simLatency: '3.5 ns (14 clock cycles)',
    simWhatDoing: 'Brief Out-of-Order Buffer: The CPU core looks for independent instructions in the Reorder Buffer (ROB) to keep execution ports busy while the 14-cycle L2 line fill completes.'
  },
  l3: {
    banner: 'Level 3 (L3) Cache — The Last Level Shared LLC',
    desc: 'L3 is shared across all physical cores on a CPU die or compute cluster (CCD). It allows cores to share common code libraries and communicate without round-tripping to external DRAM.',
    pillars: [
      { num: '01', title: 'Sliced Bank Architecture', text: 'L3 is partitioned into multiple slices matched with individual cores, connected via a bidirectional ring bus or 2D mesh interconnect.' },
      { num: '02', title: 'Cache Coherency Snoop Hub', text: 'L3 coordinates protocols like MESI / MOESI, ensuring that if Core 1 writes to a memory address, all other cores see the updated value.' },
      { num: '03', title: '3D Vertical Die Stacking', text: 'AMD 3D V-Cache vertically bonds an extra 64MB SRAM cache slice directly on top of the CPU core die using microscopic copper-to-copper Through-Silicon Vias (TSVs).' }
    ],
    specs: [
      { label: 'Access Latency', val: '40 – 55 clock cycles (~12–15 ns)' },
      { label: 'Total Capacity', val: '32 MB – 96 MB+' },
      { label: 'Interconnect Bus', val: 'High-speed Ring / 2D Mesh' },
      { label: 'Shared Scope', val: 'All CPU cores in cluster' }
    ],
    waitCycles: 50,
    simLatency: '14.0 ns (50 clock cycles)',
    simWhatDoing: 'Interconnect Transit: Electrical signals travel across the silicon ring or mesh network, arbitration checks snoop filters, and data returns to the requesting core.'
  },
  ram: {
    banner: 'Main Memory (DRAM) — The Volatile Working Space',
    desc: 'DRAM stores billions of bits using tiny 1-transistor 1-capacitor cells. Because capacitors leak charge, memory controllers constantly run refresh cycles every 64 milliseconds.',
    pillars: [
      { num: '01', title: '1T1C Silicon Economics', text: 'Using only 1 transistor and 1 capacitor allows tens of billions of bits on an inexpensive silicon die, making 32GB to 64GB affordable for consumers.' },
      { num: '02', title: 'The CAS Latency Delay (tCL)', text: 'The memory controller must drive row address (RAS), wait for wordline activation, charge sense amplifiers, and issue column address (CAS).' },
      { num: '03', title: 'Off-Chip Motherboard Traces', text: 'Signals must travel off the CPU die, through package pins, across motherboard copper traces to DIMM slots, incurring significant impedance delay.' }
    ],
    specs: [
      { label: 'Access Latency', val: '150 – 300 cycles (~60–80 ns)' },
      { label: 'Cell Structure', val: '1 Transistor + 1 Trench Capacitor' },
      { label: 'Refresh Standard', val: 'Periodic refresh every 64ms' },
      { label: 'Bus Interface', val: 'DDR5 128-bit Dual Channel' }
    ],
    waitCycles: 260,
    simLatency: '80.0 ns (260 clock cycles)',
    simWhatDoing: 'Major Pipeline Stall: Out-of-order execution buffers fill up completely! The CPU execution units stall and go idle waiting for off-chip DDR5 signals to return.'
  },
  ssd: {
    banner: 'Solid-State Drive (NVMe SSD) — High-Speed Non-Volatile Flash',
    desc: '3D NAND Flash stacks hundreds of layers of floating-gate or charge-trap cells. High-voltage quantum tunneling traps electrons to retain data without electricity.',
    pillars: [
      { num: '01', title: '3D Vertical Layer Stacking', text: 'Modern flash chips stack 176 to 232+ cell layers vertically to maximize gigabytes per wafer.' },
      { num: '02', title: 'Block Erase & Wear Leveling', text: 'Flash cannot overwrite bits directly; entire blocks (typically 2MB to 8MB) must be erased before rewriting. Controllers manage wear leveling.' },
      { num: '03', title: 'PCIe NVMe Bus Protocol', text: 'Uses high-speed PCIe lanes (PCIe 4.0 / 5.0) with deep queue depths (up to 64K commands) for massive parallel throughput.' }
    ],
    specs: [
      { label: 'Access Latency', val: '25 – 100 microseconds (μs)' },
      { label: 'Clock Cycles Waited', val: '100,000 – 400,000 cycles' },
      { label: 'Cell Endurance', val: '1,000 – 3,000 P/E cycles' },
      { label: 'Non-Volatile', val: 'Preserves data for 10+ years' }
    ],
    waitCycles: 350, // Scaled for visual representation
    simLatency: '75.0 μs (300,000 clock cycles)',
    simWhatDoing: 'Thread Context Switch: The wait time is so vast (hundreds of thousands of cycles) that the OS puts the active thread to sleep and switches CPU execution to another program entirely.'
  },
  hdd: {
    banner: 'Mechanical Hard Disk (HDD) — Magnetic Rotating Platters',
    desc: 'Spins magnetic aluminum or glass platters at 5,400 to 7,200 RPM while microscopic voice-coil actuator arms move read/write heads across physical sectors.',
    pillars: [
      { num: '01', title: 'Mechanical Seek Latency', text: 'Moving a physical mechanical arm across platter tracks takes 3 to 10 milliseconds—literally millions of times slower than silicon.' },
      { num: '02', title: 'Rotational Delay', text: 'Waiting for the requested magnetic disk sector to spin under the read head takes another 2 to 4 milliseconds.' },
      { num: '03', title: 'Maximum Archival Density', text: 'Helium-sealed drives with Heat-Assisted Magnetic Recording (HAMR) achieve 28TB to 32TB+ capacities at minimal cost per terabyte.' }
    ],
    specs: [
      { label: 'Access Latency', val: '5 – 15 milliseconds (ms)' },
      { label: 'Clock Cycles Waited', val: '20,000,000 – 60,000,000 cycles' },
      { label: 'Physical RPM', val: '5,400 or 7,200 RPM' },
      { label: 'Interface', val: 'SATA III 6 Gbps' }
    ],
    waitCycles: 600, // Scaled for visual
    simLatency: '10.0 ms (40,000,000 clock cycles)',
    simWhatDoing: 'Geological Delay: In CPU clock time, 10 milliseconds is long enough for the processor to have executed 40 million instructions. The OS leaves the thread suspended for an eternity.'
  }
};

export const TIER_PULLS = [
  { id: 'registers', icon: '▦', name: 'CPU Registers', color: '#0891b2' },
  { id: 'l1', icon: 'L1', name: 'Level 1 (L1) Cache', color: '#0284c7' },
  { id: 'l2', icon: 'L2', name: 'Level 2 (L2) Cache', color: '#4f46e5' },
  { id: 'l3', icon: 'L3', name: 'Level 3 (L3) Cache (Last Level LLC)', color: '#7c3aed' },
  { id: 'ram', icon: 'RAM', name: 'Main Memory (RAM / DRAM)', color: '#059669' },
  { id: 'ssd', icon: 'SSD', name: 'Solid-State Drive (NVMe SSD)', color: '#d97706' },
  { id: 'hdd', icon: 'HDD', name: 'Mechanical Hard Disk (HDD)', color: '#e11d48' }
];

export default function Chapter2Tiers({ activeChapter, setActiveChapter, selectedTier, setSelectedTier }) {
  const currentTierId = selectedTier || 'l1';
  const tierInfo = TIER_DETAILS[currentTierId] || TIER_DETAILS.l1;
  const currentTierData = PYRAMID_TIERS.find(t => t.id === currentTierId) || PYRAMID_TIERS[1];

  // Simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [cyclesCount, setCyclesCount] = useState(0);
  const [simProgress, setSimProgress] = useState(0);

  const runCycleSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCyclesCount(0);
    setSimProgress(0);

    const targetCycles = tierInfo.waitCycles;
    const stepDuration = Math.max(20, Math.floor(1800 / targetCycles));

    let current = 0;
    const interval = setInterval(() => {
      current += Math.max(1, Math.floor(targetCycles / 40));
      if (current >= targetCycles) {
        current = targetCycles;
        clearInterval(interval);
        setIsSimulating(false);
      }
      setCyclesCount(current);
      setSimProgress((current / targetCycles) * 100);
    }, stepDuration);
  };

  const resetCycleSim = () => {
    setIsSimulating(false);
    setCyclesCount(0);
    setSimProgress(0);
  };

  return (
    <div className="page-shell">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Sparkles size={14} /> CHAPTER 02 • COMPONENT MICRO-ARCHITECTURE
        </div>
        <h1 className="hero-headline">Deep Dive into <span>Memory Tiers</span></h1>
        <p className="hero-lead">
          From multi-ported CPU register files to spinning magnetic platters: discover the physical cell designs, 
          silicon constraints, and wait cycles of every tier.
        </p>

        {/* Tier Selector Pills Bar */}
        <div className="tier-pills-bar">
          {TIER_PULLS.map((t) => {
            const isActive = t.id === currentTierId;
            return (
              <button
                key={t.id}
                type="button"
                className={`tier-tab-btn ${isActive ? 'active' : ''}`}
                style={{ borderColor: isActive ? t.color : 'transparent' }}
                onClick={() => {
                  if (setSelectedTier) setSelectedTier(t.id);
                  resetCycleSim();
                }}
              >
                <span className="tab-icon" style={{ color: t.color }}>{t.icon}</span>
                <span className="tab-title">{t.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Simulator Section: CPU Wait Cycle Pulsar */}
      <section className="interactive-module-section">
        <div className="section-header">
          <div>
            <span className="section-label">WATCH & LEARN SIMULATOR</span>
            <h2>CPU Wait Cycle Pulsar: What Happens to the CPU?</h2>
          </div>
          <p>
            When code requests data from <strong>{currentTierData.name}</strong>, watch the CPU clock counter pulse. 
            Notice how many clock cycles the processor execution units sit completely idle!
          </p>
        </div>

        <div className="cycle-pulsar-board">
          <div className="pulsar-info-col">
            <div className="pulsar-status-row">
              <span 
                className="pulsar-target-badge"
                style={{ backgroundColor: `${currentTierData.color}25`, color: currentTierData.color }}
              >
                TARGET: {currentTierData.name.toUpperCase()}
              </span>
              <span className="pulsar-physical-latency">
                <Clock size={14} /> {tierInfo.simLatency}
              </span>
            </div>

            <div className="cpu-core-visualizer">
              <div className={`cpu-alu-box ${isSimulating ? 'stalled' : (cyclesCount > 0 ? 'finished' : '')}`}>
                <Cpu size={32} />
                <div className="cpu-alu-text">
                  <strong>CPU Execution Core (4.0 GHz)</strong>
                  <span>
                    {isSimulating 
                      ? '⚠️ PIPELINE STALLED — Waiting for Memory Response!'
                      : (cyclesCount > 0 ? '✓ Line Fill Complete — CPU Resumed' : 'Pipeline Ready • Awaiting Memory Request')}
                  </span>
                </div>
              </div>

              <div className="cycle-counter-display">
                <div className="counter-number" style={{ color: currentTierData.color }}>
                  {cyclesCount}
                </div>
                <div className="counter-label">CPU Clock Cycles Waited (1 cycle = 0.25 ns)</div>
              </div>

              <div className="cycle-track">
                <div 
                  className="cycle-track-fill"
                  style={{ 
                    width: `${simProgress}%`,
                    backgroundColor: currentTierData.color,
                    boxShadow: `0 0 15px ${currentTierData.color}`
                  }}
                />
              </div>

              <div className="sim-control-row">
                <button 
                  type="button" 
                  className="primary-btn"
                  onClick={runCycleSimulation}
                  disabled={isSimulating}
                >
                  <Play size={16} /> Simulate CPU Memory Fetch
                </button>
                <button 
                  type="button" 
                  className="secondary-btn"
                  onClick={resetCycleSim}
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </div>
          </div>

          <div className="pulsar-explanation-col">
            <div className="callout-card">
              <h4>
                <Info size={16} /> What is the CPU doing right now?
              </h4>
              <p>{tierInfo.simWhatDoing}</p>

              <div className="key-metrics-summary">
                <div className="metric-item">
                  <span>Physical Latency:</span>
                  <strong>{currentTierData.latency}</strong>
                </div>
                <div className="metric-item">
                  <span>Clock Cycles:</span>
                  <strong>{currentTierData.cycles}</strong>
                </div>
                <div className="metric-item">
                  <span>Technology:</span>
                  <strong>{currentTierData.tech}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Deep Dive Section */}
      <section className="tier-deepdive-section" id={currentTierId}>
        <div className="tier-banner" style={{ borderLeftColor: currentTierData.color }}>
          <div className="banner-top">
            <span 
              className="tier-badge"
              style={{ backgroundColor: `${currentTierData.color}20`, color: currentTierData.color }}
            >
              TIER EXPLORATION • {currentTierData.tierNum}
            </span>
            <span className="capacity-badge">{currentTierData.capacity}</span>
          </div>

          <h2>{currentTierData.name} — {tierInfo.banner.split('—')[1] || 'Micro-Architecture'}</h2>
          <p className="tier-overview-text">{tierInfo.desc}</p>
        </div>

        {/* 3 Pillars */}
        <div className="deepdive-pillars-grid">
          {tierInfo.pillars.map((p) => (
            <div key={p.num} className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-num">{p.num}</span>
                <h3>{p.title}</h3>
              </div>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Hardware Parameters */}
        <div className="tier-specs-box">
          <div className="specs-box-title">
            <Database size={16} /> Hardware Micro-Architectural Parameters
          </div>
          <div className="specs-keyvalue-grid">
            {tierInfo.specs.map((s, idx) => (
              <div key={idx} className="spec-row">
                <span className="spec-label">{s.label}</span>
                <strong className="spec-value">{s.val}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Silicon Tech Section */}
      <section className="silicon-tech-section">
        <div className="section-header">
          <div>
            <span className="section-label">SILICON CELL COMPARISON</span>
            <h2>How the Bit Cells Work Under the Microscope</h2>
          </div>
          <p>Understanding the fundamental silicon physical difference between SRAM, DRAM, and Flash memory.</p>
        </div>

        <div className="tech-cards-grid">
          {/* 6T SRAM */}
          <div className="tech-card">
            <div className="tech-card-header">
              <span className="tech-tag sram">6T SRAM (Caches)</span>
              <h3>Static RAM: The Speed King</h3>
            </div>
            <div className="tech-diagram-placeholder">
              <div className="circuit-box">
                <code>
                  Vdd ────[P1]──┬──[N1]──── GND<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
                  BL ───[A1]───[Q]───[A2]─── /BL<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
                  Vdd ────[P2]──┴──[N2]──── GND<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Wordline WL Controls A1 & A2]
                </code>
              </div>
            </div>
            <p><strong>How it works:</strong> Two cross-coupled CMOS inverters form a bi-stable latch. Once set to 1 or 0, it holds that state forever without degradation.</p>
            <ul>
              <li><strong>Advantage:</strong> Instantaneous switching speed (~1 ns), zero refresh cycles needed.</li>
              <li><strong>Disadvantage:</strong> Requires 6 large transistors per bit, consuming massive silicon real estate and high leakage power.</li>
            </ul>
          </div>

          {/* 1T1C DRAM */}
          <div className="tech-card">
            <div className="tech-card-header">
              <span className="tech-tag dram">1T1C DRAM (RAM)</span>
              <h3>Dynamic RAM: The Density Wonder</h3>
            </div>
            <div className="tech-diagram-placeholder">
              <div className="circuit-box">
                <code>
                  Bitline BL ────[ Pass Transistor (1T) ]────┬────┐<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Capacitor 1C]<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
                  Wordline WL ──────── Gate ──────────────┴──── Plate Vdd/2
                </code>
              </div>
            </div>
            <p><strong>How it works:</strong> Stores a bit as an electrical charge in a deep microscopic trench capacitor (~30 femtofarads). A single pass transistor controls access.</p>
            <ul>
              <li><strong>Advantage:</strong> Incredibly compact (only 1 transistor + 1 capacitor), allowing tens of billions of cells on a small chip.</li>
              <li><strong>Disadvantage:</strong> Destructive read (reading drains the charge and requires rewriting), and charge leaks constantly requiring periodic refresh.</li>
            </ul>
          </div>

          {/* 3D NAND Flash */}
          <div className="tech-card">
            <div className="tech-card-header">
              <span className="tech-tag flash">3D NAND Flash (SSD)</span>
              <h3>Floating Gate: The Persistent Vault</h3>
            </div>
            <div className="tech-diagram-placeholder">
              <div className="circuit-box">
                <code>
                  Control Gate ─────────────────────────<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;┌─────────────────────────────────┐<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;│ Floating Gate / Charge Trap (Electrons) │<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;└─────────────────────────────────┘<br/>
                  Tunnel Oxide Dielectric Barrier (SiO2)<br/>
                  Silicon Channel ─── Source ── Drain ──
                </code>
              </div>
            </div>
            <p><strong>How it works:</strong> High-voltage quantum tunneling shoots electrons into an electrically isolated floating gate or silicon-nitride charge trap, where they remain trapped for years without power.</p>
            <ul>
              <li><strong>Advantage:</strong> Non-volatile (retains data when powered down) and stacked up to 232+ layers vertically.</li>
              <li><strong>Disadvantage:</strong> High write latency (~100 μs) and high-voltage tunneling gradually degrades the oxide barrier, causing drive wear.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Chapter Pagination */}
      <ChapterBottomNav activeChapter={activeChapter} setActiveChapter={setActiveChapter} />
    </div>
  );
}
