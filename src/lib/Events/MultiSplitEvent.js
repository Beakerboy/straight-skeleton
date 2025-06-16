import SkeletonEvent from "./SkeletonEvent";

export default class MultiSplitEvent extends SkeletonEvent {
	Chains;

	get IsObsolete() {
		return false;
	}

	constructor(point, distance, chains) {
		super(point, distance);

		this.Chains = chains;
	}
}
