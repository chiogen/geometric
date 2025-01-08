import { pointRotate } from "../points/pointRotate.js";
import { ImmutablePoint, ImmutablePolygon, Polygon } from '../types.js';

/** Rotates a polygon by an angle in degrees around an origin. */
export function polygonRotate(polygon: ImmutablePolygon, angle: number, origin?: ImmutablePoint): Polygon {
  return polygon.map(point =>
    pointRotate(point, angle, origin)
  );
}