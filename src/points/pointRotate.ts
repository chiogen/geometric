import { angleToRadians } from "../angles/angleToRadians";
import { ImmutablePoint, Point } from '../types.js';
import { pointAdd } from './pointAdd.js';
import { pointEqualsZero } from './pointEquals.js';
import { pointSubtract } from './pointSubtract.js';

/** Rotates a point by an angle in degrees around an origin. */
export function pointRotate(point: ImmutablePoint, angle: number, origin?: ImmutablePoint): Point {
  const radians = angleToRadians(angle || 0);

  if (!origin || pointEqualsZero(origin)) {
    return rotate(point, radians);
  } else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    const p0 = pointSubtract(point, origin);
    const rotated = rotate(p0, radians);
    return pointAdd(rotated, origin);
  }
}

function rotate(point: ImmutablePoint, radians: number): Point {
  // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
  return [
    (point[0] * Math.cos(radians)) - point[1] * Math.sin(radians),
    (point[0] * Math.sin(radians)) + point[1] * Math.cos(radians)
  ];
}