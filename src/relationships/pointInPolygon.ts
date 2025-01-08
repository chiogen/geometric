import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';
import { ImmutablePoint, ImmutablePolygon } from '../types.js';

// Determines whether a point is inside of a polygon, represented as an array of vertices.
// From https://github.com/substack/point-in-polygon/blob/master/index.js,
// based on the ray-casting algorithm from https://web.archive.org/web/20180115151705/https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
// Wikipedia: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm

export function pointInPolygon(point: ImmutablePoint, polygon: ImmutablePolygon): boolean {
  const [px, py] = point;
  let inside = false;

  // s1x = segment 1 x
  // s1y = segment 1 y
  // s2x = segment 2 x
  // s2y = segment 2 y
  for (const [[s1x, s1y], [s2x, s2y]] of iteratePolygonSegments(polygon, true)) {
    if (((s1y > py) != (s2y > py)) && (px < (s2x - s1x) * (py - s1y) / (s2y - s1y) + s1x))
      inside = !inside;
  }

  return inside;
}