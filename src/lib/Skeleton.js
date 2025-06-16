import Vector2 from "three";
import EdgeResult from "./EdgeResult";

export class Skeleton {
	Edges = null;
	Distances = null;

	constructor(edges, distances) {
		this.Edges = edges;
		this.Distances = distances;
	}
}
