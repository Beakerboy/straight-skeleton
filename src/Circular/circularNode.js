import {ICircularList} from "./CircularList";

class CircularNode {
  const list = new ICircularList();
  const next = new CircularNode();
  const previous = new CircularNode();

	public addNext(node) {
		this.list.addNext(this, node);
	}

	public addPrevious(node) {
		this.list.addPrevious(this, node);
	}

	public remove() {
		this.list.remove(this);
	}
}
