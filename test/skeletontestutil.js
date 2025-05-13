import {List} from '../src/utils.js';

export default class SkeletinTestUtil {

  equalEpsilon(d1, d2) {
    return Math.abs(d1 - d2) < 5E-6;
  }

  containsEpsilon(list, p) {
    return list.any(l => this.equalEpsilon(l.x, p.x) && this.equalEpsilon(l.y, p.y));
  }

  /**
   * @param
   * @return
   */
  getFacePoints(sk) {
    let ret = new List();

    for (edgeOutput of sk.Edges) {
      points = edgeOutput.Polygon;
      for (vector2d of points) {
        if (!this.ContainsEpsilon(ret, vector2d))
          ret.add(vector2d);
      }
    }
    return ret;
  }
}
