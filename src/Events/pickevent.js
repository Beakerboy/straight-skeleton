import SkeletonEvent from './skeletonevent';

export default class PickEvent extends SkeletonEvent {
  // @type {EdgeChain}
  chain = null;

  // @inheritDoc
  IsObsolete() {
    return false;
  }

  constructor(point, distance, chain) {
    super(point, distance);

    this.chain = chain;
  }
}
