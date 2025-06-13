class ChainType {
	static Edge = new ChainType('edge');
	static ClosedEdge = new ChainType('closededge');
	static Split = new ChainType('split');

	constructor(name) {
		this.name = name;
	}
}

export default ChainType;
