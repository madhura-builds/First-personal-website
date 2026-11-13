import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './Screen01.module.css';

export const UnlockButton = ({ isReady, onUnlock, isReducedMotion }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const unlockTimer = useRef(null);

  useEffect(() => () => {
    if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
  }, []);

  const handleClick = () => {
    if (!isReady || isUnlocking || isUnlocked) return;

    setIsUnlocking(true);

    // Leave a brief beat before opening the next screen.
    unlockTimer.current = window.setTimeout(() => {
      unlockTimer.current = null;
      setIsUnlocked(true);
      if (onUnlock) {
        onUnlock();
      }
    }, isReducedMotion ? 0 : 500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: isReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isReducedMotion ? 0.1 : 0.45,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={styles.unlockArea}
      variants={containerVariants}
      initial="hidden"
      animate={isReady ? 'visible' : 'hidden'}
    >
      <div className={styles.buttonWrapper}>
        {/* Subtle breathing ambient glow around the button */}
        <div
          className={`${styles.buttonGlow} ${
            isReady ? styles.buttonGlowActive : ''
          }`}
          aria-hidden="true"
        />

        <button
          onClick={handleClick}
          disabled={!isReady || isUnlocking}
          className={`${styles.unlockButton} ${
            isReady ? styles.unlockButtonReady : ''
          } ${isUnlocked ? styles.unlockButtonGranted : ''}`}
          aria-label="Initialize LOVE.EXE and continue"
        >
          <span className={styles.buttonInner}>
            {/* Left Icon */}
            <span className={styles.buttonIcon}>
              {isUnlocked ? (
                <ShieldCheck size={18} className={styles.iconEmerald} />
              ) : isUnlocking ? (
                <Unlock size={18} className={styles.iconSpin} />
              ) : (
                <Lock size={18} />
              )}
            </span>

            {/* Label */}
            <span className={styles.buttonText}>
              {isUnlocked
                ? 'SURPRISE READY'
                : isUnlocking
                ? 'Opening your surprise...'
                : 'INITIALIZE LOVE.EXE'}
            </span>

            {/* Right Accent Icon */}
            <span className={styles.buttonTrailing}>
              {isUnlocked ? (
                <Sparkles size={16} />
              ) : (
                <ArrowRight size={16} className={styles.arrowIcon} />
              )}
            </span>
          </span>

          {/* Shimmer sweep effect */}
          <span className={styles.shimmerSweep} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.personalNote}>
        <span>A small project with a lot of heart.</span>
      </div>
    </motion.div>
  );
};

export default UnlockButton;

