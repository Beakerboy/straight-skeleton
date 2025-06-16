import {Vector2} from "three";
import PrimitiveUtils from "./PrimitiveUtils";

export default class LineLinear2d {
	 A;
	 B;
	 C;

	constructor(pP1 = PrimitiveUtils.EmptyVector, pP2 = PrimitiveUtils.EmptyVector) {
		this.A = pP1.y - pP2.y;
		this.B = pP2.x - pP1.x;
		this.C = pP1.x * pP2.y - pP2.x * pP1.y;
	}

	 SetFromCoefficients(a, b, c) {
		this.A = a;
		this.B = b;
		this.C = c;

		return this;
	}

	 Collide(pLine) {
		return LineLinear2d.CollideCoeff(this.A, this.B, this.C, pLine.A, pLine.B, pLine.C);
	}

	static CollideCoeff(A1, B1, C1, A2, B2, C2) {
		const WAB = A1 * B2 - A2 * B1;
		const WBC = B1 * C2 - B2 * C1;
		const WCA = C1 * A2 - C2 * A1;

		return WAB === 0 ? PrimitiveUtils.EmptyVector : new Vector2(WBC / WAB, WCA / WAB);
	}

	 Contains(point) {
		return Math.abs((point.x * this.A + point.y * this.B + this.C)) < Number.EPSILON;
	}
}
