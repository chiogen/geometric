import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { ImmutablePoint, ImmutablePolygon } from '../types.js';
import { pointOnLine } from "./pointOnLine.js";

/** Determines whether a point is located on one of the edges of a polygon. */
export function pointOnPolygon(point: ImmutablePoint, polygon: ImmutablePolygon, epsilon = 0): boolean {

  for (const segment of iteratePolygonSegments(polygon, true)) {
    if (pointOnLine(point, segment, epsilon)) {
      return true;
    }
  }

  return false;
}