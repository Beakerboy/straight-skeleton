import {SkeletonBuilder} from '../src/straight-skeleton';
import {List} from '../src/utils.js';
import Vector2d from '../src/Primatives/vector2d.js';
import SkeletonTestUtil from ./skeletontestutil.js';

test('Circular Add Test', () => {

  const polygon = new List();
  polygon.add(new Vector2d(50, 50));
  polygon.add(new Vector2d(100, 50));
  polygon.add(new Vector2d(100, 100));
  polygon.add(new Vector2d(50, 100));

  const expected = new List();
  expected.add(new Vector2d(75.000000, 75.000000));
  expected.addRange(polygon);

  const sk = SkeletonBuilder.build(polygon);

  SkeletonTestUtil.AssertExpectedPoints(expected, SkeletonTestUtil.GetFacePoints(sk));
});
