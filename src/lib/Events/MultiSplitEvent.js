import SkeletonEvent from "./SkeletonEvent";
import {List} from "../Utils";
import IChain from "./Chains/IChain";
import Vector2d from "../Primitives/Vector2d";

export default class MultiSplitEvent extends SkeletonEvent {
	Chains;

	get IsObsolete() {
		return false;
	}

	constructor(pointd, distance, chains) {
		super(point, distance);

		this.Chains = chains;
	}
}
