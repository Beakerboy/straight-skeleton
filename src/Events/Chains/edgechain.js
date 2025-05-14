import {EdgeEvent} from '../edgeevent';
const { List } = require('../../utils');
const Edge = require('../../Circular/edge');
const Vertex = require('../../Circular/vertex');
const ChainType = require('./chaintype');

class EdgeChain {
  constructor(edgeList) {
    this.edgeList = edgeList;
    this._closed = this.previousVertex === this.nextVertex;
  }

  get previousEdge() {
    return this.edgeList[0].previousVertex.previousEdge;
  }

  get nextEdge() {
    return this.edgeList[this.edgeList.count - 1].nextVertex.nextEdge;
  }

  get previousVertex() {
    return this.EdgeList[0].PreviousVertex;
  }

  get nextVertex() {
    return this.EdgeList[this.EdgeList.Count - 1].NextVertex;
  }

  get currentVertex() {
    return null;
  }

  get chainType() {
    return this._closed ? ChainType.CLOSED_EDGE : ChainType.EDGE;
  }
}

module.exports = EdgeChain;
