import SkeletonEvent from "./SkeletonEvent";
import {List} from "../Utils";
import Vector2d from "../Primitives/Vector2d";

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
