import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { ImmutablePolygon } from '../types.js';
import { lineIntersectsPolygon } from "./lineIntersectsPolygon.js";
import { pointInPolygon } from "./pointInPolygon.js";

// Determines whether a polygon is contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
export function polygonInPolygon(polygonA: ImmutablePolygon, polygonB: ImmutablePolygon): boolean {

  for (const segment of iteratePolygonSegments(polygonA)) {

    // Points test  
    if (!pointInPolygon(segment[0], polygonB)) {
      return false;
    }

    // Lines test
    if (lineIntersectsPolygon(segment, polygonB)) {
      return false;
    }

  }

  return true;
}