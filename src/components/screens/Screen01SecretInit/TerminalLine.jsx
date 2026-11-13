import React from 'react';
import { motion } from 'framer-motion';
import styles from './Screen01.module.css';

export const TerminalLine = ({ item, isReducedMotion }) => {
  const lineVariants = {
    hidden: { opacity: 0, x: isReducedMotion ? 0 : -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: isReducedMotion ? 0.05 : 0.22, ease: 'easeOut' },
    },
  };

  if (item.type === 'command') {
    return (
      <motion.div
        className={`${styles.logRow} ${styles.commandRow}`}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      >
        <span className={styles.commandPrefix}>{item.prefix}</span>
        <span className={styles.commandText}>{item.command}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${styles.logRow} ${styles.messageRow}`}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
    >
      <span className={styles.messagePrompt} aria-hidden="true">›</span>
      <span className={styles.logText}>{item.text}</span>
      {item.heart && <span className={styles.messageHeart} aria-hidden="true">♥</span>}
    </motion.div>
  );
};

export default TerminalLine;

