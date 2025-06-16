import { Skeleton } from '../src/lib/Skeleton'

export default class SkeletonTestUtil {
  static equalEpsilon (d1, d2) {
    return Math.abs(d1 - d2) < 5E-6
  }

  static containsEpsilon (list, p) {
    return list.some(l => this.equalEpsilon(l.x, p.x) && this.equalEpsilon(l.y, p.y))
  }

  /**
   * @param {Skeleton} sk The skeleton
   * @returns {List} List of face points
   */
  static getFacePoints (sk) {
    const ret = []

    for (const edgeOutput of sk.Edges) {
      const points = edgeOutput.Polygon
      for (const vector2d of points) {
        if (!this.containsEpsilon(ret, vector2d)) {
          ret.push(vector2d)
        }
      }
    }
    return ret
  }

  /**
   * @param {Vector2[]} expectedList - Expected
   * @param {Vector2[]} givenList - Given
   */
  static assertExpectedPoints (expectedList, givenList) {
    let sb = ''
    for (const expected of expectedList) {
      if (!this.containsEpsilon(givenList, expected)) {
        sb += `Can't find expected point (${expected.x + ", " + expected.y}) in given list\n`
      }
    }

    for (const given of givenList) {
      if (!this.containsEpsilon(expectedList, given)) {
        sb += `Can't find given point (${given.x + ", " + given.y}) in expected list\n`
      }
    }
    if (sb.length > 0) {
      throw new Error(sb)
    }
  }
}
