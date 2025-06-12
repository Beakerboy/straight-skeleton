import LineParametric2d from '../../src/lib/Primitives/LineParametric2d'
import Vector2d from '../../src/lib/Primitives/Vector2d'

test('Constructor', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 1)
  const l1 = new LineParametric2d(v1, v2)
  expect(l1.A.X).toBe(0)
})

test('Create Linear Form', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 1)
  const l1 = new LineParametric2d(v1, v2).CreateLinearForm();
  expect(l1.constructor.name).toBe("LineParametric2d");
  expect(l1.Contains(v1)).toBe(true);
})

test('Collide', () => {
})

test('Left Side', () => {
})

test('Right Side', () => {
})
