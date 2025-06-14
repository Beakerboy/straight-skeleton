export class List extends Array {

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
