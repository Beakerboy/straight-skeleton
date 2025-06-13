import Edge from "../../Circular/Edge";
import Vertex from "../../Circular/Vertex";
import ChainType from "./ChainType";
import VertexSplitEvent from "../VertexSplitEvent";
import SplitEvent from "../SplitEvent";

export default class SplitChain {
	 _splitEvent;

	constructor(event) {
		this._splitEvent = event;
	}

	get OppositeEdge() {
		if (!(this._splitEvent instanceof VertexSplitEvent))
			return this._splitEvent.OppositeEdge;

		return null;
	}

	get PreviousEdge() {
		return this._splitEvent.Parent.PreviousEdge;
	}

	get NextEdge() {
		return this._splitEvent.Parent.NextEdge;
	}

	get PreviousVertex() {
		return this._splitEvent.Parent.Previous as Vertex;
	}

	get NextVertex() {
		return this._splitEvent.Parent.Next as Vertex;
	}

	get CurrentVertex() {
		return this._splitEvent.Parent;
	}

	get ChainType() {
		return ChainType.Split;
	}
}
