import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { lineLength } from '../lines/lineLength.js';
import { ImmutablePolygon } from '../types.js';

/** Calculates the length of a polygon's perimeter. */
export function polygonLength(vertices: ImmutablePolygon, close = false): number {
  if (vertices.length === 0)
    return 0;

  let perimeter = 0;

  for (const segment of iteratePolygonSegments(vertices, close))
    perimeter += lineLength(segment);

  return perimeter;
}