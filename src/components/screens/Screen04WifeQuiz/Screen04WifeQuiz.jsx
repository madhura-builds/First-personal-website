import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, Trophy, Star, Check, X } from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  RESULT_TIERS,
  UNIVERSAL_CLOSING,
  ACHIEVEMENT,
} from '../../../data/quizQuestions';
import styles from './Screen04.module.css';

/* ─── Animation helpers ──────────────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0, reduced = false) => ({
  hidden:  { opacity: 0, y: reduced ? 0 : 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: reduced ? 0.07 : 0.48, delay, ease },
  },
});

/* ─────────────────────────────────────────────────────────────────────────────
   INTRO SCREEN
───────────────────────────────────────────────────────────────────────────── */
const IntroScreen = ({ onStart, isReducedMotion }) => {
  const d = (n) => (isReducedMotion ? 0 : n);

  return (
    <motion.div
      className={styles.introSection}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: isReducedMotion ? 0 : 0.1 } },
      }}
    >
      <motion.div variants={fadeUp(0, isReducedMotion)}>
        <div className={styles.stageBadge}>
          <span className={styles.stageDot} />
          <span>STAGE 04 // 07 • RELATIONSHIP KNOWLEDGE TEST</span>
        </div>
      </motion.div>

      <motion.h1 className={styles.introTitle} variants={fadeUp(d(0.06), isReducedMotion)}>
        HOW WELL DO YOU<br />KNOW YOUR WIFE?
      </motion.h1>

      <motion.p className={styles.introSubtitle} variants={fadeUp(d(0.12), isReducedMotion)}>
        You've successfully passed the developer test. But now comes the real challenge...
      </motion.p>

      <motion.p className={styles.introPlayful} variants={fadeUp(d(0.18), isReducedMotion)}>
        Let's see how well you've been paying attention. No Google. No ChatGPT. Just your memory.&nbsp;😉
      </motion.p>

      <motion.div variants={fadeUp(d(0.26), isReducedMotion)}>
        <button className={styles.startButton} onClick={onStart} aria-label="Start the wife quiz">
          <span>Start the Challenge</span>
          <ArrowRight size={17} />
          <span className={styles.startButtonShimmer} aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   QUESTION CARD
