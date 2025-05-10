import {ICircularList} from './CircularList';

class CircularNode {
  list = new ICircularList();
  next = new CircularNode();
  previous = new CircularNode();

  addNext(node) {
    this.list.addNext(this, node);
  }

  addPrevious(node) {
    this.list.addPrevious(this, node);
  }

  remove() {
    this.list.remove(this);
  }
}
