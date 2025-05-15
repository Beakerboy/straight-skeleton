/**
 * insert the specified item at the specified position in
 * provided array.
 * @param {Array} array The array
 * @param {number} index Position
 * @param {any} item The item
 * @returns {Array} The new array
 */
function insertInArray (array, index, item) {
  const items = Array.prototype.slice.call(arguments, 2)

  return [].concat(array.slice(0, index), items, array.slice(index))
}

export class List {
  arr
  constructor () {
    this.arr = []
  }

  add (item) {
    this.arr.push(item)
  }

  insert (index, item) {
    const newArr = insertInArray(this.arr, index, item)

    this.arr.length = newArr.length

    for (let i = 0; i < newArr.length; i++) {
      this.arr[i] = newArr[i]
    }
  }

  reverse () {
    this.arr.reverse()
  }

  clear () {
    this.arr.length = 0
  }

  count () {
    return this.arr.length
  }

  /**
   * return true if any elements in the array match the filter
   * @param {Function} filter arrow function
   * @returns {boolean} result
   */
  any (filter) {
    if (!filter) {
      filter = () => true
    }

    for (const item of this.arr) {
      if (filter(item)) {
        return true
      }
    }

    return false
  }

  removeAt (index) {
    this.arr.splice(index, 1)
  }

  remove (itemToRemove) {
    const newArr = this.arr.filter(item => item !== itemToRemove)

    this.arr.length = newArr.length

    for (let i = 0; i < newArr.length; i++) {
      this.arr[i] = newArr[i]
    }
  }

  addRange (list) {
    for (const item of list) {
      this.Add(item)
    }
  }

  sort (comparer) {
    this.arr.sort(comparer.Compare.bind(comparer))
  }
}

export class hashSet {
  set = null

  constructor () {
    this.set = new Set()
  }

  add (item) {
    this.set.add(item)
  }

  remove (item) {
    this.set.delete(item)
  }

  removeWhere (filter) {
    for (const item of this.Set.values()) {
      if (filter(item)) {
        this.Set.delete(item)
      }
    }
  }

  contains (item) {
    return this.set.has(item)
  }

  clear () {
    this.set.clear()
  }

  * [Symbol.iterator] () {
    for (const item of this.Set.values()) {
      yield item
    }
  }
}

export class Dictionary {
  ContainsKey (key) {
    return this.has(key)
  }

  Add (key, value) {
    return this.set(key, value)
  }
}
