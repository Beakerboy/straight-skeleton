export class ChainType {
  static EDGE = new ChainType('edge')
  static CLOSED_EDGE = new ChainType('closed_edge')
  static SPLIT = new ChainType('split')

  constructor (value) {
    this.value = value
  }

  toString () {
    return this.value
  }
}
