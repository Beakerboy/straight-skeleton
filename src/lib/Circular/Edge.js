import CircularNode from "./CircularNode";
import LineLinear2d from "../Primitives/LineLinear2d";

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
		this.Norm = end.clone().sub(begin).normalize();
	}

	ToString() {
		return `Edge [p1=${this.Begin}, p2=${this.End}]`;
	}
}
