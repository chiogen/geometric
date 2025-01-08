import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { ImmutablePolygon } from '../types.js';
import { lineIntersectsPolygon } from "./lineIntersectsPolygon.js";
import { pointOnPolygon } from "./pointOnPolygon.js";

// Determines whether a polygon intersects but is not contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
export function polygonIntersectsPolygon(polygonA: ImmutablePolygon, polygonB: ImmutablePolygon): boolean {
  let onCount = 0;

  for (const [v0, v1] of iteratePolygonSegments(polygonA, true)) {

    if (lineIntersectsPolygon([v0, v1], polygonB))
      return true;

    if (pointOnPolygon(v0, polygonB))
      ++onCount;

    if (onCount === 2)
      return true;
  }

  return false;
}