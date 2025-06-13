import SkeletonEvent from "./SkeletonEvent";
import Vector2d from "../Primitives/Vector2d";
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
