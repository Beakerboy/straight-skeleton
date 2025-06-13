import Edge from "./Circular/Edge";
import Vector2d from "./Primitives/Vector2d";
import {List} from "./Utils";

export default class EdgeResult {
	Edge;
	Polygon;

	constructor(edge, polygon) {
		this.Edge = edge;
		this.Polygon = polygon;
	}
}
