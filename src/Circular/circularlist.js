import CircularNode from './circularnode.js'

export default class CircularList extends CircularNode {
  /**
   * @type {CircularNode}
   */
  _first = null

  /**
   * @type {number}
   */
  _size = 0

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

    this._size++
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

    this._size++
  }

  /**
   * @param {CircularNode} node New Node
   */
  addLast (node) {
    if (node.list !== null) {
      throw new Error('Node is already assigned to different list!')
    }
    if (this._first === null) {
      this._first = node

      node.list = this
      node.next = node
      node.previous = node

      this._size++
    } else {
      this.addPrevious(this._first, node)
    }
  }

  /**
   * Remove a node from the ring.
   * @param {CircularNode} node Node to remove
   */
  remove (node) {
    if (node.List !== this) {
      throw new Error('Node is not assigned to this list!')
    }
    if (this._size <= 0) {
      throw new Error('List is empty can\'t remove!')
    }
    node.List = null

    if (this._size === 1) {
      this._first = null
    } else {
      if (this._first === node) {
        this._first = this._first.next
      }

      node.previous.next = node.next
      node.next.previous = node.previous
    }

    node.previous = null
    node.next = null

    this._size--
  }

  /**
   * @returns {number}
   */
  get size () {
    return this._size
  }

  /**
   * @returns {CircularNode}
   */
  get first () {
    return this._first
  }

  /**
   * @yields {CircularNode}
   */
  * generator () {
    let current = this._first
    let i = 0

    while (current !== null) {
      yield current

      if (++i === this._size) {
        return
      }

      current = current.next
    }
  }
}
