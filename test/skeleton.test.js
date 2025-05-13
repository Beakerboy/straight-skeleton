import {SkeletonBuilder} from '../src/straight-skeleton';
import {List} from '../src/utils.js';
import Vector2d from '../src/Primatives/vector2d.js';

test('Circular Add Test', () => {

  const polygon = new List([
    new Vector2d(50, 50),
    new Vector2d(100, 50),
    new Vector2d(100, 100),
    new Vector2d(50, 100),
  ]);

  var expected = new List([new Vector2d(75.000000, 75.000000)]);
  expected.AddRange(polygon);

  var sk = SkeletonBuilder.Build(polygon);

  SkeletonTestUtil.AssertExpectedPoints(expected, SkeletonTestUtil.GetFacePoints(sk));
});
