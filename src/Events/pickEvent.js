import SkeletonEvent from './SkeletonEvent';
import Vector2d from '../Primitives/Vector2d';
import EdgeChain from './Chains/EdgeChain';

class PickEvent extends SkeletonEvent {
  //EdgeChain
  Chain;

  public override get IsObsolete() {
    return false;
  }

  constructor(point, distance, chain) {
    super(point, distance);

    this.Chain = chain;
  }
}
export {PickEvent};
