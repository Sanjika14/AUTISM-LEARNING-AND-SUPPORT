export const COLORS_DATA = [
  { id: 'red', name: 'Red', hex: '#EF4444', emoji: '🍎', choices: ['Red', 'Blue', 'Green', 'Yellow'] },
  { id: 'blue', name: 'Blue', hex: '#3B82F6', emoji: '🫐', choices: ['Yellow', 'Blue', 'Purple', 'Red'] },
  { id: 'yellow', name: 'Yellow', hex: '#EAB308', emoji: '🍌', choices: ['Green', 'Orange', 'Yellow', 'Blue'] },
  { id: 'green', name: 'Green', hex: '#10B981', emoji: '🐸', choices: ['Red', 'Green', 'Blue', 'Yellow'] },
  { id: 'orange', name: 'Orange', hex: '#F97316', emoji: '🍊', choices: ['Orange', 'Purple', 'Green', 'Red'] },
  { id: 'purple', name: 'Purple', hex: '#8B5CF6', emoji: '🍇', choices: ['Blue', 'Purple', 'Yellow', 'Orange'] }
];

export const SHAPES_DATA = [
  { id: 'circle', name: 'Circle', svgType: 'circle', choices: ['Circle', 'Square', 'Triangle', 'Star'], description: 'A circle is round like a ball.' },
  { id: 'square', name: 'Square', svgType: 'square', choices: ['Square', 'Rectangle', 'Circle', 'Triangle'], description: 'A square has 4 equal straight sides.' },
  { id: 'triangle', name: 'Triangle', svgType: 'triangle', choices: ['Star', 'Triangle', 'Square', 'Circle'], description: 'A triangle has 3 pointy corners.' },
  { id: 'rectangle', name: 'Rectangle', svgType: 'rectangle', choices: ['Rectangle', 'Circle', 'Square', 'Star'], description: 'A rectangle has 2 long sides and 2 short sides.' },
  { id: 'star', name: 'Star', svgType: 'star', choices: ['Triangle', 'Star', 'Rectangle', 'Circle'], description: 'A star has 5 shiny points.' }
];

export const NUMBERS_DATA = [
  { number: 1, word: 'One', countItem: '🎈', label: 'balloon', choices: [1, 2, 3, 4] },
  { number: 2, word: 'Two', countItem: '🌟', label: 'stars', choices: [1, 2, 3, 5] },
  { number: 3, word: 'Three', countItem: '🍎', label: 'apples', choices: [2, 3, 4, 5] },
  { number: 4, word: 'Four', countItem: '🐥', label: 'chicks', choices: [3, 4, 5, 6] },
  { number: 5, word: 'Five', countItem: '🍓', label: 'strawberries', choices: [4, 5, 6, 7] },
  { number: 6, word: 'Six', countItem: '🚗', label: 'cars', choices: [5, 6, 7, 8] },
  { number: 7, word: 'Seven', countItem: '🐱', label: 'cats', choices: [6, 7, 8, 9] },
  { number: 8, word: 'Eight', countItem: '🌸', label: 'flowers', choices: [7, 8, 9, 10] },
  { number: 9, word: 'Nine', countItem: '🍦', label: 'ice creams', choices: [8, 9, 10, 6] },
  { number: 10, word: 'Ten', countItem: '⚽', label: 'balls', choices: [7, 8, 9, 10] }
];

export const ALPHABET_DATA = [
  { letter: 'A', word: 'Apple', emoji: '🍎', sentence: 'A is for Apple' },
  { letter: 'B', word: 'Ball', emoji: '⚽', sentence: 'B is for Ball' },
  { letter: 'C', word: 'Cat', emoji: '🐱', sentence: 'C is for Cat' },
  { letter: 'D', word: 'Dog', emoji: '🐶', sentence: 'D is for Dog' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', sentence: 'E is for Elephant' },
  { letter: 'F', word: 'Fish', emoji: '🐟', sentence: 'F is for Fish' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒', sentence: 'G is for Giraffe' },
  { letter: 'H', word: 'House', emoji: '🏠', sentence: 'H is for House' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', sentence: 'I is for Ice Cream' },
  { letter: 'J', word: 'Juice', emoji: '🧃', sentence: 'J is for Juice' },
  { letter: 'K', word: 'Kite', emoji: '🪁', sentence: 'K is for Kite' },
  { letter: 'L', word: 'Lion', emoji: '🦁', sentence: 'L is for Lion' },
  { letter: 'M', word: 'Monkey', emoji: '🐒', sentence: 'M is for Monkey' },
  { letter: 'N', word: 'Nest', emoji: '🪹', sentence: 'N is for Nest' },
  { letter: 'O', word: 'Orange', emoji: '🍊', sentence: 'O is for Orange' },
  { letter: 'P', word: 'Pencil', emoji: '✏️', sentence: 'P is for Pencil' },
  { letter: 'Q', word: 'Queen', emoji: '👑', sentence: 'Q is for Queen' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', sentence: 'R is for Rabbit' },
  { letter: 'S', word: 'Sun', emoji: '☀️', sentence: 'S is for Sun' },
  { letter: 'T', word: 'Tree', emoji: '🌳', sentence: 'T is for Tree' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', sentence: 'U is for Umbrella' },
  { letter: 'V', word: 'Violin', emoji: '🎻', sentence: 'V is for Violin' },
  { letter: 'W', word: 'Watermelon', emoji: '🍉', sentence: 'W is for Watermelon' },
  { letter: 'X', word: 'Xylophone', emoji: '🎼', sentence: 'X is for Xylophone' },
  { letter: 'Y', word: 'Yacht', emoji: '⛵', sentence: 'Y is for Yacht' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', sentence: 'Z is for Zebra' }
];

export const MATCHING_DATA = [
  { id: 1, leftWord: 'Apple', leftEmoji: '🍎', rightEmoji: '🍎', matchKey: 'apple' },
  { id: 2, leftWord: 'Dog', leftEmoji: '🐶', rightEmoji: '🐶', matchKey: 'dog' },
  { id: 3, leftWord: 'Sun', leftEmoji: '☀️', rightEmoji: '☀️', matchKey: 'sun' },
  { id: 4, leftWord: 'Fish', leftEmoji: '🐟', rightEmoji: '🐟', matchKey: 'fish' },
  { id: 5, leftWord: 'Car', leftEmoji: '🚗', rightEmoji: '🚗', matchKey: 'car' }
];

export const IDENTIFY_PICTURE_DATA = [
  {
    id: 1,
    question: 'Which one is a Cat?',
    targetId: 'cat',
    options: [
      { id: 'dog', name: 'Dog', emoji: '🐶' },
      { id: 'cat', name: 'Cat', emoji: '🐱' },
      { id: 'bird', name: 'Bird', emoji: '🐦' },
      { id: 'fish', name: 'Fish', emoji: '🐟' }
    ]
  },
  {
    id: 2,
    question: 'Which one is a Star?',
    targetId: 'star',
    options: [
      { id: 'circle', name: 'Circle', emoji: '⚪' },
      { id: 'star', name: 'Star', emoji: '⭐' },
      { id: 'square', name: 'Square', emoji: '⬛' },
      { id: 'heart', name: 'Heart', emoji: '❤️' }
    ]
  },
  {
    id: 3,
    question: 'Which one is a Book?',
    targetId: 'book',
    options: [
      { id: 'pencil', name: 'Pencil', emoji: '✏️' },
      { id: 'chair', name: 'Chair', emoji: '🪑' },
      { id: 'book', name: 'Book', emoji: '📚' },
      { id: 'bag', name: 'Backpack', emoji: '🎒' }
    ]
  }
];
