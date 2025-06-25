/* eslint-disable */
import SkeletonBuilder from '../src/lib/SkeletonBuilder';
import SkeletonTestUtil from './skeleton-test-util.js'
import {Vector2} from 'three'

describe.each([
  [
    [[0, 1], [-1, 0], [0, -1], [5, -2], [7, 0], [5, 2]],
    null,
    [[0.53518, 0], [4.39444872, 0]],
    'Skeleton_multiEdgeEvent'
  ],
  [
    [[-1, -1], [1, -1], [1, 1], [-1, 1]],
    null,
    [[0, 0]],
    'Skeleton_pickEvent'
  ],
  [
    [[-3, -1], [3, -1], [3, 1], [1, 1], [1, 3], [-1, 3], [-1, 1], [-3, 1]],
    null,
    [[-2, 0], [2, 0], [0, 0], [0, 2]],
    'SkeletonTest_cross_T1'
  ],
  [
    [[-3, -1], [-1, -1], [-1, -3], [1, -3], [1, -1], [3, -1], [3, 1], [1, 1], [1, 3], [-1, 3], [-1, 1], [-3, 1]],
    null,
    [[0, 0], [0, 2], [0, -2], [2, 0], [-2, 0]],
    'SkeletonTest_cross_X1'
  ],
  [
    [[-6, 0], [-3, -6], [-1, -2], [1, -2], [3, -6], [6, 0]],
    null,
    [[-3.0000000000000004, -1.854101966249685], [-1.6180339887498951, -1.0000000000000002], [1.6180339887498951, -1.0000000000000002], [3.0000000000000004, -1.854101966249685]],
    'SkeletonTest_double_split'
  ],
  [
    [[-6, 0], [-3, -6], [-1, -2], [0, -3], [1, -2], [3, -6], [6, 0]],
    null,
    [[-3.0000000000000004, -1.854101966249685], [-1.2038204263767998, -0.7440019398522527], [-0.0, -1.242640687119285], [1.2038204263767998, -0.7440019398522527], [3.0000000000000004, -1.854101966249685]],
    'SkeletonTest_double_split2'
  ],
  [
    [[0, 0], [5, 0], [5, 5], [0, 5]],
    [
      [[1, 1], [2, 1], [2, 2], [1, 2]],
      [[3, 3], [4, 3], [4, 4], [3, 4]],
      [[1, 3], [2, 3], [2, 4], [1, 4]],
      [[3, 1], [4, 1], [4, 2], [3, 2]]
    ],
    [[4.5, 2.5], [4.5, 0.5], [4.5, 4.5], [0.5, 4.5], [2.5, 4.5], [0.5, 0.5], [0.5, 2.5], [2.5, 0.5], [2.5, 2.5], [2.0, 2.0], [2.0, 1.0], [1.0, 1.0], [1.0, 2.0], [4.0, 4.0], [4.0, 3.0], [3.0, 3.0], [3.0, 4.0], [2.0, 4.0], [2.0, 3.0], [1.0, 3.0], [1.0, 4.0], [4.0, 2.0], [4.0, 1.0], [3.0, 1.0], [3.0, 2.0]],
    'SkeletonTest_multiple'
  ]
])('Events', (pPoints, hPoints, ePoints, description) => {
  test(`${description}`, () => {
    const polygon = []
    for (const point of pPoints) {
      polygon.push(new Vector2d(...point))
    }

    const expected = []
    for (const point of ePoints) {
      expected.push(new Vector2(...point))
    }
    expected.push(...polygon)

    let innerList = [];
    if (hPoints !== null) {
      for (holepoints of hPoints) {
        const inner = []
        for (const point of holepoints) {
          inner.push(new Vector2(...point))
        }
        innerList.push(inner)
        expected.push(...inner)
      }
    }

    const sk = SkeletonBuilder.Build(polygon, innerList)

    SkeletonTestUtil.assertExpectedPoints(expected, SkeletonTestUtil.getFacePoints(sk))
  })
})
