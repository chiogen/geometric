import { ImmutablePolygon, Line } from '../types.js';

/** Calculates the bounds of a polygon. */
export function polygonBounds(polygon: ImmutablePolygon): Line | null {
  if (polygon.length < 3) {
    return null;
  }

  let xMin = Infinity,
    xMax = -Infinity,
    yMin = Infinity,
    yMax = -Infinity,
    found = false;

  for (const [x, y] of polygon) {
    if (x != null && isFinite(x) && y != null && isFinite(y)) {
      found = true;
      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
  }

  return found
    ? [[xMin, yMin], [xMax, yMax]]
    : null;
}