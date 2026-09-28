import React, { useState } from 'react';
import { SPEED_LEVELS } from '../data/memoryData';
import { Play, RotateCcw, Clock, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function SpeedRace() {
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

  const [activeScale, setActiveScale] = useState('human'); // 'nanoseconds' or 'human'

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

    // Simulated progress timings to give intuitive visual perception
    setTimeout(() => setRaceProgress(p => ({ ...p, 'CPU Registers': 100 })), 150);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'L1 CPU Cache': 100 })), 300);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'L2 CPU Cache': 100 })), 650);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'L3 CPU Cache': 100 })), 1100);
    setTimeout(() => setRaceProgress(p => ({ ...p, 'Main Memory (DDR5 RAM)': 100 })), 1900);
    
    // SSD crawls slowly to represent 800x latency
    let ssdProg = 0;
    const ssdInt = setInterval(() => {
      ssdProg += 3;
      if (ssdProg >= 45) {
        clearInterval(ssdInt);
      }
      setRaceProgress(p => ({ ...p, 'NVMe Gen4 SSD': ssdProg }));
    }, 100);

    setTimeout(() => {
      setRacing(false);
    }, 2500);
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

  return (
    <div className="speed-race-wrapper">
      <div className="speed-race-header">
        <div>
          <span className="panel-kicker">THE MEMORY HIERARCHY SPEED RACE</span>
          <h3>Why Your Computer Needs Both RAM & SSDs</h3>
          <p className="speed-subtitle">
            Modern CPUs execute billions of calculations per second. If they had to wait on an SSD for every step, 
            your computer would run hundreds of times slower. Watch the simulated race below!
          </p>
        </div>

        <div className="speed-header-actions">
          <div className="segmented-control">
            <button 
              className={activeScale === 'human' ? 'active-op read' : ''}
              onClick={() => setActiveScale('human')}
            >
              Human Analogy Scale
            </button>
            <button 
              className={activeScale === 'nanoseconds' ? 'active-op write' : ''}
              onClick={() => setActiveScale('nanoseconds')}
            >
              Exact Nanoseconds
            </button>
          </div>

          <button 
            className="atelier-primary-btn" 
            onClick={startRace}
            disabled={racing}
          >
            <Play size={14} />
            <span>{racing ? 'Racing Now...' : 'Fetch 1 Byte Race'}</span>
          </button>
          <button className="atelier-icon-btn" onClick={resetRace} title="Reset Progress">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Race Tracks Container */}
      <div className="race-lanes-container">
        {SPEED_LEVELS.map((level, idx) => {
          const prog = raceProgress[level.name] || 0;
          const isDone = prog >= 100;
          return (
            <div key={level.name} className="race-lane-card">
              <div className="lane-meta">
                <div className="lane-title-group">
                  <span className="lane-rank">#{idx + 1}</span>
                  <strong>{level.name}</strong>
                  <span className="lane-capacity-tag">{level.capacity}</span>
                </div>
                <div className="lane-time-metric">
                  {activeScale === 'human' ? (
                    <span className="human-time-badge">
                      <Clock size={12} />
                      {level.relativeTime}
                    </span>
                  ) : (
                    <span className="nano-time-badge">
                      <Zap size={12} />
                      {level.latency}
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Track */}
              <div className="lane-track-groove">
                <div 
                  className="lane-progress-runner" 
                  style={{ 
                    width: `${prog}%`,
                    backgroundColor: level.color,
                    boxShadow: prog > 0 ? `0 0 14px ${level.color}66` : 'none'
                  }}
                >
                  <span className="runner-pulse-dot" />
                </div>
              </div>

              <div className="lane-footer">
                <p>{level.description}</p>
                <span className={`status-pill ${isDone ? 'done-pill' : (racing ? 'running-pill' : 'idle-pill')}`}>
                  {isDone ? '✓ Finished' : (prog > 0 ? `Waiting... (${prog}%)` : 'Ready')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Beginner Revelation Callout */}
      <div className="speed-insight-card">
        <div className="insight-badge">
          <Sparkles size={16} />
          <span>KEY TAKEAWAY FOR BEGINNERS</span>
        </div>
        <h4>"Why can't we just make the entire computer out of SRAM?"</h4>
        <p>
          SRAM is blazing fast, but <strong>1 Gigabyte of SRAM costs thousands of dollars</strong> and requires so many transistors it would physically overheat a motherboard.
          Meanwhile, an SSD is huge and cheap, but thousands of times too slow for the CPU to think.
        </p>
        <p className="emphasis-text">
          Main Memory (DRAM) is the perfect golden balance: spacious enough to hold all your open software (16–64 GB), 
          yet fast enough (60 nanoseconds) that the CPU is never kept waiting!
        </p>
      </div>
    </div>
  );
}
