import SkeletonEvent from "./SkeletonEvent";
import EdgeChain from "./Chains/EdgeChain";

export default class PickEvent extends SkeletonEvent {
	Chain;

	get IsObsolete() {
		return false;
	}

	constructor(point, distance, chain) {
		super(point, distance);

		this.Chain = chain;
	}
}
