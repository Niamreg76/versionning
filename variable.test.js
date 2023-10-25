const { variable } = require('./variable'); // Importez la variable depuis variable.js

test('La variable "variable" est égale à 2', () => {
  expect(variable).toBe(2);
});
