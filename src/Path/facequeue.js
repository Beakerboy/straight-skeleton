import PathQueue from './pathqueue';
import {FaceNode} from './facenode';
import PathQueueNode from './pathqueuenode';
import Edge from '../Circular/edge';

export default class FaceQueue extends PathQueue {
  Edge = null;
  Closed = false;

  IsUnconnected() {
    return this.Edge === null;
  }

  AddPush(node, newNode) {
    if (this.Closed) {
      throw new Error('Can\'t add node to closed FaceQueue');
    }
    super.AddPush(node, newNode);
  }

  Close() {
    this.Closed = true;
  }
}
