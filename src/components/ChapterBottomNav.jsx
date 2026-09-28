import React from 'react';
import { CHAPTERS } from '../data/hierarchyData';
import { ArrowLeft, ArrowRight, BookOpen, CircleCheckBig } from 'lucide-react';

export default function ChapterBottomNav({ activeChapter, setActiveChapter }) {
  const currentIdx = CHAPTERS.findIndex(c => c.id === activeChapter);
  const prevChapter = currentIdx > 0 ? CHAPTERS[currentIdx - 1] : null;
  const nextChapter = currentIdx < CHAPTERS.length - 1 ? CHAPTERS[currentIdx + 1] : null;

  return (
    <nav className="chapter-bottom-nav">
      <div className="chapter-nav-wrapper">
        {/* Previous Card */}
        {prevChapter ? (
          <button 
            className="chapter-nav-card prev-card"
            onClick={() => {
              setActiveChapter(prevChapter.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-direction">
              <ArrowLeft size={16} /> Previous Chapter
            </div>
            <div className="card-heading">
              <span className="card-num">{prevChapter.num}</span>
              <span className="card-title">{prevChapter.name}</span>
            </div>
            <p className="card-sub">{prevChapter.title}</p>
          </button>
        ) : (
          <div className="chapter-nav-placeholder">
            <BookOpen size={16} /> Course Beginning
          </div>
        )}

        {/* Center Progress Dots */}
        <div className="chapter-nav-center">
          <div className="center-dots">
            {CHAPTERS.map((chap, i) => {
              const isCompleted = i < currentIdx;
              const isCurrent = i === currentIdx;
              let dotClass = 'chapter-step-dot';
              if (isCompleted) dotClass += ' completed';
              else if (isCurrent) dotClass += ' current';

              return (
                <button
                  key={chap.id}
                  className={dotClass}
                  title={`Chapter ${chap.num}: ${chap.pill}`}
                  onClick={() => {
                    setActiveChapter(chap.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {isCompleted ? <CircleCheckBig size={10} /> : chap.num}
                </button>
              );
            })}
          </div>
          <span className="center-label">Chapter {currentIdx + 1} of {CHAPTERS.length}</span>
        </div>

        {/* Next Card */}
        {nextChapter ? (
          <button 
            className="chapter-nav-card next-card"
            onClick={() => {
              setActiveChapter(nextChapter.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-direction">
              Next Chapter <ArrowRight size={16} />
            </div>
            <div className="card-heading">
              <span className="card-title">{nextChapter.name}</span>
              <span className="card-num">{nextChapter.num}</span>
            </div>
            <p className="card-sub">{nextChapter.title}</p>
          </button>
        ) : (
          <button 
            className="chapter-nav-card next-card finish-card"
            onClick={() => {
              setActiveChapter('pyramid');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-direction">
              Course Complete <CircleCheckBig size={16} />
            </div>
            <div className="card-heading">
              <span className="card-title">Review from Start</span>
              <span className="card-num">01</span>
            </div>
            <p className="card-sub">Jump back to Chapter 1 Overview</p>
          </button>
        )}
      </div>
    </nav>
  );
}
