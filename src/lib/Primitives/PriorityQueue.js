import {List} from "../Utils";

export default class PriorityQueue {
	_comparer = null;
	_heap = null;

	constructor(capacity, comparer) {
		this._heap = new List(capacity);
		this._comparer = comparer;
	}

	Clear() {
		this._heap.length = 0;
	}

	Add(item) {
		let n = this._heap.length;
		this._heap.push(item);
		while (n !== 0) {
			const p = Math.floor(n / 2);
			if (this._comparer.Compare(this._heap[n], (this._heap[p])) >= 0) break;
			const tmp = this._heap[n];
			this._heap[n] = this._heap[p];
			this._heap[p] = tmp;
			n = p;
		}
	}

	get Count() {
		return this._heap.Count;
	}

	get Empty() {
		return this._heap.Count === 0;
	}

	Peek() {
		return !this._heap.Any() ? null : this._heap[0];
	}

	Next() {
		const val = this._heap[0];
		const nMax = this._heap.Count - 1;
		this._heap[0] = this._heap[nMax];
		this._heap.RemoveAt(nMax);

		let p = 0;
		while (true) {
			let c = p * 2;
			if (c >= nMax) break;

			if (c + 1 < nMax && this._comparer.Compare(this._heap[c + 1], this._heap[c]) < 0) c++;

			if (this._comparer.Compare(this._heap[p], (this._heap[c])) <= 0) break;

			const tmp = this._heap[p];
			this._heap[p] = this._heap[c];
			this._heap[c] = tmp;
			p = c;
		}
		return val;
	}
}
