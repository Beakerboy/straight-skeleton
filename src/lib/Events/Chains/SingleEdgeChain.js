import Edge from "../../Circular/Edge";
import Vertex from "../../Circular/Vertex";
import ChainType from "./ChainType";

export default class SingleEdgeChain {
	_nextVertex;
	_oppositeEdge;
	_previousVertex;

	constructor(oppositeEdge, nextVertex) {
		this._oppositeEdge = oppositeEdge;
		this._nextVertex = nextVertex;
		this._previousVertex = nextVertex.Previous;
	}

	get PreviousEdge() {
		return this._oppositeEdge;
	}

	get NextEdge() {
		return this._oppositeEdge;
	}

	get PreviousVertex() {
		return this._previousVertex;
	}

	get NextVertex() {
		return this._nextVertex;
	}

	get CurrentVertex() {
		return null;
	}

	get ChainType() {
		return ChainType.Split;
	}
}
