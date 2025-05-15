import PathQueue from './pathqueue'
import PathQueueNode from './pathqueuenode'
import Edge from '../Circular/edge'

export default class FaceQueue extends PathQueue {
  /**
   * @type {Edge}
   */
  edge = null

  /**
   * @type {boolean}
   */
  closed = false

  /**
   * @returns {boolean} Is it?
   */
  get isUnconnected () {
    return this.edge === null
  }

  /**
   * @param {PathQueueNode} node Node
   * @param {PathQueueNode} newNode New Node
   */
  addPush (node, newNode) {
    if (this.closed) {
      throw new Error('Can\'t add node to closed FaceQueue')
    }
    super.addPush(node, newNode)
  }

  /**
   * Does Stuff
   */
  close () {
    this.closed = true
  }
}
