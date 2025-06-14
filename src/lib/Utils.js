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

export class HashSet extemds Set {

	Add(item) {
		this.add(item);
	}

	Remove(item) {
		this.delete(item);
	}

	RemoveWhere(filter) {
		for (const item of this.values()) {
			if (filter(item)) {
				this.delete(item);
			}
		}
	}

	Contains(item) {
		return this.has(item);
	}

	Clear() {
		this.clear();
	}

	* [Symbol.iterator]() {
		for (const item of this.values()) {
			yield item;
		}
	}
}
