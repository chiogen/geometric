import { ImmutableLine, Point } from '../types.js';
import { clamp as _clamp } from '../math/clamp.js'

// Returns an interpolator function given a line [a, b].
// The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
// a value of 0 returns a, while a value of 1 returns b.
// Intermediate values interpolate from start to end along the line segment.
// By default, the returned interpolator will output points outside of the line segment if t is less than 0 or greater than 1.
// You can pass an optional boolean indicating whether to the returned point to inside of the line segment,
// even if t is greater than 1 or less then 0.
export function lineInterpolate(line: ImmutableLine, clamp = false) {
  const [[x1, y1], [x2, y2]] = line;
  const x = (v: number) => (x2 - x1) * v + x1;
  const y = (v: number) => (y2 - y1) * v + y1;
  return (t: number): Point => {
    const t0 = _clamp(t, 0, 1);
    return [x(t0), y(t0)];
  }
}