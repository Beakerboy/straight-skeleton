import LineLinear2d from '../../src/lib/Primitives/LineLinear2d'
import Vector2d from '../../src/lib/Primitives/Vector2d'

test('Comstructor', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 1)
  const lin = new LineLinear2d(v1, v2)
  expect(lin.A).toBe(-1)
  expect(lin.B).toBe(1)
  expect(lin.C).toBe(0)
})

test('Factory', () => {
  const lin = new LineLinear2d().SetFromCoefficients(1, 2, 3);
  expect(lin.A).toBe(1)
})

test('Collide', () => {

})

test('Contains', () => {

})
