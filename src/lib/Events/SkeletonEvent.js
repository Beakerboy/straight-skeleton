export default class SkeletonEvent {
	V = null;

	Distance;

	constructor(point, distance) {
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
