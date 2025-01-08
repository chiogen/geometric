import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { ImmutablePolygon } from '../types.js';

/** Calculates the area of a polygon. */
export function polygonArea(vertices: ImmutablePolygon, signed = false): number {
  let a = 0;

  for (const [v0, v1] of iteratePolygonSegments(vertices, true)) {
    a += v0[0] * v1[1];
    a -= v1[0] * v0[1];
  }

  return signed ? a / 2 : Math.abs(a / 2);
}