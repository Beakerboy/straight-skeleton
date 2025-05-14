import CircularNode from './circularnode.js'

class CircularList extends CircularNode {
  /**
   * @type {CircularList}
   */
  first = null

  /**
   * @type {number}
   */
  size = 0

  /**
   * Add newNode after node.
   * @param {CircularNode} node Target node
   * @param {CircularNode} newNode New Node
   */
  addNext (node, newNode) {
    if (newNode.List !== null) {
      throw new Error('Node is already assigned to different list!')
    }

    newNode.list = this

    newNode.previous = node
    newNode.next = node.next

    node.next.previous = newNode
    node.next = newNode

    this.size++
  }

  /**
   * Add a newNode before node.
   * @param {CircularNode} node Target Node
   * @param {CircularNode} newNode New Node
   */
  addPrevious (node, newNode) {
    if (newNode.List !== null) {
      throw new Error('Node is already assigned to different list!')
    }
    newNode.list = this

    newNode.previous = node.previous
    newNode.next = node

    node.previous.next = newNode
    node.previous = newNode

    this.size++
  }

  /**
   * @param {CircularNode} node
   */
  addLast(node) {
    if (node.List !== null) {
      throw new Error('Node is already assigned to different list!');
    }
    if (this.first === null) {
      this.first = node

      node.list = this
      node.next = node
      node.previous = node

      this.size++
    } else {
      this.AddPrevious(this.first, node)
    }
  }

  /**
   * @param {CircularNode}
   * @param {CircularNode}
   */
  remove(node) {
    if (node.List !== this) {
      throw new Error('Node is not assigned to this list!')
    }
    if (this._size <= 0) {
      throw new Error('List is empty can\'t remove!')
    }
    node.List = null

    if (this._size === 1) {
      this.first = null
    }
    else {
      if (this.first === node) {
        this.first = this.first.Next
      }

      node.previous.next = node.next
      node.next.previous = node.previous
    }

    node.previous = null;
    node.next = null;

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
  //  return this.first;
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
export {CircularList};
