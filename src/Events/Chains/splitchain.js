import Edge from '../../Circular/edge';
import Vertex from '../../Circular/vertex';
import ChainType from './chaintype';
import VertexSplitEvent from '../vertexsplitevent';
import SplitEvent from '../splitevent';

export default class SplitChain {
  //splitevent
  splitEvent;

  //@param splitEvent
  constructor(event) {
    this.splitEvent = event;
  }

  oppositeEdge() {
    if (!(this.splitEvent instanceof VertexSplitEvent))
      return this.splitEvent.oppositeEdge;

    return null;
  }

  previousEdge() {
    return this.splitEvent.parent.previousEdge;
  }

  nextEdge() {
    return this.splitEvent.parent.nextEdge;
  }

  previousVertex() {
    return this.splitEvent.parent.previous;
  }

  nextVertex() {
    return this.splitEvent.parent.next;
  }

  currentVertex() {
    return this.splitEvent.parent;
  }

  chainType() {
    return ChainType.SPLIT;
  }
}
