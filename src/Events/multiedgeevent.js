import SkeletonEvent from './skeletonevent';
import Vector2d from '../Primitives/vector2d';
import EdgeChain from './Chains/edgechain';

export default class MultiEdgeEvent extends SkeletonEvent {
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
