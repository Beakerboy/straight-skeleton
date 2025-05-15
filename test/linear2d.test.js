import LineLinear2d from '../src/Primitives/linelinear2d'
import Vector2d from '../src/Primitives/vector2d.js'

test('Comstructor', () => {
  const v1 = Vector2d(0, 0)
  const v2 = Vector2d(1, 1)
  const lin = LineLinear2d(v1, v2)
  expect(lin.a).toBe(-1)
  expect(lin.b).toBe(1)
  expect(lin.c).toBe(0)
});

test('Factory', () => {
  
});

test('Collide', () => {
  
});

test('Contains', () => {
  
});
