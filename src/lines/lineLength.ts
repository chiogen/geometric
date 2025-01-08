import { ImmutableLine } from '../types.js';

// Calculates the distance between the endpoints of a line segment.
export function lineLength(line: ImmutableLine): number {
  const x = line[1][0] - line[0][0],
    y = line[1][1] - line[0][1];
  return Math.sqrt(x * x + y * y);
}