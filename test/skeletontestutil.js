export default class SkeletinTestUtil {

  equalEpsilon(d1, d2) {
    return Math.abs(d1 - d2) < 5E-6;
  }

  containsEpsilon(list, p) {
    return list.any(l => equalEpsilon(l.x, p.x) && equalEpsilon(l.y, p.y));
  }

  /**
   * @param
   * @return
   */
  getFacePoints(sk) {
    let ret = new List();

    foreach (edgeOutput in sk.Edges) {
      points = edgeOutput.Polygon;
      foreach (vector2d in points) {
        if (!ContainsEpsilon(ret, vector2d))
          ret.add(vector2d);
      }
    }
    return ret;
  }
}
