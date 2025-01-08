import { lineLength } from "../lines/lineLength.js";
import { ImmutableLine, ImmutablePoint } from '../types.js';
import { cross } from "../utils/crossProduct.js";

// See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
function topPointFirst(line: ImmutableLine): ImmutableLine {
  return line[1][1] > line[0][1]
    ? line
    : [line[1], line[0]];
}

export function pointLeftofLine(point: ImmutablePoint, line: ImmutableLine): boolean {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) < 0;
}
export function pointRightofLine(point: ImmutablePoint, line: ImmutableLine): boolean {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) > 0;
}
export function pointOnLine(point: ImmutablePoint, line: ImmutableLine, epsilon = 0): boolean {
  const l = lineLength(line);
  return pointWithLine(point, line, epsilon) && lineLength([line[0], point]) <= l && lineLength([line[1], point]) <= l;
}
export function pointWithLine(point: ImmutablePoint, line: ImmutableLine, epsilon = 0): boolean {
  return Math.abs(cross(point, line[0], line[1])) <= epsilon;
}