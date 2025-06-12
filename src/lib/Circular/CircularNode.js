import {ICircularList} from "./CircularList";

export default class CircularNode {
	public List = null;
	public Next = null;
	public Previous = null;

	public AddNext(node) {
		this.List.AddNext(this, node);
	}

	public AddPrevious(node) {
		this.List.AddPrevious(this, node);
	}

	public Remove() {
		this.List.Remove(this);
	}
}
