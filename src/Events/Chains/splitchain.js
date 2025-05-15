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
   * @param {SplitEvent} event The event
   */
  constructor (event) {
    this._splitEvent = event
  }

  /**
   * @returns {Edge} The opposite edge
   */
  oppositeEdge () {
    if (!(this._splitEvent instanceof VertexSplitEvent)) { return this._splitEvent.oppositeEdge }

    return null
  }

  /**
   * @returns {Edge} The previous edge
   */
  previousEdge () {
    return this._splitEvent.parent.previousEdge
  }

  /**
   * @returns {Edge} The next edge
   */
  nextEdge () {
    return this._splitEvent.parent.nextEdge
  }

  /**
   * @returns {Vertex} The previous vertex
   */
  previousVertex () {
    return this._splitEvent.parent.previous
  }

  /**
   * @returns {Vertex} The next vertex
   */
  nextVertex () {
    return this._splitEvent.parent.next
  }

  /**
   * @returns {Vertex} The current vertex
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
