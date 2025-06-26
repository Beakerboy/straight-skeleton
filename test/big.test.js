/* eslint-disable */
import SkeletonBuilder from '../src/lib/SkeletonBuilder';
import Vector2d from '../src/lib/Primitives/Vector2d'
import { List } from '../src/lib/Utils'
import SkeletonTestUtil from './skeleton-test-util.js'

const points = [
  [ - 26.544995859742947, - 13.287698137967746 ],
  [ 9.913632585162611, - 3.7917336660976004 ],
  [ 20.559427587754445, - 1.0229359802622613 ],
  [ 29.651770143672465, 1.3455778947287382 ],
  [ 26.53923658090192, 13.287889287788659 ],
  [ - 29.651791704140486, - 1.334219836371914 ],
  [ - 26.951441512330682, - 11.708727230072542 ]
 ];

test('GeoJSON', () => {
  const polygon = [ points ];
  const multipolygon = [ polygon ];
  const result = SkeletonBuilder.BuildFromGeoJSON( multipolygon );
});

/** OR */

test('GeoJSON', () => {
  const vecList = new List();
  points.forEach( ( point ) => vecList.Add( new Vector2d( ...point ) ) );
  const result = SkeletonBuilder.Build( vecList );
});
