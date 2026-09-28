import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Activity, 
  HelpCircle,
  Zap
} from 'lucide-react';

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

export default function BusSimulator({ powerOn }) {
  const [ramData, setRamData] = useState(INITIAL_RAM_DATA);
  const [operation, setOperation] = useState('READ'); // 'READ' or 'WRITE'
  const [selectedAddress, setSelectedAddress] = useState('0x07');
  const [dataToWrite, setDataToWrite] = useState('0xAA');
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Address, 2: Control, 3: RAM Access, 4: Data Bus Complete
  const [isRunning, setIsRunning] = useState(false);
  const [cycleLog, setCycleLog] = useState([]);
  const [cpuRegisters, setCpuRegisters] = useState({
    MAR: '0x07',
    MDR: '0x00',
    PC: '0x0040'
  });

  // Handle Power loss wiping volatile RAM
  useEffect(() => {
    if (!powerOn) {
      const wiped = {};
      Object.keys(ramData).forEach(k => { wiped[k] = '0x00'; });
      setRamData(wiped);
      setCpuRegisters({ MAR: '0x00', MDR: '0x00', PC: '0x0000' });
      setCurrentStep(0);
      setCycleLog([{ step: 0, text: '⚠️ System power cut: All volatile DRAM cells discharged to 0x00.' }]);
    }
  }, [powerOn]);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsRunning(false);
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
          text: `CPU loads address ${selectedAddress} into MAR and asserts it on the Address Bus.`
        }
      ]);
    } else if (stepNumber === 2) {
      setCycleLog(prev => [
        ...prev,
        {
          step: 2,
          bus: 'Control Bus',
          color: '#d97706',
          text: `Control line asserts ${operation === 'READ' ? 'MEM_READ = HIGH (1)' : 'MEM_WRITE = HIGH (1)'} and clocks synchronous timing.`
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
          color: '#10b981',
          text: `Memory Row/Column Decoders activate cell at ${selectedAddress}. Sense amplifiers prepare ${operation === 'READ' ? 'charge read' : 'charge write'}.`
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
            color: '#8b5cf6',
            text: `Data value ${val} travels across the Data Bus into CPU MDR register. Read Cycle Complete!`
          }
        ]);
      } else {
        setRamData(prev => ({ ...prev, [selectedAddress]: dataToWrite }));
        setCycleLog(prev => [
          ...prev,
          {
            step: 4,
            bus: 'Data Bus',
            color: '#8b5cf6',
            text: `Value ${dataToWrite} driven onto Data Bus and stored permanently in RAM cell ${selectedAddress}. Write Cycle Complete!`
          }
        ]);
      }
      setIsRunning(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      executeStep(currentStep + 1);
    } else {
      resetSimulation();
    }
  };

  const handleAutoRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    resetSimulation();
    let s = 1;
    executeStep(1);
    const interval = setInterval(() => {
      s++;
      if (s <= 4) {
        executeStep(s);
      } else {
        clearInterval(interval);
      }
    }, 1100);
  };

  return (
    <div className="bus-simulator-panel">
      {/* Simulation Header */}
      <div className="simulator-header-bar">
        <div>
          <span className="panel-kicker">INTERACTIVE SYSTEM BUS SIMULATOR</span>
          <h3>CPU ⇄ Memory Bus ⇄ RAM Data Flow</h3>
          <p className="simulator-subtitle">
            See how the 3 distinct physical buses work in perfect sync to read and write bytes.
          </p>
        </div>

        {/* Action Controls */}
        <div className="simulator-action-controls">
          <div className="segmented-control">
            <button 
              className={operation === 'READ' ? 'active-op read' : ''}
              onClick={() => { setOperation('READ'); resetSimulation(); }}
            >
              MEM READ
            </button>
            <button 
              className={operation === 'WRITE' ? 'active-op write' : ''}
              onClick={() => { setOperation('WRITE'); resetSimulation(); }}
            >
              MEM WRITE
            </button>
          </div>

          <div className="param-selectors">
            <label>
              Target Address:
              <select 
                value={selectedAddress} 
                onChange={(e) => { setSelectedAddress(e.target.value); resetSimulation(); }}
                disabled={isRunning}
              >
                {Object.keys(ramData).map(addr => (
                  <option key={addr} value={addr}>{addr}</option>
                ))}
              </select>
            </label>

            {operation === 'WRITE' && (
              <label>
                Data Byte:
                <select 
                  value={dataToWrite} 
                  onChange={(e) => { setDataToWrite(e.target.value); resetSimulation(); }}
                  disabled={isRunning}
                >
                  <option value="0xAA">0xAA (10101010)</option>
                  <option value="0xFF">0xFF (11111111)</option>
                  <option value="0x42">0x42 (01000010)</option>
                  <option value="0x7E">0x7E (01111110)</option>
                </select>
              </label>
            )}
          </div>

          <div className="sim-buttons-group">
            <button 
              className="atelier-primary-btn" 
              onClick={handleAutoRun}
              disabled={isRunning || !powerOn}
            >
              <Play size={14} />
              <span>{isRunning ? 'Running Cycle...' : 'Auto-Play Cycle'}</span>
            </button>
            <button 
              className="atelier-step-btn"
              onClick={handleNextStep}
              disabled={isRunning || !powerOn}
            >
              <span>{currentStep === 4 ? 'Cycle Done (Reset)' : `Step ${currentStep + 1} / 4`}</span>
              <ArrowRight size={13} />
            </button>
            <button className="atelier-icon-btn" onClick={resetSimulation} title="Reset">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Bus Architecture Visual Stage */}
      <div className="bus-visual-stage">
        {/* Left Side: CPU Unit */}
        <div className="stage-block cpu-block">
          <div className="block-title">
            <Cpu size={16} />
            <span>CENTRAL PROCESSOR (CPU)</span>
          </div>

          <div className="register-list">
            <div className="reg-row">
              <span className="reg-name">MAR (Address Reg)</span>
              <code className={currentStep >= 1 ? 'reg-active addr' : ''}>{cpuRegisters.MAR}</code>
            </div>
            <div className="reg-row">
              <span className="reg-name">MDR (Data Buffer)</span>
              <code className={currentStep >= 4 ? 'reg-active data' : ''}>{cpuRegisters.MDR}</code>
            </div>
            <div className="reg-row">
              <span className="reg-name">PC (Program Counter)</span>
              <code>{cpuRegisters.PC}</code>
            </div>
          </div>

          <div className="cpu-status-indicator">
            <span className="status-label">CURRENT STATUS:</span>
            <strong>
              {currentStep === 0 && 'Ready for cycle'}
              {currentStep === 1 && `Sending Address ${selectedAddress}`}
              {currentStep === 2 && `Asserting ${operation} Signal`}
              {currentStep === 3 && 'Waiting for RAM access'}
              {currentStep === 4 && (operation === 'READ' ? `Received ${cpuRegisters.MDR}` : 'Written to RAM')}
            </strong>
          </div>
        </div>

        {/* Center: The Three System Buses */}
        <div className="stage-buses-channel">
          {/* Address Bus */}
          <div className={`bus-lane address-bus ${currentStep === 1 ? 'bus-glowing' : ''}`}>
            <div className="bus-badge-label">
              <span className="bus-pill-tag addr-tag">ADDRESS BUS</span>
              <span className="bus-direction">Unidirectional (CPU → RAM)</span>
            </div>
            <div className="bus-wire">
              <div className={`bus-particle ${currentStep === 1 ? 'animate-forward' : ''}`}>
                <span>{selectedAddress}</span>
              </div>
            </div>
          </div>

          {/* Control Bus */}
          <div className={`bus-lane control-bus ${currentStep === 2 ? 'bus-glowing' : ''}`}>
            <div className="bus-badge-label">
              <span className="bus-pill-tag ctrl-tag">CONTROL BUS</span>
              <span className="bus-direction">Signals: {operation} • CLOCK</span>
            </div>
            <div className="bus-wire">
              <div className={`bus-particle ${currentStep === 2 ? 'animate-forward pulse' : ''}`}>
                <span>{operation === 'READ' ? 'MEM_RD=1' : 'MEM_WR=1'}</span>
              </div>
            </div>
          </div>

          {/* Data Bus */}
          <div className={`bus-lane data-bus ${currentStep === 4 ? 'bus-glowing' : ''}`}>
            <div className="bus-badge-label">
              <span className="bus-pill-tag data-tag">DATA BUS (64-Bit)</span>
              <span className="bus-direction">
                {operation === 'READ' ? 'Bidirectional (RAM → CPU)' : 'Bidirectional (CPU → RAM)'}
              </span>
            </div>
            <div className="bus-wire">
              <div 
                className={`bus-particle ${currentStep === 4 ? (operation === 'READ' ? 'animate-backward' : 'animate-forward') : ''}`}
              >
                <span>{operation === 'READ' ? ramData[selectedAddress] : dataToWrite}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: RAM Module & Memory Cell Bank */}
        <div className="stage-block ram-block">
          <div className="block-title">
            <Layers size={16} />
            <span>SYSTEM RAM (DRAM CELLS)</span>
          </div>

          <div className="ram-decoder-row">
            <span className="decoder-label">Address Decoder:</span>
            <span className={`decoder-val ${currentStep >= 3 ? 'decoder-active' : ''}`}>
              {currentStep >= 3 ? `ROW/COL -> Cell [${selectedAddress}]` : 'Standby'}
            </span>
          </div>

          {/* Interactive Memory Grid */}
          <div className="ram-cells-mini-grid">
            {Object.entries(ramData).map(([addr, val]) => {
              const isTarget = addr === selectedAddress;
              const isHighlight = isTarget && currentStep >= 3;
              return (
                <div 
                  key={addr} 
                  className={`ram-cell-slot ${isHighlight ? 'active-slot' : ''}`}
                  onClick={() => { setSelectedAddress(addr); resetSimulation(); }}
                >
                  <span className="slot-addr">{addr}</span>
                  <span className="slot-val">{val}</span>
                </div>
              );
            })}
          </div>

          <div className="ram-sense-amp-status">
            <Activity size={13} />
            <span>
              {currentStep === 3 ? 'Sense Amplifiers Latching Bit Charge...' : 'Sense Amps Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Micro-Operation Terminal & Beginner Explanation */}
      <div className="simulator-details-grid">
        <div className="sim-terminal-box">
          <div className="terminal-top">
            <Clock size={13} />
            <span>BUS TRANSACTION MICRO-LOG (CLOCK CYCLES)</span>
          </div>
          <div className="terminal-logs">
            {cycleLog.length === 0 ? (
              <div className="log-placeholder">
                Click <strong>"Auto-Play Cycle"</strong> or <strong>"Step 1 / 4"</strong> to execute this bus transaction.
              </div>
            ) : (
              cycleLog.map((log, i) => (
                <div key={i} className="log-item" style={{ borderLeftColor: log.color }}>
                  <span className="log-step-tag">Step {log.step} • {log.bus}</span>
                  <p>{log.text}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="beginner-explainer-card">
          <div className="explainer-head">
            <HelpCircle size={15} />
            <span>BEGINNER NOTE: WHY 3 SEPARATE BUSES?</span>
          </div>
          <p>
            Think of a bank transaction:
          </p>
          <ul>
            <li><strong>Address Bus:</strong> The teller asks for your Account Number (Location).</li>
            <li><strong>Control Bus:</strong> You state whether you want to Deposit or Withdraw (Instruction).</li>
            <li><strong>Data Bus:</strong> The cash bills are slid across the counter (Payload).</li>
          </ul>
          <p className="footnote">
            Keeping the address separate from the data allows memory controllers to look up the next location while previous data is still flowing!
          </p>
        </div>
      </div>
    </div>
  );
}
