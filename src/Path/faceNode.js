import PathQueueNode from './PathQueueNode';
import Vertex from '../Circular/Vertex';
import FaceQueue from './FaceQueue';

class FaceNode extends PathQueueNode {
  Vertex = null;

  constructor(vertex: Vertex) {
    super();
    this.Vertex = vertex;
  }

  FaceQueue() {
    return <FaceQueue>this.List;
  }

  IsQueueUnconnected() {
    return this.FaceQueue.IsUnconnected;
  }

  QueueClose() {
    this.FaceQueue.Close();
  }
}
