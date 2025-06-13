import PathQueue from "./PathQueue";
import {FaceNode} from "./FaceNode";
import PathQueueNode from "./PathQueueNode";
import Edge from "../Circular/Edge";

export default class FaceQueue extends PathQueue {
	Edge = null;
	Closed = false;

	get IsUnconnected() {
		return this.Edge === null;
	}

	AddPush(node, newNode) {
		if (this.Closed)
			throw new Error("Can't add node to closed FaceQueue");

		super.AddPush(node, newNode);
	}

	Close() {
		this.Closed = true;
	}
}
