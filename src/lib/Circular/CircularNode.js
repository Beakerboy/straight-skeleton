import {ICircularList} from "./CircularList";

export default class CircularNode {
	List = null;
	Next = null;
	Previous = null;

	AddNext(node) {
		this.List.AddNext(this, node);
	}

	AddPrevious(node) {
		this.List.AddPrevious(this, node);
	}

	Remove() {
		this.List.Remove(this);
	}
}
