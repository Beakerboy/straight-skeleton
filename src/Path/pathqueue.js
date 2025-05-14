import PathQueueNode from './pathqueuenode'

class PathQueue {
  /**
   * @type {number}
   */
  size = 0

  /**
   * @type {PathQueueNode}
   */
  first = null

  /**
   * @param {} node
   * @param {} newNode
   */
  addPush (node, newNode) {
    if (newNode.list !== null) { throw new Error('Node is already assigned to different list!') }

    if (node.next !== null && node.previous !== null) {
      throw new Error('Can\'t push new node. Node is inside a Quere. ' +
                      'New node can by added only at the end of queue.')
    }

    newNode.list = this
    this.size++

    if (node.next === null) {
      newNode.previous = node
      newNode.next = null

      node.next = newNode
    } else {
      newNode.previous = null
      newNode.next = node

      node.previous = newNode
    }
  }

  /**
   * @param {} node
   */
  addFirst (node) {
    if (node.list !== null) { throw new Error('Node is already assigned to different list!') }

    if (this.first === null) {
      this.first = node

      node.list = this
      node.next = null
      node.previous = null
      this.size++
    } else { throw new Error('First element already exist!') }
  }

  /**
   * @param {} node
   * @returns {}
   */
  pop (node) {
    if (node.list !== this) { throw new Error('Node is not assigned to this list!') }

    if (this.size <= 0) { throw new Error('List is empty can\'t remove!') }

    if (!node.isEnd) { throw new Error('Can pop only from end of queue!') }

    node.list = null
    let previous = null

    if (this.size === 1) { this.first = null } else {
      if (this.first === node) {
        if (node.next !== null) { this.first = node.next } else if (node.previous !== null) { this.first = node.previous } else { throw new Error('Ups ?') }
      }
      if (node.next !== null) {
        node.next.previous = null
        previous = node.next
      } else if (node.previous !== null) {
        node.previous.next = null
        previous = node.previous
      }
    }

    node.previous = null
    node.next = null

    this.size--

    return previous
  }

  * Iterate () {
    let current = (this.first !== null ? this.first.findEnd() : null)
    let i = 0

    while (current !== null) {
      yield current

      if (++i === this.size) { return }

      current = current.next
    }
  }
}
