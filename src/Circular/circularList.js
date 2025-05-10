import CircularNode from './CircularNode';

class CircularList extends CircularNode {
  /**
   * @type {CircularList}
   */
  first = null;

  /**
   * @type {number}
   */
  size = 0;

  addNext(node, newNode) {
    if (newNode.List !== null)
			throw new Error('Node is already assigned to different list!');

		newNode.List = this;

		newNode.Previous = node;
		newNode.Next = node.Next;

		node.Next.Previous = newNode;
		node.Next = newNode;

		this.size++;
	}

  /**
   * @param {CircularNode}
   * @param {CircularNode}
   */
	addPrevious(node, newNode) {
		if (newNode.List !== null)
			throw new Error("Node is already assigned to different list!");

		newNode.List = this;

		newNode.Previous = node.Previous;
		newNode.Next = node;

		node.Previous.Next = newNode;
		node.Previous = newNode;

		this.size++;
	}

  /**
   * @param {CircularNode}
   */
	addLast(node) {
		if (node.List !== null)
			throw new Error('Node is already assigned to different list!');

		if (this.first === null) {
			this.first = node;

			node.List = this;
			node.Next = node;
			node.Previous = node;

			this._size++;
		} else
			this.AddPrevious(this.first, node);
	}

  /**
   * @param {CircularNode}
   * @param {CircularNode}
   */
	remove(node) {
		if (node.List !== this)
			throw new Error('Node is not assigned to this list!');

		if (this._size <= 0)
			throw new Error('List is empty can\'t remove!');

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

  /**
   * @return {number}
   */
	//get size() {
		//return this.size;
	//}

  /**
   * @return {T}
   */
  //first() {
		//return this.first;
	//}

	*generator() {
    let current = this.first;
    let i = 0;

    while (current !== null) {
      yield current;

      if (++i === this.size) {
        return;
      }

      current = current.next;
    }
  }
}
