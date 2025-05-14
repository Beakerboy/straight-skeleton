import Edge from '../../Circular/Edge';
import Vertex from '../../Circular/Vertex';
import ChainType from './ChainType';
import VertexSplitEvent from '../VertexSplitEvent';
import SplitEvent from '../SplitEvent';

export default class SplitChain {
  //splitevent
  splitEvent;

  //@param splitEvent
  constructor(event) {
    this.splitEvent = event;
  }

  OppositeEdge() {
    if (!(this.splitEvent instanceof VertexSplitEvent))
      return this.splitEvent.oppositeEdge;

    return null;
  }

  PreviousEdge() {
    return this.splitEvent.parent.previousEdge;
  }

  NextEdge() {
    return this.splitEvent.parent.nextEdge;
  }

  PreviousVertex() {
    return this.splitEvent.parent.previous;
  }

  NextVertex() {
    return this.splitEvent.parent.next;
  }

  CurrentVertex() {
    return this.splitEvent.parent;
  }

  ChainType() {
    return ChainType.SPLIT;
  }
}
