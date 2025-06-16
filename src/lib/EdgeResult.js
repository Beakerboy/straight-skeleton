import Edge from "./Circular/Edge";

export default class EdgeResult {
	Edge;
	Polygon;

	constructor(edge, polygon) {
		this.Edge = edge;
		this.Polygon = polygon;
	}
}
