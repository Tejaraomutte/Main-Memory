import React, { useState } from 'react';
import { Grid3X3, Cpu, ArrowDown, ArrowRight, Sparkles, Check, RefreshCw, Zap } from 'lucide-react';
import ModuleBottomNav from './ModuleBottomNav';

export default function MemoryMatrix({ onNavigateTab }) {
  // 8 rows x 8 cols = 64 bytes
  const [selectedRow, setSelectedRow] = useState(2);
  const [selectedCol, setSelectedCol] = useState(5);
  const [matrixData, setMatrixData] = useState(() => {
    const initial = {};
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const val = ((r * 16 + c * 3 + 0x41) % 128);
        initial[`${r}-${c}`] = val;
      }
    }
    return initial;
  });

  const [inputVal, setInputVal] = useState('77');

  const activeKey = `${selectedRow}-${selectedCol}`;
  const rawValue = matrixData[activeKey] ?? 0;
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
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Grid3X3 size={14} /> MODULE 02 • 2D SILICON COORDINATE DECODER
        </div>
        <h1 className="hero-headline">2D Silicon <span>Memory Matrix</span></h1>
        <p className="hero-lead">
          Rather than wiring 64 billion individual pins, memory chips arrange cells into a 2D silicon grid. 
          A Row Address energizes a horizontal <strong>Wordline (RAS#)</strong>, and a Column Address selects the vertical <strong>Bitline (CAS#)</strong>.
        </p>

        {/* Address Stat Pills */}
        <div className="matrix-stat-pills-bar">
          <div className="stat-pill">
            <span className="pill-lbl">6-BIT ADDRESS</span>
            <strong className="pill-code">{fullBinaryAddress} ({fullHexAddress})</strong>
          </div>
          <div className="stat-pill">
            <span className="pill-lbl">ROW DECODER (A5-A3)</span>
            <strong className="pill-code" style={{ color: '#059669' }}>Row {selectedRow} [{rowBinary}]</strong>
          </div>
          <div className="stat-pill">
            <span className="pill-lbl">COL DECODER (A2-A0)</span>
            <strong className="pill-code" style={{ color: '#0284c7' }}>Col {selectedCol} [{colBinary}]</strong>
          </div>
        </div>
      </section>

      {/* Main 2-Column Matrix Workspace */}
      <section className="clean-workspace-grid">
        {/* Left: 8x8 Array Card */}
        <div className="workspace-card matrix-array-card">
          <div className="card-header-bar">
            <div>
              <span className="card-kicker">PHYSICAL SILICON ARRAY (8×8 BYTES)</span>
              <h3>Click Any Cell to Assert Wordline & Bitline</h3>
            </div>
            <span className="active-cell-badge">
              Active: R{selectedRow} : C{selectedCol}
            </span>
          </div>

          <div className="matrix-grid-outer">
            {/* Column Headers */}
            <div className="matrix-col-headers-row">
              <div className="matrix-corner-tag">Row \ Col</div>
              {[0, 1, 2, 3, 4, 5, 6, 7].map(c => (
                <button
                  key={c}
                  className={`matrix-col-btn ${c === selectedCol ? 'active-col' : ''}`}
                  onClick={() => setSelectedCol(c)}
                >
                  <span>C{c}</span>
                  <small>{c.toString(2).padStart(3, '0')}</small>
                </button>
              ))}
            </div>

            {/* 8 Rows with Row Decoders */}
            <div className="matrix-rows-list">
              {[0, 1, 2, 3, 4, 5, 6, 7].map(r => (
                <div key={r} className="matrix-row-lane">
                  <button
                    className={`matrix-row-btn ${r === selectedRow ? 'active-row' : ''}`}
                    onClick={() => setSelectedRow(r)}
                  >
                    <span>Row {r}</span>
                    <small>{r.toString(2).padStart(3, '0')}</small>
                  </button>

                  <div className="matrix-row-cells">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(c => {
                      const isSelected = r === selectedRow && c === selectedCol;
                      const isRowActive = r === selectedRow;
                      const isColActive = c === selectedCol;
                      const cellVal = matrixData[`${r}-${c}`] ?? 0;
                      const cellHex = cellVal.toString(16).toUpperCase().padStart(2, '0');

                      let cellClass = 'matrix-cell-box';
                      if (isSelected) cellClass += ' cell-highlight-selected';
                      else if (isRowActive || isColActive) cellClass += ' cell-highlight-crosshair';

                      return (
                        <button
                          key={c}
                          className={cellClass}
                          onClick={() => handleCellClick(r, c)}
                          title={`Row ${r}, Col ${c} (0x${cellHex})`}
                        >
                          <span className="cell-hex-text">{cellHex}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="matrix-legend-row">
            <span className="legend-item"><span className="legend-dot green" /> Active Wordline (Row)</span>
            <span className="legend-item"><span className="legend-dot cyan" /> Active Bitline (Column)</span>
            <span className="legend-item"><span className="legend-dot indigo" /> Selected Intersecting Cell</span>
          </div>
        </div>

        {/* Right: Cell Inspector & Read/Write */}
        <div className="workspace-card matrix-inspector-card">
          <div className="card-header-bar">
            <div>
              <span className="card-kicker">CELL INSPECTOR</span>
              <h3>Selected Silicon Cell Details</h3>
            </div>
            <span className="cell-hex-tag">{hexValue}</span>
          </div>

          <div className="cell-address-readout">
            <div className="readout-block">
              <span className="readout-lbl">Full Binary Address</span>
              <strong className="readout-val mono">{fullBinaryAddress}</strong>
            </div>
            <div className="readout-block">
              <span className="readout-lbl">Hex Memory Offset</span>
              <strong className="readout-val mono">{fullHexAddress}</strong>
            </div>
          </div>

          {/* Value Formats Duo */}
          <div className="cell-data-boxes-row">
            <div className="data-val-card">
              <span className="d-label">Hexadecimal Value</span>
              <strong className="d-value">{hexValue}</strong>
            </div>
            <div className="data-val-card">
              <span className="d-label">8-Bit Binary Byte</span>
              <strong className="d-value mono-small">{binValue}</strong>
            </div>
            <div className="data-val-card">
              <span className="d-label">ASCII Character</span>
              <strong className="d-value char">{asciiChar}</strong>
            </div>
          </div>

          {/* Live Write Operation */}
          <div className="cell-write-panel">
            <strong>Write New Byte to this Cell:</strong>
            <p>Enter a 2-digit Hex value (e.g. <code>AA</code>, <code>FF</code>, <code>42</code>):</p>
            <div className="write-controls-row">
              <div className="hex-prefix-wrap">
                <span>0x</span>
                <input
                  type="text"
                  maxLength={2}
                  value={inputVal}
                  className="write-hex-input"
                  onChange={(e) => setInputVal(e.target.value.toUpperCase())}
                />
              </div>
              <button className="btn-write-execute" onClick={handleWriteValue}>
                Write Byte to Cell
              </button>
            </div>
          </div>

          {/* Architectural Decoding Sequence */}
          <div className="matrix-steps-box">
            <h4>How Memory Controllers Decode Coordinates:</h4>
            <ol className="matrix-steps-list">
              <li>
                <strong>Row Address Strobe (RAS#):</strong> The memory controller sends the upper bits to the Row Decoder, raising voltage on Wordline {selectedRow} to open all 8 capacitors in that row.
              </li>
              <li>
                <strong>Column Address Strobe (CAS#):</strong> The lower bits select Column {selectedCol}, connecting its Bitline wire to the Sense Amplifiers.
              </li>
              <li>
                <strong>Sense Amplification:</strong> Microscopic charge (microvolts) is amplified into full 1.2V CMOS logic levels and driven onto the Data Bus.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Module Bottom Navigation */}
      <ModuleBottomNav currentTab="matrix-lab" setCurrentTab={onNavigateTab} />
    </div>
  );
}
