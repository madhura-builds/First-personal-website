import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Bug, Play, CheckCircle2, Terminal, Heart, ArrowRight, Cpu } from 'lucide-react';
import styles from './Screen03.module.css';

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1];

const BUG_CARDS = [
  {
    id: 'BUG_001',
    desc: 'Steals my attention.',
    status: 'WON\'T FIX ❤️',
  },
  {
    id: 'BUG_002',
    desc: 'Causes unexpected smiling whenever I think about him.',
    status: 'WON\'T FIX ❤️',
  },
  {
    id: 'BUG_003',
    desc: 'Occupies 100% of my heart\'s storage.',
    status: 'WON\'T FIX ❤️',
  },
  {
    id: 'BUG_004',
    desc: 'Cannot be replaced. No alternative version available.',
    status: 'WON\'T FIX ❤️',
  },
  {
    id: 'BUG_005',
    desc: 'Permanent magnetic attraction towards my favourite human.',
    status: 'WON\'T FIX ❤️',
  },
];

const COMPILE_STEPS = [
  { text: 'Compiling feelings...', delay: 0 },
  { text: 'Checking compatibility...', delay: 700 },
  { text: 'Testing forever...', delay: 1400 },
  { text: 'Build successful.', delay: 2100, success: true },
];

const METRICS = [
  { label: 'Love Compatibility', value: '100%', bar: 1, sub: 'Maximum threshold' },
  { label: 'Lifetime Commitment', value: '∞', bar: null, sub: 'No expiry date' },
  { label: 'Favourite Person', value: '1 of 1', bar: null, sub: 'Uniquely irreplaceable' },
  { label: 'Heart Storage', value: '100%', bar: 1, sub: 'Fully occupied' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

/** Syntax-highlighted code editor card */
const CodeEditorCard = ({ isReducedMotion }) => {
  // Each line: array of { cls, text } token spans
  const lines = [
    [{ cls: 'tokComment', text: '// favouriteHuman.js — private, classified, irreplaceable' }],
    [],
    [{ cls: 'tokConst', text: 'const ' }, { cls: 'tokVar', text: 'myFavouriteHuman' }, { cls: 'tokPunct', text: ' = {' }],
    [{ cls: 'tokProp', text: '  identity' }, { cls: 'tokPunct', text: ':     ' }, { cls: 'tokStr', text: '"My Forever Person"' }, { cls: 'tokPunct', text: ',' }],
    [{ cls: 'tokProp', text: '  role' }, { cls: 'tokPunct', text: ':         ' }, { cls: 'tokStr', text: '"Professional Heart Stealer"' }, { cls: 'tokPunct', text: ',' }],
    [{ cls: 'tokProp', text: '  priority' }, { cls: 'tokPunct', text: ':     ' }, { cls: 'tokStr', text: '"VERY_HIGH"' }, { cls: 'tokPunct', text: ',' }],
    [{ cls: 'tokProp', text: '  hugs' }, { cls: 'tokPunct', text: ':         ' }, { cls: 'tokNum', text: 'Infinity' }, { cls: 'tokPunct', text: ',' }],
    [{ cls: 'tokProp', text: '  kisses' }, { cls: 'tokPunct', text: ':       ' }, { cls: 'tokNum', text: 'Infinity' }, { cls: 'tokPunct', text: ',' }],
    [{ cls: 'tokProp', text: '  love' }, { cls: 'tokPunct', text: ':         ' }, { cls: 'tokStr', text: '"UNCONDITIONAL"' }, { cls: 'tokPunct', text: ',' }],
    // [{ cls: 'tokProp', text: '  relationshipStatus' }, { cls: 'tokPunct', text: ': ' }, { cls: 'tokStr', text: '"HAPPILY_COMMITTED"' }, { cls: 'tokPunct', text: ',' }],
    [{ cls: 'tokProp', text: '  subscription' }, { cls: 'tokPunct', text: ':  ' }, { cls: 'tokStr', text: '"LIFETIME"' }],
    [{ cls: 'tokPunct', text: '};' }],
    [],
    [{ cls: 'tokConst', text: 'const ' }, { cls: 'tokVar', text: 'isMyFavouritePerson' }, { cls: 'tokPunct', text: ' = ' }, { cls: 'tokBool', text: 'true' }, { cls: 'tokPunct', text: ';' }],
  ];

  return (
    <div className={styles.codeEditorCard}>
      {/* Chrome bar */}
      <div className={styles.editorChrome}>
        <div className={styles.windowDots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <div className={styles.editorTab}>
          <span className={styles.editorTabDot} />
          <span>favouriteHuman.js</span>
        </div>
        <span className={styles.editorLang}>JavaScript</span>
      </div>

      {/* Code body */}
      <div className={styles.codeBody}>
        {/* Line numbers */}
        <div className={styles.lineNumbers} aria-hidden="true">
          {lines.map((_, i) => (
            <span key={i} className={styles.lineNum}>{i + 1}</span>
          ))}
        </div>

        {/* Syntax-highlighted content */}
        <div className={styles.codeContent}>
          {lines.map((tokens, lineIdx) => (
            <div key={lineIdx} className={styles.codeLine}>
              {tokens.length === 0 ? '\u00A0' : (
                tokens.map((tok, ti) => (
                  <span key={ti} className={styles[tok.cls]}>{tok.text}</span>
                ))
              )}
              {/* Blinking cursor on last line */}
              {lineIdx === lines.length - 1 && (
                <span className={styles.editorCursor} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** A single animated bug card */
const BugCard = ({ bug, index, isReducedMotion }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={styles.bugCard}
      initial={{ opacity: 0, x: isReducedMotion ? 0 : -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: isReducedMotion ? 0.05 : 0.42,
        delay: isReducedMotion ? 0 : index * 0.1,
        ease,
      }}
    >
      <div className={styles.bugIconWrap} aria-hidden="true">
        <Bug size={16} />
      </div>
      <div className={styles.bugInfo}>
        <div className={styles.bugId}>{bug.id}</div>
        <div className={styles.bugDesc}>{bug.desc}</div>
        <div className={styles.bugStatus}>{bug.status}</div>
      </div>
    </motion.div>
  );
};

/** An animated metric card */
const MetricCard = ({ metric, index, isReducedMotion }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={styles.metricCard}
      initial={{ opacity: 0, y: isReducedMotion ? 0 : 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: isReducedMotion ? 0.05 : 0.45,
        delay: isReducedMotion ? 0 : index * 0.1,
        ease,
      }}
    >
      <div className={styles.metricLabel}>{metric.label}</div>
      <div className={styles.metricValue}>{metric.value}</div>
      {metric.bar !== null && (
        <div className={styles.metricBar}>
          <motion.div
            className={styles.metricBarFill}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: metric.bar } : {}}
            transition={{
              duration: isReducedMotion ? 0.05 : 0.85,
              delay: isReducedMotion ? 0 : index * 0.12 + 0.3,
              ease,
            }}
          />
        </div>
      )}
      <div className={styles.metricSub}>{metric.sub}</div>
    </motion.div>
  );
};

/** The run Love.exe compile terminal */
const CompileTerminal = ({ steps, showResult, isReducedMotion }) => (
  <motion.div
    className={styles.compileTerminal}
    initial={{ opacity: 0, y: isReducedMotion ? 0 : 10, scale: isReducedMotion ? 1 : 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: isReducedMotion ? 0.05 : 0.38, ease }}
  >
    <div className={styles.compileTerminalHeader}>
      <div className={styles.compileTerminalDots}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotGreen}`} />
      </div>
      <span className={styles.compileTerminalTitle}>love.exe — compile output</span>
    </div>
    <div className={styles.compileTerminalBody} role="log" aria-live="polite" aria-atomic="false">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          className={styles.compileLine}
          initial={{ opacity: 0, x: isReducedMotion ? 0 : -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: isReducedMotion ? 0.05 : 0.28, ease: 'easeOut' }}
        >
          <span className={styles.compilePrefix}>{'>'}</span>
          <span className={step.success ? styles.compileSuccess : styles.compileText}>
            {step.text}
          </span>
        </motion.div>
      ))}
      {showResult && (
        <motion.div
          className={styles.compileResult}
          initial={{ opacity: 0, y: isReducedMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isReducedMotion ? 0.05 : 0.4, ease }}
        >
          Result: You're still my favourite person. No bugs can change that.
        </motion.div>
      )}
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SCREEN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export const Screen03LoveLanguage = ({ onContinue, isReducedMotion }) => {
  /* Run Love.exe state */
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [compileSteps, setCompileSteps] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const compileTimers = useRef([]);
  const isRunningRef = useRef(false);

  useEffect(() => () => {
    compileTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const handleRunLove = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    compileTimers.current.forEach((timer) => window.clearTimeout(timer));
    compileTimers.current = [];
    setCompileSteps([]);
    setShowResult(false);
    setIsRunning(true);

    if (isReducedMotion) {
      setCompileSteps(COMPILE_STEPS);
      setShowResult(true);
      setIsRunning(false);
      setHasRun(true);
      isRunningRef.current = false;
      return;
    }

    compileTimers.current = COMPILE_STEPS.map((step) =>
      window.setTimeout(() => {
        setCompileSteps((prev) => [...prev, step]);
      }, step.delay)
    );

    compileTimers.current.push(window.setTimeout(() => {
      setShowResult(true);
      setIsRunning(false);
      setHasRun(true);
      isRunningRef.current = false;
      compileTimers.current = [];
    }, 2700));
  };

  /* Stagger helper */
  const d = (n) => (isReducedMotion ? 0 : n);

  /* Fade-up helper */
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: isReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: isReducedMotion ? 0.06 : 0.5, delay, ease } },
  });

  return (
    <main className={styles.screenContainer}>
      <div className={styles.ambientTop} aria-hidden="true" />
      <div className={styles.ambientBottomRight} aria-hidden="true" />

      <div className={styles.contentWrapper}>

        {/* ── 1. Section header ─────────────────────────────────────────── */}
        <motion.div
          className={styles.sectionHeader}
          variants={fadeUp(d(0.08))}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.stageBadge}>
            <span className={styles.stageDot} />
            <span>STAGE 03 // 07 • DECODING MY FAVOURITE HUMAN</span>
          </div>
          <h1 className={styles.sectionTitle}>
            THE DEVELOPER'S<br />LOVE LANGUAGE
          </h1>
          <p className={styles.sectionSubtext}>
            Some people express love through words. Some through actions.
            And some... through perfectly written code. But you? You're my
            favourite combination of all three.
          </p>
        </motion.div>

        {/* ── 2. Code editor card ───────────────────────────────────────── */}
        <motion.div
          variants={fadeUp(d(0.22))}
          initial="hidden"
          animate="visible"
        >
          <CodeEditorCard isReducedMotion={isReducedMotion} />
        </motion.div>

        {/* ── 3. Bug cards ─────────────────────────────────────────────── */}
        <div>
          <motion.div
            className={styles.sectionHeader}
            style={{ marginBottom: '1.15rem' }}
            variants={fadeUp(d(0.32))}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.stageBadge}>
              <span className={styles.stageDot} />
              <span>KNOWN BUGS IN MY FAVOURITE HUMAN</span>
            </div>
          </motion.div>

          <div className={styles.bugsSection}>
            {BUG_CARDS.map((bug, i) => (
              <BugCard
                key={bug.id}
                bug={bug}
                index={i}
                isReducedMotion={isReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* ── 4. Compatibility metrics ──────────────────────────────────── */}
        <div>
          <motion.div
            className={styles.sectionHeader}
            style={{ marginBottom: '1.15rem' }}
            variants={fadeUp(d(0.18))}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.stageBadge}>
              <span className={styles.stageDot} />
              <span>OUR COMPATIBILITY REPORT</span>
            </div>
          </motion.div>

          <div className={styles.metricsGrid}>
            {METRICS.map((metric, i) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                index={i}
                isReducedMotion={isReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* ── 5. Romantic message ───────────────────────────────────────── */}
        <motion.div
          className={styles.romanticCard}
          variants={fadeUp(d(0.12))}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className={styles.romanticCardIcon} role="img" aria-label="Sparkling heart">💫</span>
          <p className={styles.romanticQuote}>
            "Out of all the people in this world, you're the one my heart
            would choose in every version of life."
          </p>
          <p className={styles.romanticSub}>
            Even if life were rewritten from scratch, I'd still want you in my story.
          </p>
        </motion.div>

        {/* ── 6. Run Love.exe interaction ───────────────────────────────── */}
        <motion.div
          className={styles.runSection}
          variants={fadeUp(d(0.1))}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <AnimatePresence mode="wait">
            <>
              <motion.button
                key="run-btn"
                className={styles.runButton}
                onClick={handleRunLove}
                aria-disabled={isRunning}
                aria-label={isRunning ? 'Love.exe is compiling' : hasRun ? 'Run Love.exe again' : 'Run Love.exe'}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <Play size={16} fill="currentColor" />
                <span>Run Love.exe ❤️</span>
                {hasRun && <span>Again</span>}
                <span className={styles.runButtonShimmer} aria-hidden="true" />
              </motion.button>
            </>
          </AnimatePresence>

          <AnimatePresence>
            {compileSteps.length > 0 && (
              <CompileTerminal
                key="terminal"
                steps={compileSteps}
                showResult={showResult}
                isReducedMotion={isReducedMotion}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── 7. Continue navigation ────────────────────────────────────── */}
        <motion.div
          className={styles.footerSection}
          variants={fadeUp(d(0.1))}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <p className={styles.footerText}>
            Okay, enough about my code. Let's see how well you know your wife...
          </p>
          <button
            className={styles.continueButton}
            onClick={onContinue}
            aria-label="Take the Wife Quiz — navigate to Screen 04"
          >
            <span>Take the Wife Quiz</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </main>
  );
};

export default Screen03LoveLanguage;

