import {ICircularList} from "./CircularList";

export default class CircularNode {
	const list = new ICircularList();
  const next = new CircularNode();
	const previous = new CircularNode();

	public AddNext(node) {
		this.List.AddNext(this, node);
	}

	public AddPrevious(node: CircularNode) {
		this.List.AddPrevious(this, node);
	}

	public Remove() {
		this.List.Remove(this);
	}
}