───────────────────────────────────────────────────────────────────────────── */
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const QuestionCard = ({
  question,
  questionIndex,
  totalQuestions,
  score,
  selectedIndex,
  isSubmitted,
  onSelect,
  onNext,
  isReducedMotion,
}) => {
  const optionRefs = useRef([]);
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const isCorrect = isSubmitted && selectedIndex === question.correctAnswer;
  const isLastQuestion = questionIndex === totalQuestions - 1;

  useEffect(() => {
    optionRefs.current[0]?.focus();
  }, [question.id]);

  const handleOptionKeyDown = (event, optionIndex) => {
    if (isSubmitted) return;
    let nextIndex = optionIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (optionIndex + 1) % question.options.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (optionIndex - 1 + question.options.length) % question.options.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = question.options.length - 1;
    else return;
    event.preventDefault();
    onSelect(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  };

  const getOptionClass = (optIdx) => {
    if (!isSubmitted) {
      return selectedIndex === optIdx ? styles.selected : '';
    }
    if (optIdx === question.correctAnswer) return styles.correct;
    if (optIdx === selectedIndex)          return styles.incorrect;
    return '';
  };

  const renderOptionMarker = (optIdx) => {
    if (isSubmitted) {
      if (optIdx === question.correctAnswer) {
        return <Check size={14} strokeWidth={3} aria-hidden="true" />;
      }
      if (optIdx === selectedIndex) {
        return <X size={14} strokeWidth={3} aria-hidden="true" />;
      }
    }
    return OPTION_LABELS[optIdx];
  };

  return (
    <motion.div
      className={styles.quizCard}
      key={`q-${question.id}`}
      initial={{ opacity: 0, x: isReducedMotion ? 0 : 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isReducedMotion ? 0 : -28 }}
      transition={{ duration: isReducedMotion ? 0.06 : 0.38, ease }}
    >
      {/* Progress header */}
      <div className={styles.progressHeader}>
        <span className={styles.questionCount}>
          QUESTION {String(questionIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;
          {String(totalQuestions).padStart(2, '0')}
        </span>
        <span className={styles.scoreTracker}>Score: {score} correct</span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar} role="progressbar" aria-label="Quiz progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={styles.progressFill}
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      {/* Question */}
      <h1 id={`question-${question.id}`} className={styles.questionText}>{question.question}</h1>

      {/* Options */}
      <div className={styles.optionsList} role="radiogroup" aria-labelledby={`question-${question.id}`}>
        {question.options.map((opt, optIdx) => (
          <button
            key={optIdx}
            ref={(element) => { optionRefs.current[optIdx] = element; }}
            className={`${styles.optionButton} ${getOptionClass(optIdx)}`}
            onClick={() => !isSubmitted && onSelect(optIdx)}
            onKeyDown={(event) => handleOptionKeyDown(event, optIdx)}
            disabled={isSubmitted}
            role="radio"
            aria-checked={selectedIndex === optIdx}
            tabIndex={selectedIndex === optIdx || (selectedIndex === null && optIdx === 0) ? 0 : -1}
            aria-label={`Option ${OPTION_LABELS[optIdx]}: ${opt}`}
          >
            <span className={styles.optionMarker}>{renderOptionMarker(optIdx)}</span>
            <span className={styles.optionText}>{opt}</span>
          </button>
        ))}
      </div>

      {/* Feedback banner — appears after submission */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            className={`${styles.feedbackBanner} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}
            initial={{ opacity: 0, y: isReducedMotion ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.04 : 0.32, ease }}
            role="status"
            aria-live="polite"
            tabIndex={-1}
          >
            {isCorrect ? question.correctMessage : question.incorrectMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next / Submit button */}
      <button
        className={styles.nextButton}
        onClick={onNext}
        disabled={selectedIndex === null}
        aria-label={isSubmitted
          ? (isLastQuestion ? 'See your results' : 'Next question')
          : 'Submit your answer'}
      >
        {isSubmitted
          ? (isLastQuestion ? 'See My Results' : 'Next Question')
          : 'Submit Answer'}
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   RESULT SCREEN
───────────────────────────────────────────────────────────────────────────── */
const ResultScreen = ({ score, total, onContinue, isReducedMotion }) => {
  const [achievementClaimed, setAchievementClaimed] = useState(false);
  const [showAchievement, setShowAchievement]       = useState(false);
  const achievementTimer = useRef(null);
  const resultHeadingRef = useRef(null);

  useEffect(() => {
    resultHeadingRef.current?.focus();
  }, []);

  useEffect(() => () => {
    if (achievementTimer.current) window.clearTimeout(achievementTimer.current);
  }, []);

  const percentage = Math.round((score / total) * 100);
  const tier = RESULT_TIERS.find((t) => score >= t.minScore) || RESULT_TIERS[RESULT_TIERS.length - 1];

  const handleClaimAchievement = () => {
    if (achievementClaimed) return;
    setAchievementClaimed(true);
    achievementTimer.current = window.setTimeout(() => setShowAchievement(true), isReducedMotion ? 50 : 300);
  };

  const d = (n) => (isReducedMotion ? 0 : n);

  return (
    <motion.div
      className={styles.resultSection}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: isReducedMotion ? 0 : 0.12 } },
      }}
    >
      {/* Score card */}
      <motion.div className={styles.resultCard} variants={fadeUp(0, isReducedMotion)}>
        <span className={styles.resultEmoji} role="img" aria-label={tier.label}>
          {tier.emoji}
        </span>
        <div className={styles.resultScoreRow}>
          <span className={styles.resultScoreBig}>{score}</span>
          <span className={styles.resultScoreTotal}>/ {total}</span>
        </div>
        <p className={styles.resultPercent}>{percentage}% CORRECT</p>
        <h1 ref={resultHeadingRef} tabIndex={-1} className={styles.resultLabel}>{tier.label}</h1>
        <p className={styles.resultMessage}>{tier.message}</p>
      </motion.div>

      {/* Universal closing message */}
      <motion.div className={styles.closingCard} variants={fadeUp(d(0.06), isReducedMotion)}>
        <p className={styles.closingText}>❤️ &nbsp;{UNIVERSAL_CLOSING}</p>
      </motion.div>

      {/* Achievement interaction */}
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem', width: '100%' }}
        variants={fadeUp(d(0.12), isReducedMotion)}
      >
        <AnimatePresence mode="wait">
          {!achievementClaimed && (
            <motion.button
              key="claim-btn"
              className={styles.achievementButton}
              onClick={handleClaimAchievement}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              aria-label="Claim your husband points"
            >
              <Trophy size={17} />
              <span>Claim Your Husband Points ❤️</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAchievement && (
            <motion.div
              className={styles.achievementCard}
              key="achievement"
              initial={{ opacity: 0, scale: isReducedMotion ? 1 : 0.94, y: isReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: isReducedMotion ? 0.05 : 0.45, ease }}
            >
              <p className={styles.achievementTitle}>{ACHIEVEMENT.title}</p>
              <p className={styles.achievementName}>✨ {ACHIEVEMENT.name} ✨</p>
              <p className={styles.achievementReward}>{ACHIEVEMENT.reward}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Continue to Screen 05 */}
      <motion.div
        className={styles.footerSection}
        variants={fadeUp(d(0.18), isReducedMotion)}
      >
        <p className={styles.footerText}>One last thing... I have something to tell you.</p>
        <button
          className={styles.continueButton}
          onClick={onContinue}
          aria-label="Read the letter — navigate to Screen 05"
        >
          <span>Read My Letter</span>
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SCREEN 04 COMPONENT
───────────────────────────────────────────────────────────────────────────── */

/** Quiz phases: intro → quiz → result */
const PHASE = { INTRO: 'intro', QUIZ: 'quiz', RESULT: 'result' };

export const Screen04WifeQuiz = ({ onContinue, isReducedMotion }) => {
  const [phase, setPhase]               = useState(PHASE.INTRO);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);   // current selection
  const [isSubmitted, setIsSubmitted]     = useState(false);  // answer locked in
  const [score, setScore]                 = useState(0);
  const submittedAt = useRef(0);

  const total = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  /* Start quiz */
  const handleStart = () => setPhase(PHASE.QUIZ);

  /* Select an option (only before submission) */
  const handleSelect = useCallback((optIdx) => {
    if (isSubmitted) return;
    setSelectedIndex(optIdx);
  }, [isSubmitted]);

  /* Submit or advance */
  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;

    if (!isSubmitted) {
      // Lock in and score
      const correct = selectedIndex === currentQuestion.correctAnswer;
      if (correct) setScore((s) => s + 1);
      submittedAt.current = Date.now();
      setIsSubmitted(true);
      return;
    }

    // Ignore a second click from the same rapid submit action.
    if (Date.now() - submittedAt.current < 400) return;

    // Advance to next question or result
    const nextIdx = questionIndex + 1;
    if (nextIdx < total) {
      setQuestionIndex(nextIdx);
      setSelectedIndex(null);
      setIsSubmitted(false);
    } else {
      setPhase(PHASE.RESULT);
    }
  }, [selectedIndex, isSubmitted, currentQuestion, questionIndex, total]);

  /* Continue to Screen 05 */
  const handleContinue = () => {
    if (onContinue) onContinue();
  };

  return (
    <main className={styles.screenContainer}>
      <div className={styles.ambientTopLeft}     aria-hidden="true" />
      <div className={styles.ambientBottomRight} aria-hidden="true" />

      <div className={styles.contentWrapper}>
        <AnimatePresence mode="wait">

          {phase === PHASE.INTRO && (
            <motion.div key="intro" style={{ width: '100%' }}
              exit={{ opacity: 0, y: isReducedMotion ? 0 : -14, transition: { duration: 0.25 } }}
            >
              <IntroScreen onStart={handleStart} isReducedMotion={isReducedMotion} />
            </motion.div>
          )}

          {phase === PHASE.QUIZ && (
            <AnimatePresence mode="wait" key="quiz-area">
              <QuestionCard
                key={`q-${questionIndex}`}
                question={currentQuestion}
                questionIndex={questionIndex}
                totalQuestions={total}
                score={score}
                selectedIndex={selectedIndex}
                isSubmitted={isSubmitted}
                onSelect={handleSelect}
                onNext={handleNext}
                isReducedMotion={isReducedMotion}
              />
            </AnimatePresence>
          )}

          {phase === PHASE.RESULT && (
            <motion.div key="result" style={{ width: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: isReducedMotion ? 0.06 : 0.45 } }}
            >
              <ResultScreen
                score={score}
                total={total}
                onContinue={handleContinue}
                isReducedMotion={isReducedMotion}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
};

export default Screen04WifeQuiz;

