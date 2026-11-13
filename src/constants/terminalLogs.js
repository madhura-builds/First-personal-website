/** Screen 01's short, personal terminal note. */
export const INITIALIZATION_STEPS = [
  {
    id: 'command',
    type: 'command',
    command: 'git commit -m "a little surprise for you"',
    prefix: '~/love.exe $',
  },
  {
    id: 'hello',
    type: 'message',
    text: 'Hey, you.',
    heart: true,
  },
  {
    id: 'working-on-it',
    type: 'message',
    text: "I've been working on something...",
  },
  {
    id: 'different',
    type: 'message',
    text: 'A little different from my usual projects.',
  },
  {
    id: 'no-bugs',
    type: 'message',
    text: 'No bugs to fix. No deadlines to meet.',
  },
  {
    id: 'made-with-love',
    type: 'message',
    text: 'Just something made with love.',
  },
  {
    id: 'reason',
    type: 'message',
    text: "And yes, you're the reason behind it.",
  },
  {
    id: 'ready',
    type: 'message',
    text: 'Your surprise is ready.',
  },
];
