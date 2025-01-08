import { pointTranslate } from "../points/pointTranslate.js";
import { ImmutableLine, Line } from '../types.js';

/** Returns the coordinates resulting from translating a line by an angle in degrees and a distance. */
export function lineTranslate(line: ImmutableLine, angle: number, distance: number): Line {
  return [
    pointTranslate(line[0], angle, distance),
    pointTranslate(line[1], angle, distance)
  ];
}