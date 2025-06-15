import Vector2d from "./Primitives/Vector2d";
import EdgeResult from "./EdgeResult";

export class Skeleton {
	Edges = null;
	Distances = null;

	constructor(edges, distances) {
		this.Edges = edges;
		this.Distances = distances;
	}
}
