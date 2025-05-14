import SkeletonEvent from './skeletonevent'

export default class MultiSplitEvent extends SkeletonEvent {
  chains

  isObsolete () {
    return false
  }

  constructor (point, distance, chains) {
    super(point, distance)

    this.chains = chains
  }
}
