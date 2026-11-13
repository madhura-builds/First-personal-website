import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, Award, CalendarDays, Check,
  Heart, KeyRound, LockKeyhole, Mail, Moon, ShieldCheck, Sparkles, Star, X,
} from 'lucide-react';
import { reasonsToChooseYou } from '../../../data/reasonsToChooseYou';
import { openWhenLetters } from '../../../data/openWhenLetters';
import { lifetimeRewards } from '../../../data/lifetimeRewards';
import { vaultConfig } from '../../../data/vaultConfig';
import styles from './Screen07.module.css';

const ease = [0.16, 1, 0.3, 1];
const rewardIcons = { heart: Heart, sparkles: Sparkles, calendar: CalendarDays, life: ShieldCheck, moon: Moon, star: Star };
const entranceLines = [
  'Initializing Forever Vault...',
  'Checking relationship credentials...',
  'Authenticating favourite human...',
  'Access granted. ❤️',
  'Welcome to your forever collection.',
];

function VaultModal({ title, onClose, children, reduced }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const dialog = document.getElementById('forever-vault-dialog');
        const items = dialog?.querySelectorAll('button:not(:disabled), input:not(:disabled)');
        if (!items?.length) return;
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus();
    };
  }, [onClose]);
  useEffect(() => { closeRef.current?.focus(); }, [title]);

  return (
    <motion.div className={styles.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0.01 : 0.25 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.section id="forever-vault-dialog" role="dialog" aria-modal="true" aria-labelledby="vault-dialog-title" className={styles.modalPanel} initial={{ opacity: 0, y: 22, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .99 }} transition={{ duration: reduced ? 0.01 : .36, ease }}>
        <header className={styles.modalHeader}><div><span className={styles.modalEyebrow}>LOVE.EXE // PRIVATE COLLECTION</span><h2 id="vault-dialog-title">{title}</h2></div><button ref={closeRef} type="button" className={styles.iconButton} onClick={onClose} aria-label="Close vault collection"><X size={19} /></button></header>
        <div className={styles.modalContent}>{children}</div>
      </motion.section>
    </motion.div>
  );
}

