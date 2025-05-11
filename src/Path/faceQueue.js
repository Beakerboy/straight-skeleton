import PathQueue from "./PathQueue";
import {FaceNode} from "./FaceNode";
import PathQueueNode from "./PathQueueNode";
import Edge from "../Circular/Edge";

class FaceQueue extends PathQueue {
  Edge = null;
  Closed = false;

  IsUnconnected() {
		return this.Edge === null;
	}

  AddPush(node, newNode) {
    if (this.Closed) {
      throw new Error("Can't add node to closed FaceQueue");
    }
    super.AddPush(node, newNode);
  }

  Close() {
    this.Closed = true;
  }
}
export {FaceQueue};
