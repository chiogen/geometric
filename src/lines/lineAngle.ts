import { angleToDegrees } from "../angles/angleToDegrees.js";
import { ImmutableLine } from '../types.js';

// Calculates the angle of a line, in degrees.
export function lineAngle(line: ImmutableLine): number {
  return angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
}