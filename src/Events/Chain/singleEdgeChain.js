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

  constructor(oppositeEdge: Edge, nextVertex: Vertex) {
    this.oppositeEdge = oppositeEdge;
    this.nextVertex = nextVertex;
    this.previousVertex = nextVertex.Previous as Vertex;
  }

  public get PreviousEdge(): Edge {
    return this.oppositeEdge;
	}

  public get NextEdge(): Edge {
    return this.oppositeEdge;
  }

  public get PreviousVertex(): Vertex {
    return this.previousVertex;
  }

  public get NextVertex(): Vertex {
    return this.nextVertex;
  }

  public get CurrentVertex(): Vertex {
    return null;
  }

  public get ChainType(): ChainType {
    return ChainType.Split;
  }
}

export {SingleEdgeChain};
