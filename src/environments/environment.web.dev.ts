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
  target: 'web-dev',
  production: false,
  cheatCodeCombo: konamiCode,

  //
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
