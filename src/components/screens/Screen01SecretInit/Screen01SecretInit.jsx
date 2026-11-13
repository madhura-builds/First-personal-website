import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TerminalWindow } from './TerminalWindow';
import { UnlockButton } from './UnlockButton';
import { INITIALIZATION_STEPS } from '../../../constants/terminalLogs';
import styles from './Screen01.module.css';

export const Screen01SecretInit = ({ onUnlockNextScreen, isReducedMotion }) => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  // Sequential loading effect
  useEffect(() => {
    if (isReducedMotion) {
      // Instantly reveal all steps for users with reduced motion preferences
      setVisibleSteps(INITIALIZATION_STEPS);
      setIsComplete(true);
      return;
    }

    if (currentIndex < INITIALIZATION_STEPS.length) {
      // Dynamic natural delays for real terminal feel
      const delay = currentIndex === 0 ? 280 : 360;

      const timer = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, INITIALIZATION_STEPS[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // All steps loaded
      const completionTimer = setTimeout(() => {
        setIsComplete(true);
      }, 180);
      return () => clearTimeout(completionTimer);
    }
  }, [currentIndex, isReducedMotion]);

  // Fast-forward handler
  const handleFastForward = useCallback(() => {
    setVisibleSteps(INITIALIZATION_STEPS);
    setCurrentIndex(INITIALIZATION_STEPS.length);
    setIsComplete(true);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: isReducedMotion ? 0 : -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isReducedMotion ? 0.1 : 0.4, ease: 'easeOut' },
    },
  };

  return (
    <main className={styles.screenContainer}>
      <div className={styles.ambientGlowTop} aria-hidden="true" />

      <div className={styles.contentWrapper}>
        {/* Header section */}
        <motion.header
          className={styles.headerSection}
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.stageBadge}>
            <span className={styles.stageDot} />
            <span>STAGE 01 // 07 • SECRET INITIALIZATION</span>
          </div>

          <h1 className={styles.mainTitle}>
            <span>PROJECT:</span>
            <span className={styles.titleExe}>LOVE.EXE</span>
          </h1>

          <p className={styles.subTitle}>
            A little surprise, written one line at a time.
          </p>
        </motion.header>

        {/* Terminal Window */}
        <TerminalWindow
          visibleSteps={visibleSteps}
          isComplete={isComplete}
          onFastForward={handleFastForward}
          isReducedMotion={isReducedMotion}
        />

        {/* Interactive Unlock Button */}
        <UnlockButton
          isReady={isComplete}
          onUnlock={onUnlockNextScreen}
          isReducedMotion={isReducedMotion}
        />
      </div>
    </main>
  );
};

export default Screen01SecretInit;
