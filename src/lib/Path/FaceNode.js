import PathQueueNode from "./PathQueueNode";
import Vertex from "../Circular/Vertex";
import FaceQueue from "./FaceQueue";

export class FaceNode extends PathQueueNode {
	Vertex = null;

	constructor(vertex) {
		super();
		this.Vertex = vertex;
	}

	get FaceQueue() {
		return this.List;
	}

	get IsQueueUnconnected() {
		return this.FaceQueue.IsUnconnected;
	}

	QueueClose() {
		this.FaceQueue.Close();
	}
}
