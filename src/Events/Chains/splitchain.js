import Edge from '../../Circular/edge'
import Vertex from '../../Circular/vertex'
import ChainType from './chaintype'
import VertexSplitEvent from '../vertexsplitevent'
import SplitEvent from '../splitevent'

export default class SplitChain {
  /**
   * @type {SplitEvent}
   */
  _splitEvent

  /**
   * @param {SplitEvent} event
   */
  constructor (event) {
    this._splitEvent = event
  }

  /**
   * @returns {Edge}
   */
  oppositeEdge () {
    if (!(this._splitEvent instanceof VertexSplitEvent)) { return this._splitEvent.oppositeEdge }

    return null
  }

  /**
   * @returns {Edge}
   */
  previousEdge () {
    return this._splitEvent.parent.previousEdge
  }

  /**
   * @returns {Edge}
   */
  nextEdge () {
    return this._splitEvent.parent.nextEdge
  }

  /**
   * @returns {Vertex}
   */
  previousVertex () {
    return this._splitEvent.parent.previous
  }

  /**
   * @returns {Vertex}
   */
  nextVertex () {
    return this._splitEvent.parent.next
  }

  /**
   * @returns {Vertex}
   */
  currentVertex () {
    return this._splitEvent.parent
  }

  /**
   * @returns {ChainType} the type
   */
  chainType () {
    return ChainType.SPLIT
  }
}
