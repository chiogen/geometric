import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { ImmutablePolygon, Point } from '../types.js';

/** Calculates the weighted centroid a polygon. */
export function polygonCentroid(vertices: ImmutablePolygon): Point {
  let a = 0;
  let x = 0;
  let y = 0;

  for (const [v0, v1] of iteratePolygonSegments(vertices, true)) {
    const f = (v0[0] * v1[1]) - (v1[0] * v0[1]);

    a += f;
    x += (v0[0] + v1[0]) * f;
    y += (v0[1] + v1[1]) * f;
  }

  const d = a * 3;

  return [x / d, y / d];
}