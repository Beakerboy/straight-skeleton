import SkeletonEvent from './skeletonevent'

export default class SplitEvent extends SkeletonEvent {
  // Edge
  oppositeEdge = null
  // Vertex
  parent = null

  constructor (point, distance, parent, oppositeEdge) {
    super(point, distance)

    this.parent = parent
    this.oppositeEdge = oppositeEdge
  }

  isObsolete () {
    return this.parent.isProcessed()
  }

  toString () {
    return 'SplitEvent [V=' + this.v + ', Parent=' + (this.parent !== null ? this.parent.point.toString() : 'null') +
      ', Distance=' + this.distance + ']'
  }
}
