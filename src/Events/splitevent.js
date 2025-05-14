import SkeletonEvent from './skeletonevent';

export default class SplitEvent extends SkeletonEvent {
  //Edge
  OppositeEdge = null;
  //Vertex
  Parent = null;

  constructor(point, distance, parent, oppositeEdge) {
    super(point, distance);

    this.Parent = parent;
    this.OppositeEdge = oppositeEdge;
  }

  IsObsolete() {
    return this.Parent.IsProcessed;
  }

  ToString() {
    return 'SplitEvent [V=' + this.V + ', Parent=' + (this.Parent !== null ? this.Parent.Point.ToString() : 'null') +
      ', Distance=' + this.Distance + ']';
  }
}
