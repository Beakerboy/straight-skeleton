import SplitEvent from './splitevent'

export default class VertexSplitEvent extends SplitEvent {
  constructor (point, distance, parent) {
    super(point, distance, parent, null)
  }

  toString () {
    return 'VertexSplitEvent [V=' + this.v + ', Parent=' +
      (this.parent !== null ? this.parent.point.toString() : 'null') +
      ', Distance=' + this.distance + ']'
  }
}
