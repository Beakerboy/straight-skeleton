import SkeletonEvent from './SkeletonEvent';
import {List} from '../Utils';
import IChain from './Chains/IChain';
import Vector2d from '../Primitives/Vector2d';

class MultiSplitEvent extends SkeletonEvent {
  Chains;

	IsObsolete() {
		return false;
	}

  constructor(point, distance, chains) {
    super(point, distance);

    this.Chains = chains;
  }
}
export {MultiSplitEvent};
