import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Heart, RotateCcw, X } from 'lucide-react';
import { birthdayMessage } from '../../../data/birthdayMessage';
import styles from './Screen06.module.css';

const ease = [0.16, 1, 0.3, 1];
const terminalLines = [
  ['Build Status', 'SUCCESS'],
  ['Love Status', 'INFINITE'],
  ['Husband Status', 'DEEPLY LOVED'],
  ['Subscription', 'LIFETIME'],
  ['Expiration Date', 'NEVER'],
  ['Developer', 'YOUR WIFE'],
];

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 100}%`,
  delay: (i % 8) * 0.35,
  size: i % 5 === 0 ? 4 : 2,
}));

export function Screen06BirthdaySurprise({ isReducedMotion, onReplay, onExploreVault }) {
  const [secretOpen, setSecretOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const secretButtonRef = useRef(null);

  useEffect(() => {
    if (!secretOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSecretOpen(false);
      if (event.key === 'Tab') {
        const dialog = event.currentTarget.querySelector('[role="dialog"]');
        const focusable = dialog?.querySelectorAll('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };
    const overlay = document.getElementById('birthday-secret-overlay');
    overlay?.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      overlay?.removeEventListener('keydown', onKeyDown);
      secretButtonRef.current?.focus();
    };
  }, [secretOpen]);

  const transition = (duration) => ({ duration: isReducedMotion ? 0.01 : duration, ease });

  return (
    <main className={styles.screen}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        {particles.map((particle) => (
          <motion.i
            key={particle.id}
            className={styles.particle}
            style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
            animate={isReducedMotion ? { opacity: 0.35 } : { opacity: [0.1, 0.75, 0.1], y: [0, -18, 0] }}
            transition={{ duration: 5 + (particle.id % 4), delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className={styles.content}
        animate={secretOpen ? { opacity: 0.28, scale: 0.985, filter: 'blur(2px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={transition(0.45)}
        aria-hidden={secretOpen ? 'true' : undefined}
      >
        <header className={styles.hero}>
          <motion.div className={styles.eyebrow} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition(0.7)}>
            <span className={styles.liveDot} /> MISSION ACCOMPLISHED
          </motion.div>
          <motion.div className={styles.heartOrbit} aria-hidden="true" initial={{ opacity: 0, scale: 0.4, rotate: -24 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ ...transition(1.1), delay: isReducedMotion ? 0 : 0.12 }}>
            <span className={`${styles.orbit} ${styles.orbitOne}`} /><span className={`${styles.orbit} ${styles.orbitTwo}`} />
            <Heart className={styles.heroHeart} fill="currentColor" strokeWidth={1.2} />
            <span className={styles.heartGlow} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ ...transition(0.9), delay: isReducedMotion ? 0 : 0.25 }}>
            HAPPY BIRTHDAY,<br /><span>MY LOVE!</span>
          </motion.h1>
          <motion.p className={styles.lead} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition(0.7), delay: isReducedMotion ? 0 : 0.42 }}>
            Today the world celebrates you. But I hope you know that I celebrate you every single day.
          </motion.p>
          <motion.p className={styles.secondary} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...transition(0.7), delay: isReducedMotion ? 0 : 0.62 }}>
            You are my favourite person, my favourite story, and my favourite forever.
          </motion.p>
        </header>

        <motion.section className={styles.messageCard} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition(0.8), delay: isReducedMotion ? 0 : 0.7 }} aria-label="Birthday message">
          <div className={styles.cardKicker}><Heart size={14} /> A NOTE FOR YOU</div>
          <div className={styles.messageText}>
            {birthdayMessage.paragraphs.map((paragraph, index) => <p key={index} className={index === 0 || index === birthdayMessage.paragraphs.length - 1 ? styles.messageEmphasis : undefined}>{paragraph}</p>)}
          </div>
        </motion.section>

        <motion.section className={styles.terminal} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition(0.75), delay: isReducedMotion ? 0 : 0.9 }} aria-label="LOVE.EXE deployment status">
          <div className={styles.terminalHeader}><span className={styles.windowDots}><i /><i /><i /></span><span>LOVE.EXE — Successfully Deployed</span><span className={styles.terminalReady}>● LIVE</span></div>
          <div className={styles.terminalBody}>
            {terminalLines.map(([label, value], index) => (
              <motion.div className={styles.terminalLine} key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: isReducedMotion ? 0.01 : 0.28, delay: isReducedMotion ? 0 : 1.05 + index * 0.12 }}>
                <span className={styles.terminalPrompt}>›</span><span className={styles.terminalLabel}>{label}:</span><strong>{value}</strong>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div className={styles.secretAction} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...transition(0.5), delay: isReducedMotion ? 0 : 1.8 }}>
          <span className={styles.secretHint}>There is one more thing, just between us.</span>
          <button ref={secretButtonRef} className={styles.secretButton} type="button" onClick={() => setSecretOpen(true)}>
            <span className={styles.secretSparkle} aria-hidden="true">✦</span> One Last Secret...
          </button>
        </motion.div>

        <button type="button" className={styles.vaultButton} onClick={onExploreVault}>
          Explore Your Vault <ArrowDown size={15} />
        </button>

        <footer className={styles.footer}>
          <p>Made with code, caffeine, countless thoughts, and an infinite amount of love.</p>
          <strong>{birthdayMessage.signature}</strong>
          <div className={styles.footerMeta}><span>LOVE.EXE</span><span>Version 1.0</span><span>No expiration date. No unsubscribe option. Forever.</span></div>
          <button type="button" className={styles.replayButton} onClick={onReplay}><RotateCcw size={14} /> Replay Our Little Story</button>
        </footer>
      </motion.div>

      <AnimatePresence>
        {secretOpen && (
          <motion.div id="birthday-secret-overlay" className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition(0.35)} onMouseDown={(event) => { if (event.target === event.currentTarget) setSecretOpen(false); }}>
            <motion.section role="dialog" aria-modal="true" aria-labelledby="secret-title" className={styles.secretCard} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={transition(0.55)}>
              <button ref={closeButtonRef} type="button" className={styles.closeButton} onClick={() => setSecretOpen(false)} aria-label="Close secret message"><X size={18} /></button>
              <div className={styles.secretIcon}><Heart fill="currentColor" size={20} /></div>
              <span className={styles.secretLabel}>A SECRET, JUST FOR YOU</span>
              <h2 id="secret-title">One last line...</h2>
              <div className={styles.secretMessage}>{birthdayMessage.secret.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
              <span className={styles.secretSignature}>Forever yours <Heart size={13} fill="currentColor" /></span>
              <div className={styles.secretPersonal}>
                <p className={styles.secretPersonalMain}>काळजी घे ❤️</p>
                <p className={styles.secretPersonalSign}>तुझी मधु तुझ्यावर खूप प्रेम करते. 🥹</p>
              </div>
              <button type="button" className={styles.returnButton} onClick={() => setSecretOpen(false)}>Keep this close <ArrowUpRight size={15} /></button>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Screen06BirthdaySurprise;
