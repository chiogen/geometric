import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { ImmutablePoint, ImmutablePolygon, Point, Polygon } from '../types.js';
import { polygonCentroid } from "./polygonCentroid.js";

/**
 * Scales a polygon's y-coordinates by a scale factor (where 1 is the original size) from an origin point.
 * @param origin The origin defaults to the polygon's centroid.
 */
export function polygonScaleY(polygon: ImmutablePolygon, scale: number, origin?: ImmutablePoint): Polygon {
  if (!origin)
    origin = polygonCentroid(polygon);

  return polygon.map((v): Point => {
    const d = lineLength([origin, v]);
    const a = lineAngle([origin, v]);
    const t = pointTranslate(origin, a, d * scale);

    return [v[0], t[1]];
  });
}