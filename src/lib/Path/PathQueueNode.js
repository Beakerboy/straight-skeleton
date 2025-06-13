import PathQueue from "./PathQueue";

export default class PathQueueNode {
	List = null;
	Next = null;
	Previous = null;

	get IsEnd() {
		return this.Next === null || this.Previous === null;
	}

	AddPush(node) {
		this.List.AddPush(this, node);
	}

	AddQueue(queue) {
		if (this.List === queue.List)
			return null;

		let currentQueue = this;

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

		let current = this;

		while (current.Previous !== null)
			current = current.Previous;

		return current;
	}

	Pop() {
		return this.List.Pop(this);
	}
}
