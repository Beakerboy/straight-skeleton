import PathQueue from './PathQueue';

class PathQueueNode {
  List = null;
  Next = null;
  Previous = null;

  IsEnd(): boolean {
    return this.Next === null || this.Previous === null;
  }

  AddPush(node) {
    this.List.AddPush(this, node);
  }

  AddQueue(queue: PathQueueNode<T>): PathQueueNode<T> {
    if (this.List === queue.List)
      return null;

    let currentQueue: PathQueueNode<T> = this;

    let current = queue;

    while (current !== null) {
      const next = current.Pop();

      currentQueue.AddPush(current);
      currentQueue = current;

      current = next;
    }

    return currentQueue;
  }

  FindEnd() {
    if (this.IsEnd)
      return this;

    let current: PathQueueNode<T> = this;

    while (current.Previous !== null)
    current = current.Previous;

    return current;
  }

  Pop() {
    return this.List.Pop(this);
  }
}
