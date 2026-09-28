import React, { useState } from 'react';
import { Grid, Cpu, ArrowDown, ArrowRight, Sparkles, Check, RefreshCw } from 'lucide-react';

export default function MemoryMatrix({ powerOn }) {
  // 8 rows x 8 cols = 64 bytes
  const [selectedRow, setSelectedRow] = useState(2);
  const [selectedCol, setSelectedCol] = useState(5);
  const [matrixData, setMatrixData] = useState(() => {
    const initial = {};
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        // Generating readable sample bytes
        const val = ((r * 16 + c * 3 + 0x41) % 128);
        initial[`${r}-${c}`] = val;
      }
    }
    return initial;
  });

  const [inputVal, setInputVal] = useState('77');

  const activeKey = `${selectedRow}-${selectedCol}`;
  const rawValue = powerOn ? (matrixData[activeKey] ?? 0) : 0;
  const hexValue = '0x' + rawValue.toString(16).toUpperCase().padStart(2, '0');
  const binValue = rawValue.toString(2).padStart(8, '0');
  const asciiChar = rawValue >= 32 && rawValue <= 126 ? String.fromCharCode(rawValue) : '•';

  // Binary coordinates
  const rowBinary = selectedRow.toString(2).padStart(3, '0');
  const colBinary = selectedCol.toString(2).padStart(3, '0');
  const fullBinaryAddress = rowBinary + colBinary;
  const fullHexAddress = '0x' + parseInt(fullBinaryAddress, 2).toString(16).toUpperCase().padStart(2, '0');

  const handleCellClick = (r, c) => {
    setSelectedRow(r);
    setSelectedCol(c);
  };

  const handleWriteValue = () => {
    const parsed = parseInt(inputVal, 16);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 255) {
      setMatrixData(prev => ({
        ...prev,
        [activeKey]: parsed
      }));
    }
  };

  return (
    <div className="matrix-lab-wrapper">
      <div className="matrix-lab-header">
        <div>
          <span className="panel-kicker">SILICON INTERNALS • 2D CO-ORDINATE DECODER</span>
          <h3>How Memory Finds Any Cell in 2 Clock Pulses</h3>
          <p className="matrix-subtitle">
            Rather than 64 billion individual wires, memory chips arrange cells in a 2D matrix. 
            A Row Address activates a horizontal <strong>Wordline</strong>, and a Column Address picks the vertical <strong>Bitline</strong>.
          </p>
        </div>

        <div className="matrix-stat-pills">
          <div className="stat-pill">
            <span className="pill-lbl">6-BIT ADDRESS</span>
            <strong className="pill-code">{fullBinaryAddress} ({fullHexAddress})</strong>
          </div>
          <div className="stat-pill">
            <span className="pill-lbl">ROW BITS (A5-A3)</span>
            <strong className="pill-code" style={{ color: '#059669' }}>Row {selectedRow} [{rowBinary}]</strong>
          </div>
          <div className="stat-pill">
            <span className="pill-lbl">COL BITS (A2-A0)</span>
            <strong className="pill-code" style={{ color: '#0284c7' }}>Col {selectedCol} [{colBinary}]</strong>
          </div>
        </div>
      </div>

      <div className="matrix-workspace-grid">
        {/* The 8x8 Visual Array */}
        <div className="matrix-canvas-card">
          <div className="matrix-col-headers">
            <div className="corner-spacer">Row \ Col</div>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(c => (
              <div 
                key={c} 
                className={`col-header-cell ${c === selectedCol ? 'active-col-head' : ''}`}
                onClick={() => setSelectedCol(c)}
              >
                <span>C{c}</span>
                <small>{c.toString(2).padStart(3, '0')}</small>
              </div>
            ))}
          </div>

          <div className="matrix-rows-container">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(r => (
              <div key={r} className="matrix-row-strip">
                <div 
                  className={`row-header-cell ${r === selectedRow ? 'active-row-head' : ''}`}
                  onClick={() => setSelectedRow(r)}
                >
                  <span>R{r}</span>
                  <small>{r.toString(2).padStart(3, '0')}</small>
                </div>

                {/* 8 Cells in this row */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(c => {
                  const isCurrentRow = r === selectedRow;
                  const isCurrentCol = c === selectedCol;
                  const isIntersection = isCurrentRow && isCurrentCol;
                  const val = powerOn ? (matrixData[`${r}-${c}`] ?? 0) : 0;
                  const hex = val.toString(16).toUpperCase().padStart(2, '0');

                  let cellClass = 'matrix-cell';
                  if (isIntersection) cellClass += ' cell-target-intersection';
                  else if (isCurrentRow) cellClass += ' cell-in-active-row';
                  else if (isCurrentCol) cellClass += ' cell-in-active-col';

                  return (
                    <button
                      key={c}
                      className={cellClass}
                      onClick={() => handleCellClick(r, c)}
                      title={`Address: Row ${r}, Col ${c} (0x${((r*8)+c).toString(16).toUpperCase()})`}
                    >
                      <span className="cell-hex-val">{hex}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sense Amplifiers Row at Bottom */}
          <div className="sense-amps-strip">
            <div className="sense-label">Sense Amps:</div>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(c => (
              <div 
                key={c} 
                className={`sense-amp-node ${c === selectedCol ? 'sense-active' : ''}`}
              >
                <ArrowDown size={11} />
                <span>SA_{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Cell Inspector & Write Controls */}
        <div className="matrix-inspector-panel">
          <div className="cell-inspector-card">
            <div className="inspector-head">
              <span className="insp-eyebrow">INTERSECTING CELL INSPECTOR</span>
              <h4>Cell [Row {selectedRow}, Col {selectedCol}]</h4>
            </div>

            <div className="stored-data-display">
              <div className="data-box primary-box">
                <span className="data-box-label">HEX VALUE</span>
                <span className="data-box-big">{hexValue}</span>
              </div>
              <div className="data-box">
                <span className="data-box-label">8-BIT BINARY</span>
                <span className="data-box-val code-font">{binValue}</span>
              </div>
              <div className="data-box">
                <span className="data-box-label">ASCII CHAR</span>
                <span className="data-box-val">{asciiChar}</span>
              </div>
            </div>

            <div className="write-cell-form">
              <label>Write New Byte (Hex 00 - FF):</label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  value={inputVal} 
                  maxLength={2}
                  onChange={(e) => setInputVal(e.target.value.toUpperCase())}
                  placeholder="e.g. 5A"
                />
                <button className="atelier-primary-btn" onClick={handleWriteValue}>
                  <Check size={14} />
                  <span>Store Byte</span>
                </button>
              </div>
            </div>

            <div className="addressing-explanation">
              <h5>💡 The Battleship Analogy</h5>
              <p>
                Imagine having to run 64 wires to 64 lightbulbs — it gets messy fast. 
                Instead, memory chips run <strong>8 horizontal wires</strong> and <strong>8 vertical wires</strong> (only 16 wires total!).
              </p>
              <p>
                To read a bit, the chip energizes <strong>Wordline {selectedRow}</strong> and listens on <strong>Bitline {selectedCol}</strong>. 
                The Sense Amplifier at the bottom amplifies the tiny voltage and passes it to your CPU.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
