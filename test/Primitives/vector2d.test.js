import Vector2d from '../../src/lib/Primitives/Vector2d'

test('Constructor', () => {
  const v = new Vector2d(0, 0)
  expect(v.X).toBe(0)
  expect(v.Y).toBe(0)
})

test('Negate', () => {
  const v = new Vector2d(1, 1)
  v.Negate()
  expect(v.X).toBe(-1)
  expect(v.Y).toBe(-1)
})

test('Distance To', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 1)
  const result = v2.DistanceTo(v1)
  expect(result).toBe(Math.sqrt(2))
})

test('Normalized', () => {
  const v1 = new Vector2d(5, 0)
  const result = v1.Normalized(v1)
  expect(result.X).toBe(1)
  expect(result.Y).toBe(0)
})

test('Dot', () => {
  const v1 = new Vector2d(1, 2)
  const v2 = new Vector2d(4, 3)
  const result = v1.Dot(v2)
  expect(result).toBe(10)
})

test('Distance Squared', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 1)
  const result = v2.DistanceSquared(v1)
  expect(result).toBe(2)
})

test('Add', () => {
  const v1 = new Vector2d(1, 2)
  const v2 = new Vector2d(4, 3)
  const result = v1.Add(v2)
  expect(result.X).toBe(5)
  expect(result.Y).toBe(5)
})

test('Sub', () => {
  const v1 = new Vector2d(1, 2)
  const v2 = new Vector2d(4, 3)
  const result = v2.Sub(v1)
  expect(result.X).toBe(3)
  expect(result.Y).toBe(1)
})

test('Add', () => {
  const v1 = new Vector2d(1, 2)
  const result = v1.MultiplyScalar(3)
  expect(result.X).toBe(3)
  expect(result.Y).toBe(6)
})

test('Equals', () => {
  const v1 = new Vector2d(1, 2)
  const result = v1.Equals(v1)
  expect(result).toBe(true)
})

test('Not Equals', () => {
  const v1 = new Vector2d(1, 2)
  const v2 = new Vector2d(2, 1)
  let result = v1.NotEquals(v2)
  expect(result).toBe(true)
  result = v1.NotEquals(v1)
  expect(result).toBe(false)
})

test('To String', () => {
  const v1 = new Vector2d(1, 2)
  const result = v1.ToString()
  expect(result).toBe('1, 2')
})
