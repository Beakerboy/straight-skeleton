const IChain = require('./IChain');
const EdgeEvent = require('../EdgeEvent');
const { List } = require('../../Utils');
const Edge = require('../../Circular/Edge');
const Vertex = require('../../Circular/Vertex');
const ChainType = require('./ChainType');

class EdgeChain {
  constructor(edgeList) {
    this.EdgeList = edgeList;
    this._closed = this.PreviousVertex === this.NextVertex;
  }

  get PreviousEdge() {
    return this.EdgeList[0].PreviousVertex.PreviousEdge;
  }

  get NextEdge() {
    return this.EdgeList[this.EdgeList.Count - 1].NextVertex.NextEdge;
  }

  get PreviousVertex() {
    return this.EdgeList[0].PreviousVertex;
  }

  get NextVertex() {
    return this.EdgeList[this.EdgeList.Count - 1].NextVertex;
  }

  get CurrentVertex() {
    return null;
  }

  get ChainType() {
    return this._closed ? ChainType.ClosedEdge : ChainType.Edge;
  }
}

module.exports = EdgeChain;
