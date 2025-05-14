import SplitEvent from './SplitEvent';

export default class VertexSplitEvent extends SplitEvent {
  constructor(point, distance, parent) {
    super(point, distance, parent, null);
  }

  ToString() {
    return 'VertexSplitEvent [V=' + this.v + ', Parent=' +
      (this.Parent !== null ? this.Parent.Point.ToString() : 'null')
      + ', Distance=' + this.distance + ']';
  }
}
