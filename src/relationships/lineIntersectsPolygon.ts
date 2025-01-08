import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { ImmutableLine, ImmutablePolygon } from '../types.js';
import { lineIntersectsLine } from "./lineIntersectsLine.js";
import { pointOnLine } from "./pointOnLine.js";

export function lineIntersectsPolygon(line: ImmutableLine, polygon: ImmutablePolygon): boolean {

  for (const [v0, v1] of iteratePolygonSegments(polygon, true)) {
    if (lineIntersectsLine(line, [v0, v1]) || (pointOnLine(v0, line) && pointOnLine(v1, line))) {
      return true;
    }
  }

  return false;
}