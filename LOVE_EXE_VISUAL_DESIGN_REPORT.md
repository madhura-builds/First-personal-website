# LOVE.EXE Visual Design Report

**Date:** 2 November 2026  
**Scope:** Visual and experience refinement of the existing seven screens. Existing copy, quiz data, data-driven interactions, and navigation were preserved. No screen or feature was added.

## 1. Design problems identified

- Strong pink/purple gradients and bright glows repeated across most screens, making distinct story beats feel visually similar.
- Sans-serif headings gave emotional moments a generic app-like feel; the background grid was more noticeable than it needed to be.
- Screen 05’s introduction label and CTA were not consistently centered, and the envelope and paper lacked material depth.
- Emotional headings and cards needed clearer hierarchy, more intentional contrast, and more negative space.
- Screen 06 and Screen 07 needed a shared, more restrained plum, rose, and champagne language.

No screen recording was present in the project files. I reviewed actual browser screenshots of all seven screens and the revealed letter instead.

## 2. Design system changes

- Added a display-font token for **Cormorant Garamond**, retaining Plus Jakarta Sans for body text and JetBrains Mono for developer details. Existing serif/system fallbacks remain in place.
- Shifted shared accent and border tokens away from high-saturation pink/purple toward muted plum, rose, and warm champagne.
- Softened the global ambient lighting and reduced the drafting grid’s contrast and density.
- Added reusable card-radius and easing tokens; kept the existing layout and component architecture.
- No npm dependencies were added. The display font is loaded from the existing Google Fonts approach and falls back to Georgia/Times if unavailable.

## 3. Screen-by-screen improvements

### Screen 01 — Secret Initialization

- Recast the project heading in editorial serif type while preserving the monospace LOVE.EXE mark.
- Refined the terminal frame and chrome with deeper plum surfaces, less saturated borders, and restrained shadows.
- Retained the terminal’s technical colors so logs remain identifiable and readable.

### Screen 02 — Access Granted

- Changed the access heading to an editorial serif gradient with quieter rose/champagne tones.
- Gave the quote card a more editorial edge and the envelope a deeper wine paper treatment with a warmer wax seal.
- Kept the existing lock animation, envelope reveal, and navigation behavior.

### Screen 03 — The Developer’s Love Language

- Updated the heading hierarchy and code-editor shell to feel more like a considered product interface.
- Softened syntax colors while preserving distinct code roles and sufficient visual separation.
- Retained the terminal, bug cards, metrics, and compilation interactions.

### Screen 04 — Wife Quiz

- Reworked the intro and question heading typography to create a more inviting editorial hierarchy.
- Refined the selected-answer treatment with a muted plum/rose surface, champagne edge, and clear inset marker.
- Preserved quiz wording, answer data, and scoring behavior.

### Screen 05 — A Letter From Your Favourite Person

- Added warm paper grain, a fine inner highlight, and a deeper physical-paper shadow.
- Shifted the envelope toward muted wine/champagne with layered fold shapes and a more dimensional seal.
- Set the letter in the display serif with dark warm ink and comfortable paragraph spacing; aligned the signature to the right.
- Centered the intro label and CTA at mobile sizes. The letter wording remains unchanged.

### Screen 06 — The Final Birthday Surprise

- Made the birthday heading the editorial hero and refined its rose/champagne color treatment.
- Reduced the heart glow and card shine, adjusted the message typography, and softened ambient lighting.
- Kept the terminal monospaced, preserving contrast between the romantic message and developer details.

### Screen 07 — The Forever Vault

- Harmonized the vault palette with the shared tokens and adopted the display face for the welcome and collection headings.
- Refined collection cards with more deliberate corner treatment, quieter borders, and consistent depth.
- Kept the access log, collection data, modal interactions, and secret-code behavior intact.

## 4. Animation and interaction polish

