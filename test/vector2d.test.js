import Vector2d from '../src/Primitives/vector2d.js';

test('Constructor', () => {
  const v = new Vector2d(0, 0);
  expect(v.x).toBe(0);
  expect(v.y).toBe(0);
});

test('Negate', () => {
  const v = new Vector2d(1, 1);
  const vTest = v.negate();
  expect(v.x).toBe(-1);
  expect(v.y).toBe(-1);
});

test('Distance To', () => {
  const v1 = new Vector2d(0, 0);
  const v2 = new Vector2d(1, 1);
  const result = v2.distanceTo(v1);
  expect(result).toBe(Math.sqrt(2));
});

test('Dot', () => {
  const v1 = new Vector2d(1, 2);
  const v2 = new Vector2d(4, 3);
  const result = v1.dot(v2);
  expect(result).toBe(10);
});

test('Distance Squared', () => {
  const v1 = new Vector2d(0, 0);
  const v2 = new Vector2d(1, 1);
  const result = v2.distanceSquared(v1);
  expect(result).toBe(2);
});

test('Add', () => {
  const v1 = new Vector2d(1, 2);
  const v2 = new Vector2d(4, 3);
  const result = v1.add(v2);
  expect(result.x).toBe(5);
  expect(result.y).toBe(5);
});

test('Sub', () => {
  const v1 = new Vector2d(1, 2);
  const v2 = new Vector2d(4, 3);
  const result = v2.sub(v1);
  expect(result.x).toBe(3);
  expect(result.y).toBe(1);
});

test('Add', () => {
  const v1 = new Vector2d(1, 2);
  const result = v1.multiplyScalar(3);
  expect(result.x).toBe(3);
  expect(result.y).toBe(6);
});

test('Equals', () => {
  const v1 = new Vector2d(1, 2);
  const result = v1.equals(v1);
  expect(result).toBe(true);
});

test('Not Equals', () => {
  const v1 = new Vector2d(1, 2);
  const v2 = new Vector2d(2, 1);
  const result = v1.notEquals(v2);
  expect(result).toBe(true);
  const result = v1.notEquals(v1);
  expect(result).toBe(false);
});
