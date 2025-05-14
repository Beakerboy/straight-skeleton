import PathQueueNode from './pathqueuenode'
import Vertex from '../Circular/vertex'
import FaceQueue from './facequeue'

export default class FaceNode extends PathQueueNode {
  /**
   * @type {Vertex}
   */
  vertex = null

  /**
   * @param {Vertex} vertex
   */
  constructor (vertex) {
    super()
    this.vertex = vertex
  }

  /**
   * @returns {FaceQueue}
   */
  get faceQueue () {
    return this.list
  }

  /**
   * @returns {boolean}
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