- Preserved the existing Framer Motion and CSS animations and their reduced-motion handling; no new continuous decorative loops were introduced.
- Maintained quick, tactile button and card states and the existing cinematic screen transitions.
- The normal-motion browser journey reached Screen 06. A reduced-motion journey exercised the quiz, letter, finale, and vault interactions.
- Viewed the Screen 06 secret and Screen 07 reason overlays at a mobile viewport; both retained visible close controls and scrollable modal content.

## 5. Files modified

- `index.html` — added the Cormorant Garamond family to the existing Google Fonts request.
- `src/styles/variables.css` — refined shared palette, display-font, card-radius, and easing tokens.
- `src/index.css` — softened global ambient lighting and drafting grid.
- `src/components/screens/Screen01SecretInit/Screen01.module.css`
- `src/components/screens/Screen02AccessGranted/Screen02.module.css`
- `src/components/screens/Screen03LoveLanguage/Screen03.module.css`
- `src/components/screens/Screen04WifeQuiz/Screen04.module.css`
- `src/components/screens/Screen05Letter/Screen05.module.css`
- `src/components/screens/Screen06BirthdaySurprise/Screen06.module.css`
- `src/components/screens/Screen07ForeverVault/Screen07.module.css`
- `LOVE_EXE_VISUAL_DESIGN_REPORT.md` — this report.

No JavaScript interaction logic, data files, quiz content, or package files were changed in this visual pass.

## 6. Responsive and visual verification

I ran the local Vite app in headless Microsoft Edge, captured desktop screenshots of all seven screens and the revealed letter, and visually inspected them. I also inspected phone-sized captures for Screen 05’s intro and letter, Screen 06’s hero and secret modal, and Screen 07’s entrance and reason modal.

At each requested width—**320, 360, 375, 390, 414, 430, 768, 1024, 1280, and 1440 px**—I measured document overflow across the screen states exercised: Screens 01–04 (including a quiz question), Screen 05 intro and letter, Screen 06, and Screen 07. No horizontal overflow was measured. I also checked a narrow **844×390** landscape viewport; no horizontal overflow was measured.

The 390px phone emulation showed the letter body remains legible, the birthday hero wraps into a clear three-line heading, and the modal close controls remain visible. These are browser-emulated viewports; this does not replace testing on physical devices, different browsers, or with a mobile keyboard open.

## 7. Build and runtime results

- `npm run build`: **PASS** with Vite 6.4.5; 1,969 modules transformed and production assets emitted.
- Browser journey: the main seven-screen flow, quiz progression, letter reveal, secret modal, vault reason/letter/reward/code interactions, return, and replay were exercised in the prior audit pass. In this visual pass, the normal-motion route reached Screen 06 and the reduced-motion route reached the vault.
- Uncaught runtime exceptions captured during the visual-pass normal-motion journey: **0**.
- Production output after these styling changes: about **346.63 kB JavaScript (110.26 kB gzip)** and **80.16 kB CSS (15.84 kB gzip)**.

## 8. Remaining issues and limits

- The new display font depends on the browser reaching Google Fonts; fallback fonts are configured, but offline font rendering was not separately captured.
- Physical-device layout, low-end-device animation performance, screen-reader presentation, automated contrast ratios, and browser-specific rendering have not been certified.
- Long screens and modals require vertical scrolling on smaller viewports; measured page width stays within the viewport, but each text wrap and modal scroll position was not manually reviewed at every listed size.
- No automated screenshot-diff, accessibility, or performance suite is configured in the project.

## 9. Scores

Scores reflect the rendered browser review and interaction checks performed; they are not a claim of exhaustive device or accessibility certification.

| Area | Score |
| --- | ---: |
| Visual design | 90/100 |
| Design consistency | 89/100 |
| Typography | 91/100 |
| Interaction design | 88/100 |
| Mobile UX | 88/100 |
| **Overall experience** | **89/100** |

The remaining gap is primarily verification depth: physical-device/browser coverage, formal accessibility checks, and exhaustive visual review of every modal and state at every size.
