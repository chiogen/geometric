import { pointClone } from '../points/pointClone.js';
import { pointEquals } from '../points/pointEquals.js';
import { ImmutablePolygon, Polygon } from '../types.js';

/** Closes a polygon if it's not closed already. Always returns a copy of the input polygon. Does not modify input polygon. */
export function close(polygon: ImmutablePolygon): Polygon {
  return isClosed(polygon)
    ? polygon.map(pointClone)
    : [
      ...polygon.map(pointClone),
      pointClone(polygon[0])
    ];
}

/** Tests whether a polygon is closed */
export function isClosed(polygon: ImmutablePolygon) {
  return pointEquals(polygon[0], polygon[polygon.length - 1]);
}