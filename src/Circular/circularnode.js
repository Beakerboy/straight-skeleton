class CircularNode {
  list;
  next;
  previous;

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
