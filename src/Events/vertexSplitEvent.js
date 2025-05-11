import SplitEvent from './SplitEvent';
import Vector2d from '../Primitives/Vector2d';
import Vertex from '../Circular/Vertex';

class VertexSplitEvent extends SplitEvent {
  constructor(point, distance, parent) {
    super(point, distance, parent, null);
  }

  ToString() {
    return 'VertexSplitEvent [V=' + this.V + ', Parent=' +
      (this.Parent !== null ? this.Parent.Point.ToString() : 'null')
      + ', Distance=' + this.Distance + ']';
  }
}
