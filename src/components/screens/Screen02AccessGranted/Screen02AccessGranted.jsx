import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockOpen, Mail, Heart, ArrowRight, Sparkles } from 'lucide-react';
import styles from './Screen02.module.css';

/* ─── Animation helpers ──────────────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1]; // spring-like ease

const fadeUp = (delay = 0, reduced = false) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0.08 : 0.5, delay, ease },
  },
});

/* ─── Envelope SVG components ────────────────────────────────────────────── */

/** The decorative flap (animated open/close) */
const EnvelopeFlap = ({ isOpen, isReducedMotion }) => {
  return (
    <motion.div
      className={styles.envelopeFlap}
      animate={isOpen ? { rotateX: -180, y: -2, zIndex: 1 } : { rotateX: 0, y: 0, zIndex: 4 }}
      transition={{ duration: isReducedMotion ? 0 : 0.65, ease }}
      style={{ perspective: 800 }}
    >
      <svg
        className={styles.envelopeFlapSvg}
        viewBox="0 0 300 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer flap shape */}
        <polygon
          points="0,0 300,0 150,130"
          fill="url(#flapGrad)"
          stroke="rgba(168,85,247,0.45)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Subtle inner highlight edge */}
        <polygon
          points="8,3 292,3 150,122"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.8"
        />
        <defs>
          <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(22,14,42,0.98)" />
            <stop offset="100%" stopColor="rgba(40,20,65,0.96)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

/** Card that sits inside the envelope when opened */
const EnvelopeInnerCard = ({ isOpen, isReducedMotion }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={styles.envelopeCard}
        initial={{ opacity: 0, y: isReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: isReducedMotion ? 0.05 : 0.45, delay: isReducedMotion ? 0 : 0.35, ease }}
      >
        <span className={styles.envelopeCardMiniTag}>SPECIAL DELIVERY 💌</span>
        <p className={styles.envelopeCardMiniText}>
          For My Favourite Person ❤️
        </p>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── Main Screen Component ──────────────────────────────────────────────── */
export const Screen02AccessGranted = ({ onContinue, isReducedMotion }) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showRevealed, setShowRevealed] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const timersRef = useRef([]);
  const envelopeOpenedRef = useRef(false);
  const continuedRef = useRef(false);

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const handleOpenEnvelope = () => {
    if (envelopeOpenedRef.current) return;
    envelopeOpenedRef.current = true;
    setIsEnvelopeOpen(true);

    const msgDelay = isReducedMotion ? 50 : 700;
    const btnDelay = isReducedMotion ? 100 : 1400;

    timersRef.current = [
      window.setTimeout(() => setShowRevealed(true), msgDelay),
      window.setTimeout(() => setShowContinue(true), btnDelay),
    ];
  };

  const handleContinue = () => {
    if (continuedRef.current || !showContinue) return;
    continuedRef.current = true;
    if (onContinue) onContinue();
  };

  /* Stagger timing for page entrance */
  const d = (n) => (isReducedMotion ? 0 : n);

  return (
    <main className={styles.screenContainer}>
      {/* Ambient light orbs */}
      <div className={styles.ambientLeft} aria-hidden="true" />
      <div className={styles.ambientRight} aria-hidden="true" />

      <div className={styles.contentWrapper}>

        {/* ── 1. Access header ──────────────────────────────────────────── */}
        <motion.div
          className={styles.accessHeader}
          variants={fadeUp(d(0.1), isReducedMotion)}
          initial="hidden"
          animate="visible"
        >
          {/* Animated lock icon */}
          <div className={styles.lockIconWrapper}>
            <div className={styles.lockRing} aria-hidden="true" />
            <div className={styles.lockIconBg}>
              <LockOpen size={28} className={styles.unlockIcon} aria-hidden="true" />
            </div>
          </div>

          {/* Connection badge */}
          <div className={styles.connectionBadge}>
            <span className={styles.connectionPulse} aria-hidden="true" />
            <span>Private Connection Established</span>
          </div>

          {/* Heading */}
          <div className={styles.accessHeading}>
            <h1 className={styles.accessTitle}>ACCESS GRANTED.</h1>
            <p className={styles.accessSubtitle}>Well, look who's finally here...</p>
          </div>

          <p className={styles.accessDesc}>
            You have officially entered a very special little world. This one was
            created for you, and only you.
          </p>
        </motion.div>

        {/* ── 2. Quote card ────────────────────────────────────────────── */}
        <motion.div
          className={styles.quoteCard}
          role="blockquote"
          variants={fadeUp(d(0.3), isReducedMotion)}
          initial="hidden"
          animate="visible"
        >
          <p className={styles.quoteText}>
            Some things are too special to be downloaded, purchased, or found online.
            They are made with love.
          </p>
          <p className={styles.quoteFooter}>— Compiled from the heart</p>
        </motion.div>

        {/* ── 3. Envelope + interaction ────────────────────────────────── */}
        <motion.div
          className={`${styles.envelopeSection} ${isEnvelopeOpen ? styles.envelopeSectionOpen : ''}`}
          variants={fadeUp(d(0.5), isReducedMotion)}
          initial="hidden"
          animate="visible"
        >
          {/* Teaser text before opening — builds excitement! */}
          <AnimatePresence>
            {!isEnvelopeOpen && (
              <motion.div
                className={styles.envelopeTeaser}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
              >
                <div className={styles.teaserBadge}>
                  <span className={styles.teaserPulse} aria-hidden="true" />
                  <span>SPECIAL SURPRISE</span>
                </div>
                <p className={styles.teaserText}>
                  Go ahead... open to see your gift!&nbsp;🎁✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope visual */}
          <button
            className={styles.envelopeWrapper}
            type="button"
            onClick={handleOpenEnvelope}
            aria-label="Open your birthday envelope"
            aria-expanded={isEnvelopeOpen}
            aria-controls="birthday-revealed-message"
          >
            <div className={styles.envelopeBody}>
              <div className={styles.envelopeCreaseLeft} aria-hidden="true" />
              <div className={styles.envelopeCreaseRight} aria-hidden="true" />
            </div>

            <EnvelopeFlap isOpen={isEnvelopeOpen} isReducedMotion={isReducedMotion} />
            <EnvelopeInnerCard isOpen={isEnvelopeOpen} isReducedMotion={isReducedMotion} />
            {!isEnvelopeOpen && <div className={styles.envelopeLine} aria-hidden="true" />}

            {/* Wax seal */}
            <div className={styles.envelopeSeal} aria-hidden="true">
              <Heart size={14} fill="rgba(255,255,255,0.85)" color="rgba(255,255,255,0.85)" />
            </div>
          </button>

          {/* CTA — only show before opening */}
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen && (
              <motion.button
                key="open-btn"
                className={styles.openButton}
                onClick={handleOpenEnvelope}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                aria-label="Open your first surprise"
              >
                <Mail size={17} />
                <span>Open your first surprise</span>
                <span className={styles.openButtonShimmer} aria-hidden="true" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── 4. Revealed love note ─────────────────────────────────────── */}
        <AnimatePresence>
          {showRevealed && (
            <motion.div
              id="birthday-revealed-message"
              role="status"
              className={styles.revealedMessage}
              key="revealed"
              initial={{ opacity: 0, scale: isReducedMotion ? 1 : 0.96, y: isReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: isReducedMotion ? 0.05 : 0.5, ease }}
            >
              <span className={styles.revealedEmoji} role="img" aria-label="Sparkling heart">✨</span>
              <h2 className={styles.revealedHeading}>
                Happy Birthday to my favourite human! ❤️
              </h2>
              <p className={styles.revealedText}>
                Congratulations! You've unlocked unlimited love, hugs and a
                lifetime subscription to your wife's attention.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 5. Continue button ───────────────────────────────────────── */}
        <AnimatePresence>
          {showContinue && (
            <motion.div
              key="continue-wrap"
              initial={{ opacity: 0, y: isReducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isReducedMotion ? 0.05 : 0.45, ease }}
            >
              <button
                className={styles.continueButton}
                onClick={handleContinue}
                aria-label="Continue to the next surprise"
              >
                <Sparkles size={16} />
                <span>Continue to the next surprise</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
};

export default Screen02AccessGranted;

