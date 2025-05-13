function insertInArray(array, index, item) {
	const items = Array.prototype.slice.call(arguments, 2);

	return [].concat(array.slice(0, index), items, array.slice(index));
}

export class List {
  arr;
	constructor(capacity = 0) {
		this.arr = [];
	}

	Add(item) {
		this.arr.push(item);
	}

	Insert(index, item) {
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

	Count() {
		return this.arr.length;
	}

  /**
   * return true if any elements in the array match the filter
   *
   * @param {item => boolean} filter
   * @return {boolean}
   */
  Any(filter) {
    if (!filter) {
        filter = () => true;
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

	Remove(itemToRemove) {
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

  *[Symbol.iterator]() {
    for (const item of this.Set.values()) {
        yield item;
    }
  }

}

export class Dictionary {
	ContainsKey(key) {
		return this.has(key);
	}

	Add(key, value) {
		return this.set(key, value);
	}
}
