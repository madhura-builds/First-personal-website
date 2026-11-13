import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { LOVE_LETTER } from '../../../data/loveLetter';
import styles from './Screen05.module.css';

/* ------------------------------------------------------------------------
   Animation helpers (mirroring existing screens)                           
   ------------------------------------------------------------------------ */
const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0, reduced = false) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0.07 : 0.48, delay, ease },
  },
});

const PHASE = {
  INTRO: 'intro',
  ENVELOPE: 'envelope',
  LETTER: 'letter',
};

export const Screen05Letter = ({ onContinue, isReducedMotion }) => {
  const [phase, setPhase] = useState(PHASE.INTRO);
  const [isLetterKept, setIsLetterKept] = useState(false);
  const envelopeRef = useRef(null);
  const letterRef = useRef(null);

  useEffect(() => {
    if (phase === PHASE.ENVELOPE) envelopeRef.current?.focus();
    if (phase === PHASE.LETTER) letterRef.current?.focus();
  }, [phase]);

  const handleOpenEnvelope = () => setPhase(PHASE.ENVELOPE);
  const handleRevealLetter = () => setPhase(PHASE.LETTER);

  return (
    <main className={styles.screenContainer}>
      <div className={styles.ambientTopLeft} aria-hidden="true" />
      <div className={styles.ambientBottomRight} aria-hidden="true" />

      <div className={styles.contentWrapper}>
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === PHASE.INTRO && (
            <motion.div
              key="intro"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: isReducedMotion ? 0 : 0.1 } },
              }}
            >
              <div className={styles.label}>ONE LAST THING...</div>
              <motion.h1
                className={styles.title}
                variants={fadeUp(0, isReducedMotion)}
              >
                A LETTER FROM YOUR FAVOURITE PERSON
              </motion.h1>
              <motion.p
                className={styles.subtitle}
                variants={fadeUp(0.06, isReducedMotion)}
              >
                I&apos;ve spent all this time making you smile. But there is something I&apos;ve wanted to tell you, and I think a letter is the best way.
              </motion.p>
              <motion.p
                className={styles.playful}
                variants={fadeUp(0.12, isReducedMotion)}
              >
                Some feelings deserve more than a notification.
              </motion.p>
              <motion.button
                className={styles.openButton}
                onClick={handleOpenEnvelope}
                aria-label="Open your love letter"
                variants={fadeUp(0.18, isReducedMotion)}
              >
                Open Your Letter <Heart size={16} className={styles.heartIcon} />
              </motion.button>
            </motion.div>
          )}

          {/* ENVELOPE */}
          {phase === PHASE.ENVELOPE && (
            <motion.div
              key="envelope"
              className={styles.envelopeWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: isReducedMotion ? 0.05 : 0.4 } }}
            >
              {/* Simple envelope graphics – top flap will animate on click */}
              <motion.button
                ref={envelopeRef}
                className={styles.envelope}
                type="button"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isReducedMotion ? 0 : -120 }}
                transition={{ duration: isReducedMotion ? 0 : 0.8, ease }}
                onClick={handleRevealLetter}
                aria-label="Reveal the letter inside the envelope"
              >
                <div className={styles.seal} />
              </motion.button>
              <motion.p
                className={styles.envelopeHint}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: isReducedMotion ? 0 : 0.4 } }}
              >
                Click the envelope or press Enter to open it
              </motion.p>
            </motion.div>
          )}

          {/* LETTER */}
          {phase === PHASE.LETTER && (
            <motion.div
              key="letter"
              className={styles.letterWrapper}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: isReducedMotion ? 0 : 0.08 } },
              }}
            >
              <motion.div
                ref={letterRef}
                className={styles.letterPaper}
                role="region"
                aria-label="Love letter"
                tabIndex={-1}
                variants={fadeUp(0, isReducedMotion)}
              >
                {/* Split the letter into paragraphs for gentle fade‑in */}
                {LOVE_LETTER.split('\n\n').map((para, idx, paragraphs) => (
                  <p key={idx} className={idx === paragraphs.length - 1 ? `${styles.paragraph} ${styles.signatureText}` : styles.paragraph}>
                    {para}
                  </p>
                ))}
                {/* Signature */}
                <div className={styles.signatureBlock}>
                  <motion.div
                    className={styles.signatureHeart}
                    animate={isReducedMotion ? { scale: 1 } : { scale: [1, 1.2, 1] }}
                    transition={isReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    aria-hidden="true"
                  >
                    <Heart size={24} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Keep Letter button */}
              <motion.button
                className={styles.keepButton}
                onClick={() => setIsLetterKept((kept) => !kept)}
                aria-pressed={isLetterKept}
                variants={fadeUp(0.12, isReducedMotion)}
              >
                {isLetterKept ? 'Keeping These Words Close' : 'Keep This Letter Forever'} <Heart size={16} className={styles.heartIconSmall} fill={isLetterKept ? 'currentColor' : 'none'} />
              </motion.button>
              {isLetterKept && <p className={styles.keptMessage} role="status">A little reminder to carry with you. ❤️</p>}

              {/* Navigation to next screen */}
              <motion.div
                className={styles.footerSection}
                variants={fadeUp(0.24, isReducedMotion)}
              >
                <p className={styles.footerText}>There&apos;s one more thing waiting for you...</p>
                <button
                  className={styles.continueButton}
                  onClick={onContinue}
                  aria-label="Reveal your birthday surprise"
                >
                  Reveal Your Birthday Surprise <ArrowRight size={16} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Screen05Letter;

