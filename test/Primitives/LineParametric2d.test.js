import LineLinear2d from '../../src/lib/Primitives/LineLinear2d'
import LineParametric2d from '../../src/lib/Primitives/LineParametric2d'
import Vector2d from '../../src/lib/Primitives/Vector2d'

test('Constructor', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 1)
  const r1 = new LineParametric2d(v1, v2)
  expect(r1.A.X).toBe(0)
})

test('Create Linear Form', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 1)
  const l1 = new LineParametric2d(v1, v2).CreateLinearForm();
  expect(l1.constructor.name).toBe("LineLinear2d");
  expect(l1.Contains(v1)).toBe(true);
})

test('Collide', () => {
  const v1 = new Vector2d(0, 0);
  const v2 = new Vector2d(1, 1);
  const v3 = new Vector2d(1, 2);
  const r1 = new LineParametric2d(v1, v2);
  const l1 = new LineLinear2d(v2, v3);
  const epsilon = .0001;
  const result = LineParametric2d.Collide(r1, l1, epsilon);
  expect(result.X).toBe(1);
})

/** @todo test fail to collide */

/** @todo test colinear lines */

test('Left Side', () => {
  const v1 = new Vector2d(0, 0)
  const v2 = new Vector2d(1, 0)
  const v3 = new Vector2d(1, 1)
  const r1 = new LineParametric2d(v1, v2)
  const result = r1.IsOnLeftSite(v3, .0001)
  expect(result).toBe(true);
})

test('Right Side', () => {
})
