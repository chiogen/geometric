import { lineMidpoint } from "./lineMidpoint.js";
import { pointRotate } from "../points/pointRotate.js";
import { ImmutableLine, ImmutablePoint, Line } from '../types.js';

/**
 * Returns the coordinates resulting from rotating a line about an origin by an angle in degrees.
 * If origin is not specified, the origin defaults to the midpoint of the line.
 */
export function lineRotate(line: ImmutableLine, angle: number, origin?: ImmutablePoint): Line {
  if (!origin)
    origin = lineMidpoint(line);

  return [
    pointRotate(line[0], angle, origin),
    pointRotate(line[1], angle, origin),
  ];
}