function ContainsEpsilon(List<Vector2d> list, Vector2d p) {
  return list.Any(l => EqualEpsilon(l.X, p.X) && EqualEpsilon(l.Y, p.Y));
}

/**
 * @param
 * @return
 */
function getFacePoints(sk) {
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
