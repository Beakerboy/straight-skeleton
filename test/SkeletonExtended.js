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
    'Skeleton_1'
  ],
  [
    [],
    null,
    [],
    'Skeleton_2'
  ],
  [
    [],
    null,
    [],
    'Skeleton_3'
  ],
  [
    [],
    null,
    [],
    'Skeleton_4'
  ],
  [
    [],
    null,
    [],
    'Skeleton_5'
  ],
  [
    [],
    null,
    [],
    'Skeleton_6'
  ],
  [
    [],
    null,
    [],
    'Skeleton_7'
  ],
  [
    [],
    null,
    [],
    'Skeleton_8'
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
