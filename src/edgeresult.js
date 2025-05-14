import Edge from './Circular/edge'
import { List } from './utils'

export default class EdgeResult {
  /**
   * @type {Edge}
   */
  edge

  /**
   * @type {List}
   */
  polygon

  /**
   * @param {Edge} edge
   * @param {List} polygon
   */
  constructor (edge, polygon) {
    this.edge = edge
    this.polygon = polygon
  }
}
