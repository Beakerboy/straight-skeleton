import CircularNode from "./CircularNode";
import Vector2d from "../Primitives/Vector2d";
import LineParametric2d from "../Primitives/LineParametric2d";
import Edge from "./Edge";
import {FaceNode} from "../Path/FaceNode";

export default class Vertex extends CircularNode {
	RoundDigitCount = 5;

	Point = null;
	Distance;
	Bisector = null;

	NextEdge = null;
	PreviousEdge = null;

	LeftFace = null;
	RightFace = null;

	IsProcessed;

	constructor(point, distance, bisector, previousEdge, nextEdge) {
		super();

		this.Point = point;
		this.Distance = +distance.toFixed(this.RoundDigitCount);
		this.Bisector = bisector;
		this.PreviousEdge = previousEdge;
		this.NextEdge = nextEdge;

		this.IsProcessed = false;
	}

	ToString() {
		return "Vertex [v=" + this.Point + ", IsProcessed=" + this.IsProcessed +
			", Bisector=" + this.Bisector + ", PreviousEdge=" + this.PreviousEdge +
			", NextEdge=" + this.NextEdge;
	}
}
