import SkeletonEvent from "./SkeletonEvent";
import Edge from "../Circular/Edge";
import Vertex from "../Circular/Vertex";
import Vector2d from "../Primitives/Vector2d";

export default class SplitEvent extends SkeletonEvent {
	OppositeEdge = null;
	Parent = null;

	constructor(point, distance, parent, oppositeEdge) {
		super(point, distance);

		this.Parent = parent;
		this.OppositeEdge = oppositeEdge;
	}

	get IsObsolete() {
		return this.Parent.IsProcessed;
	}


	ToString() {
		return "SplitEvent [V=" + this.V + ", Parent=" + (this.Parent !== null ? this.Parent.Point.ToString() : "null") +
			", Distance=" + this.Distance + "]";
	}
}
