import Vertex from './Circular/vertex'
import { List } from './utils'
import CircularList from './Circular/circularlist'

export default class LavUtil {
  static IsSameLav (v1, v2) {
    if (v1.List === null || v2.List === null) { return false }
    return v1.List === v2.List
  }

  static RemoveFromLav (vertex) {
    if (vertex === null || vertex.List === null) { return }
    vertex.Remove()
  }

  /**
   * @param {Vertex} startVertex
   * @param {Vertex} endVertex
   * @returns {List}
   */
  static CutLavPart (startVertex, endVertex) {
    const ret = new List()
    const size = startVertex.List.Size
    let next = startVertex

    for (let i = 0; i < size; i++) {
      const current = next
      next = current.Next
      current.Remove()
      ret.Add(current)

      if (current === endVertex) { return ret }
    }

    throw new Error('End vertex can\'t be found in start vertex lav')
  }

  static MergeBeforeBaseVertex (base, merged) {
    const size = merged.List.Size

    for (let i = 0; i < size; i++) {
      const nextMerged = merged.Next
      nextMerged.Remove()

      base.AddPrevious(nextMerged)
    }
  }

  /**
   * Moves all nodes from given vertex lav, to new lav. All moved nodes are
   * added at the end of lav. The lav end is determined by first added vertex
   * to lav.
   * @param {Vertex} vertex
   * @param {CircularList} newLav
   */
  static moveAllVertexToLavEnd (vertex, newLav) {
    const size = vertex.list.size
    for (let i = 0; i < size; i++) {
      const ver = vertex
      vertex = vertex.next
      ver.remove()
      newLav.addLast(ver)
    }
  }
}
