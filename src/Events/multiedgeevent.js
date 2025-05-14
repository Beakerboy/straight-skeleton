import SkeletonEvent from './skeletonevent'

export default class MultiEdgeEvent extends SkeletonEvent {
  // EdgeChain
  chain

  isObsolete () {
    return false
  }

  constructor (point, distance, chain) {
    super(point, distance)

    this.chain = chain
  }
}
