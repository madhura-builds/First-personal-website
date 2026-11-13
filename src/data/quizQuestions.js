/**
 * LOVE.EXE — Quiz Questions Data
 * ─────────────────────────────────────────────────────────────────────────────
 * Personalize this file with real questions, options, and messages.
 * The quiz component reads ONLY from here — no answers are hardcoded elsewhere.
 *
 * correctAnswer: 0-based index of the correct option in the `options` array.
 * correctMessage: shown when the husband picks the right answer.
 * incorrectMessage: shown when he picks the wrong answer — keep it playful!
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What's your wife's favourite way of annoying you? 😂",
    options: [
      "Stealing all your attention 🥰",
      "Saying sorry 100 times 🥺",
      "Randomly disturbing your work 💻",
      "ALL OF THE ABOVE! 😂",
    ],
    correctAnswer: 3,
    correctMessage: "BINGO! Why choose one when I can do all of them with love?! 😂❤️",
    incorrectMessage: "Nice try, but you know the truth... it's definitely ALL OF THE ABOVE! 😜❤️",
  },
  {
    id: 2,
    question: "Which is your wife's favourite festival? 🎉",
    options: [
      "Holi 🌈",
      "Diwali 🪔",
      "Navratri 💃",
      "Your birthday 🎂",
    ],
    correctAnswer: 3,
    correctMessage: "Awww! Of course it's your birthday! Nothing beats celebrating YOU! 🎂❤️",
    incorrectMessage: "Wrong! You know the real answer... it's your birthday! Celebrating you is my favourite festival! 🎂🥰",
  },
  {
    id: 3,
    question: "What makes your wife the most irritated? 😤",
    options: [
      "Talking to unwanted people 🙄",
      "Doing household chores 🧹",
      "Waiting for your message 📱",
      "Unable to solve a coding issue 💻",
    ],
    correctAnswer: 2,
    correctMessage: "100% true! Never keep me waiting for your text! 😤❤️",
    incorrectMessage: "Wrong! You know it's definitely waiting for your message! Don't leave me on delivered! 😜",
  },
  {
    id: 4,
    question: "When I'm upset, what do I actually need from you? 🥺",
    options: [
      "A logical solution to whatever went wrong 🧠",
      "Talk, then hug, then reassurance, then our time — in that order 🫂",
      "A long detailed conversation about my feelings 💬",
      "You to agree with everything I say immediately 🙃",
    ],
    correctAnswer: 1,
    correctMessage: "Talk → Hug → Reassurance → Our time. You know the exact formula! ❤️",
    incorrectMessage: "Close, but the formula is: Talk, then hug, then reassurance, then our time! Memorise it. 😂",
  },
  {
    id: 5,
    question: "What do I always say is the most important ingredient in our relationship? ❤️",
    options: [
      "Trust and honesty 🤝",
      "Being best friends first 🫶",
      "Laughing together every single day 😂",
      "Knowing each other's whole day 💗",
    ],
    correctAnswer: 3,
    correctMessage: "Yes! Knowing each other's whole day is everything. You just earned major husband points! ❤️",
    incorrectMessage: "Aww close! But it's knowing each other's whole day — sharing everything is our thing. Always. 😄",
  },
];

/** Threshold-based result messages.
 *  Checked top-to-bottom — first match wins.
 */
export const RESULT_TIERS = [
  {
    minScore: 5,
    label: 'PERFECT SCORE!',
    message: "You really do know your girl! How are you this good?! ❤️",
    emoji: '🏆',
    celebration: true,
  },
  {
    minScore: 3,
    label: 'NOT BAD AT ALL!',
    message: "Pretty good! But there's still more to discover about your favourite person. 😉",
    emoji: '⭐',
    celebration: false,
  },
  {
    minScore: 0,
    label: 'STUDY TIME!',
    message: "Looks like someone has some serious wife-studying to do! 😂",
    emoji: '📚',
    celebration: false,
  },
];

/** Universal closing message shown regardless of score */
export const UNIVERSAL_CLOSING =
  "Whether you got every answer right or not, there's one thing I hope you never forget: you make me feel incredibly lucky to have you.";

/** Achievement card content */
export const ACHIEVEMENT = {
  title: 'Achievement Unlocked:',
  name: 'MY FAVOURITE HUMAN',
  reward: 'Reward: Unlimited love, hugs, kisses, and a lifetime subscription to happiness with your wife.',
};

