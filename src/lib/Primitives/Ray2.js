import {Vector2} from "three";
import LineLinear2d from "./LineLinear2d";
import PrimitiveUtils from "./PrimitiveUtils";

export default class Ray2 {
	 static Empty = new Ray2(new Vector2(null, null), new Vector2(null, null));

	 static Collide(ray, line, epsilon) {
		const collide = PrimitiveUtils.CreateLineFromRay(ray).Collide(line);
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
