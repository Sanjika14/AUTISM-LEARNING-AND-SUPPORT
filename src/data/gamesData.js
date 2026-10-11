export const MEMORY_CARDS = [
  { id: 'apple-1', matchId: 'apple', label: 'Apple', emoji: '🍎' },
  { id: 'apple-2', matchId: 'apple', label: 'Apple', emoji: '🍎' },
  { id: 'star-1', matchId: 'star', label: 'Star', emoji: '🌟' },
  { id: 'star-2', matchId: 'star', label: 'Star', emoji: '🌟' },
  { id: 'cat-1', matchId: 'cat', label: 'Cat', emoji: '🐱' },
  { id: 'cat-2', matchId: 'cat', label: 'Cat', emoji: '🐱' }
];

export const PICTURE_MATCH_GAMES = [
  {
    id: 1,
    targetName: 'Sun',
    targetEmoji: '☀️',
    options: [
      { id: 'sun', emoji: '☀️', isCorrect: true },
      { id: 'moon', emoji: '🌙', isCorrect: false },
      { id: 'cloud', emoji: '☁️', isCorrect: false },
      { id: 'star', emoji: '⭐', isCorrect: false }
    ]
  },
  {
    id: 2,
    targetName: 'Car',
    targetEmoji: '🚗',
    options: [
      { id: 'bus', emoji: '🚌', isCorrect: false },
      { id: 'car', emoji: '🚗', isCorrect: true },
      { id: 'bike', emoji: '🚲', isCorrect: false },
      { id: 'train', emoji: '🚂', isCorrect: false }
    ]
  }
];

export const COLOR_GAME_QUESTIONS = [
  {
    id: 1,
    targetColorName: 'Blue',
    options: [
      { name: 'Red', hex: '#EF4444', isCorrect: false },
      { name: 'Blue', hex: '#3B82F6', isCorrect: true },
      { name: 'Yellow', hex: '#EAB308', isCorrect: false },
      { name: 'Green', hex: '#10B981', isCorrect: false }
    ]
  },
  {
    id: 2,
    targetColorName: 'Green',
    options: [
      { name: 'Green', hex: '#10B981', isCorrect: true },
      { name: 'Orange', hex: '#F97316', isCorrect: false },
      { name: 'Purple', hex: '#8B5CF6', isCorrect: false },
      { name: 'Blue', hex: '#3B82F6', isCorrect: false }
    ]
  }
];

export const SHAPE_GAME_QUESTIONS = [
  {
    id: 1,
    targetShapeName: 'Circle',
    options: [
      { name: 'Circle', shapeType: 'circle', isCorrect: true },
      { name: 'Square', shapeType: 'square', isCorrect: false },
      { name: 'Triangle', shapeType: 'triangle', isCorrect: false }
    ]
  },
  {
    id: 2,
    targetShapeName: 'Triangle',
    options: [
      { name: 'Square', shapeType: 'square', isCorrect: false },
      { name: 'Triangle', shapeType: 'triangle', isCorrect: true },
      { name: 'Star', shapeType: 'star', isCorrect: false }
    ]
  }
];

export const PUZZLE_ITEMS = [
  {
    id: 'fruit-puzzle',
    title: 'Fruit Basket Puzzle',
    instructions: 'Match the halves to complete the fruit!',
    pieces: [
      { id: 'p1', left: '🍎 Left Apple', right: '🍎 Right Apple', matchKey: 'apple', icon: '🍎' },
      { id: 'p2', left: '🍌 Left Banana', right: '🍌 Right Banana', matchKey: 'banana', icon: '🍌' },
      { id: 'p3', left: '🍊 Left Orange', right: '🍊 Right Orange', matchKey: 'orange', icon: '🍊' }
    ]
  }
];
