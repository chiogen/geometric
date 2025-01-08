import { iterateReverse } from '../iterators/iterateReverse.js';
import { pointClone } from '../points/pointClone.js';
import { ImmutablePolygon, Polygon } from '../types.js';
import { cross } from "../utils/crossProduct.js";

/**
 * Calculates the convex hull of a set of points.
 * 
 * See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
 */
export function polygonHull(points: ImmutablePolygon): Polygon | null {
  if (points.length < 3)
    return null;

  const pointsCopy = points.slice().sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  let lower: Polygon = [];
  for (const point of pointsCopy) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0)
      lower.pop();
    lower.push(pointClone(point));
  }

  let upper: Polygon = [];
  for (const point of iterateReverse(pointsCopy)) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
      upper.pop();
    }
    upper.push(pointClone(point));
  }

  upper.pop();
  lower.pop();

  return [...lower, ...upper];
}