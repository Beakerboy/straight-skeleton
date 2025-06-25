export default class EdgeChain {
	_closed;
	EdgeList;

	constructor(edgeList) {
		this.EdgeList = edgeList;
		this._closed = this.PreviousVertex === this.NextVertex;
	}

	get PreviousEdge() {
		return this.EdgeList[0].PreviousVertex.PreviousEdge;
	}

	get NextEdge() {
		return this.EdgeList[this.EdgeList.length - 1].NextVertex.NextEdge;
	}

	get PreviousVertex() {
		return this.EdgeList[0].PreviousVertex;
	}

	get NextVertex() {
		return this.EdgeList[this.EdgeList.length - 1].NextVertex;
	}

	get CurrentVertex() {
		return null;
	}

	get ChainType() {
		return this._closed ? ChainType.ClosedEdge : ChainType.Edge;
	}
}
