import CircularList from './circularlist.js'

export default class CircularNode {
  /**
   * @type {CircularList}
   */
  list

  /**
   * @type {CircularNode}
   */
  next

  /**
   * @type {CircularNode}
   */
  previous

  /**
   * @param {CircularNode} node New Node
   */
  addNext (node) {
    this.list.addNext(this, node)
  }

  /**
   * @param {CircularNode} node New Node
   */
  addPrevious (node) {
    this.list.addPrevious(this, node)
  }

  /**
   * Remove a node
   */
  remove () {
    this.list.remove(this)
  }
}