export function Screen07ForeverVault({ isReducedMotion = false, onReturn }) {
  const [activeModal, setActiveModal] = useState(null);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [openLetter, setOpenLetter] = useState(null);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [secretCode, setSecretCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [lockOpen, setLockOpen] = useState(false);
  const collectionRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion) { setLockOpen(true); return undefined; }
    const timer = window.setTimeout(() => setLockOpen(true), 1550);
    return () => window.clearTimeout(timer);
  }, [isReducedMotion]);

  const closeModal = useCallback(() => setActiveModal(null), []);
  const exploreVault = () => collectionRef.current?.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth', block: 'start' });
  const submitCode = (event) => {
    event.preventDefault();
    if (!secretCode.trim()) {
      setCodeError('Enter a secret code to continue.');
      return;
    }
    if (secretCode.trim().toUpperCase() === vaultConfig.secretCode.toUpperCase()) {
      setCodeError(''); setSecretUnlocked(true); setActiveModal('final');
    } else {
      setCodeError('Access denied. Hint: It\'s something I never run out of. ❤️');
    }
  };
  const claimReward = (index) => setClaimedRewards((current) => current.includes(index) ? current : [...current, index]);

  return (
    <main className={styles.screen}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ left: `${(i * 43 + 9) % 100}%`, top: `${(i * 31 + 6) % 100}%`, animationDelay: `${(i % 6) * .45}s` }} />)}</div>

      <section className={styles.entrance} aria-label="Forever Vault access granted">
        <motion.div className={styles.brandLock} initial={{ opacity: 0, scale: .75, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: isReducedMotion ? .01 : .65, ease }}>
          <motion.div className={styles.lockAura} animate={lockOpen ? { opacity: [.2, .7, .35], scale: [1, 1.12, 1] } : { opacity: .25 }} transition={{ duration: isReducedMotion ? .01 : 1.4 }} />
          <motion.div className={styles.lockIcon} animate={lockOpen ? { rotate: [0, -9, 5, 0], y: [0, -3, 0] } : { rotate: 0 }} transition={{ duration: isReducedMotion ? .01 : .8, delay: isReducedMotion ? 0 : .1 }}>
            {lockOpen ? <ShieldCheck size={36} strokeWidth={1.35} /> : <LockKeyhole size={36} strokeWidth={1.35} />}
          </motion.div>
        </motion.div>
        <motion.div className={styles.vaultStamp} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isReducedMotion ? 0 : .18, duration: isReducedMotion ? .01 : .5 }}>
          <span>LOVE.EXE</span><span>PRIVATE VAULT</span><small>ACCESS LEVEL: UNLIMITED LOVE</small>
        </motion.div>
        <div className={styles.terminalLog} aria-live="polite">
          {entranceLines.map((line, index) => <motion.p key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: isReducedMotion ? 0 : .45 + index * .32, duration: isReducedMotion ? .01 : .32 }}><span>›</span> {line}</motion.p>)}
        </div>
        <motion.div className={styles.welcome} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isReducedMotion ? 0 : 1.95, duration: isReducedMotion ? .01 : .65, ease }}>
          <span className={styles.sectionLabel}><span /> PRIVATE COLLECTION // 07</span>
          <h1>Welcome to Your <em>Forever Vault.</em></h1>
          <p>Because one birthday surprise could never hold everything I feel for you.</p>
          <button type="button" className={styles.primaryButton} onClick={exploreVault}>Explore Your Vault <ArrowDown size={16} /></button>
        </motion.div>
      </section>

      <section ref={collectionRef} className={styles.collection} aria-labelledby="collection-title">
        <div className={styles.collectionHeading}><span className={styles.sectionLabel}><span /> A FEW THINGS, KEPT WITH LOVE</span><h2 id="collection-title">Your forever collection</h2><p>Take your time. These little things are all yours.</p></div>
        <div className={styles.vaultCards}>
          <motion.button type="button" className={styles.vaultCard} onClick={() => { setReasonIndex(0); setActiveModal('reasons'); }} whileHover={isReducedMotion ? undefined : { y: -5 }} whileTap={isReducedMotion ? undefined : { scale: .99 }}>
            <span className={styles.cardNumber}>01 <span>ENCRYPTED NOTE</span></span><span className={styles.cardIcon}><Heart size={23} /></span><strong>Reasons I Choose You</strong><p>A little reminder of why my heart keeps choosing you.</p><span className={styles.cardAction}>Open collection <ArrowRight size={14} /></span>
          </motion.button>
          <motion.button type="button" className={styles.vaultCard} onClick={() => { setOpenLetter(null); setActiveModal('letters'); }} whileHover={isReducedMotion ? undefined : { y: -5 }} whileTap={isReducedMotion ? undefined : { scale: .99 }}>
            <span className={styles.cardNumber}>02 <span>SEALED WITH LOVE</span></span><span className={styles.cardIcon}><Mail size={23} /></span><strong>Open When...</strong><p>Little letters for moments when you need me.</p><span className={styles.cardAction}>Open collection <ArrowRight size={14} /></span>
          </motion.button>
          <motion.button type="button" className={styles.vaultCard} onClick={() => setActiveModal('rewards')} whileHover={isReducedMotion ? undefined : { y: -5 }} whileTap={isReducedMotion ? undefined : { scale: .99 }}>
            <span className={styles.cardNumber}>03 <span>LIFETIME ACCESS</span></span><span className={styles.cardIcon}><Award size={23} /></span><strong>Your Lifetime Rewards</strong><p>A subscription you never have to renew.</p><span className={styles.cardAction}>View rewards <ArrowRight size={14} /></span>
          </motion.button>
        </div>
      </section>

      <section className={styles.secretSection}>
        <span className={styles.sectionLabel}><span /> CLASSIFIED // FINAL LAYER</span><h2>There&apos;s still one more secret...</h2><p>Some things are too special to be displayed without permission.</p>
        <button type="button" className={styles.secretButton} onClick={() => { setSecretCode(''); setCodeError(''); setSecretUnlocked(false); setActiveModal('code'); }}><KeyRound size={16} /> Unlock One Last Secret</button>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerThought}>Some treasures aren&apos;t made of gold. Some are made of moments, promises, and love.</p>
        <div className={styles.footerStamp}><strong>LOVE.EXE</strong><span>PRIVATE VAULT</span><small>STATUS: FOREVER ACTIVE</small><small>EXPIRATION: NEVER ❤️</small></div>
        <button type="button" className={styles.returnButton} onClick={onReturn}><ArrowLeft size={15} /> Return to Birthday Surprise</button>
      </footer>

      {/* ── Personal closing — the very last thing seen ───────────────── */}
      <motion.div
        className={styles.personalClosing}
        initial={{ opacity: 0, y: isReducedMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: isReducedMotion ? 0.05 : 0.7, ease }}
      >
        <p className={styles.personalClosingMain}>काळजी घे ❤️</p>
        <p className={styles.personalClosingSign}>तुझी मधु तुझ्यावर खूप प्रेम करते. 🥹</p>
      </motion.div>

      <AnimatePresence>
        {activeModal && (
          <VaultModal title={activeModal === 'reasons' ? 'Reasons I Choose You' : activeModal === 'letters' ? 'Open When...' : activeModal === 'rewards' ? 'Your Lifetime Rewards' : activeModal === 'code' ? 'One Last Unlock' : 'Saved for always'} onClose={closeModal} reduced={isReducedMotion}>
            {activeModal === 'reasons' && (
              reasonsToChooseYou.length === 0 ? <p className={styles.emptyState} role="status">This collection is waiting for its first note.</p> : <div className={styles.reasonViewer}>
                <span className={styles.itemCount}>REASON {String(reasonIndex + 1).padStart(2, '0')} / {String(reasonsToChooseYou.length).padStart(2, '0')}</span>
                <AnimatePresence mode="wait"><motion.div key={reasonIndex} className={styles.reasonCard} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: isReducedMotion ? .01 : .3 }}><Heart size={25} /><p>{reasonsToChooseYou[reasonIndex]}</p></motion.div></AnimatePresence>
                <div className={styles.pager}><button type="button" className={styles.secondaryButton} onClick={() => setReasonIndex((index) => (index - 1 + reasonsToChooseYou.length) % reasonsToChooseYou.length)}><ArrowLeft size={15} /> Previous</button><button type="button" className={styles.secondaryButton} onClick={() => setReasonIndex((index) => (index + 1) % reasonsToChooseYou.length)}>Next <ArrowRight size={15} /></button></div>
              </div>
            )}

            {activeModal === 'letters' && (
              <div className={styles.lettersLayout}>
                <div className={styles.envelopeList}>
                  {openWhenLetters.map((letter, index) => <button type="button" key={letter.title} className={`${styles.envelopeButton} ${openLetter === index ? styles.envelopeSelected : ''}`} onClick={() => setOpenLetter(index)} aria-expanded={openLetter === index}><Mail size={17} /><span>{letter.title}</span><span className={styles.envelopeSeal}>♥</span></button>)}
                </div>
                <div id="vault-letter-content" className={styles.letterReveal} aria-live="polite">
                  <span className={styles.itemCount}>{openLetter === null ? 'CHOOSE A SEALED NOTE' : 'A NOTE, JUST FOR YOU'}</span>
                  {openLetter === null ? <p className={styles.letterPlaceholder}>Choose an envelope and let it unfold.</p> : <AnimatePresence mode="wait"><motion.div key={openLetter} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: isReducedMotion ? .01 : .28 }}><h3>{openWhenLetters[openLetter].title}</h3><p>{openWhenLetters[openLetter].message}</p></motion.div></AnimatePresence>}
                </div>
              </div>
            )}

            {activeModal === 'rewards' && (
              <div className={styles.rewardGrid}>
                {lifetimeRewards.map((reward, index) => { const Icon = rewardIcons[reward.icon] || Sparkles; const claimed = claimedRewards.includes(index); return <motion.article key={reward.title} className={`${styles.rewardCard} ${claimed ? styles.rewardClaimed : ''}`} layout transition={{ duration: isReducedMotion ? .01 : .3 }}><span className={styles.rewardIcon}><Icon size={21} /></span><h3>{reward.title}</h3><p>{reward.description}</p><button type="button" className={styles.claimButton} onClick={() => claimReward(index)} disabled={claimed}>{claimed ? <><Check size={15} /> Reward claimed successfully!</> : <>Claim Reward <Heart size={14} /></>}</button>{claimed && <small>Your lifetime subscription remains active. No expiration date.</small>}</motion.article>; })}
              </div>
            )}

            {activeModal === 'code' && (
              <form className={styles.codeForm} onSubmit={submitCode}>
                <div className={styles.codeLock}><LockKeyhole size={22} /></div><p>Enter the secret phrase to reveal the final note.</p>
                <p id="vault-code-note" className={styles.codeNote}>A playful phrase check; this is not secure authentication.</p>
                <label htmlFor="vault-code">Secret code</label><input id="vault-code" autoComplete="off" autoCapitalize="characters" spellCheck="false" value={secretCode} onChange={(event) => { setSecretCode(event.target.value); setCodeError(''); }} placeholder="Enter the phrase..." aria-describedby={codeError ? 'vault-code-error' : 'vault-code-note'} />
                {codeError && <p id="vault-code-error" className={styles.codeError} role="alert">{codeError}</p>}
                <button type="submit" className={styles.primaryButton}><KeyRound size={15} /> Unlock message</button>
                {secretUnlocked && <span className={styles.srOnly}>Secret unlocked</span>}
              </form>
            )}

            {activeModal === 'final' && (
              <motion.div className={styles.finalReveal} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isReducedMotion ? .01 : .5 }}><motion.div className={styles.finalHeart} animate={isReducedMotion ? undefined : { scale: [1, 1.08, 1] }} transition={{ duration: 2.6, repeat: Infinity }}><Heart size={31} fill="currentColor" /></motion.div><span className={styles.itemCount}>THE FINAL SECRET // DECLASSIFIED</span>{vaultConfig.finalMessage.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</motion.div>
            )}
          </VaultModal>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Screen07ForeverVault;
