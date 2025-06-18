/* eslint-disable */
import SkeletonBuilder from '../src/lib/SkeletonBuilder';
import Vector2d from '../src/lib/Primitives/Vector2d'
import { List } from '../src/lib/Utils'
import SkeletonTestUtil from './skeleton-test-util.js'

describe.each([
  [
    [],
    null,
    [],
    'Skeleton_multiEdgeEvent'
  ],
  [
    [],
    null,
    [],
    'Skeleton_pickEvent'
  ],
  [
    [],
    null,
    [],
    'SkeletonTest_cross_T1'
  ],
  [
    [],
    null,
    [],
    'SkeletonTest_cross_X1'
  ],
  [
    [],
    null,
    [],
    'SkeletonTest_double_split'
  ],
  [
    [],
    null,
    [],
    'SkeletonTest_double_split2'
  ],
  [
    [],
    null,
    [],
    'SkeletonTest_multiple'
  ]
])('Events', (pPoints, hPoints, ePoints, description) => {
  test(`${description}`, () => {
    const polygon = new List()
    for (const point of pPoints) {
      polygon.Add(new Vector2d(...point))
    }

    const expected = new List()
    for (const point of ePoints) {
      expected.Add(new Vector2d(...point))
    }
    expected.AddRange(polygon)

    let innerList = null
    if (hPoints !== null) {
      innerList = new List()
      const inner = new List()
      for (const point of hPoints) {
        inner.Add(new Vector2d(point[0], point[1]))
      }
      innerList.Add(inner)
      expected.AddRange(inner)
    }

    const sk = SkeletonBuilder.Build(polygon, innerList)

    SkeletonTestUtil.assertExpectedPoints(expected, SkeletonTestUtil.getFacePoints(sk))
  })
})
