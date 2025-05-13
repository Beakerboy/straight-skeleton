export class Skeleton {
  // list(edgeresult)
  Edges = null;
  // dict(vector2d, number)
  Distances = null;

  constructor(edges, distances) {
    this.Edges = edges;
    this.Distances = distances;
  }
}
