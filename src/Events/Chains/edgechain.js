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
   * @param {EdgeList} edgeList List of edges
   */
  constructor (edgeList) {
    this.edgeList = edgeList
    this._closed = this.previousVertex === this.nextVertex
  }

  /**
   * @returns {Edge}
   */
  get previousEdge () {
    return this.edgeList[0].previousVertex.previousEdge
  }

  /**
   * @returns {Edge}
   */
  get nextEdge () {
    return this.edgeList[this.edgeList.count - 1].nextVertex.nextEdge
  }

  /**
   * @returns {Vertex}
   */
  get previousVertex () {
    return this.EdgeList[0].PreviousVertex
  }

  /**
   * @returns {Vertex}
   */
  get nextVertex () {
    return this.EdgeList[this.EdgeList.Count - 1].NextVertex
  }

  /**
   * @returns {Vertex}
   */
  get currentVertex () {
    return null
  }

  /**
   * @returns {ChainType}
   */
  get chainType () {
    return this._closed ? ChainType.CLOSED_EDGE : ChainType.EDGE
  }
}

module.exports = EdgeChain
