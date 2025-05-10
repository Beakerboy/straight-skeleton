import Edge from '../../Circular/Edge';
import Vertex from '../../Circular/Vertex';
import ChainType from './ChainType';
import VertexSplitEvent from '../VertexSplitEvent';
import SplitEvent from '../SplitEvent';

class SplitChain {
  //splitevent
  splitEvent;

  constructor(event: SplitEvent) {
    this.splitEvent = event;
  }

	OppositeEdge() {
		if (!(this._splitEvent instanceof VertexSplitEvent))
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
		return this.splitEvent.Parent.Previous as Vertex;
	}

	NextVertex() {
		return this.splitEvent.Parent.Next as Vertex;
	}

	CurrentVertex() {
		return this.splitEvent.Parent;
	}

	ChainType() {
		return ChainType.Split;
	}
}
