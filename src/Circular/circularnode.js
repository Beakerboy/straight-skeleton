class CircularNode {
  list
  next = new CircularNode();
  previous = new CircularNode();

  addNext(node) {
    this.list.addNext(node);
  }

  addPrevious(node) {
    this.list.addPrevious(node);
  }

  remove() {
    this.list.remove(this);
  }
}
export {CircularNode};
