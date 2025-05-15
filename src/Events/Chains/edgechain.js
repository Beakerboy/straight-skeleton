import { List } from '../../utils'
import Edge from '../../Circular/edge'
import Vertex from '../../Circular/vertex'
import ChainType from './chaintype'

export default class EdgeChain {
  /**
   * @type {boolean}
   */
  _closed

  /**
   * @type {List}
   */
  edgeList

  /**
   * @param {List} edgeList List of EdgeEvents
   */
  constructor (edgeList) {
    this.edgeList = edgeList
    this._closed = this.previousVertex === this.nextVertex
  }

  /**
   * @returns {Edge} The previous edge
   */
  get previousEdge () {
    return this.edgeList[0].previousVertex.previousEdge
  }

  /**
   * @returns {Edge} The next edge
   */
  get nextEdge () {
    return this.edgeList[this.edgeList.count - 1].nextVertex.nextEdge
  }

  /**
   * @returns {Vertex} The previous vertex
   */
  get previousVertex () {
    return this.EdgeList[0].PreviousVertex
  }

  /**
   * @returns {Vertex} the next vertex
   */
  get nextVertex () {
    return this.EdgeList[this.EdgeList.Count - 1].NextVertex
  }

  /**
   * @returns {Vertex} The current vertex
   */
  get currentVertex () {
    return null
  }

  /**
   * @returns {ChainType} The chain type
   */
  get chainType () {
    return this._closed ? ChainType.CLOSED_EDGE : ChainType.EDGE
  }
}

module.exports = EdgeChain
