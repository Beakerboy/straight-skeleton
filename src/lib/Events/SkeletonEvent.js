import Vector2d from "../Primitives/Vector2d";

export default abstract class SkeletonEvent {
	V = null;

	Distance;

	protected constructor(point, distance) {
		this.V = point;
		this.Distance = distance;
	}

	ToString() {
		return "IntersectEntry [V=" + this.V + ", Distance=" + this.Distance + "]";
	}

	GetType() {
		return this.constructor.name;
	}
}
