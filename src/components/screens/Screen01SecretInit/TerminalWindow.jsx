import React from 'react';
import { Terminal, FastForward, CheckCircle2 } from 'lucide-react';
import TerminalLine from './TerminalLine';
import styles from './Screen01.module.css';

export const TerminalWindow = ({
  visibleSteps,
  isComplete,
  onFastForward,
  isReducedMotion,
}) => {
  return (
    <div className={styles.terminalContainer}>
      {/* Terminal Titlebar */}
      <div className={styles.terminalHeader}>
        <div className={styles.windowControls}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>

        <div className={styles.terminalTitle}>
          <Terminal size={14} className={styles.terminalIcon} />
          <span>~/projects/love.exe</span>
        </div>

        <div className={styles.terminalHeaderActions}>
          {!isComplete && (
            <button
              onClick={onFastForward}
              className={styles.skipButton}
              title="Fast forward terminal initialization"
              aria-label="Skip animation"
            >
              <FastForward size={12} />
              <span>Fast-Forward</span>
            </button>
          )}

          {isComplete && (
            <div className={styles.readyBadge}>
              <CheckCircle2 size={12} />
              <span>READY</span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        className={styles.terminalBody}
        role="log"
        aria-live="polite"
      >
        {visibleSteps.map((step) => (
          <TerminalLine
            key={step.id}
            item={step}
            isReducedMotion={isReducedMotion}
          />
        ))}

        {/* Dynamic prompt & blinking cursor line */}
        <div className={styles.cursorLine}>
          <span className={styles.promptArrow}>❯</span>
          {isComplete ? (
            <span className={styles.waitingNotice}>
              Waiting for you.
            </span>
          ) : (
            <span className={styles.cursorState}>one moment...</span>
          )}
          <span className={styles.blinkingCursor} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;

