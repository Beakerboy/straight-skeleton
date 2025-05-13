import Vertex from './Circular/Vertex';
import {List} from './Utils';
import CircularList from './Circular/CircularList';

export default class LavUtil {
  static IsSameLav(v1, v2) {
    if (v1.List === null || v2.List === null)
      return false;
    return v1.List === v2.List;
  }

  static RemoveFromLav(vertex) {
    if (vertex === null || vertex.List === null)
      return;
    vertex.Remove();
  }

  static CutLavPart(startVertex, endVertex) {
    const ret = new List();
    const size = startVertex.List.Size;
    let next = startVertex;

    for (let i = 0; i < size; i++) {
      const current = next;
      next = current.Next;
      current.Remove();
      ret.Add(current);

      if (current === endVertex)
        return ret;
    }

    throw new Error("End vertex can't be found in start vertex lav");
  }

  static MergeBeforeBaseVertex(base, merged) {
    const size = merged.List.Size;

    for (let i = 0; i < size; i++) {
      const nextMerged = merged.Next;
      nextMerged.Remove();

      base.AddPrevious(nextMerged);
    }
  }

  static MoveAllVertexToLavEnd(vertex, newLaw) {
    const size = vertex.List.Size;
    for (let i = 0; i < size; i++) {
      const ver = vertex;
      vertex = vertex.Next;
      ver.Remove();
      newLaw.AddLast(ver);
    }
  }
}
