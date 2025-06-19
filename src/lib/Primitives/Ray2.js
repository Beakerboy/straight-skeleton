import {Vector2, Ray} from "three";
import LineLinear2d from "./LineLinear2d";
import PrimitiveUtils from "./PrimitiveUtils";

export default class Ray2 extends Ray {
	 static Empty = new Ray2(new Vector2(null, null), new Vector2(null, null));

	 CreateLinearForm() {
		const x = this.origin.x;
		const y = this.origin.y;

		const B = -this.direction.x;
		const A = this.direction.y;

		const C = -(A * x + B * y);

		return new LineLinear2d().SetFromCoefficients(A, B, C);
	}

	 static Collide(ray, line, epsilon) {
		const collide = ray.CreateLinearForm().Collide(line);
		if (collide.equals(PrimitiveUtils.EmptyVector)) {
			return PrimitiveUtils.EmptyVector;
		}

		const collideVector = collide.clone().sub(ray.origin);
		return ray.direction.dot(collideVector) < epsilon ? PrimitiveUtils.EmptyVector : collide;
	}

	 IsOnLeftSite(point, epsilon) {
		const direction = point.clone().sub(this.origin);
		return PrimitiveUtils.OrthogonalRight(this.direction).dot(direction) < epsilon;
	}

	 IsOnRightSite(point, epsilon) {
		const direction = point.clone().sub(this.origin);
		return PrimitiveUtils.OrthogonalRight(this.direction).dot(direction) > -epsilon;
	}
}
