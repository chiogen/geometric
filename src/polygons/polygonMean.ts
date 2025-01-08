import { ImmutablePolygon, Point } from '../types.js';

/** Calculates the arithmetic mean of a polygon's vertices. */
export function polygonMean(vertices: ImmutablePolygon): Point {
  let x = 0,
    y = 0;

  for (const v of vertices) {
    x += v[0];
    y += v[1];
  }

  return [x / vertices.length, y / vertices.length];
}