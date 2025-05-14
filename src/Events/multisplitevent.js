import SkeletonEvent from './SkeletonEvent';

export default class MultiSplitEvent extends SkeletonEvent {
  Chains;

  IsObsolete() {
    return false;
  }

  constructor(point, distance, chains) {
    super(point, distance);

    this.Chains = chains;
  }
}
