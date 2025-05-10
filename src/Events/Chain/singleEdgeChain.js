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

  public get PreviousEdge() {
    return this.oppositeEdge;
	}

  public get NextEdge() {
    return this.oppositeEdge;
  }

  public get PreviousVertex() {
    return this.previousVertex;
  }

  public get NextVertex() {
    return this.nextVertex;
  }

  public get CurrentVertex() {
    return null;
  }

  public get ChainType() {
    return ChainType.Split;
  }
}

export {SingleEdgeChain};
