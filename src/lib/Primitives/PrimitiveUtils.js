import {Vector2} from "three";

class IntersectPoints {
	Intersect = null;
	IntersectEnd = null;

	constructor(intersect = null, intersectEnd = null) {
		if (!intersect) {
			intersect = new Vector2(null, null);
		}

		if (!intersectEnd) {
			intersectEnd = new Vector2(null, null);
		}

		this.Intersect = intersect;
		this.IntersectEnd = intersectEnd;
	}
}


export default class PrimitiveUtils {
	static EmptyVector = new Vector2(null, null);
	static FromTo(begin, end) {
		return end.clone().sub(begin);
	}

	static OrthogonalLeft(v) {
		return v.clone().setX(-v.y).setY(v.x);
	}

	static OrthogonalRight(v) {
		return new Vector2(v.y, -v.x);
	}

	static OrthogonalProjection(unitVector, vectorToProject) {
		const n = unitVector.clone().normalize();

		const px = vectorToProject.x;
		const py = vectorToProject.y;

		const ax = n.x;
		const ay = n.y;

		return new Vector2(px * ax * ax + py * ax * ay, px * ax * ay + py * ay * ay);
	}

	static BisectorNormalized(norm1, norm2) {
		const e1v = PrimitiveUtils.OrthogonalLeft(norm1);
		const e2v = PrimitiveUtils.OrthogonalLeft(norm2);

		if (norm1.dot(norm2) > 0)
			return e1v.add(e2v);

		let ret = norm1.clone();
		ret.negate();
		ret.add(norm2);

		if (e1v.dot(norm2) < 0)
			ret.negate();

		return ret;
	}

	static SmallNum = 0.00000001;

	static Empty = new IntersectPoints();

	static IsPointOnRay(point, ray, epsilon) {
		const rayDirection = ray.direction.clone().normalize();

		const pointVector = point.clone().sub(ray.origin);

		let dot = rayDirection.dot(pointVector);

		if (dot < epsilon)
			return false;

		const x = rayDirection.x;
		rayDirection.x = rayDirection.y;
		rayDirection.y = -x;

		dot = rayDirection.dot(pointVector);

		return -epsilon < dot && dot < epsilon;
	}

	static IntersectRays2D(r1, r2) {
		const s1p0 = r1.origin.clone();
		const s1p1 = r1.origin.clone().add(r1.direction);

		const s2p0 = r2.origin;

		const u = r1.direction;
		const v = r2.direction;

		const w = s1p0.clone().sub(s2p0);
		const d = PrimitiveUtils.Perp(u, v);

		if (Math.abs(d) < PrimitiveUtils.SmallNum) {
			if (PrimitiveUtils.Perp(u, w) !== 0 || PrimitiveUtils.Perp(v, w) !== 0)
				return PrimitiveUtils.Empty;

			const du = u.dot(u);
			const dv = v.dot(v);

			if (du === 0 && dv === 0) {
				if (!s1p0.equals(s2p0))
					return PrimitiveUtils.Empty;

				return new IntersectPoints(s1p0);
			}
			if (du === 0) {
				if (!PrimitiveUtils.InCollinearRay(s1p0, s2p0, v))
					return PrimitiveUtils.Empty;

				return new IntersectPoints(s1p0);
			}
			if (dv === 0) {
				if (!PrimitiveUtils.InCollinearRay(s2p0, s1p0, u))
					return PrimitiveUtils.Empty;

				return new IntersectPoints(s2p0);
			}

			let t0, t1;
			var w2 = s1p1.clone().sub(s2p0);
			if (v.X !== 0) {
				t0 = w.x / v.x;
				t1 = w2.x / v.x;
			} else {
				t0 = w.y / v.y;
				t1 = w2.y / v.y;
			}
			if (t0 > t1) {
				const t = t0;
				t0 = t1;
				t1 = t;
			}
			if (t1 < 0)
				return PrimitiveUtils.Empty;

			t0 = t0 < 0 ? 0 : t0;

			if (t0 === t1) {
				let I0 = v.clone().multiplyScalar(t0).add(s2p0);
				return new IntersectPoints(I0);
			}

			let I_0 = v.clone().multiplyScalar(t0).add(s2p0);

			let I1 = v.clone().multiplyScalar(t1).add(s2p0);
	
			return new IntersectPoints(I_0, I1);
		}

		const sI = PrimitiveUtils.Perp(v, w) / d;
		if (sI < 0 /* || sI > 1 */)
			return PrimitiveUtils.Empty;

		const tI = PrimitiveUtils.Perp(u, w) / d;
		if (tI < 0 /* || tI > 1 */)
			return PrimitiveUtils.Empty;

		let IO = u.clone().multiplyScalar(sI).add(s1p0);
	
		return new IntersectPoints(IO);
	}

	static InCollinearRay(p, rayStart, rayDirection) {
		const collideVector = p.clone().sub(rayStart);
		const dot = rayDirection.dot(collideVector);

		return !(dot < 0);
	}

	static Perp(u, v) {
		return u.x * v.y - u.y * v.x;
	}

	static IsClockwisePolygon(polygon) {
		return PrimitiveUtils.Area(polygon) < 0;
	}

	static Area(polygon) {
		const n = polygon.length;
		let A = 0;
		for (let p = n - 1, q = 0; q < n; p = q++)
			A += polygon[p].x * polygon[q].y - polygon[q].x * polygon[p].y;

		return A * 0.5;
	}

	static MakeCounterClockwise(polygon) {
		if (PrimitiveUtils.IsClockwisePolygon(polygon))
			polygon.reverse();

		return polygon;
	}

	static IsPointInsidePolygon(point, points) {
		const numpoints = points.Count;

		if (numpoints < 3)
			return false;

		let oddNodes = false;

		for (let i = 0; i < numpoints; i++) {
			const node1 = points[i];
			const node2 = points[(i + 1) % numpoints];

			const x = point.x;
			const y = point.y;

			if (node1.y < y && node2.y >= y || node2.y < y && node1.y >= y) {
				if (node1.x + (y - node1.y) / (node2.y - node1.y) * (node2.x - node1.x) < x)
					oddNodes = !oddNodes;
			}
		}

		return oddNodes;
	}

	static CreateLineFromRay(ray) {
		const x = ray.origin.x;
		const y = ray.origin.y;

		const B = -ray.direction.x;
		const A = ray.direction.y;

		const C = -(A * x + B * y);

		return new LineLinear2d().SetFromCoefficients(A, B, C);
	}
}
