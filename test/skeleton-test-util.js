import { Skeleton } from '../src/lib/Skeleton'
import { List } from '../src/lib/Utils'

export default class SkeletonTestUtil {
  static equalEpsilon (d1, d2) {
    return Math.abs(d1 - d2) < 5E-6
  }

  static containsEpsilon (list, p) {
    return list.any(l => this.equalEpsilon(l.x, p.x) && this.equalEpsilon(l.y, p.y))
  }

  /**
   * @param {Skeleton} sk The skeleton
   * @returns {List} List of face points
   */
  static getFacePoints (sk) {
    const ret = new List()

    for (const edgeOutput of sk.edges) {
      const points = edgeOutput.polygon
      for (const vector2d of points) {
        if (!this.containsEpsilon(ret, vector2d)) {
          ret.add(vector2d)
        }
      }
    }
    return ret
  }

  /**
   * @param {List} expectedList Expected Vector2d[]
   * @param {List} givenList Given Vector2d[]
   */
  static assertExpectedPoints (expectedList, givenList) {
    let sb = ''
    for (const expected of expectedList) {
      if (!this.containsEpsilon(givenList, expected)) {
        sb += `Can't find expected point (${expected.toString()}) in given list\n`
      }
    }

    for (const given of givenList) {
      if (!this.containsEpsilon(expectedList, given)) {
        sb += `Can't find given point (${given.toString()}) in expected list\n`
      }
    }
    if (sb.length > 0) {
      throw new Error(sb)
    }
  }
}
