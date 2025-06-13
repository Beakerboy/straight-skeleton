import EdgeEvent from "../EdgeEvent";
import {List} from "../../Utils";
import Edge from "../../Circular/Edge";
import Vertex from "../../Circular/Vertex";
import ChainType from "./ChainType";

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
