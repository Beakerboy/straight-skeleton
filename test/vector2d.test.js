import Vector2d from '../src/Primitives/vector2d.js';

test('Test X and Y', () => {
  const v = new Vector2d(0, 0);
  expect(v.x).toBe(0);
  expect(v.y).toBe(0);
});
