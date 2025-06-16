import {Vector2} from "three";
import LineLinear2d from "./LineLinear2d";
import PrimitiveUtils from "./PrimitiveUtils";

export default class LineParametric2d {
	 static Empty = new LineParametric2d(new Vector2(null, null), new Vector2(null, null));

	 A = null;
	 U = null;

	constructor(pA, pU) {
		this.A = pA;
		this.U = pU;
	}

	 CreateLinearForm() {
		const x = this.A.x;
		const y = this.A.y;

		const B = -this.U.x;
		const A = this.U.y;

		const C = -(A * x + B * y);

		return new LineLinear2d().SetFromCoefficients(A, B, C);
	}

	 static Collide(ray, line, epsilon) {
		const collide = LineLinear2d.Collide(ray.CreateLinearForm(), line);
		if (collide.equals(PrimitiveUtils.EmptyVector)) {
			return PrimitiveUtils.EmptyVector;
		}

		const collideVector = collide.clone().sub(ray.A);
		return ray.U.dot(collideVector) < epsilon ? PrimitiveUtils.EmptyVector : collide;
	}

	 IsOnLeftSite(point, epsilon) {
		const direction = point.clone().sub(this.A);
		return PrimitiveUtils.OrthogonalRight(this.U).dot(direction) < epsilon;
	}

	 IsOnRightSite(point, epsilon) {
		const direction = point.clone().sub(this.A);
		return PrimitiveUtils.OrthogonalRight(this.U).dot(direction) > -epsilon;
	}
}
