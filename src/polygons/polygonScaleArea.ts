import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { ImmutablePoint, ImmutablePolygon, Polygon } from '../types.js';
import { polygonCentroid } from "./polygonCentroid.js";

// Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
// The returned polygon's area is equal to the input polygon's area multiplied by the scaleFactor.
// The origin defaults to the polygon's centroid.
export function polygonScaleArea(polygon: ImmutablePolygon, scale: number, origin?: ImmutablePoint): Polygon {
  if (!origin)
    origin = polygonCentroid(polygon);

  return polygon.map(v => {
    const d = lineLength([origin, v]);
    const a = lineAngle([origin, v]);

    return pointTranslate(origin, a, d * Math.sqrt(scale));
  });
}