import { Skeleton } from '../src/skeleton.js'
import { List } from '../src/utils.js'

export default class SkeletinTestUtil {
  equalEpsilon (d1, d2) {
    return Math.abs(d1 - d2) < 5E-6
  }

  containsEpsilon (list, p) {
    return list.any(l => this.equalEpsilon(l.x, p.x) && this.equalEpsilon(l.y, p.y))
  }

  /**
   * @param {Skeleton} sk The skeleton
   * @returns {List} List of face points
   */
  getFacePoints (sk) {
    const ret = new List()

    for (const edgeOutput of sk.edges) {
      const points = edgeOutput.polygon
      for (const vector2d of points) {
        if (!this.containsEpsilon(ret, vector2d)) { ret.add(vector2d) }
      }
    }
    return ret
  }
}
