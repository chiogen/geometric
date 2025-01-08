import { ImmutablePolygon, Polygon } from '../types.js';
import { polygonArea } from "./polygonArea.js";
import { polygonClone } from './polygonClone.js';

// Returns a polygon in the specified winding order.
// If order is passed as a strings of "cw" or "clockwise", returns a polygon with a clockwise winding order.
// Otherwise, returns a polygon with a counter-clockwise winding order.
// Always returns a copy.
export function polygonWind(polygon: ImmutablePolygon, order: 'cw' | 'clockwise' | 'ccw' | 'counterclockwise' = 'ccw'): Polygon {

  const isClockwise = polygonArea(polygon, true) > 0;
  const copy = polygonClone(polygon)

  if (order === "cw" || order === "clockwise") {
    return isClockwise
      ? copy
      : copy.reverse();
  }
  else {
    return isClockwise
      ? copy.reverse()
      : copy;
  }
}