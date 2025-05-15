import PathQueueNode from './pathqueuenode'
import Vertex from '../Circular/vertex'
import FaceQueue from './facequeue'

export class FaceNode extends PathQueueNode {
  /**
   * @type {Vertex}
   */
  vertex = null

  /**
   * @param {Vertex} vertex The vertex node.
   */
  constructor (vertex) {
    super()
    this.vertex = vertex
  }

  /**
   * @returns {FaceQueue} The list
   */
  get faceQueue () {
    return this.list
  }

  /**
   * @returns {boolean} Is it?
   */
  get isQueueUnconnected () {
    return this.faceQueue.isUnconnected
  }

  /**
   * Does Something
   */
  QueueClose () {
    this.faceQueue.close()
  }
}
