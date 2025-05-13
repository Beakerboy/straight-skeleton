function insertInArray(array, inde, item) {
	const items = Array.prototype.slice.call(arguments, 2);

	return [].concat(array.slice(0, index), items, array.slice(index));
}

export class List {
  arr;
	constructor(capacity = 0) {
		this.arr = [];
	}

	public Add(item: T) {
		this.arr.push(item);
	}

	public Insert(index: number, item: T) {
		const newArr = insertInArray(this.arr, index, item);

		this.arr.length = newArr.length;

		for(let i = 0; i < newArr.length; i++) {
			this.arr[i] = newArr[i];
		}
	}

	Reverse() {
		this.arr.reverse();
	}

	Clear() {
		this.arr.length = 0;
	}

	Count(): number {
		return this.arr.length;
	}

	Any(filter?: (item: T) => boolean) {
		if (!filter) {
			filter = T => true;
		}

		for (const item of this.arr) {
			if (filter(item)) {
				return true;
			}
		}

		return false;
	}

	RemoveAt(index) {
		this.arr.splice(index, 1);
	}

	Remove(itemToRemove: T) {
		const newArr = this.arr.filter(item => item !== itemToRemove);

		this.arr.length = newArr.length;

		for(let i = 0; i < newArr.length; i++) {
			this.arr[i] = newArr[i];
		}
	}

	AddRange(list) {
		for (const item of list) {
			this.Add(item);
		}
	}

	Sort(comparer) {
		this.arr.sort(comparer.Compare.bind(comparer));
	}
}

export class HashSet<T> implements Iterable<T> {
	private Set: Set<T>;

	constructor() {
		this.Set = new Set();
	}

	public Add(item: T) {
		this.Set.add(item);
	}

	public Remove(item: T) {
		this.Set.delete(item);
	}

	public RemoveWhere(filter: (item: T) => boolean) {
		for (const item of this.Set.values()) {
			if (filter(item)) {
				this.Set.delete(item);
			}
		}
	}

	public Contains(item: T): boolean {
		return this.Set.has(item);
	}

	public Clear() {
		this.Set.clear();
	}

	public* [Symbol.iterator](): Generator<T> {
		for (const item of this.Set.values()) {
			yield item;
		}
	}
}

export class Dictionary<T1, T2> extends Map<T1, T2> {
	public ContainsKey(key: T1): boolean {
		return this.has(key);
	}

	public Add(key: T1, value: T2) {
		return this.set(key, value);
	}
}
