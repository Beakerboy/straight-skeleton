import CircularNode from "./CircularNode";

export default class CircularList {
	_first = null;
	_size = 0;

	AddNext(node, newNode) {
		if (newNode.List !== null)
			throw new Error("Node is already assigned to different list!");

		newNode.List = this;

		newNode.Previous = node;
		newNode.Next = node.Next;

		node.Next.Previous = newNode;
		node.Next = newNode;

		this._size++;
	}

	AddPrevious(node, newNode) {
		if (newNode.List !== null)
			throw new Error("Node is already assigned to different list!");

		newNode.List = this;

		newNode.Previous = node.Previous;
		newNode.Next = node;

		node.Previous.Next = newNode;
		node.Previous = newNode;

		this._size++;
	}

	AddLast(node) {
		if (node.List !== null)
			throw new Error("Node is already assigned to different list!");

		if (this._first === null) {
			this._first = node;

			node.List = this;
			node.Next = node;
			node.Previous = node;

			this._size++;
		} else
			this.AddPrevious(this._first, node);
	}

	Remove(node) {
		if (node.List !== this)
			throw new Error("Node is not assigned to this list!");

		if (this._size <= 0)
			throw new Error("List is empty can't remove!");

		node.List = null;

		if (this._size === 1)
			this._first = null;

		else {
			if (this._first === node)
				this._first = this._first.Next;

			node.Previous.Next = node.Next;
			node.Next.Previous = node.Previous;
		}

		node.Previous = null;
		node.Next = null;

		this._size--;
	}

	get Size() {
		return this._size;
	}

	First() {
		return this._first;
	}

	* Iterate() {
		let current = this._first;
		let i = 0;

		while (current !== null) {
			yield current;

			if (++i === this.Size) {
				return;
			}

			current = current.Next;
		}
	}
}
