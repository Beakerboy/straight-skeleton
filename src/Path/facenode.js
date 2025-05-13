import PathQueueNode from './pathqueuenode';
import Vertex from '../Circular/vertex';
import FaceQueue from './facequeue';

export default class FaceNode extends PathQueueNode {
  Vertex = null;

  constructor(vertex) {
    super();
    this.Vertex = vertex;
  }

  FaceQueue() {
    return this.List;
  }

  IsQueueUnconnected() {
    return this.FaceQueue.IsUnconnected;
  }

  QueueClose() {
    this.FaceQueue.Close();
  }
}
