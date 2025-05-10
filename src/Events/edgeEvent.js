import SkeletonEvent from "./SkeletonEvent";
import Vertex from "../Circular/Vertex";
import Vector2d from "../Primitives/Vector2d";

class EdgeEvent extends SkeletonEvent {
  //Veryex
  NextVertex;
  //Vertex
  PreviousVertex;

	IsObsolete() {
		return this.PreviousVertex.IsProcessed || this.NextVertex.IsProcessed;
	}

	constructor(point, distance, previousVertex, nextVertex) {
		super(point, distance);

		this.PreviousVertex = previousVertex;
		this.NextVertex = nextVertex;
	}

	ToString() {
		return "EdgeEvent [V=" + this.V + ", PreviousVertex="
			+ (this.PreviousVertex !== null ? this.PreviousVertex.Point.ToString() : "null") +
			", NextVertex="
			+ (this.NextVertex !== null ? this.NextVertex.Point.ToString() : "null") + ", Distance=" +
			this.Distance + "]";
	}
}
