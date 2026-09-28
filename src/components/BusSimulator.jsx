import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ArrowRight, 
  Cpu, 
  Activity, 
  HelpCircle,
  Zap,
  Clock,
  Sparkles,
  Calculator,
  Sliders
} from 'lucide-react';
import ModuleBottomNav from './ModuleBottomNav';

const INITIAL_RAM_DATA = {
  '0x00': '0x1A',
  '0x01': '0x4F',
  '0x02': '0x88',
  '0x03': '0x00',
  '0x04': '0xFE',
  '0x05': '0x3B',
  '0x06': '0x99',
  '0x07': '0x42'
};

export default function BusSimulator({ onNavigateTab }) {
  const [ramData, setRamData] = useState(INITIAL_RAM_DATA);
  const [operation, setOperation] = useState('READ'); // 'READ' or 'WRITE'
  const [selectedAddress, setSelectedAddress] = useState('0x07');
  const [dataToWrite, setDataToWrite] = useState('0xAA');
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Address, 2: Control, 3: RAM Access, 4: Data Bus Complete
  const [cycleLog, setCycleLog] = useState([]);
  const [cpuRegisters, setCpuRegisters] = useState({
    MAR: '0x07',
    MDR: '0x00',
    PC: '0x0040'
  });

  // Address Bus Width Calculator State
  const [addressLines, setAddressLines] = useState(32);

  const resetSimulation = () => {
    setCurrentStep(0);
    setCycleLog([]);
  };

  const executeStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    if (stepNumber === 1) {
      setCpuRegisters(prev => ({ ...prev, MAR: selectedAddress }));
      setCycleLog(prev => [
        ...prev,
        {
          step: 1,
          bus: 'Address Bus',
          color: '#0284c7',
          text: `CPU loads target address ${selectedAddress} into Memory Address Register (MAR) and drives it onto the Address Bus.`
        }
      ]);
    } else if (stepNumber === 2) {
      setCycleLog(prev => [
        ...prev,
        {
          step: 2,
          bus: 'Control Bus',
          color: '#d97706',
          text: `Control line asserts ${operation === 'READ' ? 'MEM_READ = HIGH (1)' : 'MEM_WRITE = HIGH (1)'} and coordinates clock synchronization.`
        }
      ]);
    } else if (stepNumber === 3) {
      if (operation === 'WRITE') {
        setCpuRegisters(prev => ({ ...prev, MDR: dataToWrite }));
      }
      setCycleLog(prev => [
        ...prev,
        {
          step: 3,
          bus: 'Memory Controller',
          color: '#059669',
          text: `Memory Row & Column Decoders energize cell at ${selectedAddress}. Sense amplifiers prepare ${operation === 'READ' ? 'capacitor charge read' : 'charge write'}.`
        }
      ]);
    } else if (stepNumber === 4) {
      if (operation === 'READ') {
        const val = ramData[selectedAddress] || '0x00';
        setCpuRegisters(prev => ({ ...prev, MDR: val }));
        setCycleLog(prev => [
          ...prev,
          {
            step: 4,
            bus: 'Data Bus',
            color: '#4f46e5',
            text: `Data value ${val} travels back across the bidirectional Data Bus and latches into the Memory Data Register (MDR). Cycle complete!`
          }
        ]);
      } else {
        setRamData(prev => ({ ...prev, [selectedAddress]: dataToWrite }));
        setCycleLog(prev => [
          ...prev,
          {
            step: 4,
            bus: 'Data Bus',
            color: '#4f46e5',
            text: `Data value ${dataToWrite} is transferred over the Data Bus and written into RAM cell ${selectedAddress}. Memory updated!`
          }
        ]);
      }
    }
  };

  const autoRunSimulation = () => {
    resetSimulation();
    setTimeout(() => executeStep(1), 200);
    setTimeout(() => executeStep(2), 1100);
    setTimeout(() => executeStep(3), 2000);
    setTimeout(() => executeStep(4), 2900);
  };

  // Address space calculation
  const getCapacityString = (lines) => {
    if (lines === 16) return '64 Kilobytes (KB) — Vintage 8-bit CPUs';
    if (lines === 20) return '1 Megabyte (MB) — Intel 8086 IBM PC';
    if (lines === 24) return '16 Megabytes (MB) — Intel 286 / Sega Genesis';
    if (lines === 32) return '4 Gigabytes (GB) — Classic 32-bit limit';
    if (lines === 36) return '64 Gigabytes (GB) — 32-bit PAE Servers';
    if (lines === 48) return '256 Terabytes (TB) — Modern x86-64 Virtual Address limit';
    if (lines === 64) return '18.4 Quintillion Bytes (16 Exabytes) — Theoretical 64-bit max';
    const bytes = Math.pow(2, lines);
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} Gigabytes (GB)`;
    if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} Megabytes (MB)`;
    return `${(bytes / 1e3).toFixed(1)} Kilobytes (KB)`;
  };

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Activity size={14} /> MODULE 03 • BUS INTERCONNECTS & TIMING
        </div>
        <h1 className="hero-headline">System Bus & <span>Memory Controller</span></h1>
        <p className="hero-lead">
          The CPU and Main Memory never touch directly. Every read and write transaction traverses three dedicated 
          hardware bus lines: Address, Control, and Data.
        </p>
      </section>

      {/* Simulator Workspace Card */}
      <section className="workspace-card bus-lab-card">
        {/* Top Configuration Bar */}
        <div className="bus-config-header">
          <div className="config-block">
            <span className="config-lbl">1. CHOOSE OPERATION:</span>
            <div className="segmented-control">
              <button
                className={operation === 'READ' ? 'active-op read' : ''}
                onClick={() => { setOperation('READ'); resetSimulation(); }}
              >
                Memory READ (Load)
              </button>
              <button
                className={operation === 'WRITE' ? 'active-op write' : ''}
                onClick={() => { setOperation('WRITE'); resetSimulation(); }}
              >
                Memory WRITE (Store)
              </button>
            </div>
          </div>

          <div className="config-block">
            <span className="config-lbl">2. SELECT RAM ADDRESS:</span>
            <div className="addr-chips-row">
              {Object.keys(ramData).map((addr) => (
                <button
                  key={addr}
                  className={`addr-select-chip ${selectedAddress === addr ? 'selected' : ''}`}
                  onClick={() => { setSelectedAddress(addr); resetSimulation(); }}
                >
                  {addr}
                </button>
              ))}
            </div>
          </div>

          {operation === 'WRITE' && (
            <div className="config-block">
              <span className="config-lbl">3. DATA BYTE TO WRITE:</span>
              <input
                type="text"
                className="data-input-box"
                value={dataToWrite}
                maxLength={4}
                onChange={(e) => setDataToWrite(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Execution Toolbar */}
        <div className="bus-actions-bar">
          <div className="bus-step-buttons">
            <button className="btn-bus-run" onClick={autoRunSimulation}>
              <Play size={15} /> Run Complete Clock Cycle
            </button>
            <button 
              className={`btn-bus-step ${currentStep >= 1 ? 'done' : ''}`} 
              onClick={() => executeStep(1)}
            >
              1. Address
            </button>
            <button 
              className={`btn-bus-step ${currentStep >= 2 ? 'done' : ''}`} 
              onClick={() => executeStep(2)}
            >
              2. Control
            </button>
            <button 
              className={`btn-bus-step ${currentStep >= 3 ? 'done' : ''}`} 
              onClick={() => executeStep(3)}
            >
              3. Decode
            </button>
            <button 
              className={`btn-bus-step ${currentStep >= 4 ? 'done' : ''}`} 
              onClick={() => executeStep(4)}
            >
              4. Transfer
            </button>
            <button className="btn-bus-reset" onClick={resetSimulation}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="bus-status-indicator">
            <span className="status-dot" style={{ backgroundColor: currentStep === 4 ? '#059669' : '#0284c7' }} />
            <span>
              {currentStep === 0 && 'System Idle — Ready for transaction'}
              {currentStep === 1 && `T1: MAR latched with ${selectedAddress} → Address Bus active`}
              {currentStep === 2 && `T2: Control line asserted ${operation === 'READ' ? 'MEMR#' : 'MEMW#'}`}
              {currentStep === 3 && 'T3: Row/Column decoders reading capacitor charges'}
              {currentStep === 4 && `T4: Transaction complete! Data ${operation === 'READ' ? ramData[selectedAddress] : dataToWrite} transferred`}
            </span>
          </div>
        </div>

        {/* Hardware Circuit Layout */}
        <div className="bus-circuit-stage">
          {/* CPU Block */}
          <div className="hardware-box cpu-hardware">
            <div className="box-top">
              <Cpu size={18} />
              <span>CPU CORES (ALU)</span>
            </div>
            <div className="registers-list">
              <div className="reg-row">
                <span className="r-name">Program Counter (PC):</span>
                <span className="r-val">{cpuRegisters.PC}</span>
              </div>
              <div className={`reg-row ${currentStep >= 1 ? 'reg-active' : ''}`}>
                <span className="r-name">Mem Address Reg (MAR):</span>
                <span className="r-val">{cpuRegisters.MAR}</span>
              </div>
              <div className={`reg-row ${currentStep >= 4 ? 'reg-active' : ''}`}>
                <span className="r-name">Mem Data Reg (MDR):</span>
                <span className="r-val">{cpuRegisters.MDR}</span>
              </div>
            </div>
          </div>

          {/* 3 Bus Traces */}
          <div className="bus-lanes-column">
            {/* Address Bus */}
            <div className={`bus-lane address-lane ${currentStep >= 1 ? 'lane-energized' : ''}`}>
              <div className="lane-header">
                <strong>ADDRESS BUS (Unidirectional: CPU → RAM)</strong>
                <span className="bus-state-pill">{currentStep >= 1 ? selectedAddress : '0x00 (Tri-stated)'}</span>
              </div>
              <div className="bus-physical-wire">
                {currentStep >= 1 && <div className="pulse-signal to-right" />}
              </div>
            </div>

            {/* Control Bus */}
            <div className={`bus-lane control-lane ${currentStep >= 2 ? 'lane-energized' : ''}`}>
              <div className="lane-header">
                <strong>CONTROL BUS (MEMR# / MEMW# / CLK)</strong>
                <span className="bus-state-pill">
                  {currentStep >= 2 ? (operation === 'READ' ? 'MEM_READ = 1' : 'MEM_WRITE = 1') : 'IDLE'}
                </span>
              </div>
              <div className="bus-physical-wire">
                {currentStep >= 2 && <div className="pulse-signal to-right" />}
              </div>
            </div>

            {/* Data Bus */}
            <div className={`bus-lane data-lane ${currentStep >= 4 ? 'lane-energized' : ''}`}>
              <div className="lane-header">
                <strong>DATA BUS (Bidirectional: 64-bit Payload)</strong>
                <span className="bus-state-pill">
                  {currentStep >= 4 ? (operation === 'READ' ? ramData[selectedAddress] : dataToWrite) : 'HIGH-Z'}
                </span>
              </div>
              <div className="bus-physical-wire">
                {currentStep >= 4 && (
                  <div className={`pulse-signal ${operation === 'READ' ? 'to-left' : 'to-right'}`} />
                )}
              </div>
            </div>
          </div>

          {/* RAM Block */}
          <div className="hardware-box ram-hardware">
            <div className="box-top">
              <Zap size={18} />
              <span>MAIN RAM (DRAM DIMM)</span>
            </div>
            <div className="ram-cells-mini-list">
              {Object.entries(ramData).map(([addr, val]) => {
                const isTarget = addr === selectedAddress;
                return (
                  <div 
                    key={addr} 
                    className={`ram-cell-strip ${isTarget && currentStep >= 3 ? 'cell-targeted' : ''}`}
                  >
                    <span className="cell-a">{addr}:</span>
                    <strong className="cell-d">{val}</strong>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Transaction Micro-Log */}
        <div className="bus-log-container">
          <div className="log-header-line">
            <Clock size={14} />
            <span>SYNCHRONOUS CLOCK CYCLE TRACE</span>
          </div>
          <div className="log-entries-list">
            {cycleLog.length === 0 ? (
              <div className="empty-log-prompt">
                Click <strong>"Run Complete Clock Cycle"</strong> above to inspect how the signals traverse each bus wire.
              </div>
            ) : (
              cycleLog.map((entry, idx) => (
                <div key={idx} className="log-row-item" style={{ borderLeftColor: entry.color }}>
                  <span className="log-step-tag">Step {entry.step} • {entry.bus}</span>
                  <p>{entry.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Address Bus Width & Memory Capacity Calculator */}
      <section className="address-calc-section">
        <div className="section-header">
          <div>
            <span className="section-label">MATHEMATICAL HARDWARE LAW</span>
            <h2>Address Bus Width: The 2<sup>N</sup> Maximum RAM Limit</h2>
          </div>
          <p>
            Why did older 32-bit Windows PCs get stuck at 4GB RAM? The number of physical copper address wires 
            dictates the maximum amount of memory a CPU can ever reference.
          </p>
        </div>

        <div className="workspace-card calc-card">
          <div className="calc-slider-row">
            <div className="slider-label-group">
              <span className="slider-title">Physical Address Lines (N):</span>
              <strong className="slider-num">{addressLines} Address Pins</strong>
            </div>

            <input
              type="range"
              min={16}
              max={64}
              step={addressLines < 36 ? 4 : (addressLines < 48 ? 4 : 16)}
              value={addressLines}
              className="calc-range-slider"
              onChange={(e) => setAddressLines(parseInt(e.target.value, 10))}
            />

            <div className="slider-ticks">
              <span>16-bit (64KB)</span>
              <span>20-bit (1MB)</span>
              <span>32-bit (4GB)</span>
              <span>36-bit (64GB)</span>
              <span>64-bit (16EB)</span>
            </div>
          </div>

          <div className="calc-result-box">
            <div className="calc-formula">
              <span>Formula:</span>
              <strong>Addressable RAM = 2<sup>N</sup> Bytes = 2<sup>{addressLines}</sup> Bytes</strong>
            </div>
            <div className="calc-output">
              <span>Maximum Supportable Main Memory:</span>
              <h3 className="calc-big-stat">{getCapacityString(addressLines)}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Module Bottom Navigation */}
      <ModuleBottomNav currentTab="bus-lab" setCurrentTab={onNavigateTab} />
    </div>
  );
}
