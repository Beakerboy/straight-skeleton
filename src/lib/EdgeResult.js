import Edge from "./Circular/Edge";
import Vector2 from "three";

export default class EdgeResult {
	Edge;
	Polygon;

	constructor(edge, polygon) {
		this.Edge = edge;
		this.Polygon = polygon;
	}
}
