import Edge from './Circular/edge'
import Vector2d from './Primitives/vector2d'
import { List } from './utils'

export default class EdgeResult {
  Edge
  Polygon

  constructor (edge, polygon) {
    this.Edge = edge
    this.Polygon = polygon
  }
}
