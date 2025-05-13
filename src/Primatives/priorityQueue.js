import {IComparer, List} from '../Utils';

export default class PriorityQueue {
	comparer = null;
	heap = null;

	constructor(capacity, comparer) {
		this.heap = new List(capacity);
		this.comparer = comparer;
	}

	Clear() {
		this.heap.Clear();
	}

	Add(item) {
		let n = this.heap.Count;
		this.heap.Add(item);
		while (n !== 0) {
			const p = Math.floor(n / 2);
			if (this.comparer.Compare(this.heap[n], (this.heap[p])) >= 0) break;
			const tmp: T = this.heap[n];
			this.heap[n] = this.heap[p];
			this.heap[p] = tmp;
			n = p;
		}
	}

	Count() {
		return this.heap.Count;
	}

	Empty() {
		return this.heap.Count === 0;
	}

	Peek() {
		return !this.heap.Any() ? null : this.heap[0];
	}

  Next() {
		const val: T = this.heap[0];
		const nMax = this.heap.Count - 1;
		this.heap[0] = this.heap[nMax];
		this.heap.RemoveAt(nMax);

		let p = 0;
		while (true) {
			let c = p * 2;
			if (c >= nMax) break;

			if (c + 1 < nMax && this.comparer.Compare(this.heap[c + 1], this.heap[c]) < 0) c++;

			if (this.comparer.Compare(this.heap[p], (this.heap[c])) <= 0) break;

			const tmp: T = this.heap[p];
			this.heap[p] = this.heap[c];
			this.heap[c] = tmp;
			p = c;
		}
		return val;
  }
}
