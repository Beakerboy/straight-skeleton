import {Edge} from '../../Circular/Edge.js';
import {Vertex} from '../../Circular/Vertex.js';
import {ChainType} from './ChainType';

class SingleEdgeChain {
  //vertex
  nextVertex;
  //edge
  oppositeEdge;
  //vertex
  previousVertex;

  constructor(oppositeEdge, nextVertex) {
    this.oppositeEdge = oppositeEdge;
    this.nextVertex = nextVertex;
    this.previousVertex = nextVertex.Previous;
  }

  PreviousEdge() {
    return this.oppositeEdge;
	}

  NextEdge() {
    return this.oppositeEdge;
  }

  PreviousVertex() {
    return this.previousVertex;
  }

 NextVertex() {
    return this.nextVertex;
  }

  CurrentVertex() {
    return null;
  }

  ChainType() {
    return ChainType.Split;
  }
}

export {SingleEdgeChain};
