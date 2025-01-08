import { pointTranslate } from "../points/pointTranslate.js";
import { ImmutablePolygon, Polygon } from '../types.js';

/** Translates a polygon by an angle in degrees and distance. */
export function polygonTranslate(polygon: ImmutablePolygon, angle: number, distance: number): Polygon {
  return polygon.map(point =>
    pointTranslate(point, angle, distance)
  );
}