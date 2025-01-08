import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { ImmutableLine, ImmutablePoint, Point, Polygon } from '../types.js';
import { polygonTranslate } from "./polygonTranslate.js";

/** Returns the vertices of a regular polygon of the specified number of sides, area, and center coordinates. */
export function polygonRegular(sides = 3, area = 100, center: ImmutablePoint): Polygon {
  let polygon: Polygon = [],
    point: Point = [0, 0],
    sum: Point = [0, 0],
    angle = 0;

  for (let i = 0; i < sides; i++) {
    polygon[i] = point;
    sum[0] += point[0];
    sum[1] += point[1];
    // See: https://web.archive.org/web/20180404142713/http://keisan.casio.com/exec/system/1355985985
    point = pointTranslate(point, angle, Math.sqrt((4 * area) * Math.tan(Math.PI / sides) / sides));
    angle -= 360 / sides;
  }

  if (center) {
    const line: ImmutableLine = [[sum[0] / sides, sum[1] / sides], center]
    polygon = polygonTranslate(polygon, lineAngle(line), lineLength(line));
  }

  return polygon;
}