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

export const baseEnvironment = {
  production: false,
  cheatCodeCombo: konamiCode,
};

export const devEnvironment = {
  production: false,
  optimization: false,
  outputHashing: 'all',
  sourceMap: true,
  extractCss: true,
  namedChunks: true,
  aot: false,
  extractLicenses: true,
  vendorChunk: true,
  buildOptimizer: false,
};
