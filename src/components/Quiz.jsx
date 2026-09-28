import React, { useState } from 'react';
import { BEGINNER_QUIZ } from '../data/memoryData';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle, Trophy, Sparkles, Check } from 'lucide-react';
import ModuleBottomNav from './ModuleBottomNav';

export default function Quiz({ onNavigateTab }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredHistory, setAnsweredHistory] = useState([]);

  const currentQ = BEGINNER_QUIZ[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    const isCorrect = currentQ.options[idx].correct;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setAnsweredHistory(prev => [
      ...prev,
      {
        question: currentQ.question,
        userOption: currentQ.options[idx],
        correctOption: currentQ.options.find(o => o.correct),
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentIdx < BEGINNER_QUIZ.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredHistory([]);
  };

  const percentage = Math.round((score / BEGINNER_QUIZ.length) * 100);

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Trophy size={14} /> MODULE 07 • KNOWLEDGE LAB & MASTERY QUIZ
        </div>
        <h1 className="hero-headline">Main Memory <span>Mastery Challenge</span></h1>
        <p className="hero-lead">
          Test your hardware mental model. Challenge yourself on DRAM capacitors, SRAM bistable latches, 
          ROM evolution, system buses, and 2D coordinate decoders.
        </p>
      </section>

      {!quizCompleted ? (
        <section className="quiz-card-container">
          {/* Header */}
          <div className="quiz-card-header">
            <span className="quiz-category-tag">
              <Sparkles size={13} /> MAIN MEMORY ARCHITECTURE
            </span>
            <span className="quiz-counter-badge">
              Question {currentIdx + 1} of {BEGINNER_QUIZ.length}
            </span>
          </div>

          <div className="quiz-question-progress-bar">
            <div 
              className="quiz-progress-fill" 
              style={{ width: `${((currentIdx + 1) / BEGINNER_QUIZ.length) * 100}%` }} 
            />
          </div>

          {/* Question Body */}
          <div className="quiz-question-body">
            <h2 className="quiz-question-text">{currentQ.question}</h2>

            <div className="quiz-options-list">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                let optClass = 'quiz-option-btn';
                if (isAnswered) {
                  if (option.correct) optClass += ' option-correct';
                  else if (isSelected && !option.correct) optClass += ' option-wrong';
                  else optClass += ' option-dimmed';
                } else if (isSelected) {
                  optClass += ' option-selected';
                }

                return (
                  <button
                    key={optIdx}
                    className={optClass}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                    <span className="option-content">{option.text}</span>
                    {isAnswered && option.correct && (
                      <CheckCircle2 size={18} className="option-feedback-icon correct" />
                    )}
                    {isAnswered && isSelected && !option.correct && (
                      <XCircle size={18} className="option-feedback-icon wrong" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {isAnswered && (
              <div className={`quiz-explanation-box ${currentQ.options[selectedOption]?.correct ? 'box-correct' : 'box-wrong'}`}>
                <div className="explanation-header">
                  {currentQ.options[selectedOption]?.correct ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald" />
                      <strong>Correct Silicon Insight!</strong>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-rose" />
                      <strong>Architectural Correction:</strong>
                    </>
                  )}
                </div>
                <p className="explanation-text">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="quiz-card-footer">
            <span className="current-score-pill">
              Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}
            </span>

            {isAnswered ? (
              <button className="btn-quiz-nav next highlight" onClick={handleNext}>
                {currentIdx < BEGINNER_QUIZ.length - 1 ? (
                  <>Next Question <ArrowRight size={15} /></>
                ) : (
                  <>View Final Certificate <Trophy size={15} /></>
                )}
              </button>
            ) : (
              <span className="select-prompt-hint">Select an option above to test your answer</span>
            )}
          </div>
        </section>
      ) : (
        /* Completion Certificate Card */
        <section className="quiz-results-card">
          <div className="results-top-banner">
            <div className="results-score-circle">
              <span className="circle-num">{percentage}%</span>
              <span className="circle-sub">{score}/{BEGINNER_QUIZ.length} Correct</span>
            </div>

            <div className="results-rank-info">
              <div className="results-badge" style={{ backgroundColor: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>
                🏆 Hardware Architecture Certification
              </div>
              <h2 className="results-title">
                {score >= 7 ? 'Silicon Master Laureate' : (score >= 5 ? 'Junior Memory Architect' : 'Hardware Explorer')}
              </h2>
              <p className="results-desc">
                {score >= 7 
                  ? 'Outstanding! You have a crystal-clear mental model of DRAM capacitor physics, SRAM flip-flops, 2D wordlines, and system buses.' 
                  : 'Great effort! Revisit the 2D Matrix and Bus Simulator to solidify your understanding of silicon addressing.'}
              </p>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="results-breakdown-section">
            <h3 className="breakdown-headline">Full Review ({score} / {BEGINNER_QUIZ.length})</h3>
            <div className="breakdown-grid">
              {answeredHistory.map((item, idx) => (
                <div key={idx} className={`breakdown-row ${item.isCorrect ? 'is-right' : 'is-wrong'}`}>
                  <div className="breakdown-q-meta">
                    <span className="breakdown-q-num">Q{idx + 1}</span>
                  </div>
                  <div className="breakdown-q-details">
                    <div className="breakdown-question-line">{item.question}</div>
                    <div className="breakdown-answer-line">
                      {item.isCorrect ? (
                        <span className="ans-tag success">
                          <Check size={13} /> Your Answer: {item.userOption?.text}
                        </span>
                      ) : (
                        <div className="ans-wrong-pair">
                          <span className="ans-tag fail">
                            <XCircle size={13} /> Your Answer: {item.userOption?.text}
                          </span>
                          <span className="ans-tag correct-ref">
                            <Check size={13} /> Correct: {item.correctOption?.text}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="results-actions-row">
            <button className="btn-results-action secondary" onClick={handleRestart}>
              <RotateCcw size={16} /> Retake Challenge
            </button>
            <button 
              className="btn-results-action primary"
              onClick={() => {
                onNavigateTab('explorer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Review from Module 1
            </button>
          </div>
        </section>
      )}

      {/* Module Bottom Navigation */}
      <ModuleBottomNav currentTab="quiz" setCurrentTab={onNavigateTab} />
    </div>
  );
}
