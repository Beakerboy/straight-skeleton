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

export class HashSet extends Set {

	RemoveWhere(filter) {
		for (const item of this) {
			if (filter(item)) {
				this.delete(item);
			}
		}
	}
}
