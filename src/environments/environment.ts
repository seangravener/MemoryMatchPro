const simpleComboCode = ['a', 'b'];
const konamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
].map(key => key.toLowerCase());

export const environment = {
  production: false,
  cheatCodeCombo: konamiCode,
};
