import React from 'react';
import { MAIN_MEMORY_MODULES } from './Header';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

export default function ModuleBottomNav({ currentTab, setCurrentTab }) {
  const currentIdx = MAIN_MEMORY_MODULES.findIndex(m => m.id === currentTab);
  const prevMod = currentIdx > 0 ? MAIN_MEMORY_MODULES[currentIdx - 1] : null;
  const nextMod = currentIdx < MAIN_MEMORY_MODULES.length - 1 ? MAIN_MEMORY_MODULES[currentIdx + 1] : null;

  return (
    <nav className="chapter-bottom-nav">
      <div className="chapter-nav-wrapper">
        {/* Previous Module Card */}
        {prevMod ? (
          <button 
            className="chapter-nav-card prev-card"
            onClick={() => {
              setCurrentTab(prevMod.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-direction">
              <ArrowLeft size={15} /> Previous Module
            </div>
            <div className="card-heading">
              <span className="card-num">{prevMod.num}</span>
              <span className="card-title">{prevMod.pill}</span>
            </div>
            <p className="card-sub">{prevMod.title}</p>
          </button>
        ) : (
          <div className="chapter-nav-placeholder">
            <BookOpen size={16} /> Course Beginning
          </div>
        )}

        {/* Center Progress Dots */}
        <div className="chapter-nav-center">
          <div className="center-dots">
            {MAIN_MEMORY_MODULES.map((mod, i) => {
              const isCompleted = i < currentIdx;
              const isCurrent = i === currentIdx;
              let dotClass = 'chapter-step-dot';
              if (isCompleted) dotClass += ' completed';
              else if (isCurrent) dotClass += ' current';

              return (
                <button
                  key={mod.id}
                  className={dotClass}
                  title={`Module ${mod.num}: ${mod.pill}`}
                  onClick={() => {
                    setCurrentTab(mod.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={12} /> : mod.num}
                </button>
              );
            })}
          </div>
          <span className="center-label">Module {currentIdx + 1} of {MAIN_MEMORY_MODULES.length}</span>
        </div>

        {/* Next Module Card */}
        {nextMod ? (
          <button 
            className="chapter-nav-card next-card"
            onClick={() => {
              setCurrentTab(nextMod.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-direction">
              Next Module <ArrowRight size={15} />
            </div>
            <div className="card-heading">
              <span className="card-title">{nextMod.pill}</span>
              <span className="card-num">{nextMod.num}</span>
            </div>
            <p className="card-sub">{nextMod.title}</p>
          </button>
        ) : (
          <button 
            className="chapter-nav-card next-card finish-card"
            onClick={() => {
              setCurrentTab('explorer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-direction">
              Course Complete <CheckCircle2 size={15} />
            </div>
            <div className="card-heading">
              <span className="card-title">Review from Start</span>
              <span className="card-num">01</span>
            </div>
            <p className="card-sub">Jump back to Module 1 Overview</p>
          </button>
        )}
      </div>
    </nav>
  );
}
