import {SkeletonBuilder} from 'straight-skeleton';

const skeleton = SkeletonBuilder.BuildFromGeoJSON([[
  [[0, 0], [100, 0], [100, 50], [0, 50]],    // outer
  [[50, 30], [70, 30], [70, 20], [50, 20]],  // inner
]]);
