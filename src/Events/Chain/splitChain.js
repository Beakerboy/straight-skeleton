import Edge from '../../Circular/Edge';
import Vertex from '../../Circular/Vertex';
import ChainType from './ChainType';
import VertexSplitEvent from '../VertexSplitEvent';
import SplitEvent from '../SplitEvent';

class SplitChain {
  //splitevent
  splitEvent;

  //@param splitEvent
  constructor(event) {
    this.splitEvent = event;
  }

	OppositeEdge() {
		if (!(this.splitEvent instanceof VertexSplitEvent))
			return this.splitEvent.OppositeEdge;

		return null;
	}

	PreviousEdge() {
		return this.splitEvent.Parent.PreviousEdge;
	}

	NextEdge() {
		return this.splitEvent.Parent.NextEdge;
	}

	PreviousVertex() {
		return this.splitEvent.Parent.Previous;
	}

	NextVertex() {
		return this.splitEvent.Parent.Next;
	}

	CurrentVertex() {
		return this.splitEvent.Parent;
	}

	ChainType() {
		return ChainType.Split;
	}
}
