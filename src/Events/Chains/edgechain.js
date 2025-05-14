import { EdgeEvent } from '../edgeevent'
const { List } = require('../../utils')
const Edge = require('../../Circular/edge')
const Vertex = require('../../Circular/vertex')
const ChainType = require('./chaintype')

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
   * @returns {EdgeEvent}
   */
  get previousEdge () {
    return this.edgeList[0].previousVertex.previousEdge
  }

  /**
   * @returns {EdgeEvent}
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
