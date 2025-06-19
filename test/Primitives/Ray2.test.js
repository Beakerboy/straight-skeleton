import LineLinear2d from '../../src/lib/Primitives/LineLinear2d'
import Ray2 from '../../src/lib/Primitives/Ray2'
import {Vector2} from 'three'

test('Constructor', () => {
  const v1 = new Vector2(0, 0)
  const v2 = new Vector2(1, 1)
  const r1 = new Ray2(v1, v2)
  expect(r1.origin.x).toBe(0)
})

test('Collide', () => {
  const v1 = new Vector2(0, 0);
  const v2 = new Vector2(1, 1);
  const v3 = new Vector2(1, 2);
  const r1 = new Ray2(v1, v2);
  const l1 = new LineLinear2d(v2, v3);
  const epsilon = .0001;
  const result = Ray2.Collide(r1, l1, epsilon);
  expect(result.x).toBe(1);
})

/** @todo test fail to collide */

/** @todo test colinear lines */

test('Left Side', () => {
  const v1 = new Vector2(0, 0)
  const v2 = new Vector2(1, 0)
  const v3 = new Vector2(1, 1)
  const r1 = new Ray2(v1, v2)
  const result = r1.IsOnLeftSite(v3, .0001)
  expect(result).toBe(true);
})

test('Right Side', () => {
  const v1 = new Vector2(0, 0)
  const v2 = new Vector2(1, 0)
  const v3 = new Vector2(1, -1)
  const r1 = new Ray2(v1, v2)
  const result = r1.IsOnRightSite(v3, .0001)
  expect(result).toBe(true);
})
