import CircularNode from "./CircularNode";

class CircularList extends CircularNode {
  /**
  * @type {CircularList}
  */
  first: T = null;

  /**
  * @type {number}
  */
  size = 0;

	addNext(node, newNode) {
		if (newNode.List !== null)
			throw new Error("Node is already assigned to different list!");

		newNode.List = this;

		newNode.Previous = node;
		newNode.Next = node.Next;

		node.Next.Previous = newNode;
		node.Next = newNode;

		this.size++;
	}

	AddPrevious(node: CircularNode, newNode: CircularNode) {
		if (newNode.List !== null)
			throw new Error("Node is already assigned to different list!");

		newNode.List = this;

		newNode.Previous = node.Previous;
		newNode.Next = node;

		node.Previous.Next = newNode;
		node.Previous = newNode;

		this.size++;
	}

	AddLast(node: CircularNode) {
		if (node.List !== null)
			throw new Error("Node is already assigned to different list!");

		if (this.first === null) {
			this.first = node as T;

			node.List = this;
			node.Next = node;
			node.Previous = node;

			this._size++;
		} else
			this.AddPrevious(this.first, node);
	}

	Remove(node: CircularNode) {
		if (node.List !== this)
			throw new Error("Node is not assigned to this list!");

		if (this._size <= 0)
			throw new Error("List is empty can't remove!");

		node.List = null;

		if (this._size === 1)
			this.first = null;

		else {
			if (this.first === node)
				this.first = this.first.Next;

			node.Previous.Next = node.Next;
			node.Next.Previous = node.Previous;
		}

		node.Previous = null;
		node.Next = null;

		this.size--;
	}

	public get Size(): number {
		return this.size;
	}

	public First(): T {
		return this.first;
	}

	public* Iterate(): Generator<T> {
		let current = this.first;
		let i = 0;

		while (current !== null) {
			yield current;

			if (++i === this.Size) {
				return;
			}

			current = <T>current.Next;
		}
	}
}
