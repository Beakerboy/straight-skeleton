import SkeletonEvent from './SkeletonEvent';
import Vector2d from '../Primitives/Vector2d';
import EdgeChain from './Chains/EdgeChain';

class MultiEdgeEvent extends SkeletonEvent {
  //EdgeChain
  chain;

 IsObsolete() {
    return false;
  }

  constructor(point, distance, chain) {
    super(point, distance);

    this.Chain = chain;
  }
}
export {MultiEdgeEvent};
