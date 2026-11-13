import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen01SecretInit } from './components/screens/Screen01SecretInit/Screen01SecretInit';
import { Screen02AccessGranted } from './components/screens/Screen02AccessGranted/Screen02AccessGranted';
import { Screen03LoveLanguage } from './components/screens/Screen03LoveLanguage/Screen03LoveLanguage';
import { Screen04WifeQuiz } from './components/screens/Screen04WifeQuiz/Screen04WifeQuiz';
import { Screen05Letter } from './components/screens/Screen05Letter/Screen05Letter';
import { Screen06BirthdaySurprise } from './components/screens/Screen06BirthdaySurprise/Screen06BirthdaySurprise';
import { Screen07ForeverVault } from './components/screens/Screen07ForeverVault/Screen07ForeverVault';

/* ─── Page transition variants ──────────────────────────────────────────── */
const PAGE_VARIANTS = {
  initial: { opacity: 0, scale: 1.02 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

/** Wraps a screen in an AnimatePresence page-transition motion.div */
const ScreenWrapper = ({ id, children, isReducedMotion }) => (
  <motion.div
    key={id}
    variants={isReducedMotion ? {} : PAGE_VARIANTS}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ width: '100%', minHeight: '100vh' }}
  >
    {children}
  </motion.div>
);

export function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [keyReset, setKeyReset] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const navigationTimer = useRef(null);

  /* Respect prefers-reduced-motion at the app level */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  useEffect(() => () => {
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
  }, []);

  const goTo = (n) => {
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    navigationTimer.current = null;
    setCurrentScreen(n);
  };

  const goToAfter = (n, delay) => {
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    navigationTimer.current = window.setTimeout(() => {
      navigationTimer.current = null;
      setCurrentScreen(n);
    }, delay);
  };

  /* ── Per-screen navigation handlers ─────────────────────────────────── */

  // Screen 01 → 02: short delay so "ACCESS GRANTED" state is visible
  const handleScreen01Unlock = () =>
    goToAfter(2, isReducedMotion ? 80 : 350);

  // Screen 02 → 03
  const handleScreen02Continue = () =>
    goToAfter(3, isReducedMotion ? 60 : 500);

  // Screen 03 → 04
  const handleScreen03Continue = () =>
    goToAfter(4, isReducedMotion ? 60 : 500);

  // Screen 04 → 05
  const handleScreen04Continue = () => {
    goTo(5);
  };

  // Screen 05 → 06
  const handleScreen05Continue = () => {
    goTo(6);
  };

  const handleReplay = () => {
    setKeyReset((key) => key + 1);
    goTo(1);
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">

        {currentScreen === 1 && (
          <ScreenWrapper key={`s01-${keyReset}`} id={`s01-${keyReset}`} isReducedMotion={isReducedMotion}>
            <Screen01SecretInit
              key={keyReset}
              isReducedMotion={isReducedMotion}
              onUnlockNextScreen={handleScreen01Unlock}
            />
          </ScreenWrapper>
        )}

        {currentScreen === 2 && (
          <ScreenWrapper key="s02" id="s02" isReducedMotion={isReducedMotion}>
            <Screen02AccessGranted
              isReducedMotion={isReducedMotion}
              onContinue={handleScreen02Continue}
            />
          </ScreenWrapper>
        )}

        {currentScreen === 3 && (
          <ScreenWrapper key="s03" id="s03" isReducedMotion={isReducedMotion}>
            <Screen03LoveLanguage
              isReducedMotion={isReducedMotion}
              onContinue={handleScreen03Continue}
            />
          </ScreenWrapper>
        )}

        {/* Screen 04 – Wife Quiz */}
        {currentScreen === 4 && (
          <ScreenWrapper key="s04" id="s04" isReducedMotion={isReducedMotion}>
            <Screen04WifeQuiz
              isReducedMotion={isReducedMotion}
              onContinue={handleScreen04Continue}
            />
          </ScreenWrapper>
        )}

        {/* Screen 05 – Letter */}
        {currentScreen === 5 && (
          <ScreenWrapper key="s05" id="s05" isReducedMotion={isReducedMotion}>
            <Screen05Letter
              isReducedMotion={isReducedMotion}
              onContinue={handleScreen05Continue}
            />
          </ScreenWrapper>
        )}

        {currentScreen === 6 && (
          <ScreenWrapper key="s06" id="s06" isReducedMotion={isReducedMotion}>
            <Screen06BirthdaySurprise
              isReducedMotion={isReducedMotion}
              onReplay={handleReplay}
              onExploreVault={() => setCurrentScreen(7)}
            />
          </ScreenWrapper>
        )}

        {currentScreen === 7 && (
          <ScreenWrapper key="s07" id="s07" isReducedMotion={isReducedMotion}>
            <Screen07ForeverVault
              isReducedMotion={isReducedMotion}
              onReturn={() => setCurrentScreen(6)}
            />
          </ScreenWrapper>
        )}

      </AnimatePresence>

      <style>{`
        .app-container {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
          overflow-x: clip;
        }
      `}</style>
    </div>
  );
}

export default App;
