function insertInArray(array, index, item) {
	const items = Array.prototype.slice.call(arguments, 2);

	return [].concat(array.slice(0, index), items, array.slice(index));
}

export class List extends Array {
	constructor(capacity = null) {
		if (capacity !== null) {
			//throw new Error("cannot specify capacity: " + capacity)
		}
		super();
	}
	
	Insert(index, item) {
		const newArr = insertInArray(this, index, item);

		this.length = newArr.length;

		for(let i = 0; i < newArr.length; i++) {
			this[i] = newArr[i];
		}
	}

	Any(filter = null) {
		if (!filter) {
			filter = T => true;
		}

		for (const item of this) {
			if (filter(item)) {
				return true;
			}
		}

		return false;
	}

	Remove(itemToRemove) {
		const newArr = this.filter(item => item !== itemToRemove);

		this.length = newArr.length;

		for(let i = 0; i < newArr.length; i++) {
			this[i] = newArr[i];
		}
	}

	Sort(comparer) {
		this.sort(comparer.Compare.bind(comparer));
	}
}

export class HashSet {
	Set;

	constructor() {
		this.Set = new Set();
	}

	Add(item) {
		this.Set.add(item);
	}

	Remove(item) {
		this.Set.delete(item);
	}

	RemoveWhere(filter) {
		for (const item of this.Set.values()) {
			if (filter(item)) {
				this.Set.delete(item);
			}
		}
	}

	Contains(item) {
		return this.Set.has(item);
	}

	Clear() {
		this.Set.clear();
	}

	* [Symbol.iterator]() {
		for (const item of this.Set.values()) {
			yield item;
		}
	}
}

export class Dictionary extends Map {
	ContainsKey(key) {
		return this.has(key);
	}

	Add(key, value) {
		return this.set(key, value);
	}
}
