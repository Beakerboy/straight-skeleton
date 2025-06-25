import CircularNode from "./CircularNode";
import Vector2d from "../Primitives/Vector2d";
import LineLinear2d from "../Primitives/LineLinear2d";
import LineParametric2d from "../Primitives/LineParametric2d";

export default class Edge extends CircularNode {
	Begin;
	End;
	Norm;

	LineLinear2d;
	BisectorNext = null;
	BisectorPrevious = null;

	constructor(begin, end) {
		super();

		this.Begin = begin;
		this.End = end;

		this.LineLinear2d = new LineLinear2d(begin, end);
		this.Norm = end.Sub(begin).Normalized();
	}

	ToString() {
		return `Edge [p1=${this.Begin.ToString()}, p2=${this.End.ToString()}]`;
	}
}
