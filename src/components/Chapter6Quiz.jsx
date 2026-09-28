import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/hierarchyData';
import ChapterBottomNav from './ChapterBottomNav';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  Layers, 
  Check, 
  Info,
  Clock,
  Target
} from 'lucide-react';

export default function Chapter6Quiz({ activeChapter, setActiveChapter }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIdx]: selectedOptionIndex }
  const [isSubmitted, setIsSubmitted] = useState({}); // { [questionIdx]: boolean }
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optIdx) => {
    if (isSubmitted[currentQuestionIdx]) return; // already answered
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: optIdx }));
    setIsSubmitted(prev => ({ ...prev, [currentQuestionIdx]: true }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted({});
    setCurrentQuestionIdx(0);
    setQuizFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    const q = QUIZ_QUESTIONS[parseInt(qIdx, 10)];
    return q && q.options[ansIdx]?.correct ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getRankBadge = (score) => {
    if (score === 10) return { title: 'Architect Laureate', color: '#7c3aed', badge: '🏆 Flawless Hardware Mastery', desc: 'You possess exceptional micro-architectural intuition across memory tiers, cache physics, and latency trade-offs.' };
    if (score >= 8) return { title: 'Lead Silicon Engineer', color: '#0284c7', badge: '⚡ Advanced Systems Architect', desc: 'Outstanding knowledge of cache lines, associativity, spatial/temporal locality, and processor-memory pipelines.' };
    if (score >= 6) return { title: 'Systems Programmer', color: '#059669', badge: '🛠️ Solid Architectural Understanding', desc: 'Strong grasp of core memory fundamentals. Review the AMAT equations and matrix traversal labs to reach mastery.' };
    return { title: 'Hardware Explorer', color: '#ea580c', badge: '📚 Foundations in Progress', desc: 'Great foundation! Revisit the interactive chapters to explore why caches tick, then try the challenge again.' };
  };

  const rank = getRankBadge(correctCount);

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-eyebrow">
          <Trophy size={14} /> CHAPTER 06 • MASTERY ASSESSMENT
        </div>
        <h1 className="hero-headline">Knowledge Lab & <span>Mastery Quiz</span></h1>
        <p className="hero-lead">
          Put your hardware mental model to the test. Ten scenario-driven architectural challenges covering 
          latency scaling, cache organization, silicon cell physics, locality of reference, and AMAT equations.
        </p>

        <div className="quiz-top-stats-bar">
          <div className="quiz-stat-pill">
            <span className="stat-label">Total Questions</span>
            <span className="stat-val">{totalQuestions} Scenarios</span>
          </div>
          <div className="quiz-stat-pill">
            <span className="stat-label">Answered</span>
            <span className="stat-val">{Object.keys(isSubmitted).length} / {totalQuestions}</span>
          </div>
          <div className="quiz-stat-pill highlight">
            <span className="stat-label">Current Score</span>
            <span className="stat-val">{correctCount} Correct ({percentage}%)</span>
          </div>
        </div>
      </section>

      {/* Main Quiz Arena */}
      <section className="quiz-arena-container">
        {!quizFinished ? (
          <div className="quiz-card-container">
            {/* Question Header & Progress Bar */}
            <div className="quiz-card-header">
              <div className="quiz-category-tag">
                <Sparkles size={13} /> {currentQ.category}
              </div>
              <div className="quiz-counter-badge">
                Question {currentQuestionIdx + 1} of {totalQuestions}
              </div>
            </div>

            <div className="quiz-question-progress-bar">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="quiz-question-body">
              <h2 className="quiz-question-text">{currentQ.question}</h2>

              {/* Options Grid */}
              <div className="quiz-options-list">
                {currentQ.options.map((option, optIdx) => {
                  const isCurrentChosen = selectedAnswers[currentQuestionIdx] === optIdx;
                  const hasAnswered = isSubmitted[currentQuestionIdx];
                  const isThisCorrect = option.correct;

                  let optClass = 'quiz-option-btn';
                  if (hasAnswered) {
                    if (isThisCorrect) optClass += ' option-correct';
                    else if (isCurrentChosen && !isThisCorrect) optClass += ' option-wrong';
                    else optClass += ' option-dimmed';
                  } else if (isCurrentChosen) {
                    optClass += ' option-selected';
                  }

                  return (
                    <button
                      key={optIdx}
                      className={optClass}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={hasAnswered}
                    >
                      <span className="option-letter">{option.letter}</span>
                      <span className="option-content">{option.text}</span>
                      {hasAnswered && isThisCorrect && (
                        <CheckCircle2 size={18} className="option-feedback-icon correct" />
                      )}
                      {hasAnswered && isCurrentChosen && !isThisCorrect && (
                        <XCircle size={18} className="option-feedback-icon wrong" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Post-Answer Architectural Explanation Box */}
              {isSubmitted[currentQuestionIdx] && (
                <div className={`quiz-explanation-box ${currentQ.options[selectedAnswers[currentQuestionIdx]]?.correct ? 'box-correct' : 'box-wrong'}`}>
                  <div className="explanation-header">
                    {currentQ.options[selectedAnswers[currentQuestionIdx]]?.correct ? (
                      <>
                        <CheckCircle2 size={18} className="text-emerald" />
                        <strong>Correct Architectural Analysis!</strong>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-rose" />
                        <strong>Architectural Insight & Correction:</strong>
                      </>
                    )}
                  </div>
                  <p className="explanation-text">{currentQ.explanation}</p>
                </div>
              )}
            </div>

            {/* Card Navigation Footer */}
            <div className="quiz-card-footer">
              <button 
                className="btn-quiz-nav prev"
                onClick={handlePrev}
                disabled={currentQuestionIdx === 0}
              >
                Previous
              </button>

              <div className="quiz-jump-pills">
                {QUIZ_QUESTIONS.map((_, qIdx) => {
                  const answered = isSubmitted[qIdx];
                  const wasCorrect = answered && QUIZ_QUESTIONS[qIdx].options[selectedAnswers[qIdx]]?.correct;
                  let pillClass = 'jump-dot';
                  if (qIdx === currentQuestionIdx) pillClass += ' active';
                  if (answered) pillClass += wasCorrect ? ' correct' : ' wrong';

                  return (
                    <button
                      key={qIdx}
                      className={pillClass}
                      onClick={() => setCurrentQuestionIdx(qIdx)}
                      title={`Jump to Q${qIdx + 1}`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>

              {isSubmitted[currentQuestionIdx] ? (
                <button 
                  className="btn-quiz-nav next highlight"
                  onClick={handleNext}
                >
                  {currentQuestionIdx < totalQuestions - 1 ? (
                    <>Next Question <ArrowRight size={15} /></>
                  ) : (
                    <>View Final Results <Trophy size={15} /></>
                  )}
                </button>
              ) : (
                <span className="select-prompt-hint">Select an answer above to continue</span>
              )}
            </div>
          </div>
        ) : (
          /* Completion & Certificate Card */
          <div className="quiz-results-card">
            <div className="results-top-banner">
              <div className="results-score-circle">
                <span className="circle-num">{percentage}%</span>
                <span className="circle-sub">{correctCount}/{totalQuestions} Correct</span>
              </div>

              <div className="results-rank-info">
                <div className="results-badge" style={{ backgroundColor: `${rank.color}15`, color: rank.color, borderColor: `${rank.color}40` }}>
                  {rank.badge}
                </div>
                <h2 className="results-title">{rank.title}</h2>
                <p className="results-desc">{rank.desc}</p>
              </div>
            </div>

            {/* Full Answer Key Review */}
            <div className="results-breakdown-section">
              <h3 className="breakdown-headline">Full Architectural Review ({correctCount} / {totalQuestions})</h3>
              <div className="breakdown-grid">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const userAnsIdx = selectedAnswers[idx];
                  const userOption = q.options[userAnsIdx];
                  const correctOption = q.options.find(o => o.correct);
                  const isRight = userOption?.correct;

                  return (
                    <div key={idx} className={`breakdown-row ${isRight ? 'is-right' : 'is-wrong'}`}>
                      <div className="breakdown-q-meta">
                        <span className="breakdown-q-num">Q{idx + 1}</span>
                        <span className="breakdown-q-cat">{q.category}</span>
                      </div>
                      <div className="breakdown-q-details">
                        <div className="breakdown-question-line">{q.question}</div>
                        <div className="breakdown-answer-line">
                          {isRight ? (
                            <span className="ans-tag success">
                              <Check size={13} /> Your Answer: ({userOption?.letter}) {userOption?.text}
                            </span>
                          ) : (
                            <div className="ans-wrong-pair">
                              <span className="ans-tag fail">
                                <XCircle size={13} /> Your Answer: ({userOption?.letter || 'None'}) {userOption?.text || 'Skipped'}
                              </span>
                              <span className="ans-tag correct-ref">
                                <Check size={13} /> Correct: ({correctOption?.letter}) {correctOption?.text}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="results-actions-row">
              <button className="btn-results-action secondary" onClick={handleRestart}>
                <RotateCcw size={16} /> Retake Quiz
              </button>
              <button 
                className="btn-results-action primary"
                onClick={() => {
                  setActiveChapter('pyramid');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Layers size={16} /> Review From Chapter 1
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Chapter Bottom Navigation */}
      <ChapterBottomNav activeChapter={activeChapter} setActiveChapter={setActiveChapter} />
    </div>
  );
}
