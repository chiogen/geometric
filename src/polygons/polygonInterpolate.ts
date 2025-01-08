import { close, isClosed } from "../utils/closePolygon.js";
import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { polygonLength } from "./polygonLength.js";
import { ImmutablePolygon, Point } from '../types.js';
import { pointClone } from '../points/pointClone.js';
import { iteratePolygonSegments } from '../iterators/iteratePolygonSegments.js';

export function polygonInterpolate(polygon: ImmutablePolygon) {
  return (t: number): Point => {
    if (t <= 0)
      return pointClone(polygon[0]);

    const effectiveListLength = isClosed(polygon)
      ? polygon.length
      : polygon.length + 1;

    if (t >= 1)
      return pointClone(polygon[0]);

    const target = polygonLength(polygon, true) * t;
    let point: Point = [0, 0];
    let track = 0;

    for (const side of iteratePolygonSegments(polygon, true)) {

      const length = lineLength(side);
      const angle = lineAngle(side);
      const delta = target - (track += length);

      if (delta < 0)
        return pointTranslate(side[0], angle, length + delta);

      point = pointTranslate(side[0], angle, delta);
    }


    return point;
  }
}