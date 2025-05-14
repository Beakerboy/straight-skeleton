import Edge from '../../Circular/edge'
import Vertex from '../../Circular/vertex'
import ChainType from './chaintype'
import VertexSplitEvent from '../vertexsplitevent'
import SplitEvent from '../splitevent'

export default class SplitChain {
  /**
   * @type {splitEvent}
   */
  splitEvent

  /**
   * @param {splitEvent} event
   */
  constructor (event) {
    this.splitEvent = event
  }

  /**
   * @returns {Edge}
   */
  oppositeEdge () {
    if (!(this.splitEvent instanceof VertexSplitEvent)) { return this.splitEvent.oppositeEdge }

    return null
  }

  /**
   * @returns {Edge}
   */
  previousEdge () {
    return this.splitEvent.parent.previousEdge
  }

  /**
   * @returns {Edge}
   */
  nextEdge () {
    return this.splitEvent.parent.nextEdge
  }

  /**
   * @returns {Vertex}
   */
  previousVertex () {
    return this.splitEvent.parent.previous
  }

  /**
   * @returns {Vertex}
   */
  nextVertex () {
    return this.splitEvent.parent.next
  }

  /**
   * @returns {Vertex}
   */
  currentVertex () {
    return this.splitEvent.parent
  }

  /**
   * @returns {ChainType} the type
   */
  chainType () {
    return ChainType.SPLIT
  }
}
