import React, { useState } from 'react';
import { BEGINNER_QUIZ } from '../data/memoryData';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, HelpCircle } from 'lucide-react';

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = BEGINNER_QUIZ[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (currentQ.options[idx].correct) {
      setScore(s => s + 1);
    }
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
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-header-banner">
        <span className="panel-kicker">INTERACTIVE KNOWLEDGE CHECK</span>
        <h3>Main Memory Architecture Mastery</h3>
        <p className="quiz-subtitle">
          Test what you have learned about RAM, ROM, SRAM, DRAM, buses, and hierarchy!
        </p>
      </div>

      {!quizCompleted ? (
        <div className="quiz-card-shell">
          {/* Progress Header */}
          <div className="quiz-progress-row">
            <span className="question-count">
              Question {currentIdx + 1} of {BEGINNER_QUIZ.length}
            </span>
            <div className="quiz-progress-track">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${((currentIdx + 1) / BEGINNER_QUIZ.length) * 100}%` }}
              />
            </div>
            <span className="score-counter">Score: {score}</span>
          </div>

          <h4 className="question-prompt">{currentQ.question}</h4>

          <div className="quiz-options-list">
            {currentQ.options.map((opt, i) => {
              let optionClass = 'quiz-option-btn';
              if (isAnswered) {
                if (opt.correct) optionClass += ' correct-option';
                else if (selectedOption === i) optionClass += ' wrong-option';
              } else if (selectedOption === i) {
                optionClass += ' selected-option';
              }

              return (
                <button
                  key={i}
                  className={optionClass}
                  onClick={() => handleSelectOption(i)}
                  disabled={isAnswered}
                >
                  <div className="option-indicator-bubble">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="option-text">{opt.text}</span>
                  {isAnswered && opt.correct && <CheckCircle2 size={18} className="status-icon-good" />}
                  {isAnswered && selectedOption === i && !opt.correct && <XCircle size={18} className="status-icon-bad" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="explanation-banner">
              <div className="explanation-head">
                <HelpCircle size={15} />
                <span>EXPLANATION</span>
              </div>
              <p>{currentQ.explanation}</p>
              <button className="atelier-primary-btn next-q-btn" onClick={handleNext}>
                <span>{currentIdx < BEGINNER_QUIZ.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz-results-card">
          <div className="result-award-icon">
            <Award size={48} />
          </div>
          <h3>Quiz Completed!</h3>
          <p className="result-score-line">
            You scored <strong>{score}</strong> out of <strong>{BEGINNER_QUIZ.length}</strong>!
          </p>
          <p className="result-praise">
            {score === BEGINNER_QUIZ.length
              ? 'Outstanding! You understand computer memory architecture at a professional foundational level.'
              : score >= 3
              ? 'Great work! You have a solid grasp of how memory, buses, and CPUs communicate.'
              : 'Good effort! Review the visualizer labs and try again to cement your understanding.'}
          </p>

          <button className="atelier-primary-btn" onClick={handleRestart}>
            <RotateCcw size={15} />
            <span>Retake Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
}
