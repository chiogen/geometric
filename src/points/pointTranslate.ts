import { angleToRadians } from "../angles/angleToRadians";
import { ImmutablePoint, Point } from '../types.js';

/** Translates a point by an angle in degrees and distance */
export function pointTranslate(point: ImmutablePoint, angle = 0, distance = 0): Point {
  const r = angleToRadians(angle);
  return [
    point[0] + distance * Math.cos(r),
    point[1] + distance * Math.sin(r)
  ];
}