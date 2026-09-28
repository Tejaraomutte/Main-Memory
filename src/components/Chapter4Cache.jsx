import React, { useState, useEffect } from 'react';
import ChapterBottomNav from './ChapterBottomNav';
import { 
  Sparkles, 
  Grid3X3, 
  SlidersVertical, 
  Layers, 
  Info, 
  FileCode, 
  Play, 
  RotateCcw 
} from 'lucide-react';

export default function Chapter4Cache({ activeChapter, setActiveChapter }) {
  // Matrix Traversal state
  const [traversalMode, setTraversalMode] = useState('row'); // 'row' or 'col'
  const [isRunningMatrix, setIsRunningMatrix] = useState(false);
  const [currentCell, setCurrentCell] = useState(null); // { r, c }
  const [cellResults, setCellResults] = useState({}); // '0-0': 'hit' | 'miss'
  const [hitsCount, setHitsCount] = useState(0);
  const [missesCount, setMissesCount] = useState(0);

  // Address Slicer state
  const [addrWidth, setAddrWidth] = useState(32); // 32 or 64
  const [cacheSizeKB, setCacheSizeKB] = useState(32); // 16 to 256 KB
  const [lineSizeBytes, setLineSizeBytes] = useState(64); // 32, 64, 128
  const [ways, setWays] = useState(8); // 1, 2, 4, 8, 16

  // Address Slicer Math calculations
  const offsetBits = Math.round(Math.log2(lineSizeBytes));
  const totalBlocks = (cacheSizeKB * 1024) / lineSizeBytes;
  const numSets = Math.max(1, Math.round(totalBlocks / ways));
  const indexBits = Math.max(0, Math.round(Math.log2(numSets)));
  const tagBits = Math.max(0, addrWidth - indexBits - offsetBits);

  const tagPercent = (tagBits / addrWidth) * 100;
  const indexPercent = (indexBits / addrWidth) * 100;
  const offsetPercent = (offsetBits / addrWidth) * 100;

  // Matrix loop runner
  useEffect(() => {
    let timer;
    if (isRunningMatrix) {
      const sequence = [];
      if (traversalMode === 'row') {
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) sequence.push({ r, c });
        }
      } else {
        for (let c = 0; c < 8; c++) {
          for (let r = 0; r < 8; r++) sequence.push({ r, c });
        }
      }

      let step = 0;
      let hits = 0;
      let misses = 0;
      const results = {};

      const interval = setInterval(() => {
        if (step < sequence.length) {
          const item = sequence[step];
          const key = `${item.r}-${item.c}`;
          setCurrentCell(item);

          let isHit = false;
          if (traversalMode === 'row') {
            // In row major, 4 integers per 16-byte block, hits 3 out of 4 times
            isHit = item.c % 4 !== 0;
          } else {
            // In column major, jumping row misses almost every time
            isHit = false;
          }

          if (isHit) {
            hits++;
            results[key] = 'hit';
          } else {
            misses++;
            results[key] = 'miss';
          }

          setCellResults({ ...results });
          setHitsCount(hits);
          setMissesCount(misses);
          step++;
        } else {
          clearInterval(interval);
          setIsRunningMatrix(false);
        }
      }, 35);

      return () => clearInterval(interval);
    }
  }, [isRunningMatrix, traversalMode]);

  const handleStartMatrix = () => {
    setCellResults({});
    setHitsCount(0);
    setMissesCount(0);
    setCurrentCell(null);
    setIsRunningMatrix(true);
  };

  const handleResetMatrix = () => {
    setIsRunningMatrix(false);
    setCellResults({});
    setHitsCount(0);
    setMissesCount(0);
    setCurrentCell(null);
  };

  const totalLookups = hitsCount + missesCount;
  const hitRate = totalLookups > 0 ? ((hitsCount / totalLookups) * 100).toFixed(1) : '0.0';

  return (
    <div className="page-shell">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Sparkles size={14} /> CHAPTER 04 • HARDWARE MECHANICS
        </div>
        <h1 className="hero-headline">Cache Concepts & <span>Locality of Reference</span></h1>
        <p className="hero-lead">
          Why does caching work so well? See spatial & temporal locality in real time, watch how row-major code 
          outperforms column-major loops, and dissect how address bits index cache lines.
        </p>

        <div className="quick-nav-pills">
          <a href="#locality-visualizer" className="quick-pill">
            <Grid3X3 size={14} /> Matrix Traversal Lab
          </a>
          <a href="#address-slicer" className="quick-pill">
            <SlidersVertical size={14} /> Address Bit Slicer
          </a>
          <a href="#associativity" className="quick-pill">
            <Layers size={14} /> Cache Mapping (1-Way to 8-Way)
          </a>
          <a href="#the-three-cs" className="quick-pill">
            <Info size={14} /> The 3 C's of Cache Misses
          </a>
        </div>
      </section>

      {/* Interactive Lab: Spatial Locality */}
      <section id="locality-visualizer" className="interactive-module-section">
        <div className="section-header">
          <div>
            <span className="section-label">INTERACTIVE LAB: SPATIAL LOCALITY</span>
            <h2>Matrix Traversal Visualizer: Row-Major vs. Column-Major</h2>
          </div>
          <p>
            Watch how a simple loop order change can result in a <strong>75%–93%+ cache hit rate</strong> vs. devastating <strong>cache thrashing</strong>.
          </p>
        </div>

        <div className="matrix-lab-wrapper">
          <div className="matrix-sidebar">
            <div className="mode-toggle-group">
              <button 
                type="button" 
                className={`mode-btn ${traversalMode === 'row' ? 'active-row' : ''}`}
                onClick={() => { setTraversalMode('row'); handleResetMatrix(); }}
              >
                <span>Fast: Row-Major Order</span>
                <code>arr[i][j] (Spatial Locality)</code>
              </button>
              <button 
                type="button" 
                className={`mode-btn ${traversalMode === 'col' ? 'active-col' : ''}`}
                onClick={() => { setTraversalMode('col'); handleResetMatrix(); }}
              >
                <span>Slow: Column-Major Order</span>
                <code>arr[j][i] (Cache Thrashing)</code>
              </button>
            </div>

            <div className="matrix-code-box">
              <div className="code-box-header">
                <FileCode size={14} /> C / C++ / Python NumPy Execution Code
              </div>
              <pre>
                {traversalMode === 'row'
                  ? `// FAST: Reads contiguous memory\nfor (int i = 0; i < 8; i++) {\n  for (int j = 0; j < 8; j++) {\n    sum += matrix[i][j]; // Cache Friendly!\n  }\n}`
                  : `// SLOW: Jumps row offsets every step\nfor (int j = 0; j < 8; j++) {\n  for (int i = 0; i < 8; i++) {\n    sum += matrix[i][j]; // Cache Thrashing!\n  }\n}`}
              </pre>
            </div>

            <div className="matrix-score-card">
              <div className="metric-row">
                <span>Hit Rate:</span>
                <strong className={`metric-rate ${Number(hitRate) > 50 ? 'text-emerald' : 'text-rose'}`}>
                  {hitRate}%
                </strong>
              </div>
              <div className="metric-bars-group">
                <div className="mini-stat">
                  <span className="text-emerald">✓ Hits: {hitsCount}</span>
                  <span className="text-rose">✗ Misses: {missesCount}</span>
                </div>
                <div className="ratio-bar">
                  <div className="ratio-hit-fill" style={{ width: `${hitRate}%` }} />
                </div>
              </div>
            </div>

            <div className="sim-buttons-group">
              <button 
                type="button" 
                className="primary-btn"
                onClick={handleStartMatrix}
                disabled={isRunningMatrix}
              >
                <Play size={16} /> Run Matrix Loop
              </button>
              <button 
                type="button" 
                className="secondary-btn"
                onClick={handleResetMatrix}
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          <div className="matrix-display-col">
            <div className="matrix-legend">
              <span className="legend-item"><span className="legend-dot hit" /> Cache Hit (Fast)</span>
              <span className="legend-item"><span className="legend-dot miss" /> Cache Miss (Line Fetch)</span>
              <span className="legend-item"><span className="legend-dot active" /> Current Pointer</span>
            </div>

            <div className="memory-grid-8x8">
              {[0, 1, 2, 3, 4, 5, 6, 7].map(r => 
                [0, 1, 2, 3, 4, 5, 6, 7].map(c => {
                  const key = `${r}-${c}`;
                  const outcome = cellResults[key];
                  const isCurrent = currentCell && currentCell.r === r && currentCell.c === c;
                  const isLineEven = Math.floor(c / 4) % 2 === 0;

                  let cellClass = `grid-cell ${isLineEven ? 'line-even' : 'line-odd'}`;
                  if (outcome === 'hit') cellClass += ' cell-hit';
                  else if (outcome === 'miss') cellClass += ' cell-miss';
                  if (isCurrent) cellClass += ' cell-current';

                  return (
                    <div 
                      key={key} 
                      className={cellClass}
                      title={`Matrix[${r}][${c}] • Offset: 0x${((r * 8 + c) * 4).toString(16).padStart(4, '0')}`}
                    >
                      <span className="cell-coord">{r},{c}</span>
                      {isCurrent && <span className="cell-active-pulse" />}
                    </div>
                  );
                })
              )}
            </div>

            <div className="matrix-footer-explainer">
              <strong>💡 Why does this happen?</strong>
              <p>
                In <strong>Row-Major order</strong>, memory is read sequentially. When <code>[0][0]</code> is accessed, 
                the CPU pulls an entire 64-byte cache line into L1 containing <code>[0][0], [0][1], [0][2], [0][3]</code>. 
                The next 3 accesses are free instant hits!<br /><br />
                In <strong>Column-Major order</strong>, access jumps by an entire row (<code>[0][0] → [1][0] → [2][0]</code>). 
                Each jump misses into a brand new cache line, evicting the previous line before its other 3 items are ever read!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Address Slicer Section */}
      <section id="address-slicer" className="interactive-module-section">
        <div className="section-header">
          <div>
            <span className="section-label">HOW HARDWARE DECODES ADDRESSES</span>
            <h2>Interactive Address Slicer: Tag, Index, and Offset</h2>
          </div>
          <p>
            How does the CPU determine if a 32-bit or 64-bit virtual/physical address is already cached? 
            Hardware splits the binary address into three distinct bitfields:
          </p>
        </div>

        <div className="address-slicer-card">
          <div className="slicer-controls-row">
            <div className="slider-control">
              <label>Address Width: <strong>{addrWidth}-Bit</strong></label>
              <div className="radio-pills">
                <button 
                  type="button" 
                  className={`pill-btn ${addrWidth === 32 ? 'active' : ''}`}
                  onClick={() => setAddrWidth(32)}
                >
                  32-Bit
                </button>
                <button 
                  type="button" 
                  className={`pill-btn ${addrWidth === 64 ? 'active' : ''}`}
                  onClick={() => setAddrWidth(64)}
                >
                  64-Bit
                </button>
              </div>
            </div>

            <div className="slider-control">
              <label>Cache Size: <strong>{cacheSizeKB} KB</strong></label>
              <input 
                type="range" 
                min={16} 
                max={256} 
                step={16} 
                value={cacheSizeKB}
                onChange={(e) => setCacheSizeKB(Number(e.target.value))}
              />
            </div>

            <div className="slider-control">
              <label>Block / Line Size: <strong>{lineSizeBytes} Bytes</strong></label>
              <select 
                className="custom-select"
                value={lineSizeBytes}
                onChange={(e) => setLineSizeBytes(Number(e.target.value))}
              >
                <option value={32}>32 Bytes</option>
                <option value={64}>64 Bytes (Industry Standard)</option>
                <option value={128}>128 Bytes</option>
              </select>
            </div>

            <div className="slider-control">
              <label>Associativity: <strong>{ways === 1 ? '1-Way (Direct Mapped)' : `${ways}-Way Set Associative`}</strong></label>
              <select 
                className="custom-select"
                value={ways}
                onChange={(e) => setWays(Number(e.target.value))}
              >
                <option value={1}>1-Way (Direct Mapped)</option>
                <option value={2}>2-Way Set Associative</option>
                <option value={4}>4-Way Set Associative</option>
                <option value={8}>8-Way Set Associative (Standard L1)</option>
                <option value={16}>16-Way Set Associative (Standard L2/L3)</option>
              </select>
            </div>
          </div>

          {/* Visual Address Bar Strip */}
          <div className="visual-address-strip">
            <div className="address-bar-container">
              <div className="address-bit-segment tag-segment" style={{ width: `${tagPercent}%` }}>
                <div className="segment-title">TAG BITS</div>
                <div className="segment-bits"><strong>{tagBits}</strong> BITS</div>
                <div className="segment-range">Bits [{addrWidth - 1} : {indexBits + offsetBits}]</div>
              </div>
              <div className="address-bit-segment index-segment" style={{ width: `${indexPercent}%` }}>
                <div className="segment-title">SET INDEX</div>
                <div className="segment-bits"><strong>{indexBits}</strong> BITS</div>
                <div className="segment-range">Bits [{indexBits + offsetBits - 1} : {offsetBits}]</div>
              </div>
              <div className="address-bit-segment offset-segment" style={{ width: `${offsetPercent}%` }}>
                <div className="segment-title">OFFSET</div>
                <div className="segment-bits"><strong>{offsetBits}</strong> BITS</div>
                <div className="segment-range">Bits [{offsetBits - 1} : 0]</div>
              </div>
            </div>
          </div>

          {/* Formula Breakdown Cards */}
          <div className="address-math-breakdown">
            <div className="math-box">
              <span className="math-tag text-cyan">01. BLOCK OFFSET</span>
              <h4>Offset = log₂(Block Size)</h4>
              <p>log₂({lineSizeBytes} bytes) = <strong>{offsetBits} bits</strong></p>
              <small>Selects the exact byte inside the {lineSizeBytes}-byte cache line.</small>
            </div>

            <div className="math-box">
              <span className="math-tag text-purple">02. NUMBER OF SETS</span>
              <h4>Sets = Total Blocks ÷ Ways</h4>
              <p>{totalBlocks} blocks ÷ {ways} ways = <strong>{numSets} sets</strong></p>
              <small>Requires log₂({numSets}) = <strong>{indexBits} Index Bits</strong> to select which set row to query.</small>
            </div>

            <div className="math-box">
              <span className="math-tag text-emerald">03. TAG COMPARATOR</span>
              <h4>Tag = Address Width − Index − Offset</h4>
              <p>{addrWidth} − {indexBits} − {offsetBits} = <strong>{tagBits} Tag Bits</strong></p>
              <small>Compared against the tag stored in the cache line to verify a HIT.</small>
            </div>
          </div>
        </div>
      </section>

      {/* Mapping Types */}
      <section id="associativity" className="mapping-types-section">
        <div className="section-header">
          <div>
            <span className="section-label">ORGANIZATION ARCHITECTURE</span>
            <h2>Direct-Mapped vs. N-Way Set Associative</h2>
          </div>
          <p>Where is a memory block allowed to be placed when it is loaded into cache?</p>
        </div>

        <div className="mapping-cards-grid">
          <div className="mapping-card">
            <div className="mapping-tag direct">1-Way Associative</div>
            <h3>Direct-Mapped Cache</h3>
            <p className="mapping-desc">
              Each memory block maps to <strong>exactly one specific cache slot</strong> calculated by: 
              <code>Index = (Block Address) mod (Number of Sets)</code>.
            </p>
            <div className="mapping-proscons">
              <div className="pro">✓ <strong>Fast & Simple:</strong> Only 1 tag comparator needed; lowest latency.</div>
              <div className="con">✗ <strong>Conflict Misses:</strong> If two variables map to the same set index, they repeatedly evict each other even if the rest of the cache is completely empty!</div>
            </div>
          </div>

          <div className="mapping-card highlight">
            <div className="mapping-tag nway">N-Way Associative (Modern Standard)</div>
            <h3>Set-Associative Cache</h3>
            <p className="mapping-desc">
              The cache is divided into sets, each containing <strong>N slots (ways)</strong> (e.g. 8-way in L1, 16-way in L3). 
              A block maps to a set, but can reside in <em>any</em> of the N slots.
            </p>
            <div className="mapping-proscons">
              <div className="pro">✓ <strong>Conflict Reduction:</strong> Drastically reduces conflict misses; allows up to N conflicting lines to coexist.</div>
              <div className="pro">✓ <strong>Industry Standard:</strong> The perfect compromise between speed, silicon area, and hit rate.</div>
            </div>
          </div>

          <div className="mapping-card">
            <div className="mapping-tag full">Fully Associative</div>
            <h3>Fully Associative Cache</h3>
            <p className="mapping-desc">
              A memory block can be stored in <strong>any arbitrary cache slot</strong> anywhere in the array. 
              There are no index bits—the entire address (minus offset) is the tag!
            </p>
            <div className="mapping-proscons">
              <div className="pro">✓ <strong>Zero Conflict Misses:</strong> Best possible hit rate; only compulsory and capacity misses occur.</div>
              <div className="con">✗ <strong>Extreme Hardware Cost:</strong> Requires hundreds of tag comparators searching in parallel. Strictly used in small structures like TLBs.</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 C's */}
      <section id="the-three-cs" className="three-cs-section">
        <div className="section-header">
          <div>
            <span className="section-label">CLASSIFYING FAILURES</span>
            <h2>The 3 C's (and 4th C) of Cache Misses</h2>
          </div>
          <p>Every cache miss in computer architecture falls into one of these fundamental categories:</p>
        </div>

        <div className="cs-grid">
          <div className="c-card">
            <span className="c-badge">C1</span>
            <h3>Compulsory Miss (Cold Start)</h3>
            <p>The very first time a memory address is accessed by the program. It cannot possibly be in the cache because it was never loaded before.</p>
            <div className="c-solution">
              <strong>Hardware Solution:</strong> Hardware stream prefetchers that predict sequential memory patterns and pre-load lines.
            </div>
          </div>

          <div className="c-card">
            <span className="c-badge">C2</span>
            <h3>Capacity Miss</h3>
            <p>The working dataset of the program exceeds the total physical size of the cache. Even with an ideal fully-associative cache, blocks must be evicted to make room.</p>
            <div className="c-solution">
              <strong>Hardware Solution:</strong> Increase physical cache capacity (e.g. AMD 3D V-Cache expanding L3 to 96MB).
            </div>
          </div>

          <div className="c-card">
            <span className="c-badge">C3</span>
            <h3>Conflict Miss (Collision)</h3>
            <p>Multiple active memory addresses happen to map to the exact same cache set index, kicking each other out even though many other sets in the cache are completely empty.</p>
            <div className="c-solution">
              <strong>Hardware Solution:</strong> Increase set associativity (e.g., upgrading from 4-way to 8-way or 16-way).
            </div>
          </div>

          <div className="c-card">
            <span className="c-badge">C4</span>
            <h3>Coherence Miss (Multi-Core)</h3>
            <p>In multi-core systems, when Core 1 writes to a shared variable, the cache-coherence bus invalidates the copy in Core 2's L1 cache, forcing Core 2 to miss on its next read.</p>
            <div className="c-solution">
              <strong>Hardware Solution:</strong> False sharing mitigation (aligning multi-threaded variables to separate 64-byte boundaries).
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Pagination */}
      <ChapterBottomNav activeChapter={activeChapter} setActiveChapter={setActiveChapter} />
    </div>
  );
}
