import Edge from '../../Circular/edge'
import Vertex from '../../Circular/vertex'
import ChainType from './chaintype'
import VertexSplitEvent from '../vertexsplitevent'
import SplitEvent from '../splitevent'

export default class SplitChain {
  /**
   * @
   */
  splitEvent

  /**
   * @param {splitEvent}
   */
  constructor (event) {
    this.splitEvent = event
  }

  /**
   * @returns {}
   */
  oppositeEdge () {
    if (!(this.splitEvent instanceof VertexSplitEvent)) { return this.splitEvent.oppositeEdge }

    return null
  }

  /**
   * @returns {}
   */
  previousEdge () {
    return this.splitEvent.parent.previousEdge
  }

  /**
   * @returns {}
   */
  nextEdge () {
    return this.splitEvent.parent.nextEdge
  }

  /**
   * @returns {}
   */
  previousVertex () {
    return this.splitEvent.parent.previous
  }

  /**
   * @returns {}
   */
  nextVertex () {
    return this.splitEvent.parent.next
  }

  /**
   * @returns {}
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
