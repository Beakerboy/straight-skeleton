import Vector2d from './Primitives/Vector2d';
import EdgeResult from './EdgeResult';
import {Dictionary, List} from './Utils';

export class Skeleton {
  // list(edgeresult)
  Edges = null;
  // dict(vector2d, number)
  Distances: = null;

  constructor(edges, distances) {
    this.Edges = edges;
    this.Distances = distances;
  }
}
export {Skeleton};
